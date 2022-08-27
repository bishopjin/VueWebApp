import Vuex from 'vuex'
import Vue from 'vue'
import darkmode from './module/darkmode'
import user from './module/user'
import menu from './module/menu'
import inventory from './module/inventory'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		baseurl: 'https://laravelwebapp.genesedan.com/api/', //'http://127.0.0.1:8000/api/',
		overlayShow: false,
		accepted: 'application/json',
		reqType: 'application/json',
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
		}
	},
	actions: {
		setOverlay({commit}, value) {
			commit('setOverlayState', value)
		}
	},
	getters: {
		getOverlay(state) {
			return state.overlayShow
		},
		getHeaders(state){
			/* headers for rest api request */
			let header = {
				Accepted: state.accepted, 
				'Content-Type': state.reqType, 
				'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'lol',
			}
			return header
		},
	}
})