(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const state = TradeStart.get("roadmapProgress", {
      completed: [1],
      quizScore: 0,
      supplierNotes: "",
    });
    const nodes = Array.from(document.querySelectorAll("#roadmap-nodes > .cursor-pointer"));
    const progressText = document.getElementById("roadmap-progress-text");
    const completedText = document.getElementById("roadmap-completed-text");
    const progressBar = document.getElementById("roadmap-progress-bar");
    const quizTitle = document.getElementById("quiz-title");
    const markComplete = document.getElementById("mark-complete");

    function save() {
      TradeStart.set("roadmapProgress", state);
    }

    function render() {
      const completedCount = new Set(state.completed).size;
      const percent = (completedCount / 8) * 100;
      progressText.textContent = `总体进度 ${percent.toFixed(1)}%`;
      completedText.textContent = `已完成 ${completedCount}/8 个节点`;
      progressBar.style.width = `${percent}%`;
      quizTitle.textContent = `小测验 (${state.quizScore}/3)`;

      if (state.completed.includes(2)) {
        markComplete.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> 已完成本节点';
        markComplete.disabled = true;
        markComplete.classList.add("opacity-70", "cursor-not-allowed");
        const circle = nodes[1]?.firstElementChild;
        if (circle) circle.innerHTML = '<span class="material-symbols-outlined">check</span>';
      }
    }

    function openDialog(title, content, onSubmit) {
      const dialog = document.createElement("dialog");
      dialog.style.cssText = "width:min(560px,calc(100% - 32px));border:0;border-radius:16px;padding:0;box-shadow:0 24px 80px rgba(16,42,67,.25)";
      dialog.innerHTML = `
        <form method="dialog" style="padding:24px;font-family:'Noto Sans SC',sans-serif;color:#102a43">
          <h2 style="font-size:22px;font-weight:700;margin:0 0 18px">${title}</h2>
          ${content}
          <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:22px">
            <button value="cancel" type="button" data-cancel style="padding:10px 18px;border:1px solid #cbd5e1;border-radius:8px;background:#fff">取消</button>
            <button value="confirm" type="submit" style="padding:10px 18px;border:0;border-radius:8px;background:#006a63;color:#fff;font-weight:600">保存</button>
          </div>
        </form>`;
      document.body.appendChild(dialog);
      dialog.querySelector("[data-cancel]").addEventListener("click", () => dialog.close("cancel"));
      dialog.addEventListener("close", () => dialog.remove());
      dialog.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        if (onSubmit(dialog)) dialog.close("confirm");
      });
      dialog.showModal();
    }

    document.getElementById("supplier-record").addEventListener("click", () => {
      openDialog(
        "供应商记录",
        `<label style="display:block;font-size:14px;margin-bottom:8px">记录供应商名称、MOQ 与报价</label>
         <textarea data-notes rows="7" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;resize:vertical" placeholder="示例：供应商A｜MOQ 500件｜¥35/件">${state.supplierNotes || ""}</textarea>`,
        (dialog) => {
          state.supplierNotes = dialog.querySelector("[data-notes]").value.trim();
          save();
          TradeStart.toast("供应商记录已保存在当前浏览器");
          return true;
        },
      );
    });

    document.getElementById("start-quiz").addEventListener("click", () => {
      const questionStyle = "padding:12px;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:12px";
      openDialog(
        "节点 2 小测验",
        `<div style="${questionStyle}"><p style="font-weight:600;margin:0 0 8px">1. MOQ 指什么？</p><select name="q1" style="width:100%;padding:8px"><option value="">请选择</option><option value="min">最小起订量</option><option value="price">最低售价</option></select></div>
         <div style="${questionStyle}"><p style="font-weight:600;margin:0 0 8px">2. OEM 的核心含义是？</p><select name="q2" style="width:100%;padding:8px"><option value="">请选择</option><option value="factory">按品牌方要求代工生产</option><option value="shipping">国际运输服务</option></select></div>
         <div style="${questionStyle}"><p style="font-weight:600;margin:0 0 8px">3. 选品时什么会直接影响国际运费？</p><select name="q3" style="width:100%;padding:8px"><option value="">请选择</option><option value="weight">体积与重量</option><option value="color">商品颜色</option></select></div>`,
        (dialog) => {
          const answers = new FormData(dialog.querySelector("form"));
          state.quizScore = [answers.get("q1") === "min", answers.get("q2") === "factory", answers.get("q3") === "weight"].filter(Boolean).length;
          save();
          render();
          TradeStart.toast(state.quizScore === 3 ? "回答正确，可以完成本节点" : `答对 ${state.quizScore}/3，请复习后重试`, state.quizScore === 3 ? "success" : "warning");
          return true;
        },
      );
    });

    markComplete.addEventListener("click", () => {
      if (state.quizScore < 3) {
        TradeStart.toast("请先完成 3 道小测验", "warning");
        return;
      }
      if (!state.completed.includes(2)) state.completed.push(2);
      save();
      render();
      TradeStart.toast("节点 2 已完成，学习进度已保存");
    });

    document.getElementById("previous-node").addEventListener("click", () => {
      TradeStart.toast("节点 1 已完成；当前原型展示节点 2 内容");
    });
    document.getElementById("next-node").addEventListener("click", () => {
      if (!state.completed.includes(2)) {
        TradeStart.toast("完成当前节点后才能进入下一节点", "warning");
        return;
      }
      TradeStart.toast("节点 3 内容将在后续前端页面中补充");
    });
    nodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        if (index === 1) document.querySelector("section.bg-surface.rounded-xl")?.scrollIntoView({ behavior: "smooth" });
        else TradeStart.toast(index === 0 ? "节点 1 已完成" : "请按顺序完成当前学习节点", index === 0 ? "success" : "warning");
      });
    });

    render();
  });
})();
