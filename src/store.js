import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { fbAPIKey } from '../private/keys'
import { router } from './router';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        fbAPIKey,

    },
    getters: {
        getAPIKey(state) {
            return state.fbAPIKey;
        },
        isAuthenticated(state) {
            return state.token !== ''
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        }
    },
    actions: {
        initAuth({ commit, dispatch }) {
            let token = localStorage.getItem('token')
            if (token) {
                let expirationDate = localStorage.getItem('expirationDate')
                let time = new Date().getTime()
                if (time > expirationDate) {
                    dispatch('logout')
                } else {
                    commit('setToken', token)
                    router.push('/')
                    dispatch('setTimeoutTimer',expirationDate-time)
                }

            } else {
                // router.push('/auth')
                return false
            }
        },
        login({ state, commit, dispatch }, authData) {
            const key = state.fbAPIKey;
            let authLink =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            if (authData.isUser) {
                authLink =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            }

            return axios
                .post(authLink + key, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then(response => {
                    commit('setToken', response.data.idToken)
                    localStorage.setItem('token', response.data.idToken)

                    localStorage.setItem('expirationDate', new Date().getTime() + response.data.expiresIn * 1000)
                    // localStorage.setItem('expirationDate', new Date().getTime() + 5000)

                    dispatch('setTimeoutTimer',+response.data.expiresIn * 1000)
                    // dispatch('setTimeoutTimer', +5000)

                })
                .catch(err => console.log(err))
        },
        logout({ commit }) {
            commit('clearToken');
            localStorage.removeItem('token')
            router.replace('/auth')

        },
        setTimeoutTimer({ dispatch }, expiresIn) {
            setTimeout(() => {
                dispatch('logout')
            }, expiresIn)
        }
    }
})

export default store