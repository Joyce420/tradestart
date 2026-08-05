# TradeStart（外贸起步）

TradeStart 外贸出口学习与创业导航平台的桌面端 UI 原型。本仓库由 Google Stitch 导出的 4 个页面整理而成，用于确认视觉方向和信息结构。

## 页面

- `index.html`：首页
- `roadmap.html`：外贸路线图
- `calculator.html`：出口利润计算器
- `plan.html`：出口方案向导

## 本地预览

直接打开 `index.html`，或在仓库目录运行：

```bash
python3 -m http.server 8080
```

然后访问 <http://localhost:8080>。

## 当前前端功能

- 首页主要按钮与四页导航可以正常跳转
- 利润计算器支持实时计算、币种显示切换、高级成本折叠、示例载入、重置和保存
- 路线图支持供应商记录、小测验、节点完成状态和总体进度保存
- 出口方案支持添加/删除竞品、校验必填项、保存草稿和同步预览
- 当前数据使用浏览器 `localStorage` 本地保存，尚未连接后端数据库

## 当前阶段

这是前端交互原型。页面中的示例数据仅用于学习与功能演示，不应视为真实交易、物流、税务或报价结果。

设计规范见 [`docs/DESIGN.md`](docs/DESIGN.md)，原始页面截图位于 `docs/screenshots/`。
