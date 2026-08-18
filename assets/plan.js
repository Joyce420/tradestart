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
      planDetails: savedDraft?.planDetails || {},
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

    function fieldValue(id) {
      return String(document.getElementById(id)?.value || "").trim();
    }

    function applySavedDetails() {
      const logistics = state.planDetails?.logistics || {};
      const actionPlan = state.planDetails?.actionPlan || {};
      const values = {
        "plan-payment-method": logistics.paymentMethod,
        "plan-primary-risk": logistics.primaryRisk,
        "plan-risk-response": logistics.riskResponse,
        "plan-action-1": actionPlan.days1to3,
        "plan-action-2": actionPlan.days4to7,
        "plan-action-3": actionPlan.days8to14,
      };
      Object.entries(values).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input && value) input.value = value;
      });
    }

    function currentPlanDetails() {
      return {
        logistics: {
          paymentMethod: fieldValue("plan-payment-method"),
          primaryRisk: fieldValue("plan-primary-risk"),
          riskResponse: fieldValue("plan-risk-response"),
        },
        actionPlan: {
          days1to3: fieldValue("plan-action-1"),
          days4to7: fieldValue("plan-action-2"),
          days8to14: fieldValue("plan-action-3"),
        },
      };
    }

    function setStepStatus(id, completed, successLabel = "已完成", pendingLabel = "待补充") {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = completed ? successLabel : pendingLabel;
      element.classList.toggle("text-secondary", completed);
      element.classList.toggle("font-medium", completed);
    }

    function planCompletion(context, calculation, competitorComplete, details) {
      const logistics = details.logistics || {};
      const actionPlan = details.actionPlan || {};
      const steps = [
        Boolean(context.productName && context.supplierName),
        Boolean(context.targetMarket && context.customerProfile),
        competitorComplete,
        Boolean(calculation),
        Boolean(context.transportMethod && context.incoterm && logistics.paymentMethod && logistics.primaryRisk && logistics.riskResponse),
        Boolean(actionPlan.days1to3 && actionPlan.days4to7 && actionPlan.days8to14),
      ];
      const labels = ["商品与模式", "目标市场与客户", "竞品与差异化", "成本与报价", "物流、收款与风险", "未来 14 天行动计划"];
      return {
        steps,
        completedSteps: steps.filter(Boolean).length,
        isComplete: steps.every(Boolean),
        missingLabels: labels.filter((_, index) => !steps[index]),
      };
    }

    function renderProjectContext(context, calculation, competitorComplete, details) {
      const hasContext = hasValue(context);
      document.getElementById("roadmap-project-context")?.classList.toggle("hidden", !hasContext);

      const supplier = context.supplierName
        ? `${context.supplierName}${isNumber(context.supplierMoq) ? ` · MOQ ${context.supplierMoq} 件` : ""}${isNumber(context.supplierUnitPrice) ? ` · ${money(context.supplierUnitPrice)}/件` : ""}`
        : "尚未填写供应商";
      const pricing = isNumber(context.minimumQuote)
        ? `最低报价 ${money(context.minimumQuote)}/件${isNumber(context.targetMargin) ? ` · 目标利润 ${context.targetMargin}%` : ""}`
        : isNumber(context.targetMargin) ? `目标利润 ${context.targetMargin}%` : "尚未填写报价目标";
      const logisticsSummary = [context.transportMethod, context.incoterm].filter(Boolean).join(" · ") || "尚未填写运输与贸易术语";
      const documents = context.documents?.length ? context.documents.join("、") : "尚未在路线图填写主要单据";
      const logistics = details.logistics || {};
      const actionPlan = details.actionPlan || {};

      setText("context-product", context.productName, "尚未填写产品");
      setText("context-supplier", supplier, "尚未填写供应商");
      setText("context-market", context.targetMarket, "尚未填写目标市场");
      setText("context-customer", context.customerProfile, "尚未填写客户画像");
      setText("context-pricing", pricing, "尚未填写报价目标");
      setText("context-logistics", logisticsSummary, "尚未填写物流安排");
      setText("plan-logistics-from-roadmap", logisticsSummary);
      setText("plan-documents-from-roadmap", documents);

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

      setText("preview-logistics-summary", logisticsSummary, "请先在路线图节点 6 选择运输方式与贸易术语。");
      setText("preview-documents", documents);
      setText("preview-payment", logistics.paymentMethod);
      setText("preview-primary-risk", logistics.primaryRisk);
      setText("preview-risk-response", logistics.riskResponse);
      setText("preview-action-1", actionPlan.days1to3);
      setText("preview-action-2", actionPlan.days4to7);
      setText("preview-action-3", actionPlan.days8to14);

      const completion = planCompletion(context, calculation, competitorComplete, details);
      document.getElementById("plan-progress-text").textContent = `${Math.round((completion.completedSteps / 6) * 100)}%`;
      document.getElementById("plan-progress-bar").style.width = `${(completion.completedSteps / 6) * 100}%`;
      document.getElementById("plan-progress-note").textContent = `已汇总 ${completion.completedSteps}/6 项方案要素`;
      setStepStatus("plan-step-1-status", completion.steps[0], "已带入");
      setStepStatus("plan-step-2-status", completion.steps[1], "已带入");
      setStepStatus("plan-step-3-status", completion.steps[2]);
      setStepStatus("plan-step-4-status", completion.steps[3], "已带入");
      setStepStatus("plan-step-5-status", completion.steps[4]);
      setStepStatus("plan-step-6-status", completion.steps[5]);
      setText("preview-completion-note", completion.isComplete
        ? "方案要素已齐全，可使用浏览器的“存储为 PDF”生成文件。"
        : `还差 ${completion.missingLabels.join("、")}。`);
      return completion;
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
      document.getElementById("preview-competitors").textContent = `已分析竞品: ${state.competitors.map((item) => item.name).join(", ") || "暂未添加"}`;
      const positioning = state.competitors.find((item) => item.difference.trim())?.difference || "尚未填写差异化策略。";
      document.getElementById("preview-positioning").textContent = positioning;
      document.getElementById("preview-difference").textContent = `核心差异化: ${positioning}`;
      renderProjectContext(currentProjectContext(), currentCalculation(), hasCompetitor && hasDifference, currentPlanDetails());

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
      state.planDetails = currentPlanDetails();
      const draft = {
        competitors: state.competitors,
        savedAt: state.savedAt,
        clientId: state.clientId,
        projectContext: state.projectContext,
        planDetails: state.planDetails,
      };
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
      render();
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
    document.querySelectorAll("[data-plan-detail]").forEach((input) => {
      input.addEventListener("input", () => {
        markDirty();
        render();
      });
      input.addEventListener("change", () => {
        markDirty();
        render();
      });
    });
    document.getElementById("save-draft").addEventListener("click", () => void saveDraft());
    document.getElementById("previous-plan-step").addEventListener("click", () => { window.location.href = "calculator.html"; });
    document.getElementById("next-plan-step").addEventListener("click", async () => {
      await saveDraft(false);
      window.toggleReportModal?.();
      TradeStart.toast("方案草稿已保存；预览中会显示还需补充的项目");
    });
    document.getElementById("export-plan").addEventListener("click", () => {
      const hasCompetitor = state.competitors.length > 0 && state.competitors.some((item) => item.difference.trim());
      const completion = planCompletion(currentProjectContext(), currentCalculation(), hasCompetitor, currentPlanDetails());
      if (!completion.isComplete) {
        TradeStart.toast(`还不能导出：请补齐 ${completion.missingLabels.join("、")}`, "warning");
        return;
      }
      void saveDraft(false);
      window.print();
    });

    const importedCalculation = currentCalculation();
    if (importedCalculation) {
      const symbol = importedCalculation.currency === "CNY" ? "¥" : "$";
      document.getElementById("imported-calculation").classList.remove("hidden");
      document.getElementById("imported-unit-profit").textContent = `单件净利润 ${symbol}${Number(importedCalculation.unitProfit).toFixed(2)}`;
      document.getElementById("imported-margin").textContent = `利润率 ${Number(importedCalculation.margin).toFixed(1)}%`;
    }
    if (isLegacyDemo) {
      const cleanedDraft = { competitors: [], savedAt: null, clientId: state.clientId, planDetails: {} };
      TradeStart.set("planDraft", cleanedDraft);
      void TradeStartData.savePlan(cleanedDraft).catch((error) => console.warn("演示竞品清理失败", error));
    }
    applySavedDetails();
    render();
  });
})();
