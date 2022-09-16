import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
Vue.use(ElementUI);
import './assets/css/base.css'
import './assets/css/common.less'
Vue.prototype.$bus = new Vue()
import { initTheme } from './theme'
let theme = localStorage.getItem('theme') === 'light' ? false : true
initTheme(theme)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
