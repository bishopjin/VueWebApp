<template>
	<v-card elevation="15" shaped class="px-4 py-4">
		<v-card-title>{{ dtTitle }}</v-card-title>
		<v-card-text>
			<v-text-field v-model="search" label="Search Item" append-icon="mdi-magnify" class="searchItem pb-3">
			</v-text-field>

			<v-data-table
				class="elevation-15"
				:headers="dtHeaders"
				:items="inventory"
				:items-per-page="inventory.length"
				hide-default-footer
				></v-data-table>

			<div class="d-flex justify-end pt-3">
				<v-pagination
					v-model="page"
					:length="linkLength"
					:total-visible="7"
					@input="nextPage(links[page].url)">
				</v-pagination>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		props: {
			dtTitle: String,
			dtHeaders: [],
			dtItems: {},
		},
		data: () => ({
			search: '',
			page: 1,
		}),
		methods: {
			nextPage(nextPage) {
				this.$store.dispatch('nextPage', nextPage)
			},
			toLowerString(data) {
				return data.toString().toLowerCase()
			}
		},
		computed: {
			inventory() {
				let dtData = this.dtItems.data.filter((row) => {
						let key = [], searchKey = this.search.toLowerCase()
						/* get the key */
						Object.keys(row).forEach((k) => {
							key.push(k)
						})

						if (this.search != '') {
							/* filter data per column, for now max only of 10 colum, NEED to OPTIMIZE */
							if (key.length - 1 >= 0) {
								if (this.toLowerString(row[key[0]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[0]]).match(searchKey)
								}
							}

							if (key.length - 2 >= 0) {
								if (this.toLowerString(row[key[1]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[1]]).match(searchKey)
								}
							}

							if (key.length - 3 >= 0) {
								if (this.toLowerString(row[key[2]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[2]]).match(searchKey)
								}
							}

							if (key.length - 4 >= 0) {
								if (this.toLowerString(row[key[3]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[3]]).match(searchKey)
								}
							}

							if (key.length - 5 >= 0) {
								if (this.toLowerString(row[key[4]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[4]]).match(searchKey)
								}
							}

							if (key.length - 6 >= 0) {
								if (this.toLowerString(row[key[5]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[5]]).match(searchKey)
								}
							}

							if (key.length - 7 >= 0) {
								if (this.toLowerString(row[key[6]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[6]]).match(searchKey)
								}
							}

							if (key.length - 8 >= 0) {
								if (this.toLowerString(row[key[7]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[7]]).match(searchKey)
								}
							}

							if (key.length - 9 >= 0) {
								if (this.toLowerString(row[key[8]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[8]]).match(searchKey)
								}
							}

							if (key.length - 10 >= 0) {
								if (this.toLowerString(row[key[9]]).charAt(0) == searchKey.charAt(0)) {
									return this.toLowerString(row[key[9]]).match(searchKey)
								}
							}
						}
						else {
							return row
						}
					
					})
				return dtData
			},
			links() {
				return this.dtItems.links
			},
			linkLength() {
				return this.dtItems.links.length - 2
			}
		}
	}
</script>

<style scoped>
	.searchItem {
		width: 25%;
	}

	@media only screen and (max-width: 600px) {
		.searchItem {
			width: 100%;
		}
	}
</style>