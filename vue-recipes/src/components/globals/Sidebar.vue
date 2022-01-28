<template>
  <div id="sidemenu" class="sidemenu">
    <div class="sidebar-header">
      <a class="closebtn" v-on:click="closeSidemenu()">
        <b-icon pack="fas" icon="times" size="is-medium"> </b-icon>
      </a>
    </div>

    <div class="section-container">
      <h1 class="section-title">{{ "OPCIONES" }}</h1>

      <!-- NOT AUTH ROUTES-->
      <div class="route" v-if="!isAuth">
        <span class="route-text" v-on:click="changeRoute('Login')"
          >{{ "Login" }}
        </span>
      </div>
      <div class="route" v-if="!isAuth">
        <span class="route-text" v-on:click="changeRoute('Register')"
          >{{ "Register" }} </span
        ><!-- REGISTER -->
      </div>

      <!-- AUTH ROUTES -->
      <div class="route" v-if="isAuth">
        <span class="route-text" v-on:click="changeRoute('Recipes')"
          >{{ "Recipes" }}
        </span>
      </div>
      <div class="route" v-if="isAuth">
        <span class="route-text" v-on:click="changeRoute('Ingredients')"
          >{{ "Ingredients" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      nodo: null,
      isOpen: false,
    };
  },
  computed: {
    route() {
      return this.$route.name;
    },

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
    openSidemenu() {
      this.nodo.style.width = "80%";
      this.isOpen = true;
    },
    closeSidemenu() {
      this.nodo.style.width = "0";
      this.isOpen = false;
    },

    changeRoute(nombre) {
      this.closeSidemenu();
      this.$router.push({ name: nombre });
    },
  },
  mounted() {
    this.nodo = document.getElementById("sidemenu");
    this.closeSidemenu();
    this.$eventBus.$on("closesidebar", () => {
      if (this.nodo) this.closeSidemenu();
    });
    this.$eventBus.$on("opensidebar", () => {
      if (this.nodo) this.openSidemenu();
    });
    this.$eventBus.$on("togglesidebar", () => {
      if (this.nodo) {
        if (this.isOpen) this.closeSidemenu();
        else this.openSidemenu();
      }
    });
  },
};
</script>

<style scoped lang="scss">
#sidemenu {
  height: 100%;
  max-width: 400px;
  width: 0;
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.3s;
  box-shadow: 0 0 100px 0 rgba(0, 0, 0, 0.8);

  div.sidebar-header {
    display: flex;
    padding-top: 25px;
  }

  .section-container {
    padding: 30px 0px;
    margin: 0px 25px;
    border-bottom: 1px solid #dddddd;
  }

  .section-title {
    color: var(--colorprincipal);
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  .logo_sidemenu {
    color: white;
    padding-left: 25px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 50px;

    i {
      color: var(--colorprincipal);
      float: none;
      font-size: 24px;
      margin-right: 10px;
    }

    span {
      color: white;
    }
  }

  div.route {
    cursor: pointer;
    font-size: 16px;
    color: #4f4f4f;
    display: flex;
    transition: 0.3s;
    margin: 20px 0px;

    i {
      margin-right: 20px;
      align-self: center;
    }
  }

  .closebtn {
    position: absolute;
    top: 23px;
    right: 25px;
    border: none;
    width: auto;
    color: gray;
  }
}
</style>
