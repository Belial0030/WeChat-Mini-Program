# Cybersecurity Training System

A cybersecurity education demo built with Spring Boot, Vue 2, and uni-app. It includes video courses, quizzes, announcements, learning discussions, and an admin dashboard. The training content covers account security, phishing awareness, privacy protection, device security, and data backup and recovery.

This repository is a sanitized release copy. Original API keys, database passwords, Mini Program AppIDs, personal profiles, sessions, and learning and exam histories have been removed. Courses, question banks, and supporting media are included for local learning and demonstrations.

**Licensing status: The original project includes a purchased template. Permission to release the complete project as open source or redistribute it has not yet been verified. No project-wide open-source license has been added. Check the original template's terms before making the repository public.**

## Project Structure

| Directory | Purpose |
| --- | --- |
| `backend` | Java backend source, tests, and Maven configuration |
| `admin-web` | Vue admin dashboard source |
| `miniapp` | uni-app Mini Program source; open this directory in HBuilderX |
| `wechat-miniapp` | Compiled project ready to import into WeChat Developer Tools |
| `database` | Sanitized initialization SQL and training content source files |
| `docs` | Configuration, publishing, and asset documentation |
| `tools` | Frontend checks, regression tests, and build synchronization tools |

Both source code and the sanitized `wechat-miniapp` build are included. Dependency directories, backend and admin build outputs, and local backups are excluded by `.gitignore`. The Mini Program source files have been checked against the inputs used for the compiled build. See [Build and import instructions](docs/WECHAT_IMPORT.md).

## Local Setup

Install Java, Maven, MySQL 8, HBuilderX, and WeChat Developer Tools. The admin dashboard uses Vue CLI 4, Vue 2, and node-sass 4 with the existing Node.js 14 build environment. Frontend verification tools require Node.js 18 or later. Use a version manager to switch Node.js versions when building the admin dashboard.

### 1. Initialize the Demo Database

Create a new, empty database named `cybersecurityknowledge` in your own MySQL instance. Import `database/cybersecurityknowledge.sql` using DataGrip or a MySQL client.

The script recreates tables with matching names. Import it only into a newly created demo database. It provides 15 tables, training content, and fictional demo accounts. Phone numbers, identity document numbers, and email addresses are empty, as are login sessions, learning history, and exam history.

| Role | Demo username | Demo password |
| --- | --- | --- |
| Administrator | `demo-admin` | `ChangeMe-2026!` |
| Learner | `demo-user-1`, `demo-user-2`, `demo-user-3` | `ChangeMe-2026!` |

These credentials are public demo data. Replace them before deployment.

### 2. Configure Your Local Environment

Run this command from the project root:

```powershell
Copy-Item backend/config/application-local.example.yml backend/config/application-local.yml
```

Edit the new file with your own database URL, username, and password. The AI feature requires your own API key; other learning and management features remain available without it. This local file is ignored by Git, is stored outside the source resources directory, and is not packaged into the backend JAR.

To keep credentials entirely outside the project directory, the Windows launchers also read `%USERPROFILE%/.cybersecurity-training/application-local.yml`. Copy the configuration template there and fill it in, or set `CYBERSECURITY_CONFIG_DIR` to another external directory. The default location uses the ordinary user profile directory to avoid AppData redirection differences between editor processes and desktop launches. Startup logs are written to `logs/startup.log` in that external directory and are not included in the published source.

You can also use the `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `AI_API_KEY` environment variables. The AI integration uses a DeepSeek-compatible API format. Its endpoint and model settings are in `backend/src/main/resources/application.yml`.

Initialize and configure the database before the first launch. The launcher checks for missing configuration, an unreachable MySQL host or port, and a missing admin build. Passing Maven tests does not mean that the database is ready.

### 3. Build the Admin Dashboard

Switch to Node.js 14 and run these commands from the project root:

```powershell
cd admin-web
npm ci --no-optional
npm run build
cd ..
```

The build is generated in `admin-web/dist`. You can also run `npm run serve` from the `admin-web` directory to start the admin development server.

### 4. Start the Backend

Build the package from the project root, then start it from the `backend` directory so Spring Boot can load `config/application-local.yml`:

```powershell
mvn -f backend/pom.xml clean package
cd backend
java -jar target/cybersecurityknowledge-0.0.1-SNAPSHOT.jar
```

- API check: `http://localhost:8080/cybersecurityknowledge/config/list`
- Admin dashboard: `http://localhost:8080/cybersecurityknowledge/admin/dist/index.html#/login`

On Windows, you can also double-click the launcher BAT files in the project root. They use Node.js, Java, and Maven from your PATH; start MySQL separately. The scripts use port 8080 by default, so stop any conflicting project instance before launching. After changing the admin frontend, rebuild it before packaging the backend again.

The [admin launcher](%E5%90%AF%E5%8A%A8%E7%AE%A1%E7%90%86%E5%90%8E%E5%8F%B0.bat) checks that the service is available, then opens your default browser. Use this launcher to view the admin dashboard. The [backend launcher](%E5%90%AF%E5%8A%A8%E5%90%8E%E7%AB%AF.bat) starts the API and prints its address without opening a browser. Each new launch window displays its timestamp and project directory so it can be distinguished from an older failure window.

### 5. Run the WeChat Mini Program

To try the compiled build, configure and start the database and backend as described above, then import `wechat-miniapp` into WeChat Developer Tools. The bundled configuration uses a guest AppID; replace it with your own AppID if required for debugging. The client connects to `http://localhost:8080/cybersecurityknowledge/` by default.

To modify the source:

1. Open `miniapp` in HBuilderX and enter your own AppID in `manifest.json`.
2. Check the backend URL in `miniapp/api/base.js`. On a physical phone, `localhost` refers to the phone itself; use an address the device can reach.
3. Run the project in the WeChat Mini Program simulator from HBuilderX.
4. Run `npm --prefix tools run sync:wechat` from the project root to synchronize the compiled output to `wechat-miniapp`.

The synchronization tool preserves local developer settings. The public compiled directory is tracked in this repository, while private settings such as `project.private.config.json` and `.env.local` remain ignored. Before committing again, review AppIDs and debug parameters and retain only settings suitable for public demonstrations.

## Checks and Tests

Switch to Node.js 18 or later:

```powershell
npm --prefix tools ci
npm --prefix tools run check
npm --prefix tools test
mvn -f backend/pom.xml test
```

See the [release verification record](docs/RELEASE_CHECK.md) for the results recorded for this release copy. The existing regression tests do not establish that every business logic defect has been fixed.

## Publishing and Assets

- [Publishing to GitHub](docs/PUBLISHING.md)
- [Third-party components and licensing](THIRD_PARTY_NOTICES.md)
- [Images, videos, and asset production notes](docs/ASSETS.md)

Review staged files before uploading. Do not commit private local configuration, actual user uploads, database exports, or logs.
