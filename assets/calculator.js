(function () {
  const sample = {
    sellingPrice: 39.99,
    purchasePrice: 8.5,
    volume: 500,
    internationalShipping: 12,
    commissionRate: 15,
    marketing: 4,
    packaging: 0.8,
    domesticShipping: 0.5,
    customs: 1.2,
    refundRate: 3,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const ids = Object.keys(sample);
    const inputs = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
    if (ids.some((id) => !inputs[id])) return;

    const currencyButtons = document.querySelectorAll("[data-currency]");
    const currencyLabels = document.querySelectorAll("[data-currency-label]");
    const advancedToggle = document.getElementById("advanced-toggle");
    const advancedCosts = document.getElementById("advanced-costs");
    const loadExample = document.getElementById("load-example");
    const resetButton = document.getElementById("reset-calculator");
    const saveButton = document.getElementById("save-calculation");
    const useInPlan = document.getElementById("use-in-plan");
    let currency = TradeStart.get("calculatorCurrency", "USD");

    function readValues() {
      return Object.fromEntries(ids.map((id) => [id, Math.max(0, Number(inputs[id].value) || 0)]));
    }

    function calculate() {
      const values = readValues();
      const commission = values.sellingPrice * (values.commissionRate / 100);
      const refundAllowance = values.sellingPrice * (values.refundRate / 100);
      const unitCost = values.purchasePrice
        + values.internationalShipping
        + values.marketing
        + values.packaging
        + values.domesticShipping
        + values.customs
        + commission
        + refundAllowance;
      const unitProfit = values.sellingPrice - unitCost;
      const margin = values.sellingPrice > 0 ? (unitProfit / values.sellingPrice) * 100 : 0;
      const totalRevenue = values.sellingPrice * values.volume;
      const totalCost = unitCost * values.volume;
      const totalProfit = unitProfit * values.volume;
      const shippingRatio = values.sellingPrice > 0
        ? (values.internationalShipping / values.sellingPrice) * 100
        : 0;

      render({ values, unitCost, unitProfit, margin, totalRevenue, totalCost, totalProfit, shippingRatio });
      return { currency, ...values, unitCost, unitProfit, margin, totalRevenue, totalCost, totalProfit, shippingRatio };
    }

    function money(value) {
      const symbol = currency === "USD" ? "$" : "¥";
      const sign = value < 0 ? "-" : "";
      return `${sign}${symbol}${Math.abs(value).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function render(result) {
      document.getElementById("unit-profit").textContent = money(result.unitProfit);
      document.getElementById("profit-margin").textContent = `${result.margin.toFixed(1)}% 利润率`;
      document.getElementById("revenue-label").textContent = `预期总收入 (${result.values.volume.toLocaleString("zh-CN")}件)`;
      document.getElementById("total-revenue").textContent = money(result.totalRevenue);
      document.getElementById("total-cost").textContent = money(result.totalCost);
      document.getElementById("total-profit").textContent = money(result.totalProfit);

      const profitElements = [document.getElementById("unit-profit"), document.getElementById("total-profit")];
      profitElements.forEach((element) => {
        element.classList.toggle("text-success", result.unitProfit >= 0);
        element.classList.toggle("text-error", result.unitProfit < 0);
      });

      const warning = document.getElementById("shipping-warning");
      warning.classList.toggle("hidden", result.shippingRatio < 30);
      document.getElementById("shipping-warning-text").textContent =
        `国际运费占售价达到 ${result.shippingRatio.toFixed(1)}%，建议考虑组合装销售、提高客单价，或采用海运等批量运输方式降低均摊成本。`;
    }

    function setValues(values) {
      ids.forEach((id) => {
        inputs[id].value = values[id] ?? 0;
      });
      calculate();
    }

    function setCurrency(nextCurrency) {
      currency = nextCurrency;
      TradeStart.set("calculatorCurrency", currency);
      currencyButtons.forEach((button) => {
        const active = button.dataset.currency === currency;
        button.classList.toggle("bg-surface", active);
        button.classList.toggle("text-primary", active);
        button.classList.toggle("shadow-sm", active);
        button.classList.toggle("text-on-surface-variant", !active);
      });
      currencyLabels.forEach((label) => {
        label.textContent = currency;
      });
      calculate();
    }

    Object.values(inputs).forEach((input) => input.addEventListener("input", calculate));
    currencyButtons.forEach((button) => button.addEventListener("click", () => setCurrency(button.dataset.currency)));
    loadExample.addEventListener("click", () => {
      setValues(sample);
      TradeStart.toast("示例数据已载入");
    });
    resetButton.addEventListener("click", () => {
      setValues(Object.fromEntries(ids.map((id) => [id, 0])));
      TradeStart.toast("计算器已重置", "warning");
    });
    advancedToggle.addEventListener("click", () => {
      const hidden = advancedCosts.classList.toggle("hidden");
      advancedToggle.setAttribute("aria-expanded", String(!hidden));
      advancedToggle.querySelector("[data-chevron]").textContent = hidden ? "expand_more" : "expand_less";
    });
    saveButton.addEventListener("click", () => {
      TradeStart.set("savedCalculation", calculate());
      TradeStart.toast("计算记录已保存在当前浏览器");
    });
    useInPlan.addEventListener("click", () => {
      TradeStart.set("planCalculation", calculate());
      window.location.href = "plan.html";
    });

    const saved = TradeStart.get("savedCalculation", null);
    if (saved) setValues(saved);
    setCurrency(currency);
  });
})();
