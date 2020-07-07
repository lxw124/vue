import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from './components/Hello'


export default new VueRouter({
    routes:[
        {path:'/',
        component:()=>import('./components/Hello')
    },
    ]
})