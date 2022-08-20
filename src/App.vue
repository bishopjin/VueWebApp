<template>
	<v-app>
		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-app-bar-title class="title-width">{{ setAppBarTitle }}</v-app-bar-title>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" temporary fixed>
			<v-list nav>
				<v-list-item to="/">
					<v-icon class="ma-2">mdi-home</v-icon>
					Home
				</v-list-item>
				<v-list-item to="/login">
					<v-icon class="ma-2">mdi-login</v-icon>
					Login
				</v-list-item>
				<v-list-item to="/register">
					<v-icon class="ma-2">mdi-account-plus</v-icon>
					Register
				</v-list-item>
				<!-- inventory -->
				<v-list-item @click="selectTab('dashboard')">
					<v-icon class="ma-2">mdi-database</v-icon>
					Inventory
				</v-list-item>
				<v-list-item @click="selectTab('addStock')">
					<v-icon class="ma-2">mdi-database-plus</v-icon>
					Add Stock
				</v-list-item>
				<v-list-item @click="selectTab('orderItem')">
					<v-icon class="ma-2">mdi-database-minus</v-icon>
					Order Item
				</v-list-item>
				<v-list-item @click="selectTab('addItem')">
					<v-icon class="ma-2">mdi-layers-plus</v-icon>
					Add New Product
				</v-list-item>
				<v-list-item @click="selectTab('employeeLog')">
					<v-icon class="ma-2">mdi-account-details</v-icon>
					Employee Logs
				</v-list-item>
				<!-- End -->
				<v-list-item to="/logout">
					<v-icon class="ma-2">mdi-logout</v-icon>
					Logout
				</v-list-item>
				<v-list-item>
				<v-switch class="mx-auto" inset style="width: 110px;" v-model="darkmode"
				prepend-icon="mdi-white-balance-sunny" append-icon="mdi-weather-night"
				>
				</v-switch>
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
			}
		},
		computed: {
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
			footerLabel() {
				return new Date().getFullYear() + ' - Gene Arthur Sedan'
			},
		},
	}
</script>

<style scoped>
	.title-width {
		width: 300px;
	}
</style>
