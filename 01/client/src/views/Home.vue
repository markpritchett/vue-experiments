<template>
  <div class="home">
    <div
      class="alert alert-success"
      role="alert"
      v-if="showSaveSuccessMessage"
    >Saved value successfully</div>
    <div
      class="alert alert-danger"
      role="alert"
      v-if="showSaveFailureMessage"
    >There was a problem trying to save the value</div>
    <section>
      <h3>Values from server...</h3>
      <ul>
        <li :key="value" v-for="value in values">{{ value }}</li>
      </ul>
    </section>
    <section>
      <h3>Icons</h3>
      <IconBase icon-name="calendar">
        <IconCalendar />
      </IconBase>
      <IconBase icon-name="calendar" width="24" height="24" @click="calendarClicked">
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
      <IconBase icon-name="calendar" width="72" height="72" icon-color="#42b983">
        <IconCalendar />
      </IconBase>
    </section>
    <div class="form-inline">
      <input type="text" class="form-control" v-model.trim="value" />
      <button class="btn btn-primary" :disabled="!value || busy" @click="save">Save</button>
    </div>
    <div>
      <p>
        Value from environment variable:
        <strong>{{ someEnvironmentVariable }}</strong>
      </p>
      <p>
        Create a
        <code>env.local</code> with
        <code>VUE_APP_SOME_VALUE=Something LOCAL here</code> to see a local
        override
      </p>
    </div>
    <pre>{{ flatFoo }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
import IconBase from '@/components/Icons/IconBase.vue'
import IconCalendar from '@/components/Icons/IconCalendar.vue'

export default {
  name: 'home',
  components: {
    IconBase,
    IconCalendar
  },
  data () {
    return {
      values: [],
      foo: [1, 2, 3, [4, 5]]
    }
  },
  async mounted () {
    const { data } = await axios.get('api/values')
    this.values = data
  },
  methods: {
    calendarClicked () {
      this.$emit('Calendar was clicked')
    },
    save () {
      this.$store.dispatch('save')
    }
  },
  computed: {
    value: {
      get () {
        return this.$store.state.value
      },
      set (value) {
        this.$store.commit('setValue', value)
      }
    },
    busy () {
      return this.$store.state.busy
    },
    showSaveSuccessMessage () {
      return this.$store.state.showSaveSuccessMessage
    },
    showSaveFailureMessage () {
      return this.$store.state.showSaveFailureMessage
    },
    someEnvironmentVariable () {
      return process.env.VUE_APP_SOME_VALUE
    },
    flatFoo () {
      return this.foo.flat()
    }
  }
}
</script>
