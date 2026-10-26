const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createLoader, front } = require('../lib/load-frontend.cjs');
const mediaUrl = createLoader()(path.join(front, 'utils/media-url.js')).default;
const base = 'http://localhost:8080/cybersecurityknowledge/';
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

test('内置网络安全图片使用本地资源，且与后台提供的图片一致', () => {
    const root = path.resolve(front, '..');
    for (const name of ['account.jpg', 'phishing.jpg', 'privacy.jpg', 'devices.jpg', 'backup.jpg',
        'avatar-1.png', 'avatar-2.png', 'avatar-3.png']) {
        assert.equal(mediaUrl('upload/security/' + name, base), '/static/security/' + name);
        assert.equal(hash(path.join(front, 'static/security', name)),
            hash(path.join(root, 'backend/src/main/resources/static/upload/security', name)));
    }
});

test('课程视频和用户上传图片继续使用后端地址', () => {
    for (const value of ['upload/security/account.mp4', 'upload/user-photo.jpg', 'upload/security/custom.jpg']) {
        assert.equal(mediaUrl(value, base), base + value);
    }
});

test('空图片和完整媒体地址不会生成无效的后端拼接地址', () => {
    assert.equal(mediaUrl(null, base), '');
    assert.equal(mediaUrl('', base), '');
    for (const value of ['https://example.com/photo.jpg', '/static/security/mark.png', 'wxfile://tmp/photo']) {
        assert.equal(mediaUrl(value, base), value);
    }
});
