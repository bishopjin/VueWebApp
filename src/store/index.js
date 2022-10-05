import Vuex from 'vuex'
import Vue from 'vue'
import darkmode from './module/darkmode'
import user from './module/user'
import menu from './module/menu'
import inventory from './module/inventory'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		baseurl: 'http://127.0.0.1:8000/api/', //'https://laravelwebapp.genesedan.com/api/', 
		overlayShow: false,
		accepted: 'application/json',
		reqType: 'application/json',
		token: '',
		userIsLoggedIn: false,
	},
	modules: {
		darkmode,
		menu,
		user,
		inventory,
	},
	mutations: {
		setOverlayState(state, value) {
			state.overlayShow = value
		},
		setHeaderToken(state, tkn) {
			state.token = tkn
		},
		setUserLoginState(state, isLogin) {
			state.userIsLoggedIn = isLogin
		}
	},
	actions: {
		setOverlay({commit}, value) {
			commit('setOverlayState', value)
		},
		changeToken({commit}) {
			if (localStorage.getItem('token')) {
				commit('setHeaderToken', localStorage.getItem('token'))
				commit('setUserLoginState', true)
			}
			else {
				commit('setUserLoginState', false)
			}
		},
		checkErrorResponse({dispatch}, error) {
			if (error.response.status == 403) {
				router.push({ name: 'home' })
			}
			else if (error.response.status == 401) {
				localStorage.removeItem('token')
				localStorage.removeItem('userDetail')
				dispatch('changeToken').then(() => {
					router.push({name: 'login'})
				})
			}
		}
	},
	getters: {
		getUserAuthState(state) {
			return state.userIsLoggedIn
		},
		getOverlay(state) {
			return state.overlayShow
		},
		getHeaders(state){
			/* headers for rest api request */
			let header = {
				Accepted: state.accepted, 
				'Content-Type': state.reqType, 
				'Authorization': 'Bearer ' + state.token,
			}
			return header
		},
	}
})