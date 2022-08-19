

const user = {
	state: () => ({
		userIsLoggedIn: false,
	}),
	mutations: {
		setStoredToken(state, tkn) {
			state.userIsLoggedIn = tkn
		},
	},
	actions: {
		getStoredToken({commit}) {
			commit('setStoredToken', localStorage.getItem('token') ? true : false)
		},
		logout() {
			localStorage.removeItem('token')
		}
	},
	getters: {
		getUserAuthState(state) {
			return state.userIsLoggedIn
		}
	}
}

export default user