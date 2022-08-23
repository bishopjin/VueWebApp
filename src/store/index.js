import Vuex from 'vuex'
import Vue from 'vue'
import darkmode from './module/darkmode'
import user from './module/user'
import menu from './module/menu'
import inventory from './module/inventory'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		baseurl: 'http://127.0.0.1:8000/api/',
		overlayShow: false,
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
		}
	}
})