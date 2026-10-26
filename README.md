# 网络安全知识培训系统

基于 Spring Boot、Vue 2 和 uni-app 的网络安全学习演示项目，包含课程视频、知识测评、公告、学习讨论及管理后台。教学内容覆盖账号安全、网络钓鱼、隐私保护、设备防护和备份恢复。

本目录是经过隐私清理的独立发布副本。原项目中的 API Key、数据库密码、小程序 AppID、个人资料、会话和学习考试历史均未保留。课程、题库及配套素材保留，供本地学习和演示。

**授权状态：原项目包含购买的模板，整体开源和再分发授权尚待核实。本副本未添加项目整体开源许可证。公开发布前请核对原模板授权，详见 [授权状态](LICENSE-STATUS.md)。**

## 目录

| 目录 | 用途 |
| --- | --- |
| `backend` | Java 后端源码、测试和 Maven 配置 |
| `admin-web` | Vue 管理后台源码 |
| `miniapp` | uni-app 小程序源码，用 HBuilderX 打开 |
| `wechat-miniapp` | 已编译的微信项目，可直接导入微信开发者工具 |
| `database` | 脱敏初始化脚本及教学内容源文件 |
| `docs` | 配置、发布和素材说明 |
| `tools` | 前端检查、回归测试和编译产物同步工具 |

本仓库同时提供源码和经过隐私清理的 `wechat-miniapp` 编译目录。依赖目录、后端及管理端的构建产物、本机备份仍由 `.gitignore` 排除。微信编译结果与当前小程序源码逐文件核对一致，详见 [编译与导入说明](docs/WECHAT_IMPORT.md)。

## 本地运行

准备 Java、Maven、MySQL 8、HBuilderX 和微信开发者工具。管理端使用 Vue CLI 4、Vue 2 和 node-sass 4，沿用 Node.js 14 的构建环境；前端检查工具使用 Node.js 18 或更高版本。构建管理端时可通过版本管理工具切换 Node.js。

### 1. 初始化演示数据库

在自己的 MySQL 实例中新建空数据库 `cybersecurityknowledge`，使用 DataGrip 或 MySQL 客户端导入 `database/cybersecurityknowledge.sql`。

该脚本会重建同名表，只应导入新建的演示数据库。包含 15 张表、课程和虚构演示账号；手机号、身份证号和邮箱为空，登录会话、学习足迹及考试历史为空。

| 角色 | 演示账号 | 演示密码 |
| --- | --- | --- |
| 管理员 | `demo-admin` | `ChangeMe-2026!` |
| 学员 | `demo-user-1`、`demo-user-2`、`demo-user-3` | `ChangeMe-2026!` |

这些账号是公开的演示数据，部署时需要自行替换。

### 2. 填写本机配置

在项目根目录执行：

```powershell
Copy-Item backend/config/application-local.example.yml backend/config/application-local.yml
```

编辑新文件，填写自己的数据库地址、账号和密码。AI 功能需要自行填写 API Key；不配置时，其余学习与管理功能仍可使用。该文件已被 Git 忽略，位于源码资源目录之外，不会打包进入后端 JAR。

如果希望本机凭据完全放在项目目录之外，启动 BAT 还会自动读取 Windows 的 `%USERPROFILE%/.cybersecurity-training/application-local.yml`。把配置模板复制到那里并填写即可；也可用 `CYBERSECURITY_CONFIG_DIR` 指定其他外部目录。默认选择普通用户目录，避免应用隔离导致编辑工具和桌面双击读取到不同的 AppData 文件。启动日志保存在该外部目录的 `logs/startup.log`，不会放进发布源码。

也可使用环境变量 `DB_URL`、`DB_USERNAME`、`DB_PASSWORD` 和 `AI_API_KEY`。AI 接口使用 DeepSeek 兼容格式，接口和模型配置位于 `backend/src/main/resources/application.yml`。

首次启动需要完成数据库初始化与配置。启动器会提前检查缺少配置、MySQL 主机和端口不通、管理端未构建等问题；通过 Maven 测试并不代表数据库已经配置完成。

### 3. 构建管理后台

切换至 Node.js 14，在项目根目录执行：

```powershell
cd admin-web
npm ci --no-optional
npm run build
cd ..
```

构建结果生成到 `admin-web/dist`。也可在该目录执行 `npm run serve`，启动管理端开发服务器。

### 4. 启动后端

在项目根目录打包，然后从 `backend` 目录启动，以便 Spring Boot 加载旁边的 `config/application-local.yml`：

```powershell
mvn -f backend/pom.xml clean package
cd backend
java -jar target/cybersecurityknowledge-0.0.1-SNAPSHOT.jar
```

- 接口检查：`http://localhost:8080/cybersecurityknowledge/config/list`
- 管理后台：`http://localhost:8080/cybersecurityknowledge/admin/dist/index.html#/login`

Windows 下也可双击根目录的启动 BAT。它们使用 PATH 中的 Node.js、Java 和 Maven；MySQL 需由你自行启动。脚本使用默认 8080 端口，启动前应关闭占用此端口的其他项目实例。修改管理端后，先重新构建管理端，再打包后端。

“启动管理后台.bat”会先确保服务可用，再打开默认浏览器；日常查看管理页面只需运行这一个 BAT。“启动后端.bat”只启动接口并显示地址，不会打开浏览器。新启动窗口会显示本次时间和项目目录，避免把旧失败窗口当作本次结果。

### 5. 运行微信小程序

直接体验：先按前文配置、启动数据库和后端，再在微信开发者工具中导入仓库内的 `wechat-miniapp`。当前编译配置使用游客 AppID，可按调试需要改用自己的 AppID。客户端默认连接本机 `http://localhost:8080/cybersecurityknowledge/`。

需要修改源码时：

1. 使用 HBuilderX 打开 `miniapp`，在 `manifest.json` 中填写自己的 AppID。
2. 检查 `miniapp/api/base.js` 中的后端地址。在真机上，`localhost` 指手机自身，需要换成可访问的服务地址。
3. 执行“运行到小程序模拟器 → 微信开发者工具”。
4. 在项目根目录执行 `npm --prefix tools run sync:wechat`，同步编译结果到 `wechat-miniapp`。

同步工具保留本机开发者设置。此仓库会收录公开编译目录，但仍忽略 `project.private.config.json`、`.env.local` 等私人设置；再次提交前检查 AppID 和调试参数，保留可公开的演示配置。

## 检查与测试

切换至 Node.js 18 或更高版本：

```powershell
npm --prefix tools ci
npm --prefix tools run check
npm --prefix tools test
mvn -f backend/pom.xml test
```

本次副本验证结果见 [发布检查记录](docs/RELEASE_CHECK.md)。现有回归用例不代表所有业务缺陷已修复，已知限制见 [安全与使用边界](SECURITY.md)。

## 发布与素材

- [上传 GitHub 的步骤](docs/PUBLISHING.md)
- [第三方组件及授权说明](THIRD_PARTY_NOTICES.md)
- [图片、视频与制作记录](docs/ASSETS.md)

上传前再次检查暂存文件，不要提交自己的本机配置、用户上传文件、数据库导出或日志。
