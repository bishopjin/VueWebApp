import axios from 'axios'
import router from '../../router'

const user = {
	state: () => ({
		userInfo: {
			username: '',
			permission: [],
			role: [],
			id: 0,
		},
	}),
	mutations: {
		setUser(state, obj) {
			state.userInfo.username = obj.username
			state.userInfo.permission = obj.permission
			state.userInfo.role = obj.role
			state.userInfo.id = obj.id
		},
	},
	actions: {
		getStoredUser({commit, rootState}) {
			if (rootState.token != '') {
				commit('setUser', JSON.parse(localStorage.getItem('userDetail')))
			}
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
		async logout({dispatch,rootState, rootGetters}) {
			let respObj = {}
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'logout',
				headers: rootGetters.getHeaders
			})
			.then(function (response) {
				console.log(response)
				respObj = { msgType: 'success', msg: response.data.token}
				localStorage.removeItem('token')
				localStorage.removeItem('userDetail')
				dispatch('changeToken')
				router.push({name: 'login'})
			})
			.catch(function (error) {
				console.log('error: ' + error.message)
			});

			return respObj
		}
	},
	getters: {
		getUser(state) {
			return state.userInfo
		}
	}
}

export default user