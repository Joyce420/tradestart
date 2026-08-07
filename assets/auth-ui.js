(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const learningButton = Array.from(document.querySelectorAll("button"))
      .find((button) => button.textContent.trim() === "开始学习");
    if (!learningButton?.parentElement) return;

    const authButton = document.createElement("button");
    authButton.id = "auth-button";
    authButton.type = "button";
    authButton.textContent = "登录";
    authButton.className = "border border-primary text-primary px-4 py-2 rounded-lg font-button text-button hover:bg-surface-container-low transition-colors";
    learningButton.parentElement.insertBefore(authButton, learningButton);

    let session = null;
    let subscription = null;
    let handledSessionUserId = null;

    async function handleSessionData(nextSession) {
      const userId = nextSession?.user?.id;
      if (!userId) {
        handledSessionUserId = null;
        return;
      }
      if (handledSessionUserId === userId || !window.TradeStartData) return;
      handledSessionUserId = userId;
      try {
        const result = await TradeStartData.hydrateMissingFromCloud(nextSession);
        if (result.hydratedKeys.length) {
          TradeStart.toast("已载入你的云端学习数据");
          window.setTimeout(() => window.location.reload(), 500);
        } else if (result.reason === "local-present") {
          const noticeKey = `tradestart.syncNotice.${userId}`;
          if (!sessionStorage.getItem(noticeKey)) {
            sessionStorage.setItem(noticeKey, "1");
            TradeStart.toast("检测到本地数据，可在“我的账号”中选择同步");
          }
        }
      } catch (error) {
        console.warn("云端数据载入失败", error);
        TradeStart.toast("云端数据暂时无法载入，本地功能仍可使用", "warning");
      }
    }

    function updateButton(nextSession) {
      session = nextSession;
      authButton.textContent = session?.user?.email ? "我的账号" : "登录";
      void handleSessionData(nextSession);
    }

    function closeModal(modal) {
      modal.remove();
      document.body.style.overflow = "";
    }

    function createModal() {
      const modal = document.createElement("div");
      modal.id = "auth-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "auth-modal-title");
      modal.style.cssText = "position:fixed;inset:0;z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(16,42,67,.72);backdrop-filter:blur(4px)";
      document.body.style.overflow = "hidden";
      document.body.appendChild(modal);
      return modal;
    }

    function field(label, type, name, autocomplete, placeholder = "") {
      return `<label style="display:block;margin-bottom:14px;font:500 14px/1.5 'Noto Sans SC',sans-serif;color:#334e68">${label}<input name="${name}" type="${type}" autocomplete="${autocomplete}" placeholder="${placeholder}" required style="display:block;width:100%;margin-top:6px;padding:11px 12px;border:1px solid #cbd5e1;border-radius:8px;font:400 15px/1.4 'Noto Sans SC',sans-serif;box-sizing:border-box"></label>`;
    }

    function authErrorMessage(error) {
      const message = `${error?.code || ""} ${error?.message || ""}`.toLowerCase();
      if (message.includes("after 30 seconds") || message.includes("rate limit") || message.includes("over_email_send_rate_limit")) {
        return "安全限制：30 秒内只能发送一次验证邮件。刚才的注册请求可能已成功，请先检查邮箱；如果没有收到，倒计时结束后再试。";
      }
      if (message.includes("user already registered")) return "该邮箱已经注册，请切换到“登录”。";
      if (message.includes("invalid login credentials")) return "邮箱或密码不正确。";
      if (message.includes("email not confirmed")) return "邮箱尚未验证，请先打开验证邮件完成确认。";
      if (message.includes("password") && (message.includes("weak") || message.includes("least"))) return "密码强度不足，请使用至少 8 位并包含字母和数字的密码。";
      if (message.includes("email") && (message.includes("invalid") || message.includes("validate"))) return "邮箱格式不正确，请检查后重试。";
      if (message.includes("signup") && message.includes("disabled")) return "当前暂未开放新用户注册。";
      return "操作失败，请稍后重试。";
    }

    function startCooldown(button, originalLabel, seconds = 30) {
      let remaining = seconds;
      button.disabled = true;
      button.style.opacity = ".7";
      button.style.cursor = "wait";
      const update = () => {
        if (!button.isConnected) return false;
        button.textContent = `请等待 ${remaining} 秒`;
        if (remaining <= 0) {
          button.disabled = false;
          button.style.opacity = "1";
          button.style.cursor = "pointer";
          button.textContent = originalLabel;
          return false;
        }
        remaining -= 1;
        return true;
      };
      update();
      const timer = window.setInterval(() => {
        if (!update()) window.clearInterval(timer);
      }, 1000);
    }

    function showSignedOutModal(mode = "signin") {
      const modal = createModal();
      modal.innerHTML = `
        <div style="width:min(430px,100%);background:#fff;border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.24);overflow:hidden;font-family:'Noto Sans SC',sans-serif">
          <div style="display:flex;justify-content:space-between;align-items:start;padding:22px 24px 14px">
            <div><h2 id="auth-modal-title" style="margin:0;color:#102a43;font-size:24px">${mode === "signup" ? "创建账号" : "登录 TradeStart"}</h2><p style="margin:6px 0 0;color:#627d98;font-size:14px">登录后可跨设备保存学习进度和项目草稿</p></div>
            <button type="button" data-close aria-label="关闭" style="border:0;background:transparent;font-size:26px;color:#627d98;cursor:pointer">×</button>
          </div>
          <div style="display:flex;margin:0 24px 18px;border-bottom:1px solid #e2e8f0">
            <button type="button" data-mode="signin" style="flex:1;padding:10px;border:0;border-bottom:2px solid ${mode === "signin" ? "#006a63" : "transparent"};background:#fff;color:#102a43;font-weight:600">登录</button>
            <button type="button" data-mode="signup" style="flex:1;padding:10px;border:0;border-bottom:2px solid ${mode === "signup" ? "#006a63" : "transparent"};background:#fff;color:#102a43;font-weight:600">注册</button>
          </div>
          <form style="padding:0 24px 24px">
            ${field(mode === "signup" ? "邮箱（登录账号）" : "邮箱", "email", "email", "email", "name@example.com")}
            ${field("密码", "password", "password", mode === "signup" ? "new-password" : "current-password", "至少 8 位，建议包含字母和数字")}
            ${mode === "signup" ? field("再次输入密码", "password", "confirmPassword", "new-password", "请再次输入密码") : ""}
            <p data-error role="alert" style="display:none;margin:0 0 12px;color:#ba1a1a;font-size:13px"></p>
            <button type="submit" style="width:100%;padding:12px;border:0;border-radius:8px;background:#006a63;color:#fff;font-size:15px;font-weight:700;cursor:pointer">${mode === "signup" ? "注册" : "登录"}</button>
            <p style="margin:14px 0 0;color:#829ab1;font-size:12px;text-align:center">注册即表示同意仅将账号用于保存本平台的学习与模拟数据。</p>
          </form>
        </div>`;

      modal.querySelector("[data-close]").addEventListener("click", () => closeModal(modal));
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal(modal);
      });
      modal.querySelectorAll("[data-mode]").forEach((button) => {
        button.addEventListener("click", () => {
          closeModal(modal);
          showSignedOutModal(button.dataset.mode);
        });
      });
      modal.querySelector("form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const errorBox = modal.querySelector("[data-error]");
        const submit = modal.querySelector('button[type="submit"]');
        const values = Object.fromEntries(new FormData(event.currentTarget));
        errorBox.style.display = "none";

        if (values.password.length < 8) {
          errorBox.textContent = "密码至少需要 8 位";
          errorBox.style.display = "block";
          return;
        }
        if (mode === "signup" && values.password !== values.confirmPassword) {
          errorBox.textContent = "两次输入的密码不一致，请重新确认";
          errorBox.style.display = "block";
          return;
        }
        submit.disabled = true;
        submit.textContent = "处理中…";
        try {
          if (mode === "signup") {
            const email = values.email.trim();
            const result = await TradeStartAuth.signUp({ email, password: values.password, displayName: email.split("@")[0] });
            closeModal(modal);
            TradeStart.toast(result.session ? "注册成功，已登录" : "注册成功，请前往邮箱完成验证");
          } else {
            await TradeStartAuth.signIn({ email: values.email.trim(), password: values.password });
            closeModal(modal);
            TradeStart.toast("登录成功");
          }
        } catch (error) {
          const originalLabel = mode === "signup" ? "注册" : "登录";
          const isCooldown = /after 30 seconds|rate limit|over_email_send_rate_limit/i.test(`${error?.code || ""} ${error?.message || ""}`);
          errorBox.textContent = authErrorMessage(error);
          errorBox.style.display = "block";
          if (isCooldown) startCooldown(submit, originalLabel);
          else {
            submit.disabled = false;
            submit.textContent = originalLabel;
          }
        }
      });
    }

    function showAccountModal() {
      const hasLocalData = TradeStartData?.hasLocalData?.() || false;
      const modal = createModal();
      modal.innerHTML = `
        <div style="width:min(430px,100%);background:#fff;border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.24);padding:24px;font-family:'Noto Sans SC',sans-serif;box-sizing:border-box">
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div><h2 id="auth-modal-title" style="margin:0;color:#102a43;font-size:24px">我的账号</h2><p style="margin:8px 0 0;color:#627d98;font-size:14px">${session.user.email}</p></div>
            <button type="button" data-close aria-label="关闭" style="border:0;background:transparent;font-size:26px;color:#627d98;cursor:pointer">×</button>
          </div>
          <div style="margin-top:22px;padding:14px;border-radius:10px;background:#f7f9fc;color:#486581;font-size:14px">路线图进度、利润计算记录和出口方案草稿可保存到云端。同步前不会自动覆盖当前浏览器数据。</div>
          <button type="button" data-sync ${hasLocalData ? "" : "disabled"} style="width:100%;margin-top:14px;padding:11px;border:0;border-radius:8px;background:${hasLocalData ? "#006a63" : "#cbd5e1"};color:#fff;font-weight:700;cursor:${hasLocalData ? "pointer" : "not-allowed"}">${hasLocalData ? "同步本地数据到云端" : "当前没有可同步的本地数据"}</button>
          <button type="button" data-signout style="width:100%;margin-top:18px;padding:11px;border:1px solid #102a43;border-radius:8px;background:#fff;color:#102a43;font-weight:700;cursor:pointer">退出登录</button>
        </div>`;
      modal.querySelector("[data-close]").addEventListener("click", () => closeModal(modal));
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal(modal);
      });
      modal.querySelector("[data-sync]").addEventListener("click", async (event) => {
        if (!hasLocalData) return;
        if (!window.confirm("确认将当前浏览器中的路线图、计算记录和方案草稿同步到你的云端账号吗？")) return;
        const button = event.currentTarget;
        button.disabled = true;
        button.textContent = "同步中…";
        try {
          const result = await TradeStartData.syncLocalData();
          button.textContent = result.synced ? `已同步 ${result.synced} 类数据` : "没有需要同步的数据";
          TradeStart.toast(result.synced ? "本地数据已同步到云端" : "没有需要同步的数据");
        } catch (error) {
          button.disabled = false;
          button.textContent = "重新同步本地数据";
          TradeStart.toast(error.message || "同步失败，请稍后重试", "error");
        }
      });
      modal.querySelector("[data-signout]").addEventListener("click", async () => {
        try {
          const userId = session.user.id;
          await TradeStartAuth.signOut();
          TradeStartData?.clearOwnedData?.(userId);
          closeModal(modal);
          TradeStart.toast("已退出登录");
        } catch (error) {
          TradeStart.toast(error.message || "退出失败", "error");
        }
      });
    }

    authButton.addEventListener("click", () => {
      if (!TradeStartBackend.isConfigured()) {
        TradeStart.toast("后端正在配置中，登录功能暂未开放", "warning");
        return;
      }
      if (session) showAccountModal();
      else showSignedOutModal();
    });

    if (TradeStartBackend.isConfigured()) {
      try {
        updateButton(await TradeStartAuth.getSession());
        subscription = TradeStartAuth.onAuthStateChange(updateButton);
      } catch (error) {
        console.warn("会话恢复失败", error);
      }
    }

    window.addEventListener("pagehide", () => subscription?.unsubscribe?.(), { once: true });
  });
})();
