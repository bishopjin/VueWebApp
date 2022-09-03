<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<InventoryItemComponent
						v-if="isAddStock" 
						cardName="Add Item Stock"
						:isAddItem="false"
					/>
					<InventoryItemComponent
						v-else-if="isAddItem" 
						cardName="New Item"
						:isAddItem="true"
					/>
					<InventoryOrderComponent
						v-else-if="isOrderItem"
					/>
					<EmployeeLogsComponent
						v-else-if="isEmployeeLogs"
					/>
					<DataTableComponent
						v-else
						dtTitle="Item Inventory" 
						:btnShow="false"
						:dtHeaders="headers" 
						:dtItems="items"
					/>
				</v-col>
			</v-row>
		</v-container>
		<!--  -->
		<LoadingComponent :showOverlay="isLoading" caption="Processing..."/>
	</div>
</template>

<script>
	import DataTableComponent from '../../components/DataTableComponent.vue'
	import InventoryItemComponent from '../../components/InventoryItemComponent.vue'
	import LoadingComponent from '../../components/LoadingComponent.vue'
	import InventoryOrderComponent from '../../components/InventoryOrderComponent.vue'
	import EmployeeLogsComponent from '../../components/EmployeeLogsComponent.vue'

	export default {
		components: {
			DataTableComponent,
			InventoryItemComponent,
			LoadingComponent,
			InventoryOrderComponent,
			EmployeeLogsComponent,
		},
		data: () => ({
			dashboard: false,
			itemDetails: false,
			theaders: [
				{ text: 'Product ID', value: 'prodid' },
				{ text: 'Brand', value: 'brand' },
				{ text: 'Size', value: 'size' },
				{ text: 'Color', value: 'color' },
				{ text: 'Type', value: 'type' },
				{ text: 'Category', value: 'category' },
				{ text: 'Price', value: 'price' },
				{ text: 'In Stock', value: 'stock' }
			],
		}),
		methods: {
			
		},
		created() {
			this.$store.dispatch('selectTab', 'dashboard')
			this.$store.dispatch('getStoredUser')
		},
		computed: {
			isLoading() {
				return this.$store.getters.getOverlay
			},
			headers() {
				return this.theaders
			},
			items() {
				let obj = {}, data = [], dataObj = {}, dtData = []
				if (this.$store.getters.getInventoryItems.data != '') {
					dtData = JSON.parse(this.$store.getters.getInventoryItems.data)
					dtData.forEach((row) => {
						dataObj.prodid = row.id
						dataObj.brand = row.brand.brand
						dataObj.size = row.size.size
						dataObj.color = row.color.color
						dataObj.type = row.type.type
						dataObj.category = row.category.category
						dataObj.price = row.price
						dataObj.stock = row.in_stock
						/* push the new object into array */
						data.push(dataObj)
						/* reset object */
						dataObj = {}
					})
					obj.data = data
					obj.links = this.$store.getters.getInventoryItems.links
				}
				return obj
			},
			isAddItem() {
				return this.$store.getters.setAddItem
			},
			isAddStock() {
				return this.$store.getters.setAddStock
			},
			isOrderItem() {
				return this.$store.getters.setOrderItem
			},
			isEmployeeLogs() {
				return this.$store.getters.setEmpLog
			}
		}
	}
</script>