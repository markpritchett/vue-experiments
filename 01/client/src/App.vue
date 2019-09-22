<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Vue Experiements</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/" v-slot="{ href, navigate, isExactActive }">
            <li class="nav-item" :class="{ active: isExactActive }">
              <a class="nav-link" :href="href" @click="navigate">Home</a>
            </li>
          </router-link>
          <router-link to="/about" v-slot="{ navigate, isActive }">
            <li class="nav-item" :class="{ active: isActive }">
              <a class="nav-link">About</a>
            </li>
          </router-link>
          <router-link
            v-if="$store.state.roles.includes('SuperAdminUser')"
            to="/super-admin"
            v-slot="{ href, navigate, isExactActive }"
          >
            <li class="nav-item" :class="{ active: isExactActive }">
              <a class="nav-link" :href="href" @click="navigate">Super Admin</a>
            </li>
          </router-link>
        </ul>
        {{ $store.state.userFullName }}

        <button
          class="btn btn-outline-success ml-2 my-2 my-sm-0"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </nav>
    <div class="container">
      <div class="text-center">
        <div class="spinner-border text-primary" role="status" v-if="busy">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import store from "./store";
import Oidc from "oidc-client";
import config from "./config";
const mgr = new Oidc.UserManager(config);

export default {
  methods: {
    logout() {
      mgr.signoutRedirect();
    }
  },
  computed: {
    busy() {
      return store.state.busy;
    }
  }
};
</script>
