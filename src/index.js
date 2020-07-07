import Vue from 'Vue'
import App from './App.vue'
import router from './router.js'
import Router from 'vue-router'
Vue.use(Router)
new Vue({
    el:'#app',
    render:h=>h(App),
    router
})