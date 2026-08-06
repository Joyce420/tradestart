# TradeStart P0 后端实施方案

版本：v1.0  
状态：待确认后实施  
依据：《外贸出口学习与创业导航平台 PRD v1.0》与当前四页前端原型

## 1. 结论

当前阶段采用 **GitHub Pages 静态前端 + Supabase 托管后端**，不立即迁移 Next.js。

原因：

- 保留已经完成并上线的四个 HTML 页面；
- Supabase 同时提供 PostgreSQL、邮箱登录、数据 API 与服务端 Edge Functions；
- 浏览器只使用可公开的 Publishable Key，所有业务表开启 RLS；
- 账户注销和其他需要高权限的操作放入 Edge Functions，Secret Key 不进入前端或 GitHub；
- 后续如果迁移 Next.js，PostgreSQL 数据和业务模型仍可继续使用。

## 2. 本阶段范围

### 第一批接入现有四页

1. 邮箱 + 密码注册、登录、退出；
2. 游客继续使用本地数据；
3. 登录后询问是否把本地数据同步到云端；
4. 路线图进度、小测验结果和供应商记录云端保存；
5. 利润计算记录命名、保存、读取和删除；
6. 出口方案与竞品分析草稿云端保存；
7. 用户只能读取和修改自己的数据；
8. 提供账户注销能力。

### 后续 P0 页面

- 目标诊断；
- 8 个学习节点与至少 8 篇核心课程；
- 术语库；
- 7 天实战挑战；
- 项目方案汇总；
- 我的工作台；
- 基础管理后台；
- 反馈入口与基础埋点。

### 明确不做

- AI 助手、AI 开发信；
- 在线支付或真实订单；
- 实时运价、实时汇率；
- 买卖双方撮合和即时通讯；
- 公开分享链接、Markdown 导出（PRD 中为 P1）；
- 社区、多语言、移动端 App。

## 3. 技术架构

```text
GitHub Pages
  └─ HTML + Tailwind + JavaScript
       ├─ Supabase Auth：邮箱密码登录
       ├─ Supabase Data API：普通 CRUD
       └─ Supabase Edge Functions：账户注销等高权限操作

Supabase
  ├─ PostgreSQL
  ├─ Row Level Security
  ├─ Auth
  └─ Edge Functions
```

前端继续保留 `localStorage` 作为游客临时存储。用户登录后由同步服务执行一次合并，成功后以云端数据为准。

## 4. 数据库设计

所有主键使用 UUID；金额使用最小货币单位整数，例如美分和人民币分；时间统一使用 `timestamptz`。

### 4.1 用户与权限

| 表 | 核心字段 | 说明 |
|---|---|---|
| `profiles` | `id`、`display_name`、`created_at`、`updated_at` | `id` 对应 `auth.users.id` |
| `user_roles` | `user_id`、`role` | `user / editor / admin`，普通用户不可修改 |
| `diagnostic_results` | `id`、`user_id`、`answers_json`、`result_json`、`created_at` | 保留诊断历史，最新一条作为当前推荐 |

### 4.2 学习内容与进度

| 表 | 核心字段 | 说明 |
|---|---|---|
| `learning_paths` | `id`、`name`、`target_type`、`description`、`status` | 学习路线 |
| `modules` | `id`、`path_id`、`title`、`sort_order`、`estimated_minutes`、`status` | 8 个流程节点 |
| `lessons` | `id`、`module_id`、`title`、`content_json`、`difficulty`、`status`、`published_at` | 课程正文与结构化内容 |
| `quizzes` | `id`、`lesson_id`、`question`、`options_json`、`answer_json`、`explanation`、`sort_order` | 题目与答案 |
| `user_progress` | `user_id`、`module_id`、`lesson_id`、`status`、`score`、`task_json`、`updated_at` | 用户学习进度，建立唯一约束避免重复 |
| `glossary_terms` | `id`、`cn_name`、`en_name`、`abbreviation`、`definition`、`example`、`related_terms_json`、`status` | 术语库 |

### 4.3 计算与项目

| 表 | 核心字段 | 说明 |
|---|---|---|
| `calculations` | `id`、`user_id`、`name`、`currency`、`input_json`、`result_json`、`created_at`、`updated_at` | 保存完整公式输入和结果 |
| `challenge_projects` | `id`、`user_id`、`title`、`product_name`、`market`、`status`、`created_at`、`updated_at` | 7 天挑战项目 |
| `challenge_tasks` | `id`、`project_id`、`day_number`、`content_json`、`status`、`completed_at` | Day 1—7，`project_id + day_number` 唯一 |
| `project_competitors` | `id`、`project_id`、`name`、`platform`、`price_minor`、`currency`、`pros`、`cons`、`differentiation` | 当前出口方案页的竞品数据 |

