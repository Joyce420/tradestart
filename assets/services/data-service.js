(function () {
  const prefix = "tradestart.";
  const syncKeys = ["roadmapProgress", "savedCalculation", "planDraft"];
  const calculationInputKeys = [
    "sellingPrice", "purchasePrice", "volume", "internationalShipping",
    "commissionRate", "marketing", "packaging", "domesticShipping",
    "customs", "refundRate",
  ];
  const calculationResultKeys = [
    "unitCost", "unitProfit", "margin", "totalRevenue", "totalCost",
    "totalProfit", "shippingRatio",
  ];
  let modulesPromise = null;

  function getLocal(key, fallback = null) {
    try {
      const value = localStorage.getItem(prefix + key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn(`无法读取本地数据 ${key}`, error);
      return fallback;
    }
  }

  function setLocal(key, value) {
    localStorage.setItem(prefix + key, JSON.stringify(value));
  }

  function hasMeaningfulValue(value) {
    if (Array.isArray(value)) return value.some(hasMeaningfulValue);
    if (value && typeof value === "object") return Object.values(value).some(hasMeaningfulValue);
    return String(value ?? "").trim() !== "";
  }

  function clientOrThrow() {
    const client = window.TradeStartBackend?.getClient();
    if (!client) throw new Error("后端尚未配置");
    return client;
  }

  async function currentUser() {
    const session = await window.TradeStartAuth?.getSession();
    return session?.user || null;
  }

  function hasLocalData() {
    return syncKeys.some((key) => localStorage.getItem(prefix + key) !== null);
  }

  function ownedStorageKey(userId) {
    return `${prefix}cloudOwned.${userId}`;
  }

  function markOwned(userId, keys) {
    if (!userId || !keys.length) return;
    let owned = [];
    try {
      owned = JSON.parse(localStorage.getItem(ownedStorageKey(userId)) || "[]");
    } catch (_error) {
      owned = [];
    }
    localStorage.setItem(ownedStorageKey(userId), JSON.stringify([...new Set([...owned, ...keys])]));
  }

  function clearOwnedData(userId) {
    if (!userId) return;
    let owned = [];
    try {
      owned = JSON.parse(localStorage.getItem(ownedStorageKey(userId)) || "[]");
    } catch (_error) {
      owned = [];
    }
    owned.forEach((key) => localStorage.removeItem(prefix + key));
    if (owned.includes("savedCalculation")) localStorage.removeItem(prefix + "planCalculation");
    localStorage.removeItem(ownedStorageKey(userId));
  }

  async function publishedModules() {
    if (!modulesPromise) {
      modulesPromise = clientOrThrow()
        .from("modules")
        .select("id,sort_order")
        .eq("status", "published")
        .order("sort_order")
        .then(({ data, error }) => {
          if (error) throw error;
          return data || [];
        })
        .catch((error) => {
          modulesPromise = null;
          throw error;
        });
    }
    return modulesPromise;
  }

  async function saveRoadmap(state) {
    const user = await currentUser();
    if (!user) return { cloud: false };

    const modules = await publishedModules();
    const completed = new Set(state.completed || []);
    const notes = state.notes && typeof state.notes === "object" ? state.notes : {};
    const answers = state.answers && typeof state.answers === "object" ? state.answers : {};
    const now = new Date().toISOString();
    const rows = modules.map((module) => {
      const position = Number(module.sort_order);
      const answer = answers[position] && typeof answers[position] === "object" ? answers[position] : {};
      const note = String(answer.notes || notes[position] || (position === 2 ? state.supplierNotes || "" : ""));
      const hasAnswer = hasMeaningfulValue(answer);
      const status = completed.has(position) ? "completed" : hasAnswer || note ? "in_progress" : "not_started";
      const taskJson = {};
      if (Object.keys(answer).length) taskJson.answers = answer;
      if (note) taskJson.note = note;
      return {
        user_id: user.id,
        module_id: module.id,
        status,
        score: null,
        task_json: taskJson,
        completed_at: status === "completed" ? now : null,
      };
    });

    const { error } = await clientOrThrow()
      .from("user_progress")
      .upsert(rows, { onConflict: "user_id,module_id" });
    if (error) throw error;
    markOwned(user.id, ["roadmapProgress"]);
    return { cloud: true };
  }

  async function saveCalculation(calculation) {
    const user = await currentUser();
    if (!user) return { cloud: false, calculation };

    const next = { ...calculation, clientId: calculation.clientId || crypto.randomUUID() };
    setLocal("savedCalculation", next);
    const inputJson = Object.fromEntries(calculationInputKeys.map((key) => [key, Number(next[key]) || 0]));
    const resultJson = Object.fromEntries(calculationResultKeys.map((key) => [key, Number(next[key]) || 0]));
    const { error } = await clientOrThrow().from("calculations").upsert({
      user_id: user.id,
      client_id: next.clientId,
      name: "出口利润测算",
      currency: next.currency === "CNY" ? "CNY" : "USD",
      input_json: inputJson,
      result_json: resultJson,
    }, { onConflict: "user_id,client_id" });
    if (error) throw error;
    markOwned(user.id, ["savedCalculation"]);
    return { cloud: true, calculation: next };
  }

  async function savePlan(draft) {
    const user = await currentUser();
    if (!user) return { cloud: false, draft };

    const next = { ...draft, clientId: draft.clientId || crypto.randomUUID() };
    const context = next.projectContext && typeof next.projectContext === "object" ? next.projectContext : {};
    const productName = String(context.productName || "").trim().slice(0, 160);
    const market = String(context.targetMarket || "").trim().slice(0, 160);
    setLocal("planDraft", next);
    const { data: project, error: projectError } = await clientOrThrow()
      .from("challenge_projects")
      .upsert({
        user_id: user.id,
        client_id: next.clientId,
        title: productName ? `出口方案 · ${productName}` : "我的出口方案",
        product_name: productName,
        market,
        status: "draft",
      }, { onConflict: "user_id,client_id" })
      .select("id")
      .single();
    if (projectError) throw projectError;

    const competitors = (next.competitors || []).map((competitor) => ({
      project_id: project.id,
      name: String(competitor.name || "").slice(0, 160),
      platform: String(competitor.platform || "").slice(0, 120),
      price_minor: Math.round(Math.max(0, Number(competitor.price) || 0) * 100),
      currency: "USD",
      pros: String(competitor.pros || "").slice(0, 3000),
      cons: String(competitor.cons || "").slice(0, 3000),
      differentiation: String(competitor.difference || "").slice(0, 3000),
    }));
    let insertedIds = [];
    if (competitors.length) {
      const { data: inserted, error: insertError } = await clientOrThrow()
        .from("project_competitors")
        .insert(competitors)
        .select("id");
      if (insertError) throw insertError;
      insertedIds = (inserted || []).map((item) => item.id);
    }
    let deleteQuery = clientOrThrow().from("project_competitors").delete().eq("project_id", project.id);
    if (insertedIds.length) deleteQuery = deleteQuery.not("id", "in", `(${insertedIds.join(",")})`);
    const { error: deleteError } = await deleteQuery;
    if (deleteError) throw deleteError;

    // The first version of the schema does not have a dedicated plan-details
    // column.  Keep the structured plan additions in the existing project task
    // record so they can follow the same signed-in user across devices.
    const planDetails = next.planDetails && typeof next.planDetails === "object" ? next.planDetails : {};
    const hasPlanDetails = Object.values(planDetails).some((value) => {
      if (value && typeof value === "object") return Object.values(value).some((item) => String(item || "").trim());
      return String(value || "").trim();
    });
    const { error: detailsError } = await clientOrThrow()
      .from("challenge_tasks")
      .upsert({
        project_id: project.id,
        day_number: 7,
        content_json: { type: "export_plan_details", ...planDetails },
        status: hasPlanDetails ? "in_progress" : "not_started",
      }, { onConflict: "project_id,day_number" });
    if (detailsError) throw detailsError;
    markOwned(user.id, ["planDraft"]);
    return { cloud: true, draft: next };
  }

  async function loadRoadmap(userId) {
    const modules = await publishedModules();
    const { data, error } = await clientOrThrow()
      .from("user_progress")
      .select("module_id,status,score,task_json")
      .eq("user_id", userId);
    if (error) throw error;
    if (!data?.length) return null;
    const positionById = new Map(modules.map((module) => [module.id, Number(module.sort_order)]));
    const notes = Object.fromEntries(data
      .map((row) => [positionById.get(row.module_id), row.task_json?.note || row.task_json?.supplierNotes || ""])
      .filter(([position, note]) => position && note));
    const answers = Object.fromEntries(data
      .map((row) => [positionById.get(row.module_id), row.task_json?.answers])
      .filter(([position, answer]) => position && answer && typeof answer === "object"));
    return {
      completed: data.filter((row) => row.status === "completed").map((row) => positionById.get(row.module_id)).filter(Boolean),
      notes,
      answers,
      quizScore: 0,
      supplierNotes: notes[2] || "",
    };
  }

  async function loadCalculation(userId) {
    const { data, error } = await clientOrThrow()
      .from("calculations")
      .select("client_id,currency,input_json,result_json")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data ? {
      clientId: data.client_id,
      currency: data.currency,
      ...(data.input_json || {}),
      ...(data.result_json || {}),
    } : null;
  }

  async function loadPlan(userId) {
    const { data: project, error: projectError } = await clientOrThrow()
      .from("challenge_projects")
      .select("id,client_id,updated_at,product_name,market")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (projectError) throw projectError;
    if (!project) return null;
    const { data: competitors, error: competitorsError } = await clientOrThrow()
      .from("project_competitors")
      .select("name,platform,price_minor,pros,cons,differentiation")
      .eq("project_id", project.id)
      .order("created_at");
    if (competitorsError) throw competitorsError;
    const { data: planTask, error: planTaskError } = await clientOrThrow()
      .from("challenge_tasks")
      .select("content_json")
      .eq("project_id", project.id)
      .eq("day_number", 7)
      .maybeSingle();
    if (planTaskError) throw planTaskError;
    const planDetails = planTask?.content_json?.type === "export_plan_details"
      ? {
          logistics: planTask.content_json.logistics || {},
          actionPlan: planTask.content_json.actionPlan || {},
        }
      : {};
    return {
      clientId: project.client_id,
      savedAt: project.updated_at,
      projectContext: { productName: project.product_name || "", targetMarket: project.market || "" },
      planDetails,
      competitors: (competitors || []).map((competitor) => ({
        name: competitor.name,
        platform: competitor.platform,
        price: Number(competitor.price_minor) / 100,
        pros: competitor.pros,
        cons: competitor.cons,
        difference: competitor.differentiation,
      })),
    };
  }

  async function hydrateMissingFromCloud(session) {
    const user = session?.user;
    if (!user || hasLocalData()) return { hydratedKeys: [], reason: hasLocalData() ? "local-present" : "signed-out" };
    const [roadmap, calculation, plan] = await Promise.all([
      loadRoadmap(user.id), loadCalculation(user.id), loadPlan(user.id),
    ]);
    const values = { roadmapProgress: roadmap, savedCalculation: calculation, planDraft: plan };
    const hydratedKeys = Object.entries(values).filter(([, value]) => value).map(([key, value]) => {
      setLocal(key, value);
      return key;
    });
    markOwned(user.id, hydratedKeys);
    return { hydratedKeys, reason: hydratedKeys.length ? "cloud-loaded" : "cloud-empty" };
  }

  async function syncLocalData() {
    const user = await currentUser();
    if (!user) throw new Error("请先登录后再同步");
    let synced = 0;
    const roadmap = getLocal("roadmapProgress");
    const calculation = getLocal("savedCalculation");
    const plan = getLocal("planDraft");
    if (roadmap) { await saveRoadmap(roadmap); synced += 1; }
    if (calculation) { await saveCalculation(calculation); synced += 1; }
    if (plan) { await savePlan(plan); synced += 1; }
    return { synced };
  }

  window.TradeStartData = {
    hasLocalData,
    hydrateMissingFromCloud,
    syncLocalData,
    saveRoadmap,
    saveCalculation,
    savePlan,
    clearOwnedData,
  };
})();
