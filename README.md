# TradeStart（外贸起步）

TradeStart 是面向外贸零基础用户的交互式练习网站。用户按顺序完成商品与买家、一单简化算账、联系客户与方案三步，已填写的信息会在四个页面间自动带入。

## 四个页面

- `index.html`：课程地图和练习进度
- `roadmap.html`：第一步，确定练习商品、目标地区、可能的买家和买家需求
- `calculator.html`：第二步，使用可修改的练习数字计算简化成本
- `plan.html`：第三步，生成客户联系草稿并汇总练习方案

四页共用 `assets/course.css` 和 `assets/course.js`，顶部导航和步骤导航均可切换页面。输入内容和完成进度保存在浏览器 `localStorage` 的 `tradestart-course-v1` 项中。

## 本地预览

在仓库目录运行：

```bash
python3 -m http.server 8080
```

然后访问 <http://localhost:8080>。

## 分享网站

仓库配置了 GitHub Pages 自动发布工作流。将改动合入 `main` 后，GitHub Actions 会发布静态网站，预期网址为 <https://joyce420.github.io/tradestart/>。首次发布前，请在仓库 Settings → Pages 中确认发布来源为 GitHub Actions；发布完成后可在 Actions 的部署记录中打开网站。

## 练习范围与限制

- 页面预填内容和金额是练习示例，可修改，不是市场数据或真实报价。
- 简化算账仅计算售价减商品、包装和运送估算，不包含税费、平台费、收款费、汇率、退货等所有实际成本。
- 真实的商品准入、税费、物流费用和交易条款，需按商品及目的地另行核实。
- 目前没有账户、跨设备同步、云端数据库或客户消息发送功能；数据只保存在当前浏览器。
- 早期原型脚本保留在 `assets/` 中，但不再由当前四个页面加载。