### 4.4 内容、反馈与埋点

| 表 | 核心字段 | 说明 |
|---|---|---|
| `articles` | `id`、`title`、`category`、`content_json`、`status`、`updated_at` | 案例、FAQ 等内容 |
| `feedback` | `id`、`user_id`、`page`、`type`、`content`、`status`、`created_at` | 反馈，可允许游客提交但需要限流 |
| `analytics_events` | `id`、`user_id`、`anonymous_id`、`event_name`、`properties_json`、`created_at` | 只记录 PRD 中定义的基础事件 |

## 5. 权限与安全

### 游客

- 可读取 `published` 状态的路线、课程、术语和文章；
- 不可直接写入用户业务表；
- 计算、进度和方案暂存在浏览器。

### 注册用户

- 只能读取和修改 `user_id = auth.uid()` 的进度、计算和项目；
- 只能修改属于自己项目下的任务和竞品；
- 不可修改角色、课程、题目或已发布内容。

### 编辑与管理员

- 角色保存于受保护的 `user_roles` 表；
- 编辑可维护内容，管理员可维护角色和反馈状态；
- 前端不出现 Secret Key；高权限操作通过 Edge Function 执行。

### 必须落实

- 所有公开 schema 表开启 RLS；
- 前端只放 Supabase URL 与 Publishable Key；
- Secret Key 仅保存在 Supabase 服务端环境；
- 输入长度、数字范围、枚举和 JSON 结构需要前后端双重校验；
- 公开渲染用户文本时使用 `textContent`，避免 XSS；
- 账户注销调用 Edge Function，并在执行前二次确认。

## 6. 前端服务接口

不在浏览器中散落数据库调用，统一放入 `assets/services/`：

```text
assets/services/
├── supabase-client.js
├── auth-service.js
├── sync-service.js
├── progress-service.js
├── calculation-service.js
├── project-service.js
└── content-service.js
```

接口职责：

| 服务 | 方法 |
|---|---|
| Auth | 注册、登录、退出、获取会话、注销账户 |
| Sync | 检测本地数据、显示同步确认、幂等合并、同步成功后标记 |
| Progress | 获取进度、保存节点状态、保存测验分数和实践记录 |
| Calculation | 列表、创建、重命名、删除计算记录 |
| Project | 创建项目、保存任务、保存竞品、读取汇总 |
| Content | 获取已发布路线、课程、题目、术语和文章 |

## 7. 本地数据同步规则

1. 游客使用现有 `localStorage`，不强制注册；
2. 登录成功后检测本地是否存在进度、计算和方案；
3. 有数据时弹出“同步到账号 / 暂不同步”；
4. 进度采用更高完成状态；
5. 计算记录采用新增并通过本地生成的 UUID 去重；
6. 项目草稿按 `updated_at` 较新者覆盖；
7. 同步接口必须幂等，重复执行不产生重复记录；
8. 云端保存成功后才写入本地同步标记，不自动删除本地备份。

## 8. 分阶段实施

### B1：后端地基

- 创建 Supabase 开发项目；
- 建立数据库迁移、种子数据和 RLS；
- 完成邮箱密码注册、登录、退出和会话恢复；
- 建立 `.env.example`，真实密钥不进入 Git。

验收：用户 A 无法读取用户 B 数据；未登录用户无法写用户表；公开内容可读取。

### B2：接入现有四页

- 路线图进度云同步；
- 计算记录 CRUD；
- 出口方案与竞品草稿 CRUD；
- 登录后的本地数据迁移确认。

验收：换浏览器登录后能恢复数据；重复同步不产生重复记录；离线时仍可继续使用本地功能。

### B3：补齐 P0 学习与挑战

- 目标诊断；
- 8 个节点、课程和术语库；
- 7 天任务；
- 项目方案汇总。

验收：新用户能从诊断走到完成首份出口方案。

### B4：工作台与管理

- 我的工作台；
- 内容编辑与发布；
- 反馈入口；
- 基础埋点。

验收：编辑可维护内容但不能管理用户角色；管理员可处理反馈；普通用户无后台权限。

### B5：质量与上线

- 权限测试、公式测试、输入校验；
- 错误、空状态和无权限状态；
- 生产项目和开发项目分离；
- README、迁移、种子和回滚说明。

## 9. 开始实施前需要确认

1. 后端采用 Supabase，不立即迁移 Next.js；
2. 登录采用“邮箱 + 密码”；
3. 第一批只接入现有四页，不同时新增诊断、课程中心和后台 UI；
4. 游客数据继续本地保存，登录后由用户确认是否同步；
5. 开发阶段先创建 Supabase 免费项目，生产项目在正式发布前单独创建。

