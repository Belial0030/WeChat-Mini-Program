'use strict';

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const net = require('node:net');
const { spawn, spawnSync } = require('node:child_process');
const { loadRuntimeConfig, startupFailureReason } = require('./lib/runtime-config.cjs');

const projectRoot = path.resolve(__dirname, '..');
const backendUrl = 'http://localhost:8080/cybersecurityknowledge/';
const probeUrl = 'http://127.0.0.1:8080/cybersecurityknowledge/config/list';
const adminUrl = backendUrl + 'admin/dist/index.html#/login';
const jarFile = path.join(projectRoot, 'backend/target/cybersecurityknowledge-0.0.1-SNAPSHOT.jar');
const adminIndex = path.join(projectRoot, 'admin-web/dist/index.html');

function get(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, body }));
      response.on('error', reject);
    });
    request.setTimeout(1500, () => request.destroy(new Error('请求超时')));
    request.on('error', reject);
  });
}

async function backendReady() {
  try {
    const response = await get(probeUrl);
    return response.status === 200 && JSON.parse(response.body).code === 0;
  } catch {
    return false;
  }
}

function backendPortOpen() {
  return new Promise(resolve => {
    const socket = net.createConnection({ host: '127.0.0.1', port: 8080 });
    const finish = open => { socket.destroy(); resolve(open); };
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.setTimeout(1500, () => finish(true));
  });
}

function mysqlPortOpen({ host, port }) {
  return new Promise(resolve => {
    const socket = net.createConnection({ host, port });
    const finish = open => { socket.destroy(); resolve(open); };
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
    socket.setTimeout(1500, () => finish(false));
  });
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    windowsHide: true,
    stdio: 'inherit',
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('命令执行失败，请查看上方输出。');
}

async function startBackend(runtime) {
  const logFile = runtime.logFile;
  if (await backendReady()) {
    console.log('[后端] 已在运行，复用现有服务。');
    return;
  }

  let server;
  let launchError;
  let logOffset = 0;
  if (!(await backendPortOpen())) {
    if (!fs.existsSync(jarFile) || (fs.existsSync(adminIndex) &&
        fs.statSync(adminIndex).mtimeMs > fs.statSync(jarFile).mtimeMs)) {
      console.log('[构建] 正在打包后端并收集管理后台页面……');
      run('mvn -f backend/pom.xml package', [], { shell: true });
      if (!fs.existsSync(jarFile)) throw new Error('打包后仍未找到后端 JAR。');
    }

    const javaHome = process.env.JAVA_HOME;
    const javaFromHome = javaHome && path.join(javaHome, 'bin/java.exe');
    const java = javaFromHome && fs.existsSync(javaFromHome) ? javaFromHome : 'java.exe';
    logOffset = fs.existsSync(logFile) ? fs.statSync(logFile).size : 0;
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    const log = fs.openSync(logFile, 'a');
    try {
      server = spawn(java, ['-jar', jarFile, ...runtime.javaArgs], {
        cwd: path.join(projectRoot, 'backend'),
        detached: true,
        windowsHide: true,
        stdio: ['ignore', log, log]
      });
      server.once('error', error => { launchError = error; });
      server.unref();
    } finally {
      fs.closeSync(log);
    }
    console.log('[后端] 正在启动，请稍候……');
  } else {
    console.log('[后端] 8080 端口正在使用，等待项目接口就绪……');
  }

  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (launchError) throw new Error('Java 启动失败，请检查 Java 环境：' + launchError.message);
    if (await backendReady()) return;
    if (server && server.exitCode !== null) {
      throw new Error(startupFailureReason(logFile, logOffset) + '\n启动日志：' + logFile);
    }
    await new Promise(resolve => setTimeout(resolve, 750));
  }
  throw new Error('后端未能在 60 秒内就绪，请检查 8080 端口及日志：' + logFile);
}

async function main() {
  const runtime = loadRuntimeConfig(projectRoot);
  if (!runtime.configured) {
    throw new Error('未配置数据库。请复制 backend/config/application-local.example.yml 为 application-local.yml 并填写自己的连接信息。\n也可把配置放在本机外部目录：' + runtime.externalDirectory + '\n详细步骤见 README.md。');
  }
  if (process.argv[2] === 'admin' && !fs.existsSync(adminIndex)) {
    throw new Error('缺少管理后台页面。请在 admin-web 中执行 npm ci --no-optional 和 npm run build，再重新启动。');
  }
  if (!(await mysqlPortOpen(runtime.database))) {
    throw new Error('连接不到 MySQL（' + runtime.database.host + ':' + runtime.database.port +
      '）。请启动对应服务，并核对本机配置中的地址和端口。');
  }
  console.log('[数据库] MySQL 服务连接检查通过。');
  await startBackend(runtime);

  if (process.argv[2] === 'admin') {
    const page = await get(adminUrl);
    if (page.status !== 200 || !/<html[\s>]/i.test(page.body)) {
      throw new Error('管理后台页面不可用，请确认 admin-web/dist 已构建并重新打包后端。');
    }
    console.log('\n[就绪] 管理后台：' + adminUrl);
  } else {
    console.log('\n[就绪] 后端接口地址：' + backendUrl);
    console.log('接口检查地址：' + backendUrl + 'config/list');
  }
  console.log('后端已在后台运行，关闭本窗口不会停止服务。');
}

main().catch(error => {
  console.error('\n[启动失败] ' + error.message);
  process.exitCode = 1;
});
