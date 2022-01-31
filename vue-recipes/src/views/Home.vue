<template>
  <div id="home">
    <h1>Welcome Home</h1>
    <div v-if="isAuth" class="actions-container">
      <div class="action-button" v-on:click="changeRoute('Ingredients')">
        Ingredients
      </div>
      <div class="action-button" v-on:click="changeRoute('Recipes')">
        Recipes
      </div>
    </div>
    <h2>ApicBase assignment</h2>

  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  computed: {
    isAuth() {
      if (
        this.$store.state.isAuthenticated &&
        this.$store.state.token &&
        this.$store.state.token !== "undefined"
      )
        return true;
      return false;
    },
  },
  methods: {
    changeRoute(nombre) {
      this.$router.push({ name: nombre });
    },
  }
};
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;

  h1 {
    margin-bottom: 50px;
  }

  h2 {
    margin-top: 100px;
  }

  .actions-container {
    display: flex;
    justify-content: space-evenly;
    max-width: 450px;
    margin: auto;
  }

  .action-button {
      padding: 10px;
      background-color: #1c344c;
      width: 200px;
      border: 0px solid;
      font-size: 16px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      margin: 10px;
      
  }
}
</style>
