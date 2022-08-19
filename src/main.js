import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

import router from './router/index'
import store from './store/index'
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify: new Vuetify(),
	render: h => h(App),
}).$mount('#app')
