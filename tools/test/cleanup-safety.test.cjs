const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const parser = require('@babel/parser');
const { front, admin, createLoader } = require('../lib/load-frontend.cjs');

const project = path.resolve(__dirname, '../..');
const config = parser.parseExpression(fs.readFileSync(path.join(front, 'pages.json'), 'utf8'));
const property = (node, name) => node.properties.find(p => (p.key.name || p.key.value) === name)?.value;
const pages = property(config, 'pages').elements.map(page => property(page, 'path').value);

test('所有角色的管理菜单仍有可访问的对应路由', () => {
    const routes = fs.readFileSync(path.join(admin, 'router/router-static.js'), 'utf8');
    const paths = new Set(Array.from(routes.matchAll(/path:\s*'([^']+)'/g), match => match[1]));
    const menu = createLoader({ root: admin })(path.join(admin, 'utils/menu.js')).default;
    for (const role of menu.list()) for (const group of role.backMenu) for (const item of group.child) {
        assert(paths.has('/' + item.tableName), '菜单路由缺失：' + item.tableName);
    }
});

test('小程序已注册页面和底部导航目标全部保留', () => {
    for (const page of pages) {
        assert(fs.existsSync(path.join(front, page + '.vue')), '页面缺失：' + page);
    }
    for (const tab of property(property(config, 'tabBar'), 'list').elements) {
        const target = property(tab, 'pagePath').value;
        assert(pages.includes(target), '底部导航目标未注册：' + target);
    }
});

test('现有页面和导航中直接引用的小程序静态图片全部保留', () => {
    for (const page of pages) {
        const file = path.join(front, page + '.vue');
        const text = fs.readFileSync(file, 'utf8');
        for (const match of text.matchAll(/(?<![:\w-])src=["']([^"']+)["']/g)) {
            const value = match[1];
            if (!value.includes('static/') || /^(https?:|data:)/.test(value)) continue;
            const target = value.startsWith('/') ? path.join(front, value.slice(1)) : path.resolve(path.dirname(file), value);
            assert(fs.existsSync(target), page + ' 的图片缺失：' + value);
        }
    }
    for (const tab of property(property(config, 'tabBar'), 'list').elements) {
        for (const name of ['iconPath', 'selectedIconPath']) {
            assert(fs.existsSync(path.join(front, property(tab, name).value)), '底部导航图片缺失');
        }
    }
});

test('数据库脚本中的业务表、实体字段及主键映射完整', () => {
    const entities = fs.readdirSync(path.join(project, 'backend/src/main/java/com/entity'))
        .filter(name => name.endsWith('Entity.java'))
        .map(name => fs.readFileSync(path.join(project, 'backend/src/main/java/com/entity', name), 'utf8'));
    const sql = fs.readFileSync(path.join(project, 'database/cybersecurityknowledge.sql'), 'utf8');
    const tables = Array.from(sql.matchAll(/CREATE TABLE `([^`]+)`\s*\(([\s\S]*?)\) ENGINE/g));
    assert(tables.length > 0);
    for (const [, table, definition] of tables) {
        const entity = entities.find(text => text.includes('@TableName("' + table + '")'));
        assert(entity, '业务表没有实体映射：' + table);
        assert(/PRIMARY KEY \(`id`\)/.test(definition), '业务表主键缺失：' + table);
        for (const [, column] of definition.matchAll(/^\s*`([^`]+)`/gm)) {
            const field = column.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            const conventionalField = new RegExp('\\bprivate\\s+\\w+\\s+' + field + '\\s*;').test(entity);
            assert(column === 'id' || entity.includes('"' + column + '"') || conventionalField, table + '.' + column + ' 缺少字段映射');
        }
    }
});
