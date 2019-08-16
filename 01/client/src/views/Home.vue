<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <section>
      <h3>Values from server...</h3>
      <ul>
        <li :key="value" v-for="value in values">{{value}}</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private values: string[] = [];

  async mounted() {
    const response = await fetch("api/values");
    this.values = await response.json();
  }
}
</script>
