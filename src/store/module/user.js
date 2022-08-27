import axios from 'axios'
import router from '../../router'

const user = {
	state: () => ({
		userIsLoggedIn: false,
		userInfo: {
			username: '',
			permission: [],
			role: [],
			id: 0,
		},
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
			state.userInfo.permission = obj.permission
			state.userInfo.role = obj.role
			state.userInfo.id = obj.id
		},
	},
	actions: {
		getStoredToken({commit}) {
			let token = localStorage.getItem('token') ?? null
			if (token) {
				let usersInfo = localStorage.getItem('userDetail')
				commit('setUser', JSON.parse(usersInfo))
				commit('setToken', token)
				commit('setLoginState', true)
			}
		},
		getStoredUser({commit}) {
			let userDet = localStorage.getItem('userDetail') ?? {}
			commit('setUser', JSON.parse(userDet))
		},
		async login({commit, dispatch, rootState}, cred) {
			let userDet = {}, respObj = {}
			dispatch('setOverlay', true)
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
				if (response.data.id > 0) {
					userDet.username = cred.username
					userDet.role = response.data.role
					userDet.id = response.data.id
					userDet.permission = response.data.permission

					commit('setToken', response.data.token)
					commit('setUser', userDet)
					localStorage.setItem('userDetail', JSON.stringify(userDet))
					localStorage.setItem('token', response.data.token)
					respObj = { id: response.data.id, msgType: 'success', msg: 'Success'}
				}
				else {
					respObj = { id: response.data.id, msgType: 'error', msg: response.data.token}
				}
			})
			.catch(function (error) {
				respObj = { id: 0, msgType: 'error', msg: ''}
				console.log('error: ' + error.message)
			});

			return respObj
		},
		async logout({commit, rootState, rootGetters}, val) {
			let respObj = {}
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'logout',
				headers: rootGetters.getHeaders
			})
			.then(function (response) {
				console.log(response)
				respObj = { msgType: 'success', msg: response.data.token}
				commit('setLoginState', val)
				localStorage.removeItem('token')
				router.push({name: 'login'})
			})
			.catch(function (error) {
				console.log('error: ' + error.message)
			});

			return respObj
		}
	},
	getters: {
		getUserAuthState(state) {
			return state.userIsLoggedIn
		},
		getUser(state) {
			return state.userInfo
		}
	}
}

export default user