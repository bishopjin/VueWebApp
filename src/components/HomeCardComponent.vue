<template>
	<v-card shaped width="100%" class="py-2" elevation="15">
		<v-card-title class="my-n3">
			<v-icon class="ma-2">{{ cardIcon }}</v-icon> {{ cardTitle }}
		</v-card-title>
		<v-divider></v-divider>
		<AlertComponent 
				:message="alertMsg" 
				:alertType="alertType" 
				:isAlert="isAlert"
				@alertClosed="closeAlert"/>
		<v-card-text>
			<div class="font-weight-bold">Feature:</div>
			<div class="pa-2">
				<p class="my-n1 pb-1" v-for="(content, i) in cardBody" :key="i"> - {{ content }}</p>
			</div>
			<div class="font-weight-bold">Log In as:</div>
		</v-card-text>
		<v-card-actions v-resize="checkScrSize" class="d-flex flex-md-row flex-column" v-if="isCardAction">
			<v-btn text  
				color="primary" 
				:width="btnWidth" 
				:class="btnClass" 
				v-for="(btnItem, i) in btnObj" 
				:key="i"
				@click="setAccess(btnItem.access, btnItem.url, btnItem.application)"
			>{{ btnItem.label }}</v-btn>
		</v-card-actions>
		<div v-else class="d-flex justify-center pb-2">
			Not yet available
		</div>
	</v-card>
</template>

<script>
	import AlertComponent from '../components/AlertComponent.vue'

	export default {
		components: {
			AlertComponent,
		},
		name: 'HomeCardComponent',
		data: () => ({
			screenwidth: 0,
			isAlert: false,
			alertMsg: '',
			alertType: 'warning',
		}),
		props: {
			btnObj: new Object(),
			cardTitle: String,
			cardIcon: String,
			isCardAction: Boolean,
			cardBody: [],
		},
		methods: {
			closeAlert() {
				this.isAlert = false
			},
			checkScrSize() {
				this.screenwidth = window.innerWidth
			},
			setAccess(access, url, app) {
				switch(app) {
					case 'menuorder':
						if (access == 'menu-none-admin') {
							this.$store.dispatch('selectMenuAccess', false)
						}
						else {
							this.$store.dispatch('selectMenuAccess', true)
						}
						this.$router.push(url)
						break
					case 'onlineExam':
						if (access == 'online-student') {
							console.log('Student')
						}
						else if (access == 'online-faculty') {
							console.log('Faculty')
						}
						else {
							console.log('Admin')
						}
						break
					case 'payroll':
						if (access == 'payroll-non-admin') {
							console.log('None admin')
						}
						else {
							console.log('Admin')
						}
						break
					default:
						this.$store.dispatch('getItemInventory')
						.then(response => {
							if (response.allowed) {
								this.$router.push(url)
							}
							else {
								this.isAlert = true
								if (response.msg == 401) {
									this.$store.dispatch('checkErrorResponse', 401)
								}
								else {
									this.alertMsg = response.msg == 403 ? 'Not Authorize' : response.msg.toString()
								}
							}
							this.$store.dispatch('setOverlay', false)
						})
				}
				this.$emit('openOverlay')
			}
		},
		computed: {
			linkNum() {
				return Object.keys(this.btnObj).length > 1
			},
			btnWidth() {
				return this.screenwidth < 600 ? '100%' : ''
			},
			btnClass() {
				return Object.keys(this.btnObj).length > 1 ? 'flex-grow-1 mb-md-0 mb-2 mx-1' : 'flex-grow-1 mb-md-0 mb-2 mx-1'
			}
		}
	}
</script>