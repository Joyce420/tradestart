(function () {
  const initialCompetitors = [
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
    const state = {
      competitors: Array.isArray(savedDraft?.competitors) ? savedDraft.competitors : initialCompetitors,
      savedAt: savedDraft?.savedAt || null,
      dirty: false,
    };
    const tableBody = document.getElementById("competitor-table-body");
    const count = document.getElementById("competitor-count");
    const savedStatus = document.getElementById("draft-status");

    function escapeHtml(value) {
      return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
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
      document.getElementById("criterion-competitor").checked = state.competitors.length > 0;
      document.getElementById("criterion-difference").checked = state.competitors.some((item) => item.difference.trim());
      document.getElementById("preview-competitors").textContent = `已分析竞品: ${state.competitors.map((item) => item.name).join(", ") || "暂未添加"}`;
      document.getElementById("preview-difference").textContent = `核心差异化: ${state.competitors[0]?.difference || "暂未填写"}`;

      tableBody.querySelectorAll("[data-delete]").forEach((button) => {
        button.addEventListener("click", () => {
          state.competitors.splice(Number(button.dataset.delete), 1);
          markDirty();
          render();
          TradeStart.toast("竞品已从对比表移除", "warning");
        });
      });
    }

    function saveDraft() {
      state.savedAt = new Date().toISOString();
      state.dirty = false;
      TradeStart.set("planDraft", { competitors: state.competitors, savedAt: state.savedAt });
      savedStatus.textContent = "草稿已保存";
      savedStatus.parentElement.classList.add("text-success");
      savedStatus.parentElement.classList.remove("text-on-surface-variant");
      TradeStart.toast("出口方案草稿已保存在当前浏览器");
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
    document.getElementById("save-draft").addEventListener("click", saveDraft);
    document.getElementById("previous-plan-step").addEventListener("click", () => TradeStart.toast("当前原型仅展示步骤 3"));
    document.getElementById("next-plan-step").addEventListener("click", () => {
      if (!state.competitors.length || !state.competitors.some((item) => item.difference.trim())) {
        TradeStart.toast("请先完成竞品与差异化分析", "warning");
        return;
      }
      saveDraft();
      TradeStart.toast("步骤 3 已保存；下一步骤将在后续前端页面中补充");
    });
    document.getElementById("export-plan").addEventListener("click", () => TradeStart.toast("完成全部方案步骤后才能导出 PDF", "warning"));

    const importedCalculation = TradeStart.get("planCalculation", null);
    if (importedCalculation) {
      const symbol = importedCalculation.currency === "CNY" ? "¥" : "$";
      TradeStart.toast(`已带入利润测算：单件净利润 ${symbol}${Number(importedCalculation.unitProfit).toFixed(2)}`);
    }
    render();
  });
})();
