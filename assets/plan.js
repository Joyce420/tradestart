(function () {
  const legacyDemoCompetitors = [
    { name: "Brand A (Yeti)", platform: "Amazon", price: 39.99, pros: "品牌力强，品质极佳", cons: "价格高，溢价严重", difference: "智能测温，平替价格 ($19.99)" },
    { name: "Brand B (Generic)", platform: "B2B / 独立站", price: 12.99, pros: "极致低价", cons: "质量差，无品牌溢价", difference: "提供定制化包装与 1 年质保" },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("competitor-form");
    const fields = {
      name: document.getElementById("competitor-name"),
      platform: document.getElementById("competitor-platform"),
      price: document.getElementById("competitor-price"),
      pros: document.getElementById("competitor-pros"),
      cons: document.getElementById("competitor-cons"),
      difference: document.getElementById("competitor-difference"),
    };
    const savedDraft = TradeStart.get("planDraft", null);
    const isLegacyDemo = Array.isArray(savedDraft?.competitors)
      && JSON.stringify(savedDraft.competitors) === JSON.stringify(legacyDemoCompetitors);
    const savedCompetitors = isLegacyDemo ? [] : savedDraft?.competitors;
    const state = {
      competitors: Array.isArray(savedCompetitors) ? savedCompetitors : [],
      savedAt: isLegacyDemo ? null : savedDraft?.savedAt || null,
      clientId: savedDraft?.clientId || null,
      projectContext: savedDraft?.projectContext || {},
      dirty: false,
    };
    const tableBody = document.getElementById("competitor-table-body");
    const count = document.getElementById("competitor-count");
    const savedStatus = document.getElementById("draft-status");
    savedStatus.textContent = state.savedAt ? "草稿已保存" : "尚未保存";

    function escapeHtml(value) {
      return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function hasValue(value) {
      if (Array.isArray(value)) return value.some(hasValue);
      if (value && typeof value === "object") return Object.values(value).some(hasValue);
      return String(value ?? "").trim() !== "" && value !== null;
    }

    function getRoadmapContext() {
      return window.TradeStartProject?.roadmapContext?.() || {};
    }

    function currentProjectContext() {
      const live = getRoadmapContext();
      const merged = { ...state.projectContext };
      Object.entries(live).forEach(([key, value]) => {
        if (hasValue(value)) merged[key] = value;
      });
      return merged;
    }

    function currentCalculation() {
      return TradeStart.get("planCalculation", null) || TradeStart.get("savedCalculation", null);
    }

    function money(value, currency = "USD") {
      const symbol = currency === "CNY" ? "¥" : "$";
      return `${symbol}${Number(value || 0).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function isNumber(value) {
      return value !== null && value !== "" && value !== undefined && Number.isFinite(Number(value));
    }

    function setText(id, value, fallback = "尚未填写") {
      const element = document.getElementById(id);
      if (element) element.textContent = value || fallback;
    }

    function setStepStatus(id, completed, pendingLabel = "待补充") {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = completed ? "已带入" : pendingLabel;
      element.classList.toggle("text-secondary", completed);
      element.classList.toggle("font-medium", completed);
    }

    function renderProjectContext(context, calculation, competitorComplete) {
      const hasContext = hasValue(context);
      const contextCard = document.getElementById("roadmap-project-context");
      contextCard?.classList.toggle("hidden", !hasContext);

      const supplier = context.supplierName
        ? `${context.supplierName}${isNumber(context.supplierMoq) ? ` · MOQ ${context.supplierMoq} 件` : ""}${isNumber(context.supplierUnitPrice) ? ` · ${money(context.supplierUnitPrice)}/件` : ""}`
        : "尚未填写供应商";
      const pricing = isNumber(context.minimumQuote)
        ? `最低报价 ${money(context.minimumQuote)}/件${isNumber(context.targetMargin) ? ` · 目标利润 ${context.targetMargin}%` : ""}`
        : isNumber(context.targetMargin) ? `目标利润 ${context.targetMargin}%` : "尚未填写报价目标";
      const logistics = [context.transportMethod, context.incoterm].filter(Boolean).join(" · ") || "尚未填写运输与贸易术语";

      setText("context-product", context.productName, "尚未填写产品");
      setText("context-supplier", supplier, "尚未填写供应商");
      setText("context-market", context.targetMarket, "尚未填写目标市场");
      setText("context-customer", context.customerProfile, "尚未填写客户画像");
      setText("context-pricing", pricing, "尚未填写报价目标");
      setText("context-logistics", logistics, "尚未填写物流安排");

      setText("preview-product-name", context.productName);
      setText("preview-customer-profile", context.customerProfile);
      setText("preview-supplier", supplier);
      setText("preview-business-mode", context.businessMode);
      const marketSummary = [context.targetMarket, context.customerProfile, context.marketConclusion || context.usp]
        .filter(Boolean).join("；");
      setText("preview-market-summary", marketSummary, "尚未填写目标市场与需求结论。");

      const calculationSection = document.getElementById("preview-calculation-section");
      calculationSection?.classList.toggle("hidden", !calculation);
      if (calculation) {
        setText("preview-calculation-summary", `销售单价 ${money(calculation.sellingPrice, calculation.currency)}；单件净利润 ${money(calculation.unitProfit, calculation.currency)}；利润率 ${Number(calculation.margin || 0).toFixed(1)}%；预计总净利 ${money(calculation.totalProfit, calculation.currency)}`, "--");
      }

      const steps = [
        Boolean(context.productName && context.supplierName),
        Boolean(context.targetMarket && context.customerProfile),
        competitorComplete,
        Boolean(calculation),
        Boolean(context.transportMethod && context.incoterm),
        Boolean(context.nextImprovement),
      ];
      const completedSteps = steps.filter(Boolean).length;
      document.getElementById("plan-progress-text").textContent = `${Math.round((completedSteps / 6) * 100)}%`;
      document.getElementById("plan-progress-bar").style.width = `${(completedSteps / 6) * 100}%`;
      document.getElementById("plan-progress-note").textContent = `已汇总 ${completedSteps}/6 项方案要素`;
      setStepStatus("plan-step-1-status", steps[0]);
      setStepStatus("plan-step-2-status", steps[1]);
      setStepStatus("plan-step-3-status", steps[2], "待完成");
      setStepStatus("plan-step-4-status", steps[3]);
      setStepStatus("plan-step-5-status", steps[4]);
      setStepStatus("plan-step-6-status", steps[5]);
    }

    function markDirty() {
      state.dirty = true;
      savedStatus.textContent = "有未保存更改";
      savedStatus.parentElement.classList.remove("text-success");
      savedStatus.parentElement.classList.add("text-on-surface-variant");
    }

    function render() {
      tableBody.innerHTML = state.competitors.map((competitor, index) => `
        <tr class="hover:bg-surface-bright transition-colors group">
          <td class="py-3 px-4"><div class="font-medium text-primary">${escapeHtml(competitor.name)}</div></td>
          <td class="py-3 px-4"><div class="text-body-sm">${escapeHtml(competitor.platform)}</div><div class="font-medium">$${Number(competitor.price).toFixed(2)}</div></td>
          <td class="py-3 px-4 max-w-[200px]"><div class="text-body-sm text-success truncate"><span class="font-bold">优:</span> ${escapeHtml(competitor.pros)}</div><div class="text-body-sm text-danger truncate"><span class="font-bold">劣:</span> ${escapeHtml(competitor.cons)}</div></td>
          <td class="py-3 px-4 max-w-[200px]"><div class="text-body-sm text-primary truncate">${escapeHtml(competitor.difference)}</div></td>
          <td class="py-3 px-4"><button aria-label="删除 ${escapeHtml(competitor.name)}" class="text-outline hover:text-danger transition-colors opacity-70 group-hover:opacity-100" data-delete="${index}" type="button"><span class="material-symbols-outlined text-[20px]">delete</span></button></td>
        </tr>`).join("");
      if (state.competitors.length < 3) {
        tableBody.insertAdjacentHTML("beforeend", `<tr><td class="py-6 text-center border-dashed border-2 border-border bg-surface-bright/50 rounded-lg m-2" colspan="5"><span class="text-on-surface-variant font-body-sm">还可以添加 ${3 - state.competitors.length} 个核心竞品</span></td></tr>`);
      }
      count.textContent = `已添加 ${state.competitors.length}/3`;
      const hasCompetitor = state.competitors.length > 0;
      const hasDifference = state.competitors.some((item) => item.difference.trim());
      document.getElementById("criterion-competitor").checked = hasCompetitor;
      document.getElementById("criterion-difference").checked = hasDifference;
      document.getElementById("criterion-competitor-label").classList.toggle("line-through", hasCompetitor);
      document.getElementById("criterion-difference-label").classList.toggle("line-through", hasDifference);
      const completed = hasCompetitor && hasDifference;
      document.getElementById("preview-competitors").textContent = `已分析竞品: ${state.competitors.map((item) => item.name).join(", ") || "暂未添加"}`;
      document.getElementById("preview-difference").textContent = `核心差异化: ${state.competitors[0]?.difference || "暂未填写"}`;
      renderProjectContext(currentProjectContext(), currentCalculation(), completed);

      tableBody.querySelectorAll("[data-delete]").forEach((button) => {
        button.addEventListener("click", () => {
          state.competitors.splice(Number(button.dataset.delete), 1);
          markDirty();
          render();
          TradeStart.toast("竞品已从对比表移除", "warning");
        });
      });
    }

    async function saveDraft(showToast = true) {
      state.savedAt = new Date().toISOString();
      state.dirty = false;
      state.projectContext = currentProjectContext();
      const draft = { competitors: state.competitors, savedAt: state.savedAt, clientId: state.clientId, projectContext: state.projectContext };
      TradeStart.set("planDraft", draft);
      savedStatus.textContent = "草稿已保存";
      savedStatus.parentElement.classList.add("text-success");
      savedStatus.parentElement.classList.remove("text-on-surface-variant");
      try {
        const result = await TradeStartData.savePlan(draft);
        if (result.draft) {
          state.clientId = result.draft.clientId;
          TradeStart.set("planDraft", result.draft);
        }
        savedStatus.textContent = result.cloud ? "云端已保存" : "草稿已保存";
        if (showToast) TradeStart.toast(result.cloud ? "出口方案草稿已保存到云端" : "出口方案草稿已保存在当前浏览器；登录后可同步");
      } catch (error) {
        console.warn("出口方案云端保存失败", error);
        savedStatus.textContent = "本地已保存，云端同步失败";
        if (showToast) TradeStart.toast("云端保存失败，草稿仍保存在当前浏览器", "warning");
      }
    }

    document.getElementById("add-competitor").addEventListener("click", () => {
      if (state.competitors.length >= 3) {
        TradeStart.toast("当前步骤最多添加 3 个核心竞品", "warning");
        return;
      }
      const competitor = {
        name: fields.name.value.trim(), platform: fields.platform.value, price: Number(fields.price.value),
        pros: fields.pros.value.trim(), cons: fields.cons.value.trim(), difference: fields.difference.value.trim(),
      };
      if (!competitor.name || !competitor.price || !competitor.difference) {
        TradeStart.toast("请填写竞品名称、核心定价和差异化打法", "error");
        return;
      }
      state.competitors.push(competitor);
      form.reset();
      markDirty();
      render();
      TradeStart.toast("竞品已添加到对比表");
    });

    form.addEventListener("input", markDirty);
    document.getElementById("save-draft").addEventListener("click", () => void saveDraft());
    document.getElementById("previous-plan-step").addEventListener("click", () => TradeStart.toast("当前原型仅展示步骤 3"));
    document.getElementById("next-plan-step").addEventListener("click", async () => {
      if (!state.competitors.length || !state.competitors.some((item) => item.difference.trim())) {
        TradeStart.toast("请先完成竞品与差异化分析", "warning");
        return;
      }
      await saveDraft(false);
      TradeStart.toast("步骤 3 已保存；下一步骤将在后续前端页面中补充");
    });
    document.getElementById("export-plan").addEventListener("click", () => TradeStart.toast("完成全部方案步骤后才能导出 PDF", "warning"));

    const importedCalculation = currentCalculation();
    if (importedCalculation) {
      const symbol = importedCalculation.currency === "CNY" ? "¥" : "$";
      document.getElementById("imported-calculation").classList.remove("hidden");
      document.getElementById("imported-unit-profit").textContent = `单件净利润 ${symbol}${Number(importedCalculation.unitProfit).toFixed(2)}`;
      document.getElementById("imported-margin").textContent = `利润率 ${Number(importedCalculation.margin).toFixed(1)}%`;
    }
    if (isLegacyDemo) {
      const cleanedDraft = { competitors: [], savedAt: null, clientId: state.clientId };
      TradeStart.set("planDraft", cleanedDraft);
      void TradeStartData.savePlan(cleanedDraft).catch((error) => console.warn("演示竞品清理失败", error));
    }
    render();
  });
})();
