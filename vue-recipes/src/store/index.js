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
    recipeList: [],
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
      state.ingredients = ingredients;
    },

    addIngredient(state, ingredient) {
      state.ingredients.push(ingredient);
    },

    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    updateRecipe(state, recipe) {
      const index = state.recipes.indexOf(recipe.id);
      state.recipes.splice(index, 1);
      state.recipes.push(recipe);
    },
    setIngredientsRecipes(state, ingrec) {
      state.ingrec = ingrec;
    },
    addIngredientsRecipes(state, ingrec) {
      state.ingrec.push(ingrec);
    },
    updateIngredientRecipe(state, ingrec) {
      console.log("en update store");

      const index = state.ingrec.indexOf(ingrec.id);
      state.ingrec.splice(index, 1);
      state.ingrec.push(ingrec);
    },
  },
  actions: {},
  modules: {},
});
