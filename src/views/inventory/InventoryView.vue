<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<InventoryItemComponent
						v-if="isAddstock" 
						cardName="Add Item Stock"
						:isAddItem="false"
					/>
					<InventoryItemComponent
						v-else-if="isAddItem" 
						cardName="New Item"
						:isAddItem="true"
					/>
					<template v-else-if="isOrderItem">
						<InventoryOrderComponent/>
						<DataTableComponent
							class="mt-3"
							dtTitle="Order Summary" 
							:dtHeaders="headers" 
							:dtItems="items"/>
					</template>
					<DataTableComponent
						v-else
						dtTitle="Item Inventory" 
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

	export default {
		components: {
			DataTableComponent,
			InventoryItemComponent,
			LoadingComponent,
			InventoryOrderComponent,
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
		computed: {
			isLoading() {
				return this.$store.getters.getOverlay
			},
			isAddstock() {
				return this.$store.state.inventory.addStock
			},
			isAddItem() {
				return this.$store.state.inventory.addItem
			},
			isOrderItem() {
				return this.$store.state.inventory.orderItem
			},
			headers() {
				return this.theaders
			},
			items() {
				let obj = {}, data = [], dataObj = {},
					dtData = JSON.parse(this.$store.state.inventory.inventory.data)
				if (dtData) {
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
					obj.links = this.$store.state.inventory.inventory.links
				}
				return obj
			}
		}
	}
</script>