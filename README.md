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

## 当前阶段

这是纯前端 UI 原型，四个主页面之间已可互相跳转。利润计算、学习进度、表单保存等业务交互尚未实现，后续前端开发应基于原始 PRD 补齐，不应把页面中的静态示例数据当作真实计算结果。

设计规范见 [`docs/DESIGN.md`](docs/DESIGN.md)，原始页面截图位于 `docs/screenshots/`。
