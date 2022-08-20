<template>
	<v-container>
		<v-row>
			<v-col>
				<InventoryItemComponent
					v-if="this.$store.state.inventory.addStock" 
					cardName="Receive Item"
					:isAddItem="false"
				/>
				<InventoryItemComponent
					v-else-if="this.$store.state.inventory.addItem" 
					cardName="New Item"
					:isAddItem="true"
				/>
				<DataTableComponent
					v-else
					dtTitle="Item Inventory" 
					:dtHeaders="headers" 
					:dtItems="items"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import DataTableComponent from '../../components/DataTableComponent.vue'
	import InventoryItemComponent from '../../components/InventoryItemComponent.vue'

	export default {
		components: {
			DataTableComponent,
			InventoryItemComponent,
		},
		data: () => ({
			dashboard: false,
			itemDetails: false,
			theaders: [
				'Product ID', 'Brand', 'Size', 'Color', 'Type', 'Category', 'Price', 'In Stock'
			],
			tbItems: [
				{
					pid: '100001', pb: 'Nike', ps: '10', pc: 'White', pt: 'Rubber', pct: 'Male', pp: '2500', pq: '100'
				},
				{
					pid: '100001', pb: 'Nike', ps: '12', pc: 'White', pt: 'Rubber', pct: 'Male', pp: '3500', pq: '100'
				},
			]
		}),
		computed: {
			headers() {
				return this.theaders
			},
			items() {
				return this.tbItems
			}
		}
	}
</script>