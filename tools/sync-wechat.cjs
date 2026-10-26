const fs = require('node:fs');
const path = require('node:path');

const project = path.resolve(__dirname, '..');
const protectedFiles = new Set(['project.config.json', 'project.private.config.json', '.env.local']);

// HBuilderX 编译后同步到固定导入目录，保留已有 AppID、开发者设置和本机配置。
function syncWechat(
    source = path.join(project, 'miniapp/unpackage/dist/dev/mp-weixin'),
    destination = path.join(project, 'wechat-miniapp')
) {
    for (const name of ['app.js', 'app.json', 'project.config.json']) {
        if (!fs.existsSync(path.join(source, name))) {
            throw new Error('缺少编译文件 ' + name + '，请先在 HBuilderX 中将 miniapp 编译为微信小程序。');
        }
    }
    const config = JSON.parse(fs.readFileSync(path.join(source, 'app.json'), 'utf8'));
    if (!Array.isArray(config.pages) || config.pages.length === 0) {
        throw new Error('编译目录没有已注册页面，停止同步。');
    }
    for (const page of config.pages) {
        if (!fs.existsSync(path.join(source, page + '.wxml'))) {
            throw new Error('编译页面不完整：' + page);
        }
    }

    let copied = 0;
    function copyDirectory(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const input = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                copyDirectory(input);
            } else if (entry.isFile()) {
                const relative = path.relative(source, input);
                const output = path.join(destination, relative);
                if (protectedFiles.has(relative) && fs.existsSync(output)) continue;
                fs.mkdirSync(path.dirname(output), { recursive: true });
                fs.copyFileSync(input, output);
                copied++;
            }
        }
    }
    copyDirectory(source);
    return { copied, pages: config.pages.length, destination };
}

if (require.main === module) {
    try {
        const result = syncWechat();
        console.log('已同步 ' + result.copied + ' 个文件、' + result.pages + ' 个页面到 ' + result.destination);
        console.log('现有微信项目配置和本机配置已保留。');
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

module.exports = { syncWechat };
