# 已编译微信项目的使用方式

本仓库同时保留 `miniapp` 源码与 `wechat-miniapp` 编译结果。下载后可以直接在微信开发者工具中导入 `wechat-miniapp`，无需先使用 HBuilderX 编译。

## 导入和运行

1. 按根目录 README 初始化演示数据库，并启动 Java 后端。
2. 微信开发者工具导入 `wechat-miniapp`，其中包含 `app.js`、`app.json` 和 `project.config.json`。
3. 公开配置使用 `touristappid`；需要时填写自己的 AppID，个人开发者设置不要提交。
4. 学员演示账号为 `demo-user-1`，密码为 `ChangeMe-2026!`。

客户端默认访问 `http://localhost:8080/cybersecurityknowledge/`。登录、公告、课程数据和视频需要后端与数据库正常运行；附带编译结果不包含服务器。真机调试需要改用手机可访问的服务地址，修改源码后重新编译同步。

## 编译结果与隐私

- 35 个页面、5 个底部入口，编译输入与当前公开源码的 422 个文件一致。
- 已保留页面脚本、页面 JSON、WXML 和需要的样式；没有独立样式的页面可使用公共 app.wxss。
- 私人 AppID 已替换为游客标识，未包含 `project.private.config.json`、`.env.local`、凭据或本机路径。
- 文件哈希与编译工具版本见 [WECHAT_BUILD.json](WECHAT_BUILD.json)。

修改 `miniapp` 后需重新编译、同步并检查再提交，避免源码与编译结果版本不同。本机运行目录不受本次上传包调整影响。
