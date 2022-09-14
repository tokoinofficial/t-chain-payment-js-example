<template>
  <div id="app">
    <v-app>
      <main>
        <slot />
      </main>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>