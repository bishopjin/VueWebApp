
const inventory = {
	state: () => ({
		dashboard: false,
		addStock: false,
		orderItem: false,
		addItem: false,
		employeeLog: false,
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
	},
	actions: {
		selectTab({commit}, val) {
			commit('setTab', val)
		}
	},
	getters: {
		
	}
}

export default inventory