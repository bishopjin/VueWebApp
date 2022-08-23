<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<v-tabs>
						<v-tab @click="selectTab(1)">
							<span class="d-md-flex d-none">Burger</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-domain</v-icon>
								</template>
								<span>Burger</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(2)">
							<span class="d-md-flex d-none">Beverage</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-web</v-icon>
								</template>
								<span>Beverage</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(3)">
							<span class="d-md-flex d-none">Combo Meal</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-tablet-cellphone</v-icon>
								</template>
								<span>Combo Meal</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(4)">
							<span class="d-md-flex d-none">Tax</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-tablet-cellphone</v-icon>
								</template>
								<span>Tax Setting</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(5)">
							<span class="d-md-flex d-none">Coupon</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-tablet-cellphone</v-icon>
								</template>
								<span>Coupon Setting</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(6)">
							<span class="d-md-flex d-none">Orders</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-tablet-cellphone</v-icon>
								</template>
								<span>Order List</span>
							</v-tooltip>
						</v-tab>
						<v-tab @click="selectTab(7)">
							<span class="d-md-flex d-none">Users</span>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon class="d-md-none d-flex" v-bind="attrs" v-on="on">mdi-tablet-cellphone</v-icon>
								</template>
								<span>User List</span>
							</v-tooltip>
						</v-tab>
					</v-tabs>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<MenuCardComponent
						v-if="beverage" 
						cardTitle="Beverage" 
						cardIcon="mdi-silverware"
						:btnLabel="cardComponent.btnLabel"
						:btnShow="cardComponent.btnShow"
						:colLabel="cardComponent.colLabel"
						:itemArr="cardComponent.item"
						@openDialog="showDialog = !showDialog"
					/>
					<MenuCardComponent
						v-else-if="combo"  
						cardTitle="Combo Meal" 
						cardIcon="mdi-silverware"
						:btnLabel="cardComponent.btnLabel"
						:btnShow="cardComponent.btnShow"
						:colLabel="cardComponent.colLabel"
						:itemArr="cardComponent.item"
						@openDialog="showDialog = !showDialog"
					/>
					<MenuCardComponent 
						v-else-if="tax" 
						cardTitle="Tax" 
						cardIcon="mdi-sack-percent"
						:btnLabel="cardComponent.btnLabel"
						:btnShow="cardComponent.btnShow"
						:colLabel="cardComponent.colLabel"
						:itemArr="cardComponent.item"
						@openDialog="showDialog = !showDialog"
					/>
					<MenuCardComponent 
						v-else-if="coupon" 
						cardTitle="Coupon" 
						cardIcon="mdi-ticket-percent"
						:btnLabel="cardComponent.btnLabel"
						:btnShow="cardComponent.btnShow"
						:colLabel="cardComponent.colLabel"
						:itemArr="cardComponent.item"
						@openDialog="showDialog = !showDialog"
					/>
					<DataTableComponent 
						v-else-if="orders" 
						dtTitle="Order List" 
						:dtHeaders="headers" 
						:dtItems="items"
					/>
					<DataTableComponent 
						v-else-if="users" 
						dtTitle="User List" 
						:dtHeaders="headers" 
						:dtItems="items"
					/>
					<MenuCardComponent 
						v-else
						cardTitle="Burger" 
						cardIcon="mdi-silverware"
						:btnLabel="cardComponent.btnLabel"
						:btnShow="cardComponent.btnShow"
						:colLabel="cardComponent.colLabel"
						:itemArr="cardComponent.item"
						@openDialog="showDialog = !showDialog"
					/>
				</v-col>
			</v-row>
		</v-container>
		<!--  -->
		<v-dialog transition="dialog-bottom-transition" max-width="600" persistent v-model="showDialog">
			<v-card>
				<v-toolbar
					color="primary"
					dark
					>Opening from the bottom</v-toolbar>
				<v-card-text>
					<div class="text-h2 pa-12">Hello world!</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
					text
					@click="showDialog = !showDialog"
					>Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import MenuCardComponent from '../../components/MenuCardComponent.vue'
	import DataTableComponent from '../../components/DataTableComponent.vue'

	export default {
		components: {
			MenuCardComponent,
			DataTableComponent,
		},
		data: () => ({
			showDialog: false,
			burger: false,
			beverage: false,
			combo: false,
			tax: false,
			coupon: false,
			orders: false,
			users: false,
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
		methods: {
			resetAll() {
				this.burger = false
				this.beverage = false
				this.combo = false
				this.tax = false
				this.coupon = false
				this.orders = false
				this.users = false
			},
			selectTab(tab) {
				this.resetAll()
				switch(tab) {
					case 2: 
						this.beverage = true
						break
					case 3: 
						this.combo = true
						break
					case 4: 
						this.tax = true
						break
					case 5: 
						this.coupon = true
						break
					case 6: 
						this.orders = true
						break
					case 7: 
						this.users = true
						break
					default:
						this.burger = true
				}
			}
		},
		computed: {
			cardComponent() {
				let obj = {}

				obj = {
					btnShow: this.$store.state.menu.isAdmin, 
					btnLabel: 'Add Item', 
					colLabel: 'Action',
					item: [
						{   
							name: 'Cheese Burger',
							price: '50',
							id: 'burger1'
						},
						{   
							name: 'Hotdog',
							price: '60',
							id: 'burger2'
						}
					]
				}

				return obj 
			},
			headers() {
				return this.theaders
			},
			items() {
				return this.tbItems
			}
		}
	}
</script>

