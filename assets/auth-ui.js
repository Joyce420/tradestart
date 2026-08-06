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

    function updateButton(nextSession) {
      session = nextSession;
      authButton.textContent = session?.user?.email ? "我的账号" : "登录";
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
            ${mode === "signup" ? field("昵称", "text", "displayName", "name", "怎么称呼你") : ""}
            ${field("邮箱", "email", "email", "email", "name@example.com")}
            ${field("密码", "password", "password", mode === "signup" ? "new-password" : "current-password", "至少 8 位")}
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
        submit.disabled = true;
        submit.textContent = "处理中…";
        try {
          if (mode === "signup") {
            const result = await TradeStartAuth.signUp({ email: values.email.trim(), password: values.password, displayName: values.displayName.trim() });
            closeModal(modal);
            TradeStart.toast(result.session ? "注册成功，已登录" : "注册成功，请前往邮箱完成验证");
          } else {
            await TradeStartAuth.signIn({ email: values.email.trim(), password: values.password });
            closeModal(modal);
            TradeStart.toast("登录成功");
          }
        } catch (error) {
          errorBox.textContent = error.message || "操作失败，请稍后重试";
          errorBox.style.display = "block";
          submit.disabled = false;
          submit.textContent = mode === "signup" ? "注册" : "登录";
        }
      });
    }

    function showAccountModal() {
      const modal = createModal();
      modal.innerHTML = `
        <div style="width:min(430px,100%);background:#fff;border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.24);padding:24px;font-family:'Noto Sans SC',sans-serif;box-sizing:border-box">
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div><h2 id="auth-modal-title" style="margin:0;color:#102a43;font-size:24px">我的账号</h2><p style="margin:8px 0 0;color:#627d98;font-size:14px">${session.user.email}</p></div>
            <button type="button" data-close aria-label="关闭" style="border:0;background:transparent;font-size:26px;color:#627d98;cursor:pointer">×</button>
          </div>
          <div style="margin-top:22px;padding:14px;border-radius:10px;background:#f7f9fc;color:#486581;font-size:14px">云端数据同步将在下一批接入。当前本地记录不会被删除。</div>
          <button type="button" data-signout style="width:100%;margin-top:18px;padding:11px;border:1px solid #102a43;border-radius:8px;background:#fff;color:#102a43;font-weight:700;cursor:pointer">退出登录</button>
        </div>`;
      modal.querySelector("[data-close]").addEventListener("click", () => closeModal(modal));
      modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal(modal);
      });
      modal.querySelector("[data-signout]").addEventListener("click", async () => {
        try {
          await TradeStartAuth.signOut();
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
