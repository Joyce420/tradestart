(function () {
  const roadmapNodes = [
    {
      title: "选择业务模式", icon: "storefront", duration: "10分钟",
      goal: "先确定你要服务什么客户，再决定产品、报价和渠道怎么设计。",
      knowledge: [["B2B 出口", "面向海外企业或批发商，重点看 MOQ、报价和长期合作。"], ["跨境电商", "面向海外消费者，重点看平台、广告、履约和退货。"], ["选择原则", "结合你的供应链资源、预算、经验和可投入时间做取舍。"]],
      terms: [["B2B", "企业对企业"], ["B2C", "企业对消费者"], ["MOQ", "最小起订量"]],
      steps: ["列出你能接触到的供应链资源", "比较 B2B 与跨境电商的投入和风险", "写下你选择的模式及一个理由"],
      example: "同一款保温杯，B2B 可能按 500 件起批报价；跨境电商则需要考虑单件发货、广告和退货。",
      playbook: [
        { title: "先看两条真实路线", body: "B2B：从中国采购一批货，主动联系海外批发商，一次谈几百件；跨境电商：把商品放到 Amazon、TikTok Shop 等平台，逐个服务消费者。", action: "先想想你更愿意做大订单，还是愿意运营店铺、内容和广告。" },
        { title: "用三个问题做选择", body: "你是否有稳定供应链？能否接受主动找客户？是否愿意处理单件发货、广告和退货？前两个更偏向 B2B，后一个更偏向跨境电商。", action: "资金有限、没有品牌、想先验证大订单时，建议先选 B2B 出口。" },
        { title: "把选择写成一句话", body: "不要只写“我选 B2B”。请写清楚客户是谁、你为什么选它，以及你准备先做什么。", action: "例如：我先做 B2B，因为我能找到工厂，也愿意主动联系美国批发商。" },
      ],
      outcome: "完成后你应该得到：一条明确路线（B2B 或跨境电商）和一个能解释清楚的选择理由。",
      task: "先看两个真实场景，再在实践记录中选择路线并写下理由。",
    },
    {
      title: "选择商品与供应商", icon: "inventory_2", duration: "15分钟",
      goal: "确定核心类目，筛选高潜力商品，建立初步供应商清单。",
      knowledge: [["选品逻辑", "利润空间、体积重量比（影响运费）、合规性（认证要求）。"], ["供应商类型", "OEM/ODM、源头工厂、贸易商各有不同的灵活度和起订量。"], ["初步筛选", "不要只看低价，还要核对 MOQ、交期、样品和定制能力。"]],
      terms: [["MOQ", "最小起订量"], ["OEM", "按要求代工生产"], ["ODM", "基于现有方案贴牌"]],
      steps: ["基于自身资源或兴趣，划定 2—3 个初步品类", "在 Alibaba、1688 等平台筛选供应商", "获取阶梯报价并记录 MOQ、交期和样品信息"],
      example: "先用普通不锈钢保温杯做练习，比带电池、App 或复杂认证的智能产品更适合新手验证流程。",
      playbook: [
        { title: "去这四个地方找候选商品", body: "1688 看国内货源和采购价；Alibaba 看出口型供应商；Amazon 看海外正在卖什么；Google Trends 看搜索需求趋势。今天不用定终身赛道，只找 3 个候选商品。", action: "打开 1688、Alibaba 或 Amazon，分别记下 3 个你愿意进一步研究的商品。", links: [["打开 1688", "https://www.1688.com/"], ["打开 Alibaba", "https://www.alibaba.com/"], ["打开 Google Trends", "https://trends.google.com/trends/"]], searches: ["保温杯", "运动水壶", "insulated water bottle manufacturer"] },
        { title: "用新手筛选器淘汰一半产品", body: "优先选择小、轻、不易碎、不带电、不过期、供应商多、能做出一点差异化的商品。电池、食品、化妆品、医疗、超大件和易碎品先放到后面。", action: "给 3 个候选商品各打勾：体积小吗？不带电吗？容易寄样吗？至少保留 1 个。" },
        { title: "用准确关键词找供应商", body: "不要只搜“批发”。在 1688 搜“保温杯 源头工厂”，在 Alibaba 搜“insulated water bottle manufacturer”。先打开 5 家供应商页面，记录工厂类型、MOQ、起订价和是否支持定制。", action: "从 5 家中留下 3 家，不要因为最低价就直接下单。", searches: ["保温杯 源头工厂", "保温杯 定制 logo", "insulated water bottle manufacturer"] },
        { title: "复制这段话询价", body: "联系供应商不是只问“How much?”，要一次问清数量、阶梯价、样品、包装和交期。", action: "复制下面的询价内容发给至少 3 家供应商。", template: "你好，我想采购不锈钢保温杯出口到美国。请提供 100/500/1000 件的阶梯报价、MOQ、样品费和样品寄出时间；另外请告知是否支持印 Logo、包装方式、生产周期，以及 EXW 和 FOB 价格。谢谢。" },
        { title: "先拿样，再决定小批量", body: "样品是为了验证质量，不是走过场。检查材质、尺寸、密封防漏、保温效果、包装、Logo 和实物是否与描述一致。样品合格后再谈小批量试单。", action: "在实践记录中写下 1 家首选供应商、MOQ、单价和你要验证的问题。" },
      ],
      outcome: "完成后你应该得到：3 个候选商品、3 家候选供应商、1 段已准备好的询价内容，以及一个下一步拿样计划。",
      task: "按上面的 5 步操作，先列 3 个候选商品，再记录至少 1 家供应商、MOQ、单价和你最关心的问题。",
    },
    {
      title: "研究目标市场", icon: "public", duration: "15分钟",
      goal: "选出一个具体国家和客户群，不再笼统地说“卖到海外”。",
      knowledge: [["市场范围", "先从一个国家或区域开始，明确语言、消费习惯和法规。"], ["客户画像", "写清客户是谁、在什么场景使用、为什么愿意购买。"], ["需求验证", "通过平台搜索、趋势和竞品评论验证需求，而不是只凭感觉。"]],
      terms: [["ICP", "理想客户画像"], ["TAM", "理论市场总量"], ["痛点", "客户愿意付费解决的问题"]],
      steps: ["选择一个目标国家或区域", "描述一个具体客户群和使用场景", "记录 3 条来自平台或评论的需求证据"],
      example: "不要只写“美国人”。可以进一步缩小为美国户外用品批发商、健身用品店或企业礼品采购商。",
      playbook: [
        { title: "先比较 2—3 个国家", body: "在 Amazon 搜同类商品，观察评论数量、价格和卖点；再用 Google Trends 比较不同国家的搜索趋势。先选一个国家练习，不必一开始覆盖全球。", action: "例如比较美国、英国、澳大利亚，记录价格、评论和趋势的差异。", links: [["打开 Amazon", "https://www.amazon.com/"], ["打开 Google Trends", "https://trends.google.com/trends/"]], searches: ["stainless steel water bottle", "insulated water bottle wholesale"] },
        { title: "把客户写具体", body: "“海外消费者”太宽泛。把客户写成能被你找到的对象：户外用品批发商、健身用品店、企业礼品采购商或运动用品经销商。", action: "写清楚客户类型、使用场景和可能的采购数量。" },
        { title: "从评论和差评找需求", body: "打开竞品页面，重点看 3—4 星评论和差评，记录客户反复提到的问题。客户愿意付钱解决的问题，才是有效需求。", action: "记录至少 3 条证据，例如防漏、保温时间、容量、可定制 Logo。" },
        { title: "形成一张市场结论卡", body: "把国家、客户和需求放在一起，避免只写抽象的市场结论。", action: "例如：目标国家美国；客户是户外用品批发商；核心需求是防漏、耐用、可定制。" },
      ],
      outcome: "完成后你应该得到：一个目标国家、一类具体客户和至少 3 条来自搜索或评论的需求证据。",
      task: "按步骤比较国家、客户和评论，记录目标国家、目标客户画像和一个已验证的购买需求。",
    },
    {
      title: "选择获客渠道", icon: "campaign", duration: "12分钟",
      goal: "选一条能持续获得客户的渠道，并明确第一步怎么触达。",
      knowledge: [["B2B 平台", "适合承接主动询盘，但需要完整产品资料和快速报价。"], ["主动开发", "通过邮件、展会或社媒寻找目标客户，重点是相关性。"], ["内容获客", "用案例、测评和场景内容建立信任，再引导客户咨询。"]],
      terms: [["RFQ", "采购询价"], ["Lead", "潜在客户线索"], ["USP", "独特卖点"]],
      steps: ["根据客户类型选择一个主渠道", "准备一段产品介绍和核心卖点", "列出首批 5 个潜在客户或发布主题"],
      example: "面向海外批发商时，可以先用 B2B 平台承接询盘，再用目录、样品和报价表推动下一步。",
      playbook: [
        { title: "只选一条主渠道开始", body: "B2B 平台适合接询盘；主动开发适合你已经知道目标客户是谁；内容获客适合长期建立信任。第一版不要同时做四件事。", action: "新手做 B2B 时，先从 B2B 平台或主动开发中选择一个。" },
        { title: "先找 5 个潜在客户，而不是发 100 封邮件", body: "客户必须和你的产品匹配。卖保温杯时，可以搜索户外用品批发商、企业礼品采购商、健身用品店或运动用品经销商。", action: "写下 5 个可能的客户来源或公司名称，并注明他们为什么可能需要你的产品。", searches: ["outdoor products wholesaler USA", "corporate gift supplier USA", "fitness equipment distributor"] },
        { title: "发一封短而具体的首封信息", body: "首封信息的目标不是立即成交，而是确认对方是否愿意看产品资料或样品。只说明你是谁、产品是什么、能提供什么差异化。", action: "把产品、目标客户和一个卖点填进下面的模板后再发送。", template: "Hi [Name],\n\nI am [Your Name] from a China supplier of [Product]. We support [one clear benefit, such as custom logo / leak-proof design / low MOQ]. I noticed your company serves [customer type]. Would you be open to reviewing a short catalog or sample?\n\nBest regards,\n[Your Name]" },
      ],
      outcome: "完成后你应该得到：一条主获客渠道、5 个潜在客户来源，以及一段可以修改后发送的首封信息。",
      task: "选择一条主获客渠道，记录首批 5 个潜在客户来源，并准备一段首封信息。",
    },
    {
      title: "核算价格与利润", icon: "payments", duration: "15分钟",
      goal: "把采购、物流、平台和营销成本放在一起，算出可接受的报价。",
      knowledge: [["完整成本", "采购价之外，还要考虑包装、国内段、国际段、佣金和收款费用。"], ["报价空间", "报价不能只覆盖成本，还要留出利润、议价和风险空间。"], ["敏感项", "重量、运费、汇率和退货率变化都会影响最终利润。"]],
      terms: [["FOB", "装运港船上交货"], ["Margin", "利润率"], ["Break-even", "盈亏平衡点"]],
      steps: ["整理每件商品的成本项", "用利润计算器试算不同售价", "记录一个目标利润率和最低可接受报价"],
      example: "销售价看起来很高，但如果国际运费占售价 30%，单件利润可能仍然很薄。",
      playbook: [
        { title: "先把完整成本找齐", body: "采购价只是开始。还要加入包装、国内运到仓或港口、国际运输、平台或收款手续费、营销和可能的退款损耗。", action: "先向供应商和货代拿到真实价格；不确定的成本可以先填估算值，并在备注中标出来。" },
        { title: "用计算器试三个售价", body: "不要只算一个价格。分别试保守价、目标价和高价，观察单件利润、总利润和运费占比。", action: "如果运费占售价太高，先考虑组合装、提高客单价或换更适合批量运输的方案。", links: [["打开利润计算器", "calculator.html"]] },
        { title: "确定两条底线", body: "目标利润率是你希望得到的回报；最低可接受报价是你不会再往下让的价格。两者可以随着运费和数量变化调整。", action: "把目标利润率和最低报价填入实践记录，后续报价时以它们为参考。" },
      ],
      outcome: "完成后你应该得到：一套完整成本假设、一个目标利润率和一个不会低于成本的最低报价。",
      task: "在利润计算器完成一次测算，记录目标利润率、最低可接受报价和最不确定的成本项。",
    },
    {
      title: "收款、物流与报关", icon: "local_shipping", duration: "18分钟",
      goal: "确定交易条款、收款方式和运输路径，避免报价时漏掉关键成本。",
      knowledge: [["收款方式", "T/T、L/C 和平台收款的风险、手续费与到账速度不同。"], ["运输方式", "空运更快，海运更适合批量；快递适合样品和小包裹。"], ["报关资料", "品名、数量、金额、HS Code 和商业发票需要保持一致。"]],
      terms: [["CIF", "成本、保险费加运费"], ["DDP", "完税后交货"], ["HS Code", "海关商品编码"]],
      steps: ["选择一个适合订单规模的运输方式", "确认报价使用的 Incoterms", "列出报关和收款所需资料"],
      example: "样品可以先用 DHL、FedEx 或 UPS；小批量再比较空运专线；大货通常让货代比较海运拼箱或整柜。",
      playbook: [
        { title: "先按订单阶段选运输", body: "样品：国际快递，速度快、适合一两件；小批量：空运或专线，平衡速度和成本；大货：海运，单位成本低但周期更长。", action: "先判断你现在是在寄样品、小批量试单，还是准备发大货。" },
        { title: "新手直接找货代询价", body: "货代可以帮你比较运输方式、订舱、报关和目的地派送。你需要告诉货代产品、箱数、重量、体积、起运地、目的地和是否带电。", action: "不要只问“运费多少”，先把这 6 项信息准备好。", template: "你好，我有一批不锈钢保温杯需要从中国发到美国。产品不带电，共 __ 箱，每箱 __ 个，单箱重量 __ kg，尺寸 __ cm，起运地 __，目的地邮编 __。请分别报价快递、空运和海运，并说明运输时效、是否含报关和目的地费用。" },
        { title: "理解贸易术语再报价", body: "EXW 通常只到工厂；FOB 包含送到装运港并完成出口交付；CIF 还包含国际运费和保险；DDP 通常包含完税后送达。新手报价前要确认自己负责到哪一步。", action: "先在实践记录中选一个术语，不要在不清楚费用范围时随便承诺 DDP。" },
        { title: "准备最基本的文件", body: "常见文件包括商业发票、装箱单、合同或 PI，以及与商品对应的 HS Code。品名、数量和金额要保持一致；具体要求以货代和目的地规则为准。", action: "先列出你需要准备的文件，再让货代确认是否还需要其他资料。" },
      ],
      outcome: "完成后你应该得到：一个适合当前订单阶段的运输方式、一个明确的贸易术语，以及一段可以直接发给货代的询价内容。",
      task: "按订单阶段选择运输方式，写下贸易术语和主要单据，并准备一段货代询价内容。",
    },
    {
      title: "客户沟通与订单履约", icon: "outbox", duration: "15分钟",
      goal: "把询盘转成清晰订单，并按约定完成生产、质检和交付。",
      knowledge: [["确认需求", "规格、数量、包装、交期和付款条件必须写进确认文件。"], ["质量控制", "样品确认、生产抽检和出货前验货能减少争议。"], ["交付跟踪", "给客户明确节点，及时同步异常和预计到达时间。"]],
      terms: [["PI", "形式发票"], ["QC", "质量控制"], ["Lead time", "生产交期"]],
      steps: ["整理询盘和报价确认清单", "约定样品、生产和验货节点", "建立订单异常和客户通知记录"],
      example: "客户确认 500 件后，先用 PI 固定规格、付款和交期，再安排样品和批量生产。",
      playbook: [
        { title: "客户说“要下单”后，先确认 8 件事", body: "产品规格、数量、单价、Logo、包装、付款条件、交期、运输方式，这些没有确认清楚就不要开始生产。", action: "先从中选 3 项填入实践记录；真实订单时应逐项确认。" },
        { title: "用 PI 固定双方共识", body: "PI（形式发票）可以写清产品、数量、金额、付款方式、交期和贸易术语。它不是装饰，而是减少后续误解的确认文件。", action: "在收到定金或开始生产前，让客户确认 PI 中的关键信息。" },
        { title: "生产中主动报进度", body: "至少同步三个节点：样品确认、生产完成 / 验货、发货信息。出现延误或质量问题时，先说明事实、影响和解决方案。", action: "为订单写一个简单时间线，避免客户必须反复追问。" },
      ],
      outcome: "完成后你应该得到：一份订单确认清单，以及从样品、生产到发货的沟通时间线。",
      task: "写下订单中必须确认的 3 项信息，并补充交期或异常处理方式。",
    },
    {
      title: "售后、复盘与规模化", icon: "query_stats", duration: "12分钟",
      goal: "从一次订单中找到问题和增长机会，让下一单更稳定。",
      knowledge: [["售后处理", "先确认事实、责任和解决方案，再记录重复出现的问题。"], ["关键指标", "关注成交率、准时交付率、利润率、复购和客诉。"], ["规模化", "把有效的供应商、渠道和流程沉淀成可复制方法。"]],
      terms: [["RMA", "退换货授权"], ["Repeat order", "复购订单"], ["KPI", "关键指标"]],
      steps: ["收集客户反馈和订单数据", "找出一个最需要改进的环节", "写下下一单要保留和要改变的做法"],
      example: "如果客户反复反馈包装破损，下一单可以从加固包装、改进验货和调整运输方式入手。",
      playbook: [
        { title: "先回看实际结果", body: "订单结束后，比较实际利润和原先测算：采购、运费、退款、样品、包装有没有超预算？客户是否准时收到货？", action: "只找一项差距最大的成本或问题，不需要一次复盘所有内容。" },
        { title: "把客户反馈变成行动", body: "客户说漏水、包装破损、交期慢，都不是一句“下次注意”。要写成可以交给供应商或货代执行的改进动作。", action: "例如：下一单增加内衬；出货前做防漏抽检；提前 7 天锁定舱位。" },
        { title: "保留一个关键指标", body: "第一版只跟踪一个最有用的指标即可，例如准时交付率、实际利润率、客诉次数或复购率。", action: "在实践记录中写下你要跟踪的指标和下一单必须改进的一件事。" },
      ],
      outcome: "完成后你应该得到：一次订单的核心复盘结论、一个要持续跟踪的指标和一项下一单改进行动。",
      task: "对比实际结果和预期，写下一个 KPI 以及下一单必须改进的事项。",
    },
  ];

  const formSchemas = {
    1: [
      { key: "businessMode", label: "业务模式", type: "select", required: true, options: ["B2B 出口", "跨境电商"], placeholder: "请选择业务模式" },
      { key: "reason", label: "选择理由", type: "textarea", required: true, placeholder: "用一两句话说明为什么选择这个模式" },
      { key: "notes", label: "额外备注", type: "textarea", placeholder: "可补充你的资源、预算或顾虑" },
    ],
    2: [
      { key: "category", label: "核心品类", type: "text", required: true, placeholder: "例如：智能保温杯" },
      { key: "candidateProducts", label: "候选商品清单（建议写 3 个）", type: "textarea", placeholder: "例如：普通不锈钢保温杯、运动水壶、企业礼品杯" },
      { key: "notes", label: "最关心的问题 / 额外备注", type: "textarea", placeholder: "例如：想确认供应商的定制能力和样品费用" },
    ],
    3: [
      { key: "targetMarket", label: "目标国家或区域", type: "text", required: true, placeholder: "例如：美国西海岸" },
      { key: "customerProfile", label: "目标客户画像", type: "textarea", required: true, placeholder: "一句话描述客户是谁、在什么场景使用" },
      { key: "verifiedDemand", label: "已验证的购买需求", type: "textarea", required: true, placeholder: "写下你从搜索、评论或询盘中看到的需求" },
      { key: "evidence", label: "证据来源 / 额外备注", type: "textarea", placeholder: "可填写平台链接、评论关键词或调研备注" },
    ],
    4: [
      { key: "leadChannel", label: "主获客渠道", type: "select", required: true, options: ["B2B 平台", "主动开发", "内容获客", "展会 / 行业社群"], placeholder: "请选择主渠道" },
      { key: "firstTouch", label: "首批触达方式或客户来源", type: "textarea", required: true, placeholder: "例如：从 Alibaba 询盘中筛选 5 家批发商" },
      { key: "usp", label: "核心卖点 / 额外备注", type: "textarea", placeholder: "可填写准备使用的产品卖点" },
    ],
    5: [
      { key: "targetMargin", label: "目标利润率", type: "number", required: true, min: 0, max: 100, suffix: "%", placeholder: "例如：20" },
      { key: "minimumQuote", label: "最低可接受报价", type: "number", required: true, min: 0, suffix: "USD / 件", placeholder: "例如：18.5" },
      { key: "costNotes", label: "成本相关备注", type: "textarea", placeholder: "可填写测算中最不确定的成本项" },
    ],
    6: [
      { key: "transportMethod", label: "运输方式", type: "select", required: true, options: ["快递", "空运", "海运", "铁路 / 专线"], placeholder: "请选择运输方式" },
      { key: "incoterm", label: "贸易术语", type: "select", required: true, options: ["EXW", "FOB", "CIF", "DDP"], placeholder: "请选择 Incoterms" },
      { key: "documents", label: "需要准备的主要单据", type: "checkboxes", required: true, options: ["商业发票", "装箱单", "合同 / PI", "报关资料 / HS Code", "原产地证"] },
      { key: "notes", label: "额外说明", type: "textarea", placeholder: "可补充收款方式或特殊运输要求" },
    ],
    7: [
      { key: "orderInfo1", label: "订单关键信息 1", type: "text", required: true, placeholder: "例如：产品规格与包装" },
      { key: "orderInfo2", label: "订单关键信息 2", type: "text", required: true, placeholder: "例如：数量、单价与付款条件" },
      { key: "orderInfo3", label: "订单关键信息 3", type: "text", required: true, placeholder: "例如：交期、验货与交付方式" },
      { key: "fulfillmentNotes", label: "交期或异常处理备注", type: "textarea", placeholder: "可写下你准备如何同步订单进度" },
    ],
    8: [
      { key: "kpi", label: "要跟踪的关键指标（KPI）", type: "text", required: true, placeholder: "例如：准时交付率、利润率、复购率" },
      { key: "nextImprovement", label: "下一单准备改进的事项", type: "textarea", required: true, placeholder: "写下一个具体、可执行的改进动作" },
      { key: "reviewNotes", label: "额外复盘备注", type: "textarea", placeholder: "可补充客户反馈或本次订单的经验" },
    ],
  };

  document.addEventListener("DOMContentLoaded", () => {
    const rawState = TradeStart.get("roadmapProgress", { completed: [], notes: {}, answers: {}, quizScore: 0, supplierNotes: "" });
    const state = normalizeState(rawState);
    TradeStart.set("roadmapProgressVersion", 3);

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

    function emptyAnswer(nodeId) {
      const answer = {};
      (formSchemas[nodeId] || []).forEach((field) => { answer[field.key] = field.type === "checkboxes" ? [] : ""; });
      if (nodeId === 2) answer.suppliers = [{ name: "", moq: "", unitPrice: "", notes: "" }];
      return answer;
    }

    function hasValue(value) {
      if (Array.isArray(value)) return value.some((item) => hasValue(item));
      if (value && typeof value === "object") return Object.values(value).some((item) => hasValue(item));
      return String(value ?? "").trim() !== "";
    }

    function hasAnswerContent(answer) {
      return Boolean(answer && hasValue(answer));
    }

    function normalizeState(input) {
      const next = input && typeof input === "object" ? { ...input } : {};
      next.completed = Array.isArray(next.completed) ? [...new Set(next.completed.map(Number).filter((node) => node >= 1 && node <= roadmapNodes.length))] : [];
      next.notes = next.notes && typeof next.notes === "object" ? { ...next.notes } : {};
      next.answers = next.answers && typeof next.answers === "object" ? { ...next.answers } : {};
      if (next.supplierNotes && !next.notes[2]) next.notes[2] = next.supplierNotes;

      for (let nodeId = 1; nodeId <= roadmapNodes.length; nodeId += 1) {
        const answer = next.answers[nodeId] && typeof next.answers[nodeId] === "object" ? { ...next.answers[nodeId] } : emptyAnswer(nodeId);
        if (nodeId === 2) {
          answer.suppliers = Array.isArray(answer.suppliers) && answer.suppliers.length ? answer.suppliers.map((supplier) => ({
            name: String(supplier?.name || ""), moq: String(supplier?.moq || ""), unitPrice: String(supplier?.unitPrice || ""), notes: String(supplier?.notes || ""),
          })) : [{ name: "", moq: "", unitPrice: "", notes: "" }];
        }
        if (!answer.notes && next.notes[nodeId]) answer.notes = String(next.notes[nodeId]);
        next.answers[nodeId] = answer;
        next.notes[nodeId] = String(answer.notes || next.notes[nodeId] || "");
      }

      // 旧版本只有一段自由文本：保留到 notes，但不再把它误判为已完成。
      next.completed = next.completed.filter((nodeId) => getMissingFields(nodeId, next.answers[nodeId]).length === 0);
      next.supplierNotes = next.answers[2]?.notes || next.notes[2] || "";
      return next;
    }

    function getMissingFields(nodeId, answer) {
      const missing = [];
      const fields = formSchemas[nodeId] || [];
      fields.forEach((field) => {
        if (!field.required) return;
        const value = answer?.[field.key];
        if (field.type === "checkboxes" && (!Array.isArray(value) || value.length === 0)) missing.push(field.label);
        else if (!hasValue(value)) missing.push(field.label);
        else if (field.type === "number" && (Number.isNaN(Number(value)) || Number(value) < field.min || (field.max != null && Number(value) > field.max))) missing.push(`${field.label}（请输入 ${field.max != null ? `${field.min}—${field.max}` : `${field.min} 以上`}）`);
      });
      if (nodeId === 2) {
        const suppliers = Array.isArray(answer?.suppliers) ? answer.suppliers : [];
        const completeSuppliers = suppliers.filter((supplier) => [supplier?.name, supplier?.moq, supplier?.unitPrice].every(hasValue));
        if (!completeSuppliers.length) missing.push("至少 1 家完整供应商（名称、MOQ、单价）");
        suppliers.forEach((supplier, index) => {
          if (hasValue(supplier) && ![supplier?.name, supplier?.moq, supplier?.unitPrice].every(hasValue)) missing.push(`第 ${index + 1} 家供应商信息`);
        });
      }
      return missing;
    }

    function save() {
      state.notes = Object.fromEntries(Object.entries(state.answers).map(([nodeId, answer]) => [nodeId, String(answer?.notes || "")]));
      state.supplierNotes = state.answers[2]?.notes || "";
      TradeStart.set("roadmapProgress", state);
      return TradeStartData.saveRoadmap(state);
    }

    function renderNodes() {
      nodes.forEach((node, index) => {
        const position = index + 1;
        const item = roadmapNodes[index];
        const completed = state.completed.includes(position);
        const active = selectedNode === position;
        const answer = state.answers[position];
        const statusText = completed ? "已完成" : hasAnswerContent(answer) ? `进行中 (${item.duration})` : `未开始 (${item.duration})`;
        node.className = `flex flex-row md:flex-col items-center md:items-center text-left md:text-center relative group w-full md:w-32 cursor-pointer ${active ? "" : "opacity-70 hover:opacity-100"}`;
        node.innerHTML = `<div class="w-14 h-14 rounded-full ${completed ? "bg-primary-fixed border-primary text-primary" : active ? "bg-surface border-secondary text-secondary ring-4 ring-secondary-container/30" : "bg-surface border-border text-on-surface-variant"} border-2 flex items-center justify-center mb-0 md:mb-3 z-10 shadow-sm shrink-0"><span class="${completed ? "material-symbols-outlined" : "font-headline-sm text-headline-sm"}">${completed ? "check" : position}</span></div><div class="ml-4 md:ml-0 flex-grow"><div class="font-label-caps text-label-caps ${active ? "text-secondary" : "text-on-surface-variant"} mb-1">节点 ${position}</div><h3 class="font-body-sm text-body-sm font-${active ? "bold" : "medium"} text-primary mb-1">${escapeHtml(item.title)}</h3><div class="flex items-center md:justify-center gap-1 ${completed ? "text-success" : active ? "text-secondary" : "text-on-surface-variant"}"><span class="material-symbols-outlined text-[14px]">${completed ? "check_circle" : active && hasAnswerContent(answer) ? "timelapse" : "schedule"}</span><span class="font-body-sm text-[12px]">${statusText}</span></div></div>`;
        node.onclick = () => selectNode(position);
      });
    }

    function renderContent() {
      const item = roadmapNodes[selectedNode - 1];
      const answer = state.answers[selectedNode] || emptyAnswer(selectedNode);
      const completed = state.completed.includes(selectedNode);
      const missing = getMissingFields(selectedNode, answer);
      title.textContent = item.title;
      icon.textContent = item.icon;
      goal.textContent = item.goal;
      example.textContent = item.example;
      knowledge.innerHTML = item.knowledge.map(([label, text]) => `<li class="flex items-start gap-2"><span class="material-symbols-outlined text-secondary text-[16px] mt-0.5">check_circle</span><div><strong>${escapeHtml(label)}：</strong>${escapeHtml(text)}</div></li>`).join("");
      terms.innerHTML = item.terms.map(([term, explanation]) => `<div class="bg-surface p-2 rounded border border-border flex justify-between items-center"><span class="font-label-caps text-primary font-bold">${escapeHtml(term)}</span><span class="text-body-sm text-on-surface-variant">${escapeHtml(explanation)}</span></div>`).join("");
      const playbook = item.playbook || item.steps.map((step) => ({ title: step, body: "按这一步完成你的实践记录。" }));
      steps.innerHTML = `<div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border"></div>${playbook.map((step, index) => {
        const links = (step.links || []).map(([label, href]) => `<a class="inline-flex items-center gap-1 text-secondary hover:underline" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined text-[14px]">open_in_new</span>${escapeHtml(label)}</a>`).join("<span class=\"text-outline-variant\">·</span>");
        const searches = step.searches?.length ? `<div class="mt-3 flex flex-wrap items-center gap-2"><span class="text-[12px] font-bold text-primary">可以直接搜索：</span>${step.searches.map((term) => `<span class="rounded-full bg-surface px-2.5 py-1 text-[12px] text-on-surface-variant border border-border">${escapeHtml(term)}</span>`).join("")}</div>` : "";
        const template = step.template ? `<div class="mt-3 rounded-md border border-secondary/20 bg-surface p-3"><div class="flex items-center justify-between gap-2 mb-2"><span class="text-[12px] font-bold text-primary">可复制模板</span><button type="button" data-copy-template="${escapeHtml(step.template)}" class="rounded border border-border bg-surface px-2 py-1 text-[12px] text-secondary hover:bg-surface-container-low">复制</button></div><p class="m-0 whitespace-pre-line text-[13px] leading-6 text-on-surface-variant">${escapeHtml(step.template)}</p></div>` : "";
        return `<div class="relative"><div class="absolute -left-[27px] w-5 h-5 rounded-full bg-surface border-2 ${index === 0 ? "border-secondary" : "border-border"} flex items-center justify-center">${index === 0 ? '<div class="w-1.5 h-1.5 rounded-full bg-secondary"></div>' : ""}</div><div class="rounded-lg border border-border bg-surface-bright p-4"><h4 class="font-body-sm font-bold text-primary mb-2">${index + 1}. ${escapeHtml(step.title)}</h4><p class="text-body-sm leading-6 text-on-surface-variant mb-2">${escapeHtml(step.body)}</p>${step.action ? `<div class="rounded-md bg-primary-fixed/50 px-3 py-2 text-[13px] leading-5 text-on-primary-fixed-variant"><strong class="text-primary">现在做：</strong>${escapeHtml(step.action)}</div>` : ""}${searches}${links ? `<div class="mt-3 flex flex-wrap items-center gap-2 text-[13px]"><span class="font-bold text-primary">打开工具：</span>${links}</div>` : ""}${template}</div></div>`;
      }).join("")}${item.outcome ? `<div class="relative mt-2 rounded-lg border border-secondary/30 bg-secondary/5 p-4"><span class="material-symbols-outlined absolute -left-[28px] top-4 text-secondary text-[18px]">flag</span><p class="m-0 text-body-sm leading-6 text-primary"><strong>完成成果：</strong>${escapeHtml(item.outcome.replace(/^完成后你应该得到：/, ""))}</p></div>` : ""}`;
      steps.querySelectorAll("[data-copy-template]").forEach((button) => {
        button.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(button.dataset.copyTemplate || "");
            TradeStart.toast("模板已复制，可以粘贴给供应商或货代");
          } catch (_error) {
            TradeStart.toast("复制失败，请手动选择模板文字", "warning");
          }
        });
      });
      task.textContent = item.task;
      taskButton.textContent = hasAnswerContent(answer) ? "编辑实践记录" : "填写实践记录";
      markComplete.disabled = completed;
      completionHint.textContent = completed ? "你已完成这个节点，可以继续查看其他节点。" : missing.length ? (hasAnswerContent(answer) ? `已填写部分内容，还差：${missing.slice(0, 2).join("、")}${missing.length > 2 ? "等" : ""}。` : "填写全部必填项后即可标记完成。") : "必填项已完成，现在可以标记节点完成。";
      markComplete.innerHTML = `<span class="material-symbols-outlined text-[18px]">check_circle</span> ${completed ? "已完成本节点" : "标记完成"}`;
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

    const inputStyle = "box-sizing:border-box;width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#102a43;font-size:14px;outline:none";
    const labelStyle = "display:block;font-size:14px;font-weight:600;color:#102a43;margin-bottom:6px";
    const fieldStyle = "margin-bottom:16px";

    function renderField(field, value) {
      const requiredMark = field.required ? '<span style="color:#d64545"> *</span>' : "";
      const label = `<label style="${labelStyle}">${escapeHtml(field.label)}${requiredMark}</label>`;
      if (field.type === "textarea") return `<div style="${fieldStyle}">${label}<textarea data-field="${escapeHtml(field.key)}" rows="3" style="${inputStyle};resize:vertical" placeholder="${escapeHtml(field.placeholder || "")}">${escapeHtml(value || "")}</textarea></div>`;
      if (field.type === "select") return `<div style="${fieldStyle}">${label}<select data-field="${escapeHtml(field.key)}" style="${inputStyle}"><option value="">${escapeHtml(field.placeholder || "请选择")}</option>${field.options.map((option) => `<option value="${escapeHtml(option)}" ${String(value || "") === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></div>`;
      if (field.type === "checkboxes") return `<fieldset data-fieldset="${escapeHtml(field.key)}" style="${fieldStyle};border:0;padding:0;margin-left:0"><legend style="${labelStyle}">${escapeHtml(field.label)}${requiredMark}</legend><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">${field.options.map((option) => `<label style="display:flex;align-items:center;gap:7px;font-size:14px;color:#243b53"><input type="checkbox" value="${escapeHtml(option)}" ${(Array.isArray(value) && value.includes(option)) ? "checked" : ""}>${escapeHtml(option)}</label>`).join("")}</div></fieldset>`;
      const numberAttrs = field.type === "number" ? `type="number" min="${field.min}" max="${field.max}" step="0.01"` : 'type="text"';
      return `<div style="${fieldStyle}">${label}<div style="position:relative"><input data-field="${escapeHtml(field.key)}" ${numberAttrs} value="${escapeHtml(value || "")}" style="${inputStyle};padding-right:${field.suffix ? "90px" : "12px"}" placeholder="${escapeHtml(field.placeholder || "")}">${field.suffix ? `<span style="position:absolute;right:12px;top:10px;color:#829ab1;font-size:13px">${escapeHtml(field.suffix)}</span>` : ""}</div></div>`;
    }

    function renderSupplierRows(container, suppliers) {
      const rows = Array.isArray(suppliers) && suppliers.length ? suppliers : [{ name: "", moq: "", unitPrice: "", notes: "" }];
      container.innerHTML = rows.map((supplier, index) => `<div data-supplier-row style="border:1px solid #d9e2ec;border-radius:10px;padding:12px;margin-bottom:10px;background:#f8fafc"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><strong style="font-size:14px;color:#102a43">供应商 ${index + 1}</strong><button type="button" data-remove-supplier="${index}" style="border:0;background:transparent;color:#829ab1;cursor:pointer;font-size:13px">${rows.length > 1 ? "删除" : "清空"}</button></div><div style="display:grid;grid-template-columns:1.3fr .8fr .8fr;gap:8px"><input data-supplier="name" value="${escapeHtml(supplier?.name || "")}" style="${inputStyle}" placeholder="供应商名称"><input data-supplier="moq" value="${escapeHtml(supplier?.moq || "")}" type="number" min="0" step="1" style="${inputStyle}" placeholder="MOQ"><input data-supplier="unitPrice" value="${escapeHtml(supplier?.unitPrice || "")}" type="number" min="0" step="0.01" style="${inputStyle}" placeholder="单价（USD）"></div><input data-supplier="notes" value="${escapeHtml(supplier?.notes || "")}" style="${inputStyle};margin-top:8px" placeholder="可选：交期、样品或定制备注"></div>`).join("");
    }

    function readForm(dialog, nodeId) {
      const answer = emptyAnswer(nodeId);
      (formSchemas[nodeId] || []).forEach((field) => {
        if (field.type === "checkboxes") answer[field.key] = Array.from(dialog.querySelectorAll(`[data-fieldset="${field.key}"] input:checked`)).map((input) => input.value);
        else answer[field.key] = String(dialog.querySelector(`[data-field="${field.key}"]`)?.value || "").trim();
      });
      if (nodeId === 2) {
        answer.category = String(dialog.querySelector('[data-field="category"]')?.value || "").trim();
        answer.suppliers = Array.from(dialog.querySelectorAll("[data-supplier-row]")).map((row) => ({
          name: String(row.querySelector('[data-supplier="name"]')?.value || "").trim(),
          moq: String(row.querySelector('[data-supplier="moq"]')?.value || "").trim(),
          unitPrice: String(row.querySelector('[data-supplier="unitPrice"]')?.value || "").trim(),
          notes: String(row.querySelector('[data-supplier="notes"]')?.value || "").trim(),
        }));
      }
      return answer;
    }

    function openTaskDialog() {
      const item = roadmapNodes[selectedNode - 1];
      const answer = state.answers[selectedNode] || emptyAnswer(selectedNode);
      const dialog = document.createElement("dialog");
      dialog.style.cssText = "width:min(680px,calc(100% - 32px));max-height:calc(100vh - 40px);border:0;border-radius:16px;padding:0;box-shadow:0 24px 80px rgba(16,42,67,.25);color:#102a43";
      const fields = (formSchemas[selectedNode] || []).map((field) => renderField(field, answer[field.key])).join("");
      const supplierBlock = selectedNode === 2 ? `<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><label style="${labelStyle};margin:0">候选供应商 <span style="color:#d64545">*</span></label><button type="button" data-add-supplier style="border:1px solid #9fb3c8;border-radius:7px;padding:6px 10px;background:#fff;color:#006a63;cursor:pointer;font-size:13px">＋ 添加供应商</button></div><p style="font-size:12px;color:#627d98;margin:0 0 10px">至少填写 1 家，最多添加 3 家；每家需要名称、MOQ 和单价。</p><div data-suppliers></div></div>` : "";
      const nodeTwoFields = selectedNode === 2
        ? `${renderField(formSchemas[2][0], answer.category)}${renderField(formSchemas[2][1], answer.candidateProducts)}${supplierBlock}${renderField(formSchemas[2][2], answer.notes)}`
        : fields;
      dialog.innerHTML = `<form method="dialog" data-roadmap-form style="padding:24px;max-height:calc(100vh - 40px);overflow:auto;font-family:'Noto Sans SC',sans-serif"><div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:8px"><div><h2 style="font-size:22px;font-weight:700;margin:0 0 8px">节点 ${selectedNode} 实践记录</h2><p style="margin:0 0 18px;color:#627d98;font-size:14px;line-height:1.6">${escapeHtml(item.task)}</p></div><button type="button" data-cancel aria-label="关闭" style="border:0;background:transparent;color:#627d98;font-size:25px;line-height:1;cursor:pointer">×</button></div>${nodeTwoFields}<div style="display:flex;justify-content:flex-end;gap:12px;margin-top:22px;padding-top:16px;border-top:1px solid #e5e7eb"><button value="cancel" type="button" data-cancel-secondary style="padding:10px 18px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#243b53;cursor:pointer">取消</button><button value="confirm" type="submit" style="padding:10px 18px;border:0;border-radius:8px;background:#006a63;color:#fff;font-weight:600;cursor:pointer">保存记录</button></div></form>`;
      document.body.appendChild(dialog);
      if (selectedNode === 2) {
        const suppliers = dialog.querySelector("[data-suppliers]");
        renderSupplierRows(suppliers, answer.suppliers);
        dialog.querySelector("[data-add-supplier]").addEventListener("click", () => {
          const current = Array.from(dialog.querySelectorAll("[data-supplier-row]")).map((row) => ({
            name: row.querySelector('[data-supplier="name"]')?.value || "", moq: row.querySelector('[data-supplier="moq"]')?.value || "", unitPrice: row.querySelector('[data-supplier="unitPrice"]')?.value || "", notes: row.querySelector('[data-supplier="notes"]')?.value || "",
          }));
          if (current.length >= 3) { TradeStart.toast("最多添加 3 家供应商", "warning"); return; }
          current.push({ name: "", moq: "", unitPrice: "", notes: "" });
          renderSupplierRows(suppliers, current);
          bindSupplierRemove();
        });
        function bindSupplierRemove() {
          dialog.querySelectorAll("[data-remove-supplier]").forEach((button) => {
            button.onclick = () => {
              const rows = Array.from(dialog.querySelectorAll("[data-supplier-row]")).map((row) => ({
                name: row.querySelector('[data-supplier="name"]')?.value || "", moq: row.querySelector('[data-supplier="moq"]')?.value || "", unitPrice: row.querySelector('[data-supplier="unitPrice"]')?.value || "", notes: row.querySelector('[data-supplier="notes"]')?.value || "",
              }));
              if (rows.length === 1) rows[0] = { name: "", moq: "", unitPrice: "", notes: "" };
              else rows.splice(Number(button.dataset.removeSupplier), 1);
              renderSupplierRows(suppliers, rows);
              bindSupplierRemove();
            };
          });
        }
        bindSupplierRemove();
      }
      dialog.querySelectorAll("[data-cancel], [data-cancel-secondary]").forEach((button) => button.addEventListener("click", () => dialog.close("cancel")));
      dialog.addEventListener("close", () => dialog.remove());
      dialog.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const nextAnswer = readForm(dialog, selectedNode);
        state.answers[selectedNode] = nextAnswer;
        state.notes[selectedNode] = String(nextAnswer.notes || "");
        if (getMissingFields(selectedNode, nextAnswer).length && state.completed.includes(selectedNode)) state.completed = state.completed.filter((node) => node !== selectedNode);
        try { await save(); TradeStart.toast("实践记录已保存"); } catch (error) { console.warn("路线图记录保存失败", error); TradeStart.toast("记录已保存在当前浏览器", "warning"); }
        render();
        dialog.close("confirm");
      });
      dialog.showModal();
    }

    taskButton.addEventListener("click", openTaskDialog);
    markComplete.addEventListener("click", async () => {
      const missing = getMissingFields(selectedNode, state.answers[selectedNode]);
      if (missing.length) { TradeStart.toast(`请先填写：${missing.slice(0, 2).join("、")}${missing.length > 2 ? "等必填项" : ""}`, "warning"); return; }
      if (!state.completed.includes(selectedNode)) state.completed.push(selectedNode);
      try { await save(); TradeStart.toast(`节点 ${selectedNode} 已完成，进度已保存`); } catch (error) { console.warn("学习进度保存失败", error); TradeStart.toast(`节点 ${selectedNode} 已完成，已保存在当前浏览器`, "warning"); }
      render();
    });
    document.getElementById("previous-node").addEventListener("click", () => selectNode(selectedNode - 1));
    document.getElementById("next-node").addEventListener("click", () => selectNode(selectedNode + 1));

    render();
  });
})();
