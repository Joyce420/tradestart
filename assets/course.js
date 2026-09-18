(() => {
  const KEY = 'tradestart-course-v1';
  const defaults = {
    product: '不锈钢保温杯', destination: '新加坡（练习示例）', buyer: '办公用品零售商',
    need: '给员工准备耐用、方便携带的日常用品', salePrice: 68, unitCost: 28,
    packing: 3, shipping: 12, quantity: 100, contactName: '您好', contactDraft: '',
    contactEdited: false, completed: { product: false, profit: false, contact: false }
  };
  let state = { ...defaults };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') state = { ...state, ...saved, completed: { ...defaults.completed, ...(saved.completed || {}) } };
    else {
      const prior = JSON.parse(localStorage.getItem('tradestart-first-order-practice-v1') || 'null');
      if (prior && typeof prior === 'object') {
        state = { ...state, ...prior, contactDraft: prior.contact || '', completed: {
          product: Array.isArray(prior.completed) && prior.completed.includes(0),
          profit: Array.isArray(prior.completed) && prior.completed.includes(1),
          contact: Array.isArray(prior.completed) && prior.completed.includes(2)
        } };
      } else {
        const oldRoadmap = JSON.parse(localStorage.getItem('tradestart.roadmapProgress') || 'null');
        const oldPlan = JSON.parse(localStorage.getItem('tradestart.planDraft') || 'null');
        const answers = oldRoadmap?.answers || {};
        const sourcing = answers[2] || {};
        const market = answers[3] || {};
        const oldContext = oldPlan?.projectContext || {};
        const product = sourcing.category || oldContext.productName;
        const destination = market.targetMarket || oldContext.targetMarket;
        const buyer = market.customerProfile || oldContext.customerProfile;
        const need = market.marketConclusion || sourcing.notes;
        if (product) state.product = product;
        if (destination) state.destination = destination;
        if (buyer) state.buyer = buyer;
        if (need) state.need = need;
      }
    }
  } catch (_) { /* Use the clearly labelled sample exercise. */ }

  const page = document.body.dataset.page || 'home';
  const names = { home: '课程地图', roadmap: '商品与买家', calculator: '一单算账', plan: '联系客户与方案' };
  const order = ['roadmap', 'calculator', 'plan'];
  const stepKey = { roadmap: 'product', calculator: 'profit', plan: 'contact' };
  const version = '?course=20260918';
  const links = { home: `index.html${version}`, roadmap: `roadmap.html${version}`, calculator: `calculator.html${version}`, plan: `plan.html${version}` };
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const n = (key) => { const value = Number(state[key]); return Number.isFinite(value) && value >= 0 ? value : 0; };
  const money = (value) => `¥${(Number.isFinite(value) ? value : 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const perItem = () => n('salePrice') - n('unitCost') - n('packing') - n('shipping');
  const orderTotal = () => perItem() * n('quantity');
  const completedCount = () => order.filter((key) => state.completed[stepKey[key]]).length;

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      const el = document.querySelector('#save-status');
      if (el) el.textContent = '进度已保存在这台设备';
    } catch (_) {
      const el = document.querySelector('#save-status');
      if (el) el.textContent = '浏览器暂时无法保存';
    }
  }

  function header() {
    const nav = [
      ['home', '课程地图', links.home], ['roadmap', '商品与买家', links.roadmap],
      ['calculator', '一单算账', links.calculator], ['plan', '联系客户与方案', links.plan]
    ];
    return `<header class="topbar"><div class="topbar-inner"><a class="brand" href="index.html">TradeStart <span>外贸起步</span></a><nav class="site-nav" aria-label="主导航">${nav.map(([key,label,url]) => `<a href="${url}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav><span class="save-status" id="save-status">进度只保存在这台设备</span></div></header>`;
  }

  function progress(current = '') {
    const currentIndex = order.indexOf(current);
    const percent = currentIndex < 0 ? Math.round(completedCount() / 3 * 100) : Math.round((currentIndex + 1) / 3 * 100);
    const headline = currentIndex >= 0 ? `第 ${currentIndex + 1} 步，共 3 步` : `已完成 ${completedCount()} / 3 步`;
    const sub = currentIndex >= 0 ? ['先确定练习对象', '用示例数练习计算', '把前两步整理成草稿'][currentIndex] : '可以按顺序学，也可以从导航切换';
    return `<section class="progress-card" aria-label="学习进度"><div class="progress-top"><strong>${headline}</strong><span>${sub}</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></section>
      <nav class="course-steps" aria-label="三步练习">${order.map((key,i) => `<a class="course-step" href="${links[key]}"${current === key ? ' aria-current="step"' : ''}><b>${i + 1}. ${['商品与买家','一单算账','联系客户'][i]}</b>${state.completed[stepKey[key]] ? '已完成' : ['确定练习对象','计算简化成本','完成方案草稿'][i]}</a>`).join('')}</nav>`;
  }

  function input(key, label, hint, unit = '', full = false) {
    const sample = String(state[key]) === String(defaults[key]);
    return `<div class="field${full ? ' full' : ''}"><label for="${key}">${label}${sample ? '<span class="sample-tag">练习示例</span>' : ''}</label>${unit ? `<div class="input-unit"><input id="${key}" data-field="${key}" type="number" min="0" step="${key === 'quantity' ? '1' : '0.01'}" inputmode="decimal" value="${esc(state[key])}"><span>${unit}</span></div>` : `<input id="${key}" data-field="${key}" type="text" maxlength="140" value="${esc(state[key])}">`}<span class="hint">${hint}</span></div>`;
  }

  function mapPage() {
    const next = order.find((key) => !state.completed[stepKey[key]]) || 'plan';
    const nextLabel = state.completed.contact ? '查看我的方案' : `继续：${names[next]}`;
    return `<main class="wrap"><section class="page-intro"><div class="eyebrow">免费练习 · 零基础 · 约 15 分钟</div><h1>不懂外贸，也能从一个商品开始</h1><p>跟着 TradeStart 一步步练习：想清楚商品和买家、算一笔简化成本，再写一段联系客户的草稿。不用注册账号，也不需要先学会一堆术语。</p></section>
      ${progress()}<section class="panel"><div class="step-label">从这里开始</div><h2>完成后，你会有一份自己的练习方案</h2><p class="lead">我们用一只保温杯做示范。你可以先照着练，也可以随时换成自己的商品。内容会自动保存在当前浏览器，不会发送给任何客户。</p>
      <div class="course-map"><a class="map-card" href="${links.roadmap}"><span class="map-number">1</span><h2>商品与买家</h2><p>想清楚你要介绍什么商品，以及谁可能需要它。</p><span>${state.completed.product ? '已完成 · 可修改 →' : '开始这一步 →'}</span></a><a class="map-card" href="${links.calculator}"><span class="map-number">2</span><h2>一单算账</h2><p>练习用售价减去商品、包装和运送成本。</p><span>${state.completed.profit ? '已完成 · 可修改 →' : '进入算账练习 →'}</span></a><a class="map-card" href="${links.plan}"><span class="map-number">3</span><h2>联系客户与方案</h2><p>写一段初次联系草稿，把练习内容汇总起来。</p><span>${state.completed.contact ? '已完成 · 查看方案 →' : '完成练习方案 →'}</span></a></div>
      <div class="actions"><span></span><a class="btn btn-primary" href="${links[next]}">${nextLabel} →</a></div></section>
      <p class="footer">这是学习练习，不是实际报价或经营建议。运费、税费、准入要求和交易条款需要按商品与目的地另行核实。进度保存在当前浏览器，不会自动同步到其他设备。</p></main>`;
  }

  function productPage() {
    return `<main class="wrap"><section class="page-intro"><div class="eyebrow">第一步 · 商品与买家</div><h1>先弄清楚：你想卖什么，谁可能需要它？</h1><p>先不急着找工厂或注册店铺。把商品和可能的买家说清楚，就是一个很好的开始。</p></section>${progress('roadmap')}
      <section class="lesson-card"><div class="step-label">用大白话说</div><h2>买家不是“所有海外的人”</h2><p class="lead">而是有具体需要的一群人。比如保温杯可以介绍给办公用品商家，再由他们卖给公司或个人。</p><div class="explain"><strong>供应商是什么？</strong><p>供应商就是提供商品的工厂或商家。现在先不需要联系他们，先确定自己想卖什么、卖给谁。</p></div>
      <div class="practice-note">浅黄色“练习示例”代表预填的练习内容，可以直接改成你自己的想法。</div><form id="product-form" class="form-grid">
      ${input('product','你想卖什么？','例如：保温杯、家居收纳用品、手工饰品。')}
      ${input('destination','你想卖到哪里？','先写一个国家或地区；不代表当地要求已核实。')}
      ${input('buyer','可能的买家是谁？','例如零售店、批发商（买一批再转卖的商家）或品牌方。','',true)}
      ${input('need','他们为什么可能需要它？','用一句话说买家的实际需要，不用写广告词。','',true)}</form>
      <div class="sentence"><strong>把想法说成一句话</strong><p id="product-sentence"></p></div>
      <div class="actions"><a class="btn btn-secondary" href="${links.home}">← 回到课程地图</a><a class="btn btn-primary" href="${links.calculator}" data-complete="product">明白了，继续算一单 →</a></div></section>
      <p class="footer">本页进度自动保存在当前浏览器。练习内容不等于真实市场调研或供货承诺。</p></main>`;
  }

  function calculatorPage() {
    const profit = perItem();
    return `<main class="wrap"><section class="page-intro"><div class="eyebrow">第二步 · 一单算账</div><h1>卖出一件，减掉这些成本还剩多少？</h1><p>先用最简单的算法练习。金额是示例数字，可以自己修改；实际成本还要向供应商和服务商确认。</p></section>${progress('calculator')}
      <section class="lesson-card"><div class="step-label">你的练习对象</div><h2>${esc(state.product || '还没填写商品')}</h2><p class="lead">介绍给 ${esc(state.buyer || '还没填写买家')} · 目标地区：${esc(state.destination || '还没填写')}</p><div class="explain"><strong>今天只练一个公式</strong><p>每件剩余金额 ≈ 售价 − 商品成本 − 包装费用 − 运送估算。这里的“剩余”还没有扣除税费、平台费、退货等其他费用，不能当作最终利润。</p></div>
      <div class="practice-note">以下为练习示例金额。运送费用特别容易因尺寸、重量、路线和服务商变化，真实费用请另行询价。</div><form id="profit-form" class="form-grid">
      ${input('salePrice','一件商品卖多少钱？','练习售价，不是对外报价。','元/件')}
      ${input('unitCost','买下或生产一件要多少钱？','商品本身的单件成本。','元/件')}
      ${input('packing','一件商品的包装费用？','例如包装盒和保护材料的练习估算。','元/件')}
      ${input('shipping','一件商品的运送估算？','先练习填一个数，真实费用要按重量、尺寸和路线询价。','元/件')}
      ${input('quantity','假设卖出多少件？','仅用于练习整单计算，不代表真实订单数量。','件')}
      </form><div class="result-grid" aria-live="polite"><div class="result"><span>每件简化估算</span><strong data-result="unit">${money(profit)}</strong></div><div class="result"><span data-result="qty-label">${n('quantity')} 件简化估算</span><strong data-result="total">${money(orderTotal())}</strong></div><div class="result primary"><span>当前练习结论</span><strong data-result="verdict">${profit >= 0 ? '账面有余' : '成本高于售价'}</strong></div></div>
      <div class="practice-note">这里只减了商品、包装和运送三项。未包含税费、平台费、收款费用、汇率、退货等。金额仅供学习，不代表真实交易或正式报价。</div>
      <div class="actions"><a class="btn btn-secondary" href="${links.roadmap}">← 修改商品和买家</a><a class="btn btn-primary" href="${links.plan}" data-complete="profit">看起来明白了，继续写客户联系草稿 →</a></div></section>
      <p class="footer">保存后回到“商品与买家”或进入“联系客户与方案”，练习数据会自动带过去。</p></main>`;
  }

  function draftText() {
    const greet = String(state.contactName || '您好').trim() || '您好';
    return `${greet}，\n\n我想向${state.buyer || '贵公司'}介绍一款${state.product || '商品'}，目标市场是${state.destination || '贵地'}。它可能适合有这个需要的客户：${state.need || '（请补充商品能解决的问题）'}。\n\n如果这类商品符合贵公司的采购方向，我可以再发送真实的产品图片、规格和正式报价。请问您会考虑了解这类商品吗？\n\n祝好`;
  }

  function planPage() {
    const draft = state.contactEdited ? state.contactDraft : draftText();
    return `<main class="wrap"><section class="page-intro"><div class="eyebrow">第三步 · 联系客户与方案</div><h1>把前两步整理起来，再写一段初次联系的话</h1><p>第一条消息不需要承诺成交。介绍清楚商品，说明它可能解决什么需要，再礼貌地问对方是否愿意了解。</p></section>${progress('plan')}
      <section class="lesson-card"><div class="step-label">先核对你前面填的内容</div><h2>${esc(state.product || '未填写商品')} → ${esc(state.buyer || '未填写买家')}</h2><div class="summary-items">
      <div class="summary-item"><span>目标地区</span><strong>${esc(state.destination || '未填写')}</strong></div><div class="summary-item"><span>买家的需要</span><strong>${esc(state.need || '未填写')}</strong></div><div class="summary-item"><span>每件简化估算</span><strong>${money(perItem())}</strong></div><div class="summary-item"><span>${n('quantity')} 件简化估算</span><strong>${money(orderTotal())}</strong></div></div>
      <div class="explain"><strong>注意：简化估算不是正式报价</strong><p>它没有包含所有实际费用。发给客户前，先确认真实供货能力、产品信息、运费、税费和交易条款。</p></div>
      <form id="contact-form" class="form-grid"><div class="field"><label for="contactName">怎么称呼对方？</label><input id="contactName" data-field="contactName" type="text" maxlength="80" value="${esc(state.contactName)}"><span class="hint">不知道名字时，写“您好”就可以。</span></div><div class="field"><label>你的练习检查</label><div class="hint">知道卖什么、卖给谁，并完成了一次成本估算。下面的文字是草稿，需要你检查和修改。</div></div><div class="field full"><label for="contactDraft">初次联系客户的草稿</label><textarea id="contactDraft" data-field="contactDraft">${esc(draft)}</textarea><span class="hint">这是练习用语，不会替你发送。请核对真实性并按实际情况改写。</span></div></form>
      <div id="final-plan" class="summary-card${state.completed.contact ? '' : ' hidden'}"><span class="done-badge">练习已完成</span><h2>你的首单练习方案</h2><p>你已经把想法整理成一份可继续修改的草稿。</p><div class="summary-items"><div class="summary-item"><span>商品</span><strong>${esc(state.product || '未填写')}</strong></div><div class="summary-item"><span>可能的买家</span><strong>${esc(state.buyer || '未填写')}</strong></div><div class="summary-item"><span>目标地区</span><strong>${esc(state.destination || '未填写')}</strong></div><div class="summary-item"><span>每件简化估算</span><strong>${money(perItem())}</strong></div></div><h3>继续真实业务前，核对三件事</h3><p>1. 目的地是否允许销售这类商品；2. 向相关服务商确认真实费用和要求；3. 用真实成本重新核算后再正式报价。</p></div>
      <h3>初次联系客户的草稿</h3><div class="message-preview" id="plan-draft-preview">${esc(draft)}</div>
      <div class="actions"><a class="btn btn-secondary" href="${links.calculator}">← 返回修改算账</a><button class="btn btn-primary" id="complete-plan" type="button">${state.completed.contact ? '更新我的方案' : '完成练习，生成我的方案'}</button></div></section>
      <p class="footer">练习草稿和进度只保存在当前浏览器。没有云同步，也不会发送给任何客户。</p></main>`;
  }

  const renderers = { home: mapPage, roadmap: productPage, calculator: calculatorPage, plan: planPage };
  document.querySelector('#app').innerHTML = `${header()}${(renderers[page] || mapPage)()}`;

  function sentence() {
    const node = document.querySelector('#product-sentence');
    if (node) node.textContent = `我想把${state.product || '（商品）'}介绍给${state.buyer || '（可能的买家）'}，因为他们可能需要${state.need || '（商品能提供的帮助）'}。`;
  }
  sentence();

  document.querySelectorAll('[data-field]').forEach((el) => {
    el.addEventListener('input', () => {
      const key = el.dataset.field;
      state[key] = el.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value;
      if (key === 'contactDraft') state.contactEdited = true;
      persist();
      sentence();
      updateResults();
      if (page === 'plan' && !state.contactEdited) {
        const draft = document.querySelector('#contactDraft');
        const preview = document.querySelector('#plan-draft-preview');
        if (draft) draft.value = draftText();
        if (preview) preview.textContent = draftText();
      } else if (page === 'plan' && key === 'contactDraft') {
        const preview = document.querySelector('#plan-draft-preview');
        if (preview) preview.textContent = state.contactDraft;
      }
    });
  });

  function updateResults() {
    const unit = document.querySelector('[data-result="unit"]');
    const total = document.querySelector('[data-result="total"]');
    const verdict = document.querySelector('[data-result="verdict"]');
    const qty = document.querySelector('[data-result="qty-label"]');
    if (unit) unit.textContent = money(perItem());
    if (total) total.textContent = money(orderTotal());
    if (verdict) verdict.textContent = perItem() >= 0 ? '账面有余' : '成本高于售价';
    if (qty) qty.textContent = `${n('quantity')} 件简化估算`;
  }

  document.querySelectorAll('[data-complete]').forEach((el) => {
    el.addEventListener('click', () => {
      state.completed[el.dataset.complete] = true;
      persist();
    });
  });

  const finish = document.querySelector('#complete-plan');
  if (finish) finish.addEventListener('click', () => {
    state.completed = { product: true, profit: true, contact: true };
    persist();
    const result = document.querySelector('#final-plan');
    if (result) result.classList.remove('hidden');
    finish.textContent = '更新我的方案';
    const badge = result?.querySelector('.done-badge');
    if (badge) badge.focus?.();
    result?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  persist();
})();
