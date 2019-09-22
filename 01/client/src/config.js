export default {
  authority: process.env.VUE_APP_AUTHORITY,
  client_id: "spa",
  redirect_uri: process.env.VUE_APP_REDIRECT_URI,
  response_type: "code",
  scope: "openid profile api1",
  post_logout_redirect_uri: process.env.VUE_APP_POST_LOGOUT_REDIRECT_URI
};
