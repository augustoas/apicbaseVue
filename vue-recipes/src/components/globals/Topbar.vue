<template>
  <div id="topbar">
    <div class="top-row">
      <div class="topbar-left">
        <div v-on:click="toggleSidebar()" class="hamburguer-icon">
          <b-icon pack="fas" icon="bars" size="is-medium"> </b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  components: {},
  data() {
    return {};
  },

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
    toggleSidebar() {
      console.log("toggle sidebar");
      this.$eventBus.$emit("togglesidebar", true);
    },
  },

  mounted() {
    console.log("topbar mounted");
  },
};
</script>

<style scoped lang="scss">
#topbar {
  position: fixed;
  padding: 15px;
  user-select: none;
  width: 100%;
  top: 0;
  z-index: 40;
  box-sizing: border-box;
  background-color: #1c344c;
  display: flex;
  flex-direction: column;
  margin: auto;
  //box-shadow: rgb(226 226 226) 0px -2px 0px inset;

  .top-row {
    display: flex;
    place-content: space-between;
    font-weight: 800;
    align-items: center;
    height: 65px;
  }
  .topbar-left {
    display: flex;
    flex-direction: row;
    margin-left: 5px;
  }
  .topbar-right {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
  }
  .hamburguer-icon {
    margin-left: 10px;
    margin-right: 15px;
    font-size: 16px;
    align-self: center;
    color: white;
  }
  .social-icon {
    margin-left: 12px;
    font-size: 16px;
    color: white;
  }

  .topbar-tab {
    margin: 0px 10px;
  }
  .logo-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-top: -14px;
    margin-bottom: -18px;
    margin-right: -17px;
    color: #1c344c;
  }
}
</style>
