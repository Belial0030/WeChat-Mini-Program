# 发布到 GitHub

本目录是独立的发布副本，提供源码及经过隐私清理的微信小程序编译结果。真实配置、私人数据库内容、依赖缓存和其他构建产物已排除。发布者仍需确认购买模板的开源及再分发授权，当前未添加项目整体许可证。

## 上传范围

上传本目录中的源码、脱敏 SQL、教学素材、依赖清单及锁文件、测试、说明文档，以及 `wechat-miniapp` 编译目录。`node_modules`、`target`、`dist`、`unpackage`、本机配置、日志和备份仍由 `.gitignore` 排除。

公开微信编译配置使用游客 AppID，未包含本机 `project.private.config.json` 和 `.env.local`。再次同步或编辑编译目录后，应检查是否带入自己的 AppID、调试查询参数或凭据。

不要把实际运行项目的配置文件、数据库导出或整个原项目覆盖到本副本中；更改功能时只同步需要的源码，再检查是否带入私人信息。

通过启动 BAT 使用的外部本机配置和启动日志位于项目目录之外，不属于上传范围。它们不能随项目另行打包发布。

## 操作步骤

1. 核实原模板授权。授权未确认时，先使用 GitHub 私有仓库保存，不把整套源码公开。
2. 在 GitHub 新建空仓库，不自动生成 README 或许可证。
3. 在本项目目录打开 PowerShell，执行：

```powershell
git init -b main
git add .
git status
git diff --cached --stat
```

4. 查看暂存文件，确认没有真实凭据、个人资料、数据导出和本机配置，然后执行：

```powershell
git commit -m "Initial sanitized project"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

将仓库地址替换为自己的地址。按 Git 提示通过自己的 GitHub 账户完成认证。微信目录可直接导入开发者工具，Java 服务和 MySQL 仍需要另行配置、运行。

官方参考：[本地项目上传](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)、[仓库许可证](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)。
