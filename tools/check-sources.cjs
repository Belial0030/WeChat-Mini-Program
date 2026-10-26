const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const parser = require('@babel/parser');
const compiler = require('vue-template-compiler');
const { front, admin } = require('./lib/load-frontend.cjs');

const dependencies = new Set(['node_modules', 'uni_modules', 'unpackage', 'uni-ui',
    'mescroll-uni', 'w-picker', 'tki-qrcode', 'mpvue-picker', 'mpvue-citypicker',
    'rich-text', 'colorui', 'uni-rate']);
function filesIn(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
        entry.isDirectory()
            ? dependencies.has(entry.name) ? [] : filesIn(path.join(dir, entry.name))
            : [path.join(dir, entry.name)]
    );
}

function assertReference(specifier, file, root) {
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) return;
    const target = specifier.startsWith('@/')
        ? path.join(root, specifier.slice(2))
        : path.resolve(path.dirname(file), specifier);
    assert([target, target + '.js', target + '.vue', target + '.scss', target + '.css',
        path.join(target, 'index.js')].some(candidate => fs.existsSync(candidate)),
    '无法解析依赖 ' + specifier + '，来源 ' + file);
}

let components = 0, scripts = 0;
for (const root of [front, admin]) {
    for (const file of filesIn(root)) {
        if (file.endsWith('.vue')) {
            const component = compiler.parseComponent(fs.readFileSync(file, 'utf8'));
            for (const block of [component.script, ...component.styles].filter(Boolean)) {
                if (block.src) assertReference(block.src, file, root);
            }
            if (component.script && !component.script.src) {
                parser.parse(component.script.content, { sourceType: 'module' });
            }
            components++;
        } else if (file.endsWith('.js')) {
            const ast = parser.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module' });
            for (const node of ast.program.body) {
                if (node.source) assertReference(node.source.value, file, root);
            }
            scripts++;
        }
    }
}
console.log('语法和文件引用检查通过：' + components + ' 个组件，' + scripts + ' 个脚本。');
