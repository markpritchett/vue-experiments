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
    <section>
      <h3>Icons</h3>
      <IconBase icon-name="calendar">
        <IconCalendar />
      </IconBase>
      <IconBase
        icon-name="calendar"
        width="24"
        height="24"
        @click="calendarClicked"
      >
        <IconCalendar />
      </IconBase>
      <IconBase icon-name="calendar" width="36" height="36">
        <IconCalendar />
      </IconBase>
      <IconBase icon-name="calendar" width="48" height="48">
        <IconCalendar />
      </IconBase>
      <IconBase icon-name="calendar" width="60" height="60">
        <IconCalendar />
      </IconBase>
      <IconBase
        icon-name="calendar"
        width="72"
        height="72"
        icon-color="#42b983"
      >
        <IconCalendar />
      </IconBase>
    </section>
    <input type="text" v-model.trim="value" />
    <button :disabled="!value" @click="save">Save</button>
    <div v-if="showSaveSuccessMessage" :style="{ color: 'green' }">
      Success
    </div>
    <div v-if="showSaveFailureMessage" :style="{ color: 'red' }">
      Failure
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import IconBase from "@/components/Icons/IconBase.vue";
import IconCalendar from "@/components/Icons/IconCalendar.vue";

@Component({
  components: {
    HelloWorld,
    IconBase,
    IconCalendar
  }
})
export default class Home extends Vue {
  private values: string[] = [];

  async mounted() {
    const response = await fetch("api/values");
    this.values = await response.json();
  }

  calendarClicked() {
    this.$emit("Calendar was clicked");
  }

  get value() {
    return this.$store.state.value;
  }

  set value(value) {
    this.$store.commit("setValue", value);
  }

  save() {
    this.$store.dispatch("save");
  }

  get showSaveSuccessMessage() {
    return this.$store.state.showSaveSuccessMessage;
  }

  get showSaveFailureMessage() {
    return this.$store.state.showSaveFailureMessage;
  }
}
</script>
<style scoped>
section svg {
  vertical-align: middle;
}
</style>
