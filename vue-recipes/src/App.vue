<template>
  <div id="app">
    <Topbar />
    <Sidebar />
    <div id="view-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "buefy/dist/buefy.css";

console.log("starting App.vue");

import Topbar from "./components/globals/Topbar";
import Sidebar from "./components/globals/Sidebar";

export default {
  name: "App",
  components: {
    Topbar,
    Sidebar,
  },

  beforeCreate() {
    this.$store.commit("initStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = " ";
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#view-container {
  margin: 150px 20px;
}

body {
  margin: 0;
}

.search-input {
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  font-size: 14px;
  width: 150px;
  margin: auto;

  input[type="text"] {
    margin-top: 0;
    border-radius: 5px;
    padding: 10px 38px 10px 10px;
    width: 100%;
    border: 1px solid #ececec;

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder {
      color: #c4c0c0ab;
    }

    &::placeholder {
      color: #c4c0c0ab;
    }
  }
}
</style>
