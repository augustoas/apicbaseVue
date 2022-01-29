import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import axios from "axios";

//axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "https://apicbaseback.herokuapp.com/";
Vue.config.productionTip = false;
Vue.use(Buefy);

import { eventBus } from "@/plugins/eventBus";
Vue.prototype.$eventBus = eventBus;

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount("#app");
