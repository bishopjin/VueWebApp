<template>
	<div>
		<div class="d-flex justify-center">
			<AlertComponent 
				class="mt-4"
				:message="alertMsg" 
				:alertType="alertType" 
				:isAlert="isAlert"
				@alertClosed="closeAlert"/>
		</div>
		<v-responsive 
			:aspect-ratio="21/9"
			content-class="d-flex justify-center align-center">

			<v-card elevation="12" shaped class="px-4 py-4">
				<v-card-title>Login</v-card-title>
				<v-card-text>
					<v-form v-model="valid">
						<v-text-field 
							v-model="username"
							prepend-icon="mdi-account" 
							label="Username"
							:rules="ruleUsername"
							required></v-text-field>
						<v-text-field 
							v-model="password"
							prepend-icon="mdi-lock" 
							label="Password"
							type="password"
							:rules="rulePassword"
							required></v-text-field>
						<v-btn class="mt-3" text color="primary" block :disabled="!valid" @click="submit">Login</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-responsive>
		<!--  -->
		<LoadingComponent :showOverlay="isLoading" caption="Validating please wait"/>
	</div>
</template>

<script>
	import LoadingComponent from '../components/LoadingComponent.vue'
	import AlertComponent from '../components/AlertComponent.vue'

	export default {
		components: {
			LoadingComponent,
			AlertComponent,
		},
		data: () => ({
			valid: false,
			username: '',
			password: '',
			isAlert: false,
			alertMsg: '',
			alertType: 'error',
			ruleUsername: [
				v => !!v || 'Username is required',
			],
			rulePassword: [
				v => !!v || 'Password is required',
				v => v.length >= 8 || 'Password must be 8 character or more',
			]
		}),
		methods: {
			submit() {
				let obj = {
					'username': this.username, 
					'password': this.password, 
					'origin': window.location.origin
				}
				
				this.$store.dispatch('getCSRFToken')
				.then(() => {
					this.$store.dispatch('login', obj).then(resp => {
						this.$store.dispatch('setOverlay', false)
						if (resp.id > 0) {
							this.$router.push({name: 'home'})
							this.$store.dispatch('changeToken')
						}
						else {
							this.isAlert = true
							this.alertMsg = resp.msg
							this.alertType = resp.msgType
						}
					})
				})
				
			},
			closeAlert() {
				this.isAlert = false
			}
		},
		computed: {
			isLoading() {
				return this.$store.state.overlayShow
			},
		}
	}
</script>