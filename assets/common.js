(function () {
  const prefix = "tradestart.";

  window.TradeStart = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(prefix + key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        console.warn("无法读取本地数据", error);
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(prefix + key, JSON.stringify(value));
    },
    toast(message, tone = "success") {
      const oldToast = document.getElementById("tradestart-toast");
      if (oldToast) oldToast.remove();

      const toast = document.createElement("div");
      toast.id = "tradestart-toast";
      toast.setAttribute("role", "status");
      toast.textContent = message;
      toast.style.cssText = [
        "position:fixed",
        "right:24px",
        "bottom:24px",
        "z-index:200",
        "max-width:360px",
        "padding:12px 18px",
        "border-radius:10px",
        "box-shadow:0 12px 30px rgba(16,42,67,.18)",
        "font:500 14px/1.5 'Noto Sans SC',sans-serif",
        "color:#fff",
        `background:${tone === "error" ? "#ba1a1a" : tone === "warning" ? "#8a4f00" : "#006a63"}`,
      ].join(";");
      document.body.appendChild(toast);
      window.setTimeout(() => toast.remove(), 2600);
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach((button) => {
      if (button.onclick) return;
      const label = button.textContent.trim();
      if (label === "开始学习") {
        button.addEventListener("click", () => {
          window.location.href = "roadmap.html";
        });
      }
    });
  });
})();
