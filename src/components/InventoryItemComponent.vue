<template>
	<div class="d-flex justify-center">
		<v-card elevation="15" class="card-width px-5 py-5">
			<AlertComponent 
				:message="alertMsg" 
				:alertType="alertType" 
				:isAlert="isAlert"
				@alertClosed="closeAlert"/>

			<v-card-title>{{ cardName }}</v-card-title>
			<v-card-text>
				<v-form v-model="validForm" ref="form">
					<!--  -->
					<div class="d-flex align-baseline" v-if="!isAddItem">
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
					<v-select
						v-if="isAddItem"
						label="Brand"
						:items="items"
						item-text="name"
						item-value="id"
						v-model="brand">
					</v-select>
					<v-text-field 
						v-else
						v-model="brand"
						label="Brand"
						:readonly="!isAddItem"></v-text-field>
					<!--  -->
					<v-select
						v-if="isAddItem"
						label="Size"
						:items="items"
						item-text="name"
						item-value="id"
						v-model="iSize">
					</v-select>
					<v-text-field 
						v-else
						v-model="iSize"
						label="Size"
						:readonly="!isAddItem"></v-text-field>
					<!--  -->
					<v-select
						v-if="isAddItem"
						label="Color"
						:items="items"
						item-text="name"
						item-value="id"
						v-model="color">
					</v-select>
					<v-text-field 
						v-else
						v-model="color"
						label="Color"
						:readonly="!isAddItem"></v-text-field>
					<!--  -->
					<v-select
						v-if="isAddItem"
						label="Type"
						:items="items"
						item-text="name"
						item-value="id"
						v-model="iType">
					</v-select>
					<v-text-field 
						v-else
						v-model="iType"
						label="Type"
						:readonly="!isAddItem"></v-text-field>
					<!--  -->
					<v-select
						v-if="isAddItem"
						label="Category"
						:items="items"
						item-text="name"
						item-value="id"
						v-model="cat">
					</v-select>
					<v-text-field 
						v-else
						v-model="cat"
						label="Category"
						:readonly="!isAddItem"></v-text-field>
					<!--  -->
					<v-text-field 
						v-model="qty"
						:label="labelDynamic"
						:rules="ruleQty"
						type="number"></v-text-field>	
				</v-form>
			</v-card-text>
			<v-card-actions class="d-flex justify-center">
				<v-btn 
					outlined color="primary"
					:disabled="!isFormValid"
					@click="saveData"
					>Save</v-btn>
			</v-card-actions>
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
			prodID: '',
			brand: '',
			iSize: '',
			color: '',
			iType: '',
			cat: '',
			qty: '',
			isAlert: false,
			alertMsg: '',
			alertType: 'warning',
			validForm: false,
			isItemExist: false,
			idEmpty: true,
			items: [
				{ name: 'Test', id: '1' }
			],
			ruleProdID: [
				v => !!v || 'Product ID is required',
			],
			ruleQty: [
				v => !!v || 'Quantity is required',
			],
		}),
		props: {
			cardName: String,
			isAddItem: Boolean,
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
							let obj = JSON.parse(this.$store.getters.getItems)
							this.prodID = obj.id
							this.brand = obj.brand.brand
							this.iSize = obj.size.size
							this.color = obj.color.color
							this.iType = obj.type.type
							this.cat = obj.category.category
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
			closeAlert() {
				this.$refs.form.reset()
				this.idEmpty = true
				this.isAlert = false
			},
			saveData() {
				this.$store.dispatch('updateStock', [this.prodID, this.qty])
				.then(response => {
					this.alertType = 'error'
					this.alertMsg = 'Failed'
					
					if (response) {
						this.alertType = 'success'
						this.alertMsg = 'Successful'
					}
					this.isAlert = true
					this.validForm = false
					this.$store.dispatch('setOverlay', false)
				})
			}
		},
		computed: {
			labelDynamic() {
				return this.isAddItem ? 'Price' : 'Quantity'
			},
			isFormValid() {
				return this.validForm && this.isItemExist
			}
		}
	}
</script>

<style scoped>
	.card-width {
		width: 500px;
	}
	@media only screen and (max-width: 600px) {
		.card-width {
			width: 100%;
		}
	}
</style>