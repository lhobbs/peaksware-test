import Vue from 'vue'
import App from './App.vue'
import { Services } from '@/assets/scripts'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDL81UUoNSWVlnCTay0RKnikUOrkBJInl0",
    libraries: "places" 
  }
});

Vue.config.productionTip = false

/* =============================================================================
Global variables accessible in every component
============================================================================= */
Vue.prototype.$services = new Services()

new Vue({
  render: h => h(App),
}).$mount('#app')
