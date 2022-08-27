import axios from 'axios'
//import router from '../../router'

const inventory = {
	state: () => ({
		isInventory: false,
		dashboard: false,
		addStock: false,
		orderItem: false,
		addItem: false,
		employeeLog: false,
		prodID: '',
		itemDetail: '',
		inventory: {
			data: '',
			links: {},
		},
	}),
	mutations: {
		setTab(state, val) {
			state.dashboard = false
			state.addStock = false
			state.orderItem = false
			state.addItem = false
			state.employeeLog = false

			switch (val) {
				case 'addStock':
					state.addStock = true
					break
				case 'orderItem':
					state.orderItem = true
					break
				case 'addItem':
					state.addItem = true
					break
				case 'employeeLog':
					state.employeeLog = true
					break
				default:
					state.dashboard = true
			}
		},
		setInventory(state, val) {
			state.isInventory = val
		},
		setInventoryLinks(state, links) {
			state.inventory.links = links
		},
		setInventoryData(state, data) {
			state.inventory.data = data
		},
		setItemDetail(state, data) {
			state.itemDetail = data
		}
	},
	actions: {
		selectTab({commit, dispatch}, val) {
			commit('setTab', val)
			if (val == 'dashboard') {
				dispatch('setOverlay', true)
				dispatch('getItemInventory', null)
			}
		},
		setInventoryState({commit}, val) {
			commit('setInventory', val)
		},
		async getItemInventory({commit, rootState, rootGetters}) {
			let respObj = { allowed: false, msg: '' }
			await axios({
				method: 'GET', 
				url: rootState.baseurl + 'inventory/index',
				headers: rootGetters.getHeaders,
			})
			.then(function (response) {
				if (response.data.data.length) {
					commit('setInventoryLinks', response.data.links)
					commit('setInventoryData', JSON.stringify(response.data.data))
					respObj.allowed = true
				}
				else {
					respObj.msg = response.data
				}
			})
			.catch(function (error) {
				respObj.msg = error.message
				//console.log('error: ' + error.message)
			});

			return respObj
		},
		async nextPage({commit, dispatch, rootGetters}, url) {
			dispatch('setOverlay', true)
			await axios({
				method: 'GET', 
				url: url,
				headers: rootGetters.getHeaders
			})
			.then(function (response) {
				if (response.data.data.length) {
					commit('setInventoryData', JSON.stringify(response.data.data))
				}
				dispatch('setOverlay', false)
			})
			.catch(function (error) {
				console.log('error: ' + error.message)
			});
		},
		async getItemDetails({commit, dispatch, rootState, rootGetters}, id) {
			dispatch('setOverlay', true)
			await axios({
				method: 'GET', 
				url: rootState.baseurl + 'inventory/get/' + id,
				headers: rootGetters.getHeaders,
			})
			.then(function (response) {
				if (response.data) {
					commit('setItemDetail', JSON.stringify(response.data))
				}
				else {
					commit('setItemDetail', '')
				}
			})
			.catch(function (error) {
				console.log(error)
			});
		},
		async updateStock({dispatch, rootState, rootGetters}, item) {
			let updated = false
			dispatch('setOverlay', true)
			await axios({
				method: 'POST', 
				url: rootState.baseurl + 'inventory/addStock/store',
				data: { shoe_id: item[0], qty: item[1] },
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				updated = response.data
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
			})
			return updated
		},
		async getStock({dispatch, rootState, rootGetters}, order) {
			let updated = false
			dispatch('setOverlay', true)
			await axios({
				method: 'POST',
				url: rootState.baseurl + 'inventory/getStock/store',
				data: { shoe_id: order[0], qty: order[1] },
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				updated = response.data
			})
			.catch(error => {
				console.log(error)
			})
			return updated
		},
	},
	getters: {
		getItems(state) {
			return state.itemDetail
		},
	}
}

export default inventory