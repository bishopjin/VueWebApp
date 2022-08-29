<template>
	<DataTableComponent
		:btnShow="true"
		:btnLabel="btnLabel"
		:dtTitle="cardTitle" 
		:dtHeaders="theader" 
		:dtItems="items"
		@btnClicked="userEdit = !userEdit"
	/>
</template>

<script>
	import DataTableComponent from '../components/DataTableComponent.vue'

	export default {
		components: {
			DataTableComponent,
		},
		data: () => ({
			userEdit: false,
			emplLogHeader: [
				{ text: 'UID', value: 'uid' },
				{ text: 'Employee Name', value: 'empName' },
				{ text: 'TIme In', value: 'tIn' },
				{ text: 'Login Date', value: 'inDate' },
				{ text: 'Time Out', value: 'tOut' },
				{ text: 'Logout Date', value: 'outDate' },
			],
			userEditHeader: [
				{ text: 'User ID', value: 'uid' },
				{ text: 'Name', value: 'empName' },
				{ text: 'Access Type', value: 'aType' },
				{ text: 'Change Access Type', value: 'cat' },
				{ text: 'Change Account Status', value: 'cas' },
			],
		}),
		created() {

		},
		computed: {
			cardTitle() {
				return this.userEdit ? 'Edit Users' : 'Employee Logs'
			},
			theader() {
				return this.userEdit ? this.userEditHeader : this.emplLogHeader
			},
			items() {
				return []
			},
			btnLabel() {
				return this.userEdit ? 'Employee Logs' : 'Edit User'
			},
		}
	}
</script>

<style scoped>
	
</style>