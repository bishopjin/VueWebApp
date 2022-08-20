<template>
	<div class="d-flex justify-center">
		<v-card elevation="15" class="card-width px-5 py-5">
			<v-card-title>{{ cardName }}</v-card-title>
			<v-card-text>
				<!--  -->
				<div class="d-flex align-baseline" v-if="!isAddItem">
					<v-text-field 
						v-model="prodID"
						label="Product ID"
						:rules="ruleProdID"></v-text-field>
					<v-btn text color="success">Search</v-btn>
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
					:readonly="isAddItem"></v-text-field>
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
					:readonly="isAddItem"></v-text-field>
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
					:readonly="isAddItem"></v-text-field>
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
					:readonly="isAddItem"></v-text-field>
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
					:readonly="isAddItem"></v-text-field>
				<!--  -->
				<v-text-field 
					v-model="qty"
					:label="labelDynamic"
					:rules="ruleQty"
					type="number"></v-text-field>	

			</v-card-text>
			<v-card-action class="d-flex justify-center">
				<v-btn outlined color="primary">Save</v-btn>
			</v-card-action>
		</v-card>
	</div>
</template>

<script>
	export default {
		data: () => ({
			prodID: '',
			brand: 'Read Only',
			iSize: 'Read Only',
			color: 'Read Only',
			iType: 'Read Only',
			cat: 'Read Only',
			qty: '',
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
		computed: {
			labelDynamic() {
				return this.isAddItem ? 'Price' : 'Quantity'
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