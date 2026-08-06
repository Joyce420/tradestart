(function () {
  function clientOrThrow() {
    const client = window.TradeStartBackend?.getClient();
    if (!client) throw new Error("后端尚未配置");
    return client;
  }

  async function getSession() {
    const client = window.TradeStartBackend?.getClient();
    if (!client) return null;
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function signUp({ email, password, displayName }) {
    const { data, error } = await clientOrThrow().auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    });
    if (error) throw error;
    return data;
  }

  async function signIn({ email, password }) {
    const { data, error } = await clientOrThrow().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const { error } = await clientOrThrow().auth.signOut();
    if (error) throw error;
  }

  function onAuthStateChange(callback) {
    const client = window.TradeStartBackend?.getClient();
    if (!client) return { unsubscribe() {} };
    const { data } = client.auth.onAuthStateChange((_event, session) => callback(session));
    return data.subscription;
  }

  window.TradeStartAuth = {
    getSession,
    signUp,
    signIn,
    signOut,
    onAuthStateChange,
  };
})();
