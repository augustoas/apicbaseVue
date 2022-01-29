import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Recipes from "../views/Recipes.vue";
import Ingredients from "../views/Ingredients.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
    //console.log("Error en router")
    //console.log(error)
    if (error.name != "NavigationDuplicated") {
      throw error;
    }
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
  },
  {
    path: "/ingredients",
    name: "Ingredients",
    component: Ingredients,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
