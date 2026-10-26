const bundledSecurityImages = new Set([
    'account.jpg', 'phishing.jpg', 'privacy.jpg', 'devices.jpg', 'backup.jpg',
    'avatar-1.png', 'avatar-2.png', 'avatar-3.png',
]);

// 内置培训配图随小程序发布；用户上传的媒体继续使用原后端地址。
export default function mediaUrl(value, baseUrl) {
    if (typeof value !== 'string' || !value) return '';
    if (/^(https?:\/\/|data:|wxfile:|blob:|\/static\/)/.test(value)) return value;
    const match = value.match(/^\/?upload\/security\/([^/?#]+)$/);
    if (match && bundledSecurityImages.has(match[1])) return '/static/security/' + match[1];
    return baseUrl + value;
}
