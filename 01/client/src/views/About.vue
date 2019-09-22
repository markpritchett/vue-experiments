<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>ID: {{ id }}</p>
  </div>
</template>
<script>
export default {
  props: ["id"]
};
</script>
