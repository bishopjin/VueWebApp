import axios from 'axios'
import router from '../../router'

const user = {
	state: () => ({
		userIsLoggedIn: false,
		userInfo: {},
		token: '',
	}),
	mutations: {
		setLoginState(state, val) {
			state.userIsLoggedIn = val
		},
		setToken(state, tkn) {
			state.token = tkn
		},
		setUser(state, obj) {
			state.userInfo.username = obj.username
			state.userInfo.userType = obj.userType
			state.userInfo.access = obj.access
		},
	},
	actions: {
		getStoredToken({commit}) {
			let token = localStorage.getItem('token') ?? null
			if (token) {
				commit('setToken', token)
				commit('setLoginState', true)
			}
		},
		getStoredUser({commit}) {
			let userDet = localStorage.getItem('userDetail') ?? {}
			commit('setUser', JSON.parse(userDet))
		},
		async login({commit, rootState}, cred) {
			let userDet = {}, respObj = {}
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'login',
				data: {
					uname: cred.username,
					pword: cred.password,
					origin: cred.origin
				}
			})
			.then(function (response) {
				if (response.data.access == '1') {
					userDet.username = cred.username
					userDet.userType = ''
					userDet.access = ''

					commit('setToken', response.data.token)
					commit('setUser', userDet)
					localStorage.setItem('userDetail', JSON.stringify(userDet))
					localStorage.setItem('token', response.data.token)
					router.push({name: 'home'})
				}
				else {
					respObj = { msgType: 'error', msg: response.data.token}
				}
			})
			.catch(function (error) {
				console.log('error: ' + error.message)
			});

			return respObj
		},
		async logout({commit, dispatch, rootState}, val) {
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'logout',
				headers: {
					Accepted: 'appication/json', 
					'Content-Type': 'application/json', 
					'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'lol',
				}
			})
			.then(function (response) {
				let obj = { msgType: 'success', msg: response.data.message}
				dispatch('respMsg', obj, {root: true})
				commit('setLoginState', val)
				localStorage.removeItem('token')
				router.push({name: 'login'})
			})
			.catch(function (error) {
				console.log('error: ' + error.message)
			});
		}
	},
	getters: {
		getUserAuthState(state) {
			return state.userIsLoggedIn
		}
	}
}

export default user