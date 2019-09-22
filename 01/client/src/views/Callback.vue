<template>
  <h5>Signing in...</h5>
</template>
<script>
import Oidc from "oidc-client";
import axios from "axios";

export default {
  async created() {
    try {
      const result = await new Oidc.UserManager({
        response_mode: "query"
      }).signinRedirectCallback();

      this.$store.commit("setAuthenticated", true);
      this.$store.commit("setUser", result.profile);

      console.log(result.profile);

      const requestedPath = localStorage.getItem("requestPath");

      if (requestedPath) {
        this.$router.push({ path: requestedPath });
        localStorage.removeItem("requestedPath");
      } else {
        this.$router.push({ path: "/" });
      }

      axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${result.access_token}`;
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
    } catch (ex) {
      this.$store.commit("setAuthenticated", false);
    }
  }
};
</script>
