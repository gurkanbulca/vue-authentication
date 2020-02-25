import Vue from 'vue'
import VueRouter from 'vue-router'
import About from "./pages/About.vue"
import Homepage from "./pages/Homepage.vue"
import Auth from "./pages/auth/Auth.vue"
import store from './store'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Homepage,
            beforeEnter(to, from, next) {
                next(store.getters.isAuthenticated ? true : "/auth")
            }
        },


        {
            path: '/about',
            component: About,
            beforeEnter(to, from, next) {
                next(store.getters.isAuthenticated ? true : "/auth")

            }
        },


        { path: '/auth', component: Auth }
    ],
    mode: 'history'
})