<template>
    <div>
        VUE - About Page
        <button @click="load = true">
            Load
        </button>
        <div v-if="load">
            <BigLazy />
        </div>
    </div>
</template>
<script>
export default {
    components: {
        BigLazy: () => import(/* webpackChunkName: "bigLazy" */ '@/components/BigLazy')
    },
    data() {
        return {
            load: false
        }
    }
}
</script>