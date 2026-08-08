(function () {
  const roadmapNodes = [
    {
      title: "选择业务模式", icon: "storefront", duration: "10分钟",
      goal: "先确定你要服务什么客户，再决定产品、报价和渠道怎么设计。",
      knowledge: [["B2B 出口", "面向海外企业或批发商，重点看 MOQ、报价和长期合作。"], ["跨境电商", "面向海外消费者，重点看平台、广告、履约和退货。"], ["选择原则", "结合你的供应链资源、预算、经验和可投入时间做取舍。"]],
      terms: [["B2B", "企业对企业"], ["B2C", "企业对消费者"], ["MOQ", "最小起订量"]],
      steps: ["列出你能接触到的供应链资源", "比较 B2B 与跨境电商的投入和风险", "写下你选择的模式及一个理由"],
      example: "同一款保温杯，B2B 可能按 500 件起批报价；跨境电商则需要考虑单件发货、广告和退货。",
      task: "写下你更想尝试的模式（B2B 或跨境电商）以及选择理由。",
    },
    {
      title: "选择商品与供应商", icon: "inventory_2", duration: "15分钟",
      goal: "确定核心类目，筛选高潜力商品，建立初步供应商清单。",
      knowledge: [["选品逻辑", "利润空间、体积重量比（影响运费）、合规性（认证要求）。"], ["供应商类型", "OEM/ODM、源头工厂、贸易商各有不同的灵活度和起订量。"], ["初步筛选", "不要只看低价，还要核对 MOQ、交期、样品和定制能力。"]],
      terms: [["MOQ", "最小起订量"], ["OEM", "按要求代工生产"], ["ODM", "基于现有方案贴牌"]],
      steps: ["基于自身资源或兴趣，划定 2—3 个初步品类", "在 Alibaba、1688 等平台筛选供应商", "获取阶梯报价并记录 MOQ、交期和样品信息"],
      example: "智能保温杯准备出口时，不要只看采购价，还要同时比较 MOQ、体积重量和供应商的定制能力。",
      task: "记录至少 1 家候选供应商、MOQ、单价和你最关心的一个问题。",
    },
    {
      title: "研究目标市场", icon: "public", duration: "15分钟",
      goal: "选出一个具体国家和客户群，不再笼统地说“卖到海外”。",
      knowledge: [["市场范围", "先从一个国家或区域开始，明确语言、消费习惯和法规。"], ["客户画像", "写清客户是谁、在什么场景使用、为什么愿意购买。"], ["需求验证", "通过平台搜索、趋势和竞品评论验证需求，而不是只凭感觉。"]],
      terms: [["ICP", "理想客户画像"], ["TAM", "理论市场总量"], ["痛点", "客户愿意付费解决的问题"]],
      steps: ["选择一个目标国家或区域", "描述一个具体客户群和使用场景", "记录 3 条来自平台或评论的需求证据"],
      example: "保温杯可以先聚焦美国户外通勤人群，再判断他们更看重保温时长、容量还是便携性。",
      task: "写下目标国家、目标客户和一个已验证的购买需求。",
    },
    {
      title: "选择获客渠道", icon: "campaign", duration: "12分钟",
      goal: "选一条能持续获得客户的渠道，并明确第一步怎么触达。",
      knowledge: [["B2B 平台", "适合承接主动询盘，但需要完整产品资料和快速报价。"], ["主动开发", "通过邮件、展会或社媒寻找目标客户，重点是相关性。"], ["内容获客", "用案例、测评和场景内容建立信任，再引导客户咨询。"]],
      terms: [["RFQ", "采购询价"], ["Lead", "潜在客户线索"], ["USP", "独特卖点"]],
      steps: ["根据客户类型选择一个主渠道", "准备一段产品介绍和核心卖点", "列出首批 5 个潜在客户或发布主题"],
      example: "面向海外批发商时，可以先用 B2B 平台承接询盘，再用目录、样品和报价表推动下一步。",
      task: "选择一个主渠道，并写出你准备触达的第一批客户来源。",
    },
    {
      title: "核算价格与利润", icon: "payments", duration: "15分钟",
      goal: "把采购、物流、平台和营销成本放在一起，算出可接受的报价。",
      knowledge: [["完整成本", "采购价之外，还要考虑包装、国内段、国际段、佣金和收款费用。"], ["报价空间", "报价不能只覆盖成本，还要留出利润、议价和风险空间。"], ["敏感项", "重量、运费、汇率和退货率变化都会影响最终利润。"]],
      terms: [["FOB", "装运港船上交货"], ["Margin", "利润率"], ["Break-even", "盈亏平衡点"]],
      steps: ["整理每件商品的成本项", "用利润计算器试算不同售价", "记录一个目标利润率和最低可接受报价"],
      example: "销售价看起来很高，但如果国际运费占售价 30%，单件利润可能仍然很薄。",
      task: "在利润计算器中完成一次测算，并记录你的目标利润率。",
    },
    {
      title: "收款、物流与报关", icon: "local_shipping", duration: "18分钟",
      goal: "确定交易条款、收款方式和运输路径，避免报价时漏掉关键成本。",
      knowledge: [["收款方式", "T/T、L/C 和平台收款的风险、手续费与到账速度不同。"], ["运输方式", "空运更快，海运更适合批量；快递适合样品和小包裹。"], ["报关资料", "品名、数量、金额、HS Code 和商业发票需要保持一致。"]],
      terms: [["CIF", "成本、保险费加运费"], ["DDP", "完税后交货"], ["HS Code", "海关商品编码"]],
      steps: ["选择一个适合订单规模的运输方式", "确认报价使用的 Incoterms", "列出报关和收款所需资料"],
      example: "样品可以先用快递，小批量订单再比较空运专线和海运拼箱的单位成本。",
      task: "为你的商品写下一种运输方式、一个贸易术语和需要准备的一份单据。",
    },
    {
      title: "客户沟通与订单履约", icon: "outbox", duration: "15分钟",
      goal: "把询盘转成清晰订单，并按约定完成生产、质检和交付。",
      knowledge: [["确认需求", "规格、数量、包装、交期和付款条件必须写进确认文件。"], ["质量控制", "样品确认、生产抽检和出货前验货能减少争议。"], ["交付跟踪", "给客户明确节点，及时同步异常和预计到达时间。"]],
      terms: [["PI", "形式发票"], ["QC", "质量控制"], ["Lead time", "生产交期"]],
      steps: ["整理询盘和报价确认清单", "约定样品、生产和验货节点", "建立订单异常和客户通知记录"],
      example: "客户确认 500 件后，先用 PI 固定规格、付款和交期，再安排样品和批量生产。",
      task: "写出你的订单中必须确认的 3 项信息。",
    },
    {
      title: "售后、复盘与规模化", icon: "query_stats", duration: "12分钟",
      goal: "从一次订单中找到问题和增长机会，让下一单更稳定。",
      knowledge: [["售后处理", "先确认事实、责任和解决方案，再记录重复出现的问题。"], ["关键指标", "关注成交率、准时交付率、利润率、复购和客诉。"], ["规模化", "把有效的供应商、渠道和流程沉淀成可复制方法。"]],
      terms: [["RMA", "退换货授权"], ["Repeat order", "复购订单"], ["KPI", "关键指标"]],
      steps: ["收集客户反馈和订单数据", "找出一个最需要改进的环节", "写下下一单要保留和要改变的做法"],
      example: "如果客户反复反馈包装破损，下一单可以从加固包装、改进验货和调整运输方式入手。",
      task: "写下一个你会跟踪的指标，以及下一单准备改进的事项。",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const state = TradeStart.get("roadmapProgress", { completed: [], notes: {}, quizScore: 0, supplierNotes: "" });
    state.completed = Array.isArray(state.completed) ? state.completed.map(Number).filter((node) => node >= 1 && node <= roadmapNodes.length) : [];
    state.notes = state.notes && typeof state.notes === "object" ? state.notes : {};
    if (state.supplierNotes && !state.notes[2]) state.notes[2] = state.supplierNotes;
    const migrationVersion = TradeStart.get("roadmapProgressVersion", 0);
    if (migrationVersion < 2 && state.completed.includes(1) && !state.notes[1]) {
      state.completed = state.completed.filter((node) => node !== 1);
    }
    TradeStart.set("roadmapProgressVersion", 2);

    const nodes = Array.from(document.querySelectorAll("#roadmap-nodes > .cursor-pointer"));
    const progressText = document.getElementById("roadmap-progress-text");
    const completedText = document.getElementById("roadmap-completed-text");
    const progressBar = document.getElementById("roadmap-progress-bar");
    const title = document.getElementById("node-title");
    const icon = document.getElementById("node-icon");
    const goal = document.getElementById("node-goal");
    const example = document.getElementById("node-example");
    const knowledge = document.getElementById("node-knowledge");
    const terms = document.getElementById("node-terms");
    const steps = document.getElementById("node-steps");
    const task = document.getElementById("node-task");
    const taskButton = document.getElementById("supplier-record");
    const completionHint = document.getElementById("completion-hint");
    const markComplete = document.getElementById("mark-complete");
    let selectedNode = 1;

    function escapeHtml(value) {
      return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function save() {
      state.supplierNotes = state.notes[2] || "";
      TradeStart.set("roadmapProgress", state);
      return TradeStartData.saveRoadmap(state);
    }

    function renderNodes() {
      nodes.forEach((node, index) => {
        const position = index + 1;
        const item = roadmapNodes[index];
        const completed = state.completed.includes(position);
        const active = selectedNode === position;
        node.className = `flex flex-row md:flex-col items-center md:items-center text-left md:text-center relative group w-full md:w-32 cursor-pointer ${active ? "" : "opacity-70 hover:opacity-100"}`;
        node.innerHTML = `<div class="w-14 h-14 rounded-full ${completed ? "bg-primary-fixed border-primary text-primary" : active ? "bg-surface border-secondary text-secondary ring-4 ring-secondary-container/30" : "bg-surface border-border text-on-surface-variant"} border-2 flex items-center justify-center mb-0 md:mb-3 z-10 shadow-sm shrink-0"><span class="${completed ? "material-symbols-outlined" : "font-headline-sm text-headline-sm"}">${completed ? "check" : position}</span></div><div class="ml-4 md:ml-0 flex-grow"><div class="font-label-caps text-label-caps ${active ? "text-secondary" : "text-on-surface-variant"} mb-1">节点 ${position}</div><h3 class="font-body-sm text-body-sm font-${active ? "bold" : "medium"} text-primary mb-1">${escapeHtml(item.title)}</h3><div class="flex items-center md:justify-center gap-1 ${completed ? "text-success" : active ? "text-secondary" : "text-on-surface-variant"}"><span class="material-symbols-outlined text-[14px]">${completed ? "check_circle" : active ? "timelapse" : "schedule"}</span><span class="font-body-sm text-[12px]">${completed ? "已完成" : state.notes[position] ? `学习中 (${item.duration})` : `未开始 (${item.duration})`}</span></div></div>`;
        node.addEventListener("click", () => selectNode(position));
      });
    }

    function renderContent() {
      const item = roadmapNodes[selectedNode - 1];
      const note = String(state.notes[selectedNode] || "");
      const completed = state.completed.includes(selectedNode);
      title.textContent = item.title;
      icon.textContent = item.icon;
      goal.textContent = item.goal;
      example.textContent = item.example;
      knowledge.innerHTML = item.knowledge.map(([label, text]) => `<li class="flex items-start gap-2"><span class="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span><div><strong>${escapeHtml(label)}：</strong>${escapeHtml(text)}</div></li>`).join("");
      terms.innerHTML = item.terms.map(([term, explanation]) => `<div class="bg-surface p-2 rounded border border-border flex justify-between items-center"><span class="font-label-caps text-primary font-bold">${escapeHtml(term)}</span><span class="text-body-sm text-on-surface-variant">${escapeHtml(explanation)}</span></div>`).join("");
      steps.innerHTML = `<div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border"></div>${item.steps.map((step, index) => `<div class="relative"><div class="absolute -left-[27px] w-5 h-5 rounded-full bg-surface border-2 ${index === 0 ? "border-secondary" : "border-border"} flex items-center justify-center">${index === 0 ? '<div class="w-1.5 h-1.5 rounded-full bg-secondary"></div>' : ""}</div><p class="text-body-sm text-on-surface-variant"><strong class="text-primary">${index + 1}.</strong> ${escapeHtml(step)}</p></div>`).join("")}`;
      task.textContent = item.task;
      taskButton.textContent = note ? "编辑实践记录" : "填写实践记录";
      completionHint.textContent = completed ? "你已完成这个节点，可以继续查看其他节点。" : note ? "已填写实践记录，现在可以标记完成。" : "填写实践记录后即可标记完成。";
      markComplete.disabled = completed;
      markComplete.innerHTML = `<span class="material-symbols-outlined text-[18px]">${completed ? "check_circle" : "check_circle"}</span> ${completed ? "已完成本节点" : "标记完成"}`;
      markComplete.classList.toggle("opacity-70", completed);
      markComplete.classList.toggle("cursor-not-allowed", completed);
    }

    function render() {
      const completedCount = new Set(state.completed).size;
      const percent = (completedCount / roadmapNodes.length) * 100;
      progressText.textContent = `总体进度 ${percent.toFixed(1)}%`;
      completedText.textContent = `已完成 ${completedCount}/${roadmapNodes.length} 个节点`;
      progressBar.style.width = `${percent}%`;
      renderNodes();
      renderContent();
    }

    function selectNode(position) {
      selectedNode = Math.min(roadmapNodes.length, Math.max(1, position));
      render();
      document.querySelector("section.bg-surface.rounded-xl")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function openTaskDialog() {
      const item = roadmapNodes[selectedNode - 1];
      const dialog = document.createElement("dialog");
      dialog.style.cssText = "width:min(560px,calc(100% - 32px));border:0;border-radius:16px;padding:0;box-shadow:0 24px 80px rgba(16,42,67,.25)";
      dialog.innerHTML = `<form method="dialog" style="padding:24px;font-family:'Noto Sans SC',sans-serif;color:#102a43"><h2 style="font-size:22px;font-weight:700;margin:0 0 8px">节点 ${selectedNode} 实践记录</h2><p style="margin:0 0 16px;color:#627d98;font-size:14px">${escapeHtml(item.task)}</p><textarea data-note rows="7" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;resize:vertical" placeholder="写下你的结论、数据或下一步行动">${escapeHtml(state.notes[selectedNode] || "")}</textarea><div style="display:flex;justify-content:flex-end;gap:12px;margin-top:22px"><button value="cancel" type="button" data-cancel style="padding:10px 18px;border:1px solid #cbd5e1;border-radius:8px;background:#fff">取消</button><button value="confirm" type="submit" style="padding:10px 18px;border:0;border-radius:8px;background:#006a63;color:#fff;font-weight:600">保存记录</button></div></form>`;
      document.body.appendChild(dialog);
      dialog.querySelector("[data-cancel]").addEventListener("click", () => dialog.close("cancel"));
      dialog.addEventListener("close", () => dialog.remove());
      dialog.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();
        state.notes[selectedNode] = dialog.querySelector("[data-note]").value.trim();
        try { await save(); TradeStart.toast("实践记录已保存"); } catch (error) { console.warn("路线图记录保存失败", error); TradeStart.toast("记录已保存在当前浏览器", "warning"); }
        render();
        dialog.close("confirm");
      });
      dialog.showModal();
    }

    taskButton.addEventListener("click", openTaskDialog);
    markComplete.addEventListener("click", async () => {
      if (!String(state.notes[selectedNode] || "").trim()) { TradeStart.toast("请先填写实践记录", "warning"); return; }
      if (!state.completed.includes(selectedNode)) state.completed.push(selectedNode);
      try { await save(); TradeStart.toast(`节点 ${selectedNode} 已完成，进度已保存`); } catch (error) { console.warn("学习进度保存失败", error); TradeStart.toast(`节点 ${selectedNode} 已完成，已保存在当前浏览器`, "warning"); }
      render();
    });
    document.getElementById("previous-node").addEventListener("click", () => selectNode(selectedNode - 1));
    document.getElementById("next-node").addEventListener("click", () => selectNode(selectedNode + 1));

    render();
  });
})();
