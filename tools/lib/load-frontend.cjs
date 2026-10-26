const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const babel = require('@babel/core');

const project = path.resolve(__dirname, '../..');
const front = path.join(project, 'miniapp');
const admin = path.join(project, 'admin-web/src');

// 在独立上下文内执行前端模块，替换网络与小程序运行环境，测试不会访问外部服务。
function createLoader({ root = front, globals = {}, stubs = {} } = {}) {
    const cache = new Map();
    const context = vm.createContext({ console, setTimeout, clearTimeout, ...globals });

    function resolve(specifier, parent) {
        const target = specifier.startsWith('@/')
            ? path.join(root, specifier.slice(2))
            : path.resolve(path.dirname(parent), specifier);
        return [target, target + '.js', target + '.vue', target + '.json'].find(file =>
            fs.existsSync(file) && fs.statSync(file).isFile()
        );
    }

    function load(file) {
        file = path.resolve(file);
        if (Object.hasOwn(stubs, file)) return stubs[file];
        if (cache.has(file)) return cache.get(file).exports;
        if (/\.(vue|css|scss)$/.test(file)) return {};

        const module = { exports: {} };
        cache.set(file, module);
        const { code } = babel.transformSync(fs.readFileSync(file, 'utf8'), {
            filename: file,
            babelrc: false,
            configFile: false,
            plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
        });
        const execute = vm.runInContext(
            '(function(require, module, exports) {\n' + code + '\n})',
            context,
            { filename: file }
        );
        execute(specifier => {
            const target = resolve(specifier, file);
            if (!target) throw new Error('未解析的测试依赖：' + specifier + ' in ' + file);
            return load(target);
        }, module, module.exports);
        return module.exports;
    }

    return load;
}

const plain = value => JSON.parse(JSON.stringify(value));
module.exports = { createLoader, front, admin, plain };
