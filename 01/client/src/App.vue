<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Vue Experiements</a>
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
            <li class="nav-item" :class="{active: isExactActive}">
              <a class="nav-link" :href="href" @click="navigate">Home</a>
            </li>
          </router-link>
          <router-link to="/about" v-slot="{ href, navigate, isExactActive }">
            <li class="nav-item" :class="{active: isExactActive}">
              <a class="nav-link" :href="href" @click="navigate">About</a>
            </li>
          </router-link>
        </ul>
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
export default {
  computed: {
    busy() {
      return store.state.busy;
    }
  }
};
</script>
