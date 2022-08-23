//import axios from 'axios'

const menu = {
	state: () => ({
		isAdmin: false,
	}),
	mutations: {
		setMenuAccess(state, value) {
			state.isAdmin = value
		},
	},
	actions: {
		selectMenuAccess({commit}, value) {
			commit('setMenuAccess', value)
		},
	},
	getters: {
		
	},
}

export default menu
