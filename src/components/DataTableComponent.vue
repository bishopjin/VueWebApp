<template>
	<v-card elevation="15" shaped class="px-4 py-4">
		<v-card-title>{{ dtTitle }}</v-card-title>
		<v-card-text>
			<v-text-field v-model="search" label="Search Item" append-icon="mdi-magnify" class="searchItem pb-3">
			</v-text-field>

			<v-simple-table>
				<thead>
					<tr>
						<th v-for="(header, i) in tHeaders" :key="i" class="text-h6">{{ header }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(rowData, x) in inventory" :key="x">
						<td v-for="(colData, z) in rowData" :key="z">{{ colData }}</td>
					</tr>
				</tbody>
			</v-simple-table>
			<div class="d-flex justify-end pt-3">
				<v-pagination
					v-model="page"
					:length="15"
					:total-visible="7">
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
			dtItems: [],
		},
		data: () => ({
			search: '',
			page: 1,
		}),
		computed: {
			tHeaders() {
				return this.dtHeaders
			},
			inventory() {
				return this.dtItems
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