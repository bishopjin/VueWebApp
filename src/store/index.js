import Vuex from 'vuex'
import Vue from 'vue'

import darkmode from './module/darkmode'
import user from './module/user'
import menu from './module/menu'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		darkmode,
		menu,
		user
	},
})