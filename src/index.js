import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import store from './__data__/store'
import router from './router'
import VeeValidate from 'vee-validate';

Vue.use(VueMaterial)
Vue.use(VeeValidate)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')