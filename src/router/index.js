import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import InventoryView from '../views/inventory/InventoryView.vue'
import MenuOrderView from '../views/menuorder/MenuOrderView.vue'


Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/', 
			name: 'home',
			component: HomeView,
			meta: {
				reqLogin: true,
			}
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/register',
			name: 'register',
			component: RegistrationView
		},
		{
			path: '/inventory',
			name: 'inventory',
			component: InventoryView
		},
		{
			path: '/menuorder',
			name: 'menuorder',
			component: MenuOrderView
		},
		{
			path: '/menumaintenance',
			name: 'menumaintenance',
			component: MenuOrderView
		},
		{
			path: '/:catchAll(.*)',
			component: NotFoundView,
			name: 'notfound'
		},
	],
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash
			}
		}

		if (savedPosition) {
			return savedPosition
		}
		else {
			return { top:0 }
		}
	},
})

/* nav guard */
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.reqLogin)) {
		store.dispatch('changeToken')
		//console.log(store.getters.getUserAuthState)
		if (!store.getters.getUserAuthState) {
			next({
				path: '/login',
			})
		}
		else {
			store.dispatch('getStoredUser')
			next()
		}
	}
	else {
		next()
	}
})

export default router
