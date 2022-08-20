<template>
	<v-card shaped width="100%" class="py-2" elevation="15">
		<v-card-title class="my-n3">
			<v-icon class="ma-2">{{ cardIcon }}</v-icon> 
			{{ cardTitle }}
			<v-btn text 
				small 
				color="primary" 
				absolute 
				right 
				v-if="btnShow"
				@click="showDialog">
				{{ btnLabel }}
			</v-btn>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-text>
			<v-container fluid class="mt-n3">
				<v-row>
					<v-col cols="4">
						<b>Name</b>
					</v-col>
					<v-col cols="4">
						<b>Price</b>
					</v-col>
					<v-col cols="4">
						<b>{{ colLabel }}</b>
					</v-col>
				</v-row>
				<v-row v-for="(item, i) in itemArr" :key="i" class="d-flex align-baseline my-n5">
					<v-col cols="4">
						<div v-if="btnShow">{{ item.name }}</div>
						<v-checkbox
							v-else
							dense
							:label="item.name"></v-checkbox>
					</v-col>
					<v-col cols="4">{{ item.price }}</v-col>
					<v-col cols="4">
						<v-btn text small color="success" v-if="btnShow" @click="showDialog">Edit</v-btn>
						<div v-else class="d-flex align-baseline" style="width: 85px;">
							<v-btn icon small @click="decrement(i)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
							<v-text-field class="text-subtitle-1 font-weight-bold" 
								v-model="modelArr[i].value" 
								readonly dense maxlength="3"></v-text-field>
							<v-btn icon small @click="increment(i)">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		name: 'MenuCardComponent',
		data: () => ({
			modelArr: [],
		}),
		created() {
			this.itemArr.forEach((item) => {
				this.modelArr.push({ 'name': item.id, 'value': 0})
			}) 
		},
		props: {
			itemArr: [],
			cardTitle: String,
			cardIcon: String,
			btnLabel: String,
			btnShow: Boolean,
			colLabel: String,
		},
		methods: {
			increment(index) {
				this.modelArr[index].value == 999 ? this.modelArr[index].value : this.modelArr[index].value++
			},
			decrement(index) {
				this.modelArr[index].value == 0 ? this.modelArr[index].value : this.modelArr[index].value--
			},
			showDialog() {
				this.$emit('openDialog')
			}
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	.counter {
		width: 30px;
	}
</style>