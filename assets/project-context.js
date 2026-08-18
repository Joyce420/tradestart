(function () {
  function text(value) {
    return String(value ?? "").trim();
  }

  function number(value) {
    if (text(value) === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  }

  function firstCompleteSupplier(suppliers) {
    if (!Array.isArray(suppliers)) return null;
    return suppliers.find((supplier) => text(supplier?.name) && number(supplier?.moq) !== null && number(supplier?.unitPrice) !== null) || null;
  }

  function roadmapContext() {
    const roadmap = window.TradeStart?.get("roadmapProgress", {}) || {};
    const answers = roadmap.answers && typeof roadmap.answers === "object" ? roadmap.answers : {};
    const sourcing = answers[2] || {};
    const market = answers[3] || {};
    const acquisition = answers[4] || {};
    const pricing = answers[5] || {};
    const logistics = answers[6] || {};
    const fulfillment = answers[7] || {};
    const review = answers[8] || {};
    const supplier = firstCompleteSupplier(sourcing.suppliers);

    return {
      businessMode: text(answers[1]?.businessMode),
      productName: text(sourcing.category),
      candidateProducts: text(sourcing.candidateProducts),
      supplierName: text(supplier?.name),
      supplierMoq: number(supplier?.moq),
      supplierUnitPrice: number(supplier?.unitPrice),
      supplierNotes: text(supplier?.notes),
      targetMarket: text(market.targetMarket),
      customerProfile: text(market.customerProfile),
      marketConclusion: text(market.marketConclusion),
      leadChannel: text(acquisition.leadChannel),
      firstTouch: text(acquisition.firstTouch),
      usp: text(acquisition.usp),
      targetMargin: number(pricing.targetMargin),
      minimumQuote: number(pricing.minimumQuote),
      transportMethod: text(logistics.transportMethod),
      incoterm: text(logistics.incoterm),
      documents: Array.isArray(logistics.documents) ? logistics.documents.filter(Boolean) : [],
      orderItems: [text(fulfillment.orderInfo1), text(fulfillment.orderInfo2), text(fulfillment.orderInfo3)].filter(Boolean),
      kpi: text(review.kpi),
      nextImprovement: text(review.nextImprovement),
    };
  }

  function hasSourcingData(context = roadmapContext()) {
    return Boolean(context.productName || context.supplierName || context.supplierMoq !== null || context.supplierUnitPrice !== null);
  }

  window.TradeStartProject = { roadmapContext, hasSourcingData };
})();
