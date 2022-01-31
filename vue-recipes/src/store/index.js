import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isAuthenticated: false,
    ingredients: [],
    recipes: [],
    ingrec: [],
  },
  mutations: {
    initStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },

    setToken(state, token) {
      console.log("en set token ");
      state.token = token;
      state.isAuthenticated = true;
    },

    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },

    setIngredients(state, ingredients) {
      console.log("in setIngredients STORE");
      state.ingredients = ingredients;
    },

    setRecipes(state, recipes) {
      console.log("in setRecipes STORE");
      state.recipes = recipes;
    },

    setIngredientsRecipes(state, ingrec) {
      console.log("in setIngredientsRecipes STORE");
      state.ingrec = ingrec;
      this.$eventBus.$emit("updateIngRec", state.ingrec);
    },
    updateIngredientsRecipes(state, payload) {
      console.log("in update ingrec STORE");
      const item = state.ingrec.find((item) => item.id === payload.id);
      Object.assign(item, payload);
      this.$eventBus.$emit("updateIngRec", state.ingrec);
    },
  },
  actions: {},
  modules: {},
});
