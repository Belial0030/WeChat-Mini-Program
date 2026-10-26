'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

function loadRuntimeConfig(projectRoot, environment = process.env) {
  const externalDirectory = path.resolve(environment.CYBERSECURITY_CONFIG_DIR ||
    path.join(environment.USERPROFILE || environment.HOME || os.homedir(), '.cybersecurity-training'));
  const projectConfig = path.join(projectRoot, 'backend/config/application-local.yml');
  const externalConfig = path.join(externalDirectory, 'application-local.yml');
  const configFiles = [projectConfig, externalConfig].filter(file => fs.existsSync(file));
  const hasEnvironmentConfig = ['DB_URL', 'DB_USERNAME', 'DB_PASSWORD',
    'SPRING_DATASOURCE_URL', 'SPRING_DATASOURCE_USERNAME', 'SPRING_DATASOURCE_PASSWORD']
    .some(name => Object.prototype.hasOwnProperty.call(environment, name));
  let databaseUrl;
  for (const file of configFiles) {
    const match = fs.readFileSync(file, 'utf8').match(/^[ \t]*url:[ \t]*(.+)$/m);
    if (match) databaseUrl = match[1].trim().replace(/^(['"])(.*)\1$/, '$2').replace(/\s+#.*$/, '');
  }
  databaseUrl = environment.SPRING_DATASOURCE_URL || environment.DB_URL || databaseUrl ||
    'jdbc:mysql://127.0.0.1:3306/cybersecurityknowledge';
  const match = databaseUrl.match(/^jdbc:mysql:\/\/(\[[^\]]+\]|[^/:?]+)(?::(\d+))?\//);
  if (!match || !(Number(match[2] || 3306) >= 1 && Number(match[2] || 3306) <= 65535)) {
    throw new Error('数据库地址无效，请使用 jdbc:mysql://主机:端口/数据库名。');
  }
  return {
    configured: configFiles.length > 0 || hasEnvironmentConfig,
    externalDirectory,
    logFile: path.join(externalDirectory, 'logs/startup.log'),
    database: { host: match[1].replace(/^\[|\]$/g, ''), port: Number(match[2] || 3306) },
    javaArgs: fs.existsSync(externalConfig)
      ? ['--spring.config.additional-location=' + pathToFileURL(externalDirectory + path.sep).href]
      : []
  };
}

function startupFailureReason(logFile, startOffset = 0) {
  let text;
  try {
    text = fs.readFileSync(logFile).subarray(startOffset).toString('utf8');
  } catch {
    return '请检查 Java 环境及启动日志。';
  }
  if (/Access denied for user/i.test(text)) return 'MySQL 拒绝登录，请检查本机数据库账号和密码。';
  if (/Unknown database/i.test(text)) return '目标数据库不存在，请先导入演示初始化 SQL。';
  if (/Connection refused|Communications link failure/i.test(text)) return '连接不到 MySQL，请检查服务、主机和端口。';
  if (/Address already in use|Port \d+ was already in use/i.test(text)) return '后端端口被占用，请先关闭冲突的项目实例。';
  return '请查看本次启动日志中的异常原因。';
}

module.exports = { loadRuntimeConfig, startupFailureReason };
