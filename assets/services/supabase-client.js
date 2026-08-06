(function () {
  let client = null;

  function getConfig() {
    return window.TRADESTART_CONFIG || {};
  }

  function isConfigured() {
    const config = getConfig();
    return Boolean(
      config.supabaseUrl
      && config.supabasePublishableKey
      && !config.supabaseUrl.includes("YOUR_PROJECT_REF")
      && !config.supabasePublishableKey.includes("YOUR_KEY")
    );
  }

  function getClient() {
    if (client) return client;
    if (!isConfigured() || !window.supabase?.createClient) return null;

    const config = getConfig();
    client = window.supabase.createClient(
      config.supabaseUrl,
      config.supabasePublishableKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
    return client;
  }

  window.TradeStartBackend = {
    getClient,
    isConfigured,
  };
})();
