<template>
	<div>
		<DataTableComponent
			v-if="userEdit"
			:btnShow="true"
			btnLabel="Employee Logs"
			dtTitle="Edit Users" 
			:dtHeaders="userEditHeader" 
			:dtItems="itemsUserEdit"
			@btnClicked="userEdit = !userEdit"
		/>
		<DataTableComponent
			v-else
			:btnShow="true"
			btnLabel="Edit User"
			dtTitle="Employee Logs" 
			:dtHeaders="emplLogHeader" 
			:dtItems="items"
			@btnClicked="userEdit = !userEdit"
		/>
	</div>
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
				{ text: 'Action', value: 'cas' },
			],
		}),
		created() {
			this.dispatchEvent('employeeLogs')
		},
		watch: {
			userEdit(val) {
				if (val) {
					this.dispatchEvent('userEdit')
				}
				else {
					this.dispatchEvent('employeeLogs')
				}
			}
		},
		methods: {
			dispatchEvent(action) {
				this.$store.dispatch('setOverlay', true)
				this.$store.dispatch(action) // eslint-disable-next-line
				.then(response => { 
					this.$store.dispatch('setOverlay', false)
				})
			}
		},
		computed: {
			items() {
				let obj = {}, data = [], dataObj = {}, dtData = []

				if (this.$store.getters.getUserLogs.data) {
					dtData = JSON.parse(this.$store.getters.getUserLogs.data)
					if (dtData) {
						dtData.forEach((row) => {
							let timeIn = row.time_in ? row.time_in.split(' ') : null,
									timeout = row.time_out ? row.time_out.split(' ') : null

							dataObj.uid = row.id
							dataObj.empName = row.user.lastname + ', ' + row.user.firstname + ' ' + row.user.middlename
							dataObj.tIn = timeIn[1]
							dataObj.inDate = timeIn[0]
							dataObj.tOut = timeout ? timeout[1] : ''
							dataObj.outDate = timeout ? timeout[0] : ''
							/* push the new object into array */
							data.push(dataObj)
							/* reset object */
							dataObj = {}
						})

						obj.data = data
						obj.links = this.$store.getters.getUserLogs.links
					}
				}
				return obj
			},
			itemsUserEdit() {
				let obj = {}, data = [], dataObj = {}, dtData = []

				if (this.$store.getters.getUserEdit.data) {
					dtData = JSON.parse(this.$store.getters.getUserEdit.data)
					if (dtData) {
						dtData.forEach((row) => {
							dataObj.uid = row.id
							dataObj.empName = row.lastname + ', ' + row.firstname + ' ' + row.middlename
							dataObj.aType = 'For standalone system only'
							dataObj.cat = 'For standalone system only'
							dataObj.cas = [row.id, row.deleted_at]
							/* push the new object into array */
							data.push(dataObj)
							/* reset object */
							dataObj = {}
						})

						obj.data = data
						obj.links = this.$store.getters.getUserEdit.links
					}
				}
				return obj
			},
		}
	}
</script>

<style scoped>
	
</style>