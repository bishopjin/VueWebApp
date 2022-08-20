<template>
	<v-container class="pt-4" fluid>
		<v-row>
			<v-col class="text-center">
				<div class="text-md-h4 text-h5">Web Application</div>
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
				/>
			</v-col>
			<v-col md="4" cols="12" class="d-flex">
				<HomeCardComponent 
					cardTitle="Menu Ordering" 
					cardIcon="mdi-silverware" 
					:cardBody="content.menuOrder"
					:btnObj="btnObj.menuOrder"
					:isCardAction="true"
				/>
			</v-col>
			<v-col md="4" cols="12" class="d-flex">
				<HomeCardComponent 
					cardTitle="Online Examination" 
					cardIcon="mdi-monitor-dashboard" 
					:cardBody="content.onlineExam"
					:btnObj="btnObj.onlineExam"
					:isCardAction="true"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="4" cols="12" class="d-flex">
				<HomeCardComponent 
					cardTitle="Payroll System" 
					cardIcon="mdi-cash-multiple" 
					:cardBody="content.payroll"
					:btnObj="btnObj.payroll"
					:isCardAction="true"
				/>
			</v-col>

		</v-row>
	</v-container>
</template>

<script>
	import HomeCardComponent from '../components/HomeCardComponent.vue'
	export default	{
		components: {
			HomeCardComponent,
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
						url: '/inventory', label: 'Login'
					}
				},
				menuOrder: {
					customer: {
						url: '/menuorder', label: 'Customer'
					},
					admin: {
						url: '/menumaintenance', label: 'Maintenance'
					}
				},
				onlineExam: {
					student: {
						url: '/onlineexamStudent', label: 'Student'
					},
					faculty: {
						url: '/onlineexamFaculty', label: 'Faculty'
					},
					admin: {
						url: '/onlineexamAdmin', label: 'Admin'
					},
				},
				payroll: {
					employee: {
						url: '/payrollEmployee', label: 'Employee'
					},
					admin: {
						url: '/payrollAdmin', label: 'Admin'
					},
				}
			}
		}),
		methods: {
			
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	
</style>