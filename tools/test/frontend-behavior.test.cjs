const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { createLoader, front, admin, plain } = require('../lib/load-frontend.cjs');

function apiFixture(uni = {}) {
    const calls = [];
    const load = createLoader({
        globals: { uni },
        stubs: { [path.join(front, 'api/http.js')]: { request(options) {
            calls.push(plain(options));
            return Promise.resolve({ code: 0 });
        } } },
    });
    return { api: load(path.join(front, 'api/index.js')), calls };
}

test('API 兼容入口保留具名导出和默认导出的范围', () => {
    const { api } = apiFixture();
    const names = ['requestCondition', 'requestConditionDataGet', 'requestConditionDataPost',
        'requestMap', 'queryScore', 'auth', 'login', 'register', 'resetPass', 'session',
        'page', 'list', 'add', 'save', 'update', 'del', 'info', 'detail', 'recommend',
        'upload', 'uploadMedia'];
    assert.deepEqual(Object.keys(api).filter(key => key !== 'default').sort(), names.sort());
    assert.deepEqual(Object.keys(api.default), ['requestCondition', 'requestConditionDataPost',
        'requestConditionDataGet', 'requestMap', 'login', 'register', 'resetPass', 'auth',
        'session', 'list', 'page', 'add', 'update', 'del', 'info', 'recommend', 'save',
        'upload', 'queryScore']);
    for (const key of Object.keys(api.default)) assert.equal(api.default[key], api[key]);
});

test('条件请求保留原始查询串、GET/POST 方法和数据对象', async () => {
    const { api, calls } = apiFixture();
    await api.requestCondition('news', 'list', [{ key: 'name', val: 'A&B' }, { key: 'page', val: 2 }]);
    await api.requestCondition('news', 'list', []);
    await api.requestConditionDataGet('news', 'list', null, { limit: 10 });
    await api.requestConditionDataPost('forum', 'add', [{ key: 'id', val: 3 }], { content: '内容' });
    await api.requestMap('exampapertopic', 'submitQuestions', { answerList: '[]' });
    assert.deepEqual(calls, [
        { url: 'news/list?name=A&B&page=2', method: 'GET' },
        { url: 'news/list', method: 'GET' },
        { url: 'news/list', method: 'GET', data: { limit: 10 } },
        { url: 'forum/add?id=3', method: 'POST', data: { content: '内容' } },
        { url: 'exampapertopic/submitQuestions', method: 'GET', data: { answerList: '[]' } },
    ]);
});

test('认证、重置密码及会话请求保留路径和默认表名', async () => {
    const { api, calls } = apiFixture();
    await api.login(undefined, { username: 'u', password: 'p' });
    await api.register('yonghu', { username: 'u' });
    await api.resetPass('yonghu', 'u');
    await api.session();
    assert.deepEqual(calls, [
        { url: 'defaultuser/login', method: 'GET', data: { username: 'u', password: 'p' } },
        { url: 'yonghu/register', method: 'POST', data: { username: 'u' } },
        { url: 'yonghu/resetPass', method: 'GET', data: { username: 'u' } },
        { url: 'defaultuser/session', method: 'GET' },
    ]);
});

test('未登录时仍跳转登录页，已有 token 时不跳转', () => {
    const redirects = [];
    let token = '';
    const { api } = apiFixture({ getStorageSync: () => token, navigateTo: data => redirects.push(data.url) });
    api.auth();
    token = 'token';
    api.auth();
    assert.deepEqual(redirects, ['../login/login']);
});

test('CRUD、推荐及统计请求保留原有请求协议', async () => {
    const { api, calls } = apiFixture();
    for (const action of ['page', 'list', 'add', 'save', 'update', 'del']) await api[action]('news', { id: 7 });
    await api.info('news', 7);
    await api.detail('news', 7);
    await api.recommend('news');
    await api.queryScore({ yonghuId: 7 });
    assert.deepEqual(calls, [
        ...['page', 'list', 'add', 'save', 'update', 'delete'].map((action, i) => ({
            url: 'news/' + action, method: i < 2 ? 'GET' : 'POST', data: { id: 7 },
        })),
        { url: 'news/info/7', method: 'GET' },
        { url: 'news/detail/7', method: 'GET' },
        { url: 'news/autoSort?limit=5', method: 'get', data: { page: 1, limit: 10 } },
        { url: 'queryScore', method: 'GET', data: { yonghuId: 7 } },
    ]);
});

test('考试答案选择保留单选替换、多选追加和取消规则', () => {
    const load = createLoader();
    const actions = load(path.join(front, 'pages/exampaper/exam.actions.js')).default;
    const state = { answerList: [
        { examquestionId: 1, examquestionTypes: 1, answer: '' },
        { examquestionId: 2, examquestionTypes: 2, answer: '' },
    ] };
    const select = (id, code) => actions.selectQuestions.call(state, id, code);
    select(1, 'A'); select(1, 'B');
    select(2, 'A'); select(2, 'B'); select(2, 'A');
    assert.equal(state.answerList[0].answer, 'B');
    assert.equal(state.answerList[1].answer, 'B');
    select(2, 'B');
    assert.equal(state.answerList[1].answer, '');
});

