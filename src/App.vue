<template>
	<v-app>
		<v-app-bar app>
			<v-responsive content-class="d-flex justify-space-between align-baseline">
				<v-responsive content-class="d-flex align-center">
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
					<v-app-bar-title>{{ setAppBarTitle }}</v-app-bar-title>
				</v-responsive>
				<div class="d-flex justify-space-between align-baseline">
					<span class="ma-4">Welcome <b>{{ getUsersname }}</b></span>
					<v-switch class="mx-auto" 
						inset 
						style="width: 110px;" 
						v-model="darkmode"
						prepend-icon="mdi-white-balance-sunny" 
						append-icon="mdi-weather-night">
					</v-switch>
				</div>
			</v-responsive>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" temporary fixed>
			<v-list nav>
				<v-list-item to="/" v-if="isUserAuth">
					<v-icon class="ma-2">mdi-home</v-icon>
					Home
				</v-list-item>
				<v-list-item to="/login" v-if="showLoginLink">
					<v-icon class="ma-2">mdi-login</v-icon>
					Login
				</v-list-item>
				<v-list-item to="/register" v-if="showRegisterLink">
					<v-icon class="ma-2">mdi-account-plus</v-icon>
					Register
				</v-list-item>
				<v-divider></v-divider>
				<!-- inventory -->
				<v-list-item @click="selectTab('dashboard')" v-if="showInventoryTab">
					<v-icon class="ma-2">mdi-database</v-icon>
					Inventory
				</v-list-item>
				<v-list-item @click="selectTab('addStock')" v-if="showInventoryTab">
					<v-icon class="ma-2">mdi-database-plus</v-icon>
					Add Stock
				</v-list-item>
				<v-list-item @click="selectTab('orderItem')" v-if="showInventoryTab">
					<v-icon class="ma-2">mdi-database-minus</v-icon>
					Order Item
				</v-list-item>
				<v-list-item @click="selectTab('addItem')" v-if="showInventoryTab">
					<v-icon class="ma-2">mdi-layers-plus</v-icon>
					Add New Product
				</v-list-item>
				<v-list-item @click="selectTab('employeeLog')" v-if="showInventoryTab">
					<v-icon class="ma-2">mdi-account-details</v-icon>
					Employee Logs
				</v-list-item>
				<!-- End -->
				<v-divider></v-divider>
				<v-list-item @click="logout" v-if="isUserAuth">
					<v-icon class="ma-2">mdi-logout</v-icon>
					Logout
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view></router-view>
		</v-main>

		<v-footer height="100" class="justify-end">
			<div>
				<v-icon dense>mdi-copyright</v-icon>{{ footerLabel }}
				<div>
					<a href="https://genesedan.com/" target="_blank" class="text-decoration-none">
						<v-icon>mdi-web</v-icon>
					</a>
					<v-icon>mdi-drag-vertical-variant</v-icon>
					<a href="https://www.facebook.com/gene.arthur.948" target="_blank" class="text-decoration-none">
						<v-icon>mdi-facebook</v-icon>
					</a>
					<v-icon>mdi-drag-vertical-variant</v-icon>
					<a href="https://github.com/bishopjin" target="_blank" class="text-decoration-none">
						<v-icon>mdi-github</v-icon>
					</a>
					<v-icon>mdi-drag-vertical-variant</v-icon>
					<a href="https://www.linkedin.com/in/gene-arthur-sedan-53aa50230/" target="_blank" class="text-decoration-none">
						<v-icon>mdi-linkedin</v-icon>
					</a>
				</div>
				<div class="text-md-subtitle-2 text-subtitle-2 pt-2">
					Published: 
				</div>
			</div>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		components: {

		},
		data: () => ({
			drawer: false,
			darkmode: false,
		}),
		created() {
			this.$store.dispatch('getStoredDarkState')
			this.darkmode = this.$store.state.darkmode.darkMode
		},
		watch: {
			darkmode(newval) {
				this.darkmode = newval
				this.$vuetify.theme.dark = newval
				this.$store.dispatch('changeStoredState', newval)
			}
		},
		methods: {
			selectTab(tabname) {
				this.drawer = false
				this.$store.dispatch('selectTab', tabname)
			},
			logout() {
				this.$store.dispatch('logout', false)
			}
		},
		computed: {
			showLoginLink () {
				let showLogin = false
				if (!this.$store.getters.getUserAuthState) {
					if (this.$route.name != 'login') {
						showLogin = true
					}
				}
				return showLogin
			},
			showRegisterLink () {
				let showRegister = false
				if (!this.$store.getters.getUserAuthState) {
					if (this.$route.name != 'register') {
						showRegister = true
					}
				}
				return showRegister
			},
			isUserAuth() {
				return this.$store.getters.getUserAuthState
			},
			getUsersname() {
				let username = 'Guest'
				if (this.$store.getters.getUserAuthState) {
					username = this.$store.getters.getUser.username
				}
				return username
			},
			setAppBarTitle() {
				let title
				switch (this.$route.name) {
					case 'home':
						title = 'Home'
						break
					case 'login':
						title = 'Login'
						break
					case 'register':
						title = 'Registration'  
						break
					case 'inventory':
						title = 'Inventory System'
						break
					case 'menuorder':
						title = 'Menu Ordering'
						break
					case 'menumaintenance':
						title = "Menu Maintenance"
						break
					default:
						title = '404 Not Found'
				}
				return title
			},
			showInventoryTab() {
				let state = false
				if (this.$route.name == 'inventory') {
					state = true
				}
				this.$store.dispatch('setInventoryState', state)
				
				return this.$store.state.inventory.isInventory
			},
			footerLabel() {
				return new Date().getFullYear() + ' - Gene Arthur Sedan'
			},
		},
	}
</script>

<style scoped>
	
</style>
