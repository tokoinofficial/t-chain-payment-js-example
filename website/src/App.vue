<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "@layouts/main";
export default {
  components: { MainLayout },
  computed: {
    layout() {
      return `main-layout`;
    },
  },
};
</script>