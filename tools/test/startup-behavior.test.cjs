const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { fileURLToPath } = require('node:url');
const { loadRuntimeConfig, startupFailureReason } = require('../lib/runtime-config.cjs');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'security-startup-test-'));
  t.after(() => {
    const target = path.resolve(root);
    assert(target.startsWith(path.join(os.tmpdir(), 'security-startup-test-')));
    fs.rmSync(target, { recursive: true, force: true });
  });
  const external = path.join(root, 'runtime with spaces');
  fs.mkdirSync(external, { recursive: true });
  return { root, external };
}

function writeConfig(directory, port) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'application-local.yml'),
    'spring:\n  datasource:\n    url: jdbc:mysql://127.0.0.1:' + port + '/demo\n    password: "fixture-private-value"\n');
}

function launchFixture(root, external, mode) {
  const tools = path.join(root, 'tools');
  fs.mkdirSync(path.join(tools, 'lib'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, '../start-project.cjs'), path.join(tools, 'start-project.cjs'));
  fs.copyFileSync(path.join(__dirname, '../lib/runtime-config.cjs'), path.join(tools, 'lib/runtime-config.cjs'));
  const env = { ...process.env, CYBERSECURITY_CONFIG_DIR: external };
  for (const key of Object.keys(env)) {
    if (/^DB_|^SPRING_DATASOURCE_/.test(key)) delete env[key];
  }
  return spawnSync(process.execPath, [path.join(tools, 'start-project.cjs'), mode],
    { env, encoding: 'utf8', timeout: 3000, windowsHide: true });
}

test('未配置的发布副本不会把默认数据库连接当作已完成配置', t => {
  const { root, external } = fixture(t);
  const runtime = loadRuntimeConfig(root, { CYBERSECURITY_CONFIG_DIR: external });
  assert.equal(runtime.configured, false);
  assert.deepEqual(runtime.database, { host: '127.0.0.1', port: 3306 });
});

test('默认本机配置使用普通用户目录，避免 AppData 应用隔离导致桌面双击找不到配置', t => {
  const { root } = fixture(t);
  const shared = path.join(root, '.cybersecurity-training');
  const isolated = path.join(root, 'isolated-app-cache', 'CybersecurityTraining');
  writeConfig(shared, 3307);
  writeConfig(isolated, 3311);
  const runtime = loadRuntimeConfig(path.join(root, 'project'), {
    USERPROFILE: root, LOCALAPPDATA: path.dirname(isolated)
  });
  assert.equal(runtime.configured, true);
  assert.equal(runtime.externalDirectory, shared);
  assert.equal(runtime.database.port, 3307);
});

test('项目外部的本机配置提供真实端口，但不向启动参数暴露密码', t => {
  const { root, external } = fixture(t);
  writeConfig(external, 3307);
  const runtime = loadRuntimeConfig(root, { CYBERSECURITY_CONFIG_DIR: external });
  assert.equal(runtime.configured, true);
  assert.equal(runtime.database.port, 3307);
  assert.equal(runtime.logFile, path.join(external, 'logs/startup.log'));
  assert.equal(fileURLToPath(runtime.javaArgs[0].split('=')[1]), external + path.sep);
  assert(!JSON.stringify(runtime).includes('fixture-private-value'));
});

test('外部配置覆盖项目本机文件，环境变量再覆盖外部地址', t => {
  const { root, external } = fixture(t);
  writeConfig(path.join(root, 'backend/config'), 3310);
  writeConfig(external, 3307);
  const env = { CYBERSECURITY_CONFIG_DIR: external };
  assert.equal(loadRuntimeConfig(root, env).database.port, 3307);
  assert.deepEqual(loadRuntimeConfig(root, { ...env, DB_URL: 'jdbc:mysql://[::1]:3309/demo' }).database,
    { host: '::1', port: 3309 });
});

test('缺少配置时启动器直接给出设置步骤，不执行 Java 或 Maven', t => {
  const { root, external } = fixture(t);
  const result = launchFixture(root, external, 'backend');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /未配置数据库/);
  assert.match(result.stderr, /application-local.example.yml/);
  assert.doesNotMatch(result.stdout, /正在启动|正在打包/);
});

test('缺少管理端构建时先提示构建步骤，不启动不完整的后端包', t => {
  const { root, external } = fixture(t);
  writeConfig(external, 3307);
  const result = launchFixture(root, external, 'admin');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /缺少管理后台页面/);
  assert.match(result.stderr, /npm run build/);
  assert.doesNotMatch(result.stdout, /正在启动|正在打包/);
});

test('错误的 JDBC 地址会被拒绝，错误提示不包含地址里的敏感参数', t => {
  const { root, external } = fixture(t);
  assert.throws(() => loadRuntimeConfig(root, { CYBERSECURITY_CONFIG_DIR: external,
    DB_URL: 'jdbc:mysql://127.0.0.1:70000/demo?password=fixture-sensitive-value' }), error => {
    assert.match(error.message, /数据库地址无效/);
    assert(!error.message.includes('fixture-sensitive-value'));
    return true;
  });
});

test('启动错误只分析本次新增日志，不混入旧错误或显示凭据', t => {
  const { root } = fixture(t);
  const log = path.join(root, 'startup.log');
  const old = '旧记录 Access denied for user; password=fixture-private-value\n';
  fs.writeFileSync(log, old + 'Caused by: java.net.ConnectException: Connection refused\n');
  const reason = startupFailureReason(log, Buffer.byteLength(old));
  assert.match(reason, /连接不到 MySQL/);
  assert(!reason.includes('fixture-private-value'));
  fs.writeFileSync(log, 'Unknown database');
  assert.match(startupFailureReason(log), /数据库不存在/);
});
