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
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
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