test('考试倒计时格式及每次创建的状态相互独立', () => {
    const load = createLoader();
    const options = load(path.join(front, 'pages/exampaper/exam.options.js')).default;
    const a = options.data(), b = options.data();
    a.answerList.push({ answer: 'A' });
    assert.equal(b.answerList.length, 0);
    const format = count => options.computed.SecondToDate.call({ count });
    assert.equal(format(59), '59秒');
    assert.equal(format(60), '60秒');
    assert.equal(format(3600), '1小时0分钟0秒');
    assert.equal(format(86400), '1天0小时0分钟0秒');
});

test('考试时间未结束且有空题时仍阻止交卷', async () => {
    const load = createLoader();
    const actions = load(path.join(front, 'pages/exampaper/exam.actions.js')).default;
    const messages = [], requests = [];
    const result = await actions.submitQuestions.call({
        user: { id: 5 }, exampaperId: 8, count: 30,
        dataList: [{ examquestionId: 1 }], answerList: [{ examquestionId: 1, answer: '' }],
        $utils: { msg: text => messages.push(text) },
        $api: { requestMap: (...args) => requests.push(args) },
    });
    assert.equal(result, false);
    assert.equal(requests.length, 0);
    assert.equal(messages[0], '您有’1‘道题未作，分别为：1;请继续答题！');
});

test('考试超时后仍提交原始答案 JSON 并返回上一页', async () => {
    const navigation = [], requests = [], messages = [];
    const load = createLoader({ globals: { uni: { navigateBack: data => navigation.push(plain(data)) } } });
    const actions = load(path.join(front, 'pages/exampaper/exam.actions.js')).default;
    const answerList = [{ examquestionId: 1, answer: '' }];
    await actions.submitQuestions.call({
        user: { id: 5 }, exampaperId: 8, count: 0,
        dataList: [{ examquestionId: 1 }], answerList,
        $utils: { msg: text => messages.push(text) },
        $api: { requestMap: (...args) => { requests.push(plain(args)); return Promise.resolve(); } },
    });
    assert.deepEqual(requests, [['exampapertopic', 'submitQuestions', {
        yonghuId: 5, answerList: JSON.stringify(answerList), exampaperId: 8,
    }]]);
    assert.deepEqual(navigation, [{ delta: 1 }]);
    assert.equal(messages[0], '您有’1‘道题未作，分别为：1;未做题目为0分！');
});

test('共享分页保留总数、每页数量、前后翻页及跳页行为', () => {
    const load = createLoader({ root: admin });
    const list = load(path.join(admin, 'presentation/list.js')).default;
    const state = { contents: { pageTotal: true, pageSizes: true, pagePrevNext: true, pagePager: true, pageJumper: true } };
    list.contentPageStyleChange.call(state);
    assert.equal(state.layouts, 'total,sizes,prev,pager,next,jumper');
    assert.equal(state.contents.pageEachNum, 10);
    state.contents.pagePrevNext = false;
    list.contentPageStyleChange.call(state);
    assert.equal(state.layouts, 'total,sizes,jumper');
});

function adminLoginFixture(http) {
    const actions = createLoader({ root: admin })(path.join(admin, 'views/login.actions.js')).default;
    const saved = {}, errors = [], routes = [];
    const state = { isSubmitting: false, rulesForm: { username: 'name&test', password: 'pass?test' }, roleOptions: [{ key: '管理员', value: 'users' }],
        $http: http, $storage: { set: (key, value) => { saved[key] = value; } },
        $router: { replace: value => routes.push(value) }, $message: { error: value => errors.push(value) } };
    return { run: () => actions.login.call(state), state, saved, errors, routes };
}

test('管理端登录在请求期间阻止重复提交，正确保存会话和角色', async () => {
    let resolve, calls = [];
    const request = new Promise(done => { resolve = done; });
    const fixture = adminLoginFixture(options => { calls.push(options); return request; });
    const pending = fixture.run();
    await fixture.run();
    assert.equal(calls.length, 1);
    assert.equal(fixture.state.isSubmitting, true);
    assert.deepEqual(plain(calls[0].params), { username: 'name&test', password: 'pass?test' });
    assert.equal(calls[0].url, 'users/login');
    resolve({ data: { code: 0, token: 'test-token', userId: 1 } });
    await pending;
    assert.equal(fixture.saved.role, '管理员');
    assert.equal(fixture.saved.sessionTable, 'users');
    assert.equal(fixture.saved.Token, 'test-token');
    assert.equal(fixture.routes[0].path, '/index/');
    assert.equal(fixture.state.isSubmitting, false);
});

test('管理端登录业务失败后恢复操作，不写入会话或跳转', async () => {
    const fixture = adminLoginFixture(async () => ({ data: { code: 500, msg: '账号或密码错误' } }));
    await fixture.run();
    assert.equal(fixture.state.isSubmitting, false);
    assert.deepEqual(fixture.errors, ['账号或密码错误']);
    assert.deepEqual(fixture.saved, {});
    assert.equal(fixture.routes.length, 0);
});

test('管理端登录网络错误后结束加载，允许再次登录', async () => {
    const fixture = adminLoginFixture(async () => { throw new Error('offline'); });
    await fixture.run();
    assert.equal(fixture.state.isSubmitting, false);
    assert.equal(fixture.errors.length, 1);
    assert.equal(fixture.routes.length, 0);
});
