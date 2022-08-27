<template>
	<div>
		<v-card elevation="15" shaped class="px-5 py-5">
			<AlertComponent 
				:message="alertMsg" 
				:alertType="alertType" 
				:isAlert="isAlert"
				@alertClosed="closeAlert"/>
			<v-card-title>Order Item</v-card-title>
			<v-card-text>
				<div class="d-flex align-baseline">
					<v-text-field 
						v-model="empID"
						class="me-5"
						label="Employee ID"
						:rules="ruleEmpID"
						readonly></v-text-field>
					<v-text-field 
						v-model="prodID"
						label="Product ID"
						:rules="ruleProdID"></v-text-field>
					<v-btn 
						text 
						color="success"
						:disabled="idEmpty"
						@click="searchItem">Search</v-btn>
				</div>
				<!--  -->
				<v-form v-model="validForm" ref="form">
					<v-container>
						<v-row>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="brand"
									label="Brand"
									readonly></v-text-field>
							</v-col>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="size"
									label="Size"
									readonly></v-text-field>
							</v-col>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="color"
									label="Color"
									readonly></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="type"
									label="Type"
									readonly></v-text-field>
							</v-col>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="category"
									label="Category"
									readonly></v-text-field>
							</v-col>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="price"
									label="Price"
									readonly></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="stock"
									label="In Stock"
									readonly></v-text-field>
							</v-col>
							<v-col md="4" cols="12">
								<v-text-field 
									v-model="qty"
									label="Quantity"
									type="number"
									:rules="ruleQty"></v-text-field>
							</v-col>
							<v-col md="4" cols="12" class="d-flex align-center">
								<v-btn 
									block
									color="primary"
									@click="saveData"
									:disabled="!validForm"
									>Save</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import AlertComponent from '../components/AlertComponent.vue'

	export default {
		components: {
			AlertComponent,
		},
		data: () => ({
			empID: '',
			prodID: '',
			brand: '',
			size: '',
			color: '',
			type: '',
			category: '',
			price: '',
			stock: '',
			qty: '',
			isAlert: false,
			alertMsg: '',
			alertType: 'warning',
			validForm: false,
			isItemExist: false,
			idEmpty: true,
			ruleProdID: [
				v => !!v || 'Product ID is required',
			],
			ruleEmpID: [
				v => !!v || 'Employee ID is required',
			],
			ruleQty: [
				v => !!v || 'Quantity is required'
			],
		}),
		created() {
			this.empID = this.$store.getters.getUser.id
		},
		computed: {
			isFormValid() {
				return this.validForm && this.isItemExist
			},
		},
		watch: {
			prodID(val) {
				this.idEmpty = val == '' ? true : false
			}
		},
		methods: {
			searchItem() {
				this.alertType = 'warning'
				if (this.prodID) {
					this.$store.dispatch('getItemDetails', this.prodID).then(response => {
						console.log(response)
						if (this.$store.getters.getItems != '') {
							//console.log(this.$store.getters.getItems)
							let obj = JSON.parse(this.$store.getters.getItems)
							this.prodID = obj.id
							this.brand = obj.brand.brand
							this.size = obj.size.size
							this.color = obj.color.color
							this.type = obj.type.type
							this.category = obj.category.category
							this.price = obj.price 
							this.stock = obj.in_stock
							this.isItemExist = true
						}
						else {
							this.isAlert = true
							this.alertMsg = 'Item code does not exist'
						}
						this.$store.dispatch('setOverlay', false)
					})
				}
				else {
					this.isAlert = true
					this.alertMsg = 'Product ID is empty'
				}
			},
			saveData() {
				this.$store.dispatch('getStock', [this.prodID, this.qty])
				.then(response => {
					if (response > 0) {
						this.isAlert = true
						this.alertType = 'success'
						this.alertMsg = 'Successful'
						this.validForm = false
						this.$store.dispatch('setOverlay', false)
					}
				})
			},
			closeAlert() {
				this.prodID = ''
				this.$refs.form.reset()
				this.idEmpty = true
				this.isAlert = false
			},
		},
	}
</script>

<style scoped>
	
</style>