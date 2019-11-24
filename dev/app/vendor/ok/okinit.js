window.config = {
  app_id: 1278789120, // <-- insert APP ID here
  app_key: 'CBAHMJDNEBABABABA', // <-- insert APP PUBLIC KEY here
};
document.addEventListener('DOMContentLoaded', () => {
  window.config.oauth = {};
  window.config.oauth.url = location.origin + location.pathname; // setup callback url to our script
  if (window.location.hash) {
    // we are in popup and have OAUTH response data - send it back to the opener
    const hash = OKSDK.Util.getRequestParameters(window.location.hash);
    window.opener.postMessage(
      JSON.stringify({
        type: 'oauth',
        access_token: hash.access_token,
        session_secret_key: hash.session_secret_key,
      }),
      '*'
    );
    window.close();
    return;
  }
  const args = OKSDK.Util.getRequestParameters(window.location.search);
  if (args.run_oauth) {
    // we are in popup and requested to proceed with OAUTH login
    OKSDK.init(
      window.config,
      () => {},
      error => {
        alert(`OKSDK error while requesting access_token ${OKSDK.Util.toString(error)}`);
      }
    );
  }
});

window.startOAuthLogin = function() {
  // open a popup window with same html as we are, with an argument to proceed with OAUTH
  window.open(`${location.origin + location.pathname}?run_oauth=true`);
};
