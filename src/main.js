import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import '../src/assets/styles/element-ui.scss' // 用于更改element主题颜色,并且只支持sass
// import 'element-ui/lib/theme-chalk/index.css'; // 使用element默认颜色
import store from './store/index'
import '../src/assets/form.less'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
