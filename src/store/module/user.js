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
		/* check token */
		// eslint-disable-next-line
		async validateToken({state, dispatch, rootState, rootGetters}) {
			await axios({
				method: 'GET',
				url: rootState.baseurl + 'checkUser',
				headers: rootGetters.getHeaders,
			}) 
			.then((response) => {
				if (response.data != state.userInfo.id) {
					dispatch('logout')
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error)
			})
		},
		/* not working dunno why */
		async getCSRFToken() {
			await axios({
				method: 'GET',
				url: 'https://laravelwebapp.genesedan.com/sanctum/csrf-cookie',
			})
			.then(() => {})
			.catch(error => {
				console.log(error)
			})
		},
		async register({rootState}, userData) {
			let respObj = { success: 0, msg: 'Failed' }
			await axios({
				method: 'POST',
				url: rootState.baseurl + 'register',
				data: userData,
			})
			.then(response => {
				if (response.data.id == '1') {
					respObj.success = 1
					respObj.msg = 'Successful'
				}
				else if(response.data.id == '2') {
					let errMsg = '', resp = response.data.msg.message.original
					Object.keys(resp).forEach((key) => {
						errMsg += (resp[key][0])
						errMsg += '<br/>'
					})
					respObj.msg = errMsg
				}
			})
			.catch(error => {
				//console.log(error.request.responseText)
				respObj = error.request.responseText
			})
			return respObj
		},
		async login({commit, dispatch, rootState}, cred) {
			let userDet = {}, respObj = {}
			dispatch('setOverlay', true)
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'login',
				data: {
					username: cred.username,
					password: cred.password,
					origin: cred.origin
				}
			})
			.then(response => {
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
			.catch(error => {
				respObj = error.request.responseText
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
			.then(response => {
				respObj = { msgType: 'success', msg: response.data.token}
				localStorage.removeItem('token')
				localStorage.removeItem('userDetail')
				dispatch('changeToken')
				router.push({name: 'login'})
			})
			.catch(error => {
				console.log(error.message)
			});

			return respObj
		},
	},
	getters: {
		getUser(state) {
			return state.userInfo
		},
	}
}

export default user