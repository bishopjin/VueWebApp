<template>
	<div>
		<v-container class="pt-4" fluid>
			<v-row>
				<v-col class="text-center">
					<div class="text-md-h5 text-h5">VueJs Web Application</div>
					<v-divider class="my-4"></v-divider>
				</v-col>
			</v-row>
			<v-row>
				<v-col md="4" cols="12" class="d-flex">
					<HomeCardComponent 
						cardTitle="Inventory System" 
						cardIcon="mdi-database" 
						:cardBody="content.inventory"
						:btnObj="btnObj.inventory"
						:isCardAction="true"
						@openOverlay="showLoading(true)"
					/>
				</v-col>
				<v-col md="4" cols="12" class="d-flex">
					<HomeCardComponent 
						cardTitle="Online Examination" 
						cardIcon="mdi-monitor-dashboard" 
						:cardBody="content.onlineExam"
						:btnObj="btnObj.onlineExam"
						:isCardAction="false"
						@openOverlay="showLoading(true)"
					/>
				</v-col>
				<v-col md="4" cols="12" class="d-flex">
					<HomeCardComponent 
						cardTitle="Payroll System" 
						cardIcon="mdi-cash-multiple" 
						:cardBody="content.payroll"
						:btnObj="btnObj.payroll"
						:isCardAction="false"
						@openOverlay="showLoading(true)"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col md="4" cols="12" class="d-flex">
					<HomeCardComponent 
						cardTitle="Menu Ordering" 
						cardIcon="mdi-silverware" 
						:cardBody="content.menuOrder"
						:btnObj="btnObj.menuOrder"
						:isCardAction="false"
						@openOverlay="showLoading(true)"
					/>
				</v-col>

			</v-row>
		</v-container>
		<!--  -->
		<LoadingComponent :showOverlay="isLoading" caption="Getting Data"/>
	</div>
</template>

<script>
	import HomeCardComponent from '../components/HomeCardComponent.vue'
	import LoadingComponent from '../components/LoadingComponent.vue'

	export default	{
		components: {
			HomeCardComponent,
			LoadingComponent,
		},
		created() {
			this.$store.dispatch('setOverlay', false)
			this.$store.dispatch('validateToken')
		},
		data: () => ({
			content: {
				inventory: [
					'View item inventory', 
					'Add new item', 
					'Add new stock', 
					'Get/Request stock', 
					'View Employee Logs', 
					'Edit employee access'
				],
				menuOrder: [
					'Create order', 
					'Discount and tax applied to the order', 
					'Order history', 
					'Maintenance page for adding/modifying product, tax and discount.'
				],
				onlineExam: [
					'Create an online examination for the student.', 
					'Faculty can create an examination form based on subject and generate an examination code.',
					'This code will serve as an access for the student to take the examination.',
					'Encrypted answer key, so only the creator of the exam knows the answer.'
				],
				payroll: [
					'Register User',
					'Maintenance for Salary Rate, etc.',
					' Daily Time Recorder (Temporary Only)',
					'Auto compute manhour, late, night diff, etc..'
				]
			},
			btnObj: {
				inventory: {
					login: {
						url: '/inventory', 
						label: 'Login', 
						access: 'user', 
						application: 'inventory',
						isActive: true,
					}
				},
				menuOrder: {
					customer: {
						url: '/menuorder', 
						label: 'Customer', 
						access: 'menu-none-admin', 
						application: 'menuorder',
						isActive: true,
					},
					admin: {
						url: '/menumaintenance', 
						label: 'Maintenance', 
						access: 'menu-admin', 
						application: 'menuorder',
						isActive: true,
					}
				},
				onlineExam: {
					student: {
						url: '/onlineexamStudent', 
						label: 'Student', 
						access: 'online-student', 
						application: 'onlineExam',
						isActive: true,
					},
					faculty: {
						url: '/onlineexamFaculty', 
						label: 'Faculty', 
						access: 'online-faculty', 
						application: 'onlineExam',
						isActive: true,
					},
					admin: {
						url: '/onlineexamAdmin', 
						label: 'Admin', 
						access: 'online-admin', 
						application: 'onlineExam',
						isActive: true,
					},
				},
				payroll: {
					employee: {
						url: '/payrollEmployee', 
						label: 'Employee', 
						access: 'payroll-non-admin', 
						application: 'payroll',
						isActive: true,
					},
					admin: {
						url: '/payrollAdmin', 
						label: 'Admin', 
						access: 'payroll-admin', 
						application: 'payroll',
						isActive: true,
					},
				}
			}
		}),
		methods: {
			showLoading(value) {
				this.$store.dispatch('setOverlay', value)
			}
		},
		computed: {
			isLoading() {
				return this.$store.getters.getOverlay
			}
		}
	}
</script>

<style scoped>
	
</style>