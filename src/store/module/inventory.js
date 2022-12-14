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
		brands: '',
		sizes: '',
		colors: '',
		types: '',
		categories: '',
		inventory: {
			data: '',
			links: {},
		},
		orders: {
			data: '',
			links: {},
		},
		eLogs: {
			data: '',
			links: {},
		},
		users: {
			data: '',
			links: {},
		}
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
		setOrderLinks(state, links) {
			state.orders.links = links
		},
		setOrderData(state, data) {
			state.orders.data = data
		},
		setELogsLinks(state, links) {
			state.eLogs.links = links
		},
		setELogsData(state, data) {
			state.eLogs.data = data
		},
		setUsersLinks(state, links) {
			state.users.links = links
		},
		setUsersData(state, data) {
			state.users.data = data
		},
		setItemDetail(state, data) {
			state.itemDetail = data
		},
		setItemAttributes(state, data) {
			state.brands = JSON.stringify(data.brand)
			state.sizes = JSON.stringify(data.size)
			state.colors = JSON.stringify(data.color)
			state.types = JSON.stringify(data.type)
			state.categories = JSON.stringify(data.category)
		},
	},
	actions: {
		selectTab({commit, dispatch}, val) {
			commit('setTab', val)
			if (val == 'dashboard') {
				dispatch('setOverlay', true)
				dispatch('getItemInventory') // eslint-disable-next-line
				.then(response => { 
					dispatch('setOverlay', false)
				})
			}
		},
		setInventoryState({commit}, val) {
			commit('setInventory', val)
		},
		async getItemInventory({commit, rootState, rootGetters}) {
			let respObj = { allowed: false, msg: '' }
			await axios({
				method: 'GET', 
				url: rootState.baseurl + 'inventory',
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data) {
					commit('setInventoryLinks', response.data[0].links)
					commit('setInventoryData', JSON.stringify(response.data[0].data))
					respObj.allowed = true
				}
				else {
					respObj.msg = response.data
				}
			})
			.catch(error => {
				respObj.msg = error.response.status
			});

			return respObj
		},
		async nextPage({state, commit, dispatch, rootGetters}, url) {
			dispatch('setOverlay', true)
			await axios({
				method: 'GET', 
				url: url,
				headers: rootGetters.getHeaders
			})
			.then(response => {
				if (response.data) {
					if (state.orderItem) {
						commit('setOrderData', JSON.stringify(response.data.data))
					}
					else if (state.employeeLog) {
						if (url.includes('employeeLogs')) {
							commit('setELogsData', JSON.stringify(response.data.data))
						}
						else {
							commit('setUsersData', JSON.stringify(response.data.data))
						}
					}
					else {
						commit('setInventoryData', JSON.stringify(response.data[0].data))
					}
				}
				dispatch('setOverlay', false)
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error.message)
			});
		},
		async getItemDetails({commit, dispatch, rootState, rootGetters}, id) {
			dispatch('setOverlay', true)
			await axios({
				method: 'GET', 
				url: rootState.baseurl + 'inventory/product/' + id,
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data) {
					commit('setItemDetail', JSON.stringify(response.data))
				}
				else {
					commit('setItemDetail', '')
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error)
			});
		},
		async saveOrUpdate({dispatch, rootState, rootGetters}, obj) {
			let updated = false
			dispatch('setOverlay', true)
			await axios({
				method: 'POST', 
				url: rootState.baseurl + obj.url,
				data: obj.data,
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				updated = response.data
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error)
			})
			return updated
		},
		async getStock({dispatch, rootState, rootGetters}, order) {
			let updated = false
			dispatch('setOverlay', true)
			await axios({
				method: 'POST',
				url: rootState.baseurl + 'inventory/product/order',
				data: { inventory_item_shoe_id: order[0], qty: order[1] },
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				updated = response.data
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error)
			})
			return updated
		},
		async getOrderInventory({commit, dispatch, rootState, rootGetters}) {
			let respObj = { allowed: false, msg: '' }
			await axios({
				method: 'GET', 
				url: rootState.baseurl + 'inventory/product/order',
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data.data.length) {
					commit('setOrderLinks', response.data.links)
					commit('setOrderData', JSON.stringify(response.data.data))
					respObj.allowed = true
				}
				else {
					respObj.msg = response.data
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				respObj.msg = error.message
				//console.log(error)
			});

			return respObj
		},
		async newItem({commit, dispatch, rootState, rootGetters}) {
			await axios({
				method: 'GET',
				url: rootState.baseurl + 'inventory/product',
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data) {
					commit('setItemAttributes', response.data)
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error.message)
			})
		},
		async employeeLogs({commit, dispatch, rootState, rootGetters}) {
			let respObj = { success: 0, msg: '' }
			await axios({
				method: 'GET',
				url: rootState.baseurl + 'inventory/employee/employeelogs',
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data.data) {
					commit('setELogsLinks', response.data.links)
					commit('setELogsData', JSON.stringify(response.data.data))
					respObj.success = 1
				}
				else {
					respObj.msg = response.data
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				respObj.msg = error
			})
			return respObj
		},
		async userEdit({commit, dispatch, rootState, rootGetters}) {
			await axios({
				method: 'GET',
				url: rootState.baseurl + 'inventory/employee/employee',
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data.data) {
					commit('setUsersLinks', response.data.links)
					commit('setUsersData', JSON.stringify(response.data.data))
				}
				else {
					console.log(response.data)
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
				//console.log(error)
			})
		},
		async userSetAccess({dispatch, rootState, rootGetters}, userid) {
			let resp = 0
			await axios({
				method: 'DELETE',
				url: rootState.baseurl + 'inventory/employee/employee/' + userid,
				headers: rootGetters.getHeaders,
			})
			.then(response => {
				if (response.data) {
					resp = response.data
				}
				else {
					console.log(response.data)
				}
			})
			.catch(error => {
				dispatch('checkErrorResponse', error)
			})
			return resp
		},
	},
	getters: {
		getItems(state) {
			return state.itemDetail
		},
		getInventoryItems(state) {
			return state.inventory
		},
		getOrderItems(state) {
			return state.orders
		},
		setAddStock(state) {
			return state.addStock
		},
		setAddItem(state) {
			return state.addItem
		},
		setOrderItem(state) {
			return state.orderItem
		},
		setEmpLog(state) {
			return state.employeeLog
		},
		getUserLogs(state) {
			return state.eLogs
		},
		getUserEdit(state) {
			return state.users
		},
		getItemAttr(state) {
			return [state.brands, state.sizes, state.colors, state.types, state.categories]
		}
	}
}

export default inventory