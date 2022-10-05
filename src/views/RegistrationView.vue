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
			content-class="d-flex justify-center align-center"
		>
			<v-card elevation="12" shaped class="px-4 py-4">
				<v-card-title>Registration</v-card-title>
				<v-card-text>
					<v-form v-model="valid">
						<v-container>
							<v-row>
								<v-col md="4" cols="12">
									<v-text-field
										v-model="firstname"
										label="First Name"
										:rules="ruleFirstName"
										required></v-text-field>
								</v-col>
								<v-col md="4" cols="12">
									<v-text-field
										v-model="middlename"
										label="Middle Name"></v-text-field>
								</v-col>
								<v-col md="4" cols="12">
									<v-text-field
										v-model="lastname"
										label="Last Name"
										:rules="ruleLastName"
										required></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="3" cols="12">
									<v-text-field
										v-model="bdate"
										type="date"
										label="Birth Date"></v-text-field>
								</v-col>
								<v-col md="5" cols="12">
									<v-radio-group v-model="gender" label="Gender" row dense mandatory>
										<v-radio
											label="Male"
											value="1"></v-radio>
										<v-radio
											label="Female"
											value="2"></v-radio>
									</v-radio-group>
								</v-col>
								<v-col md="4" cols="12">
									<v-text-field
										v-model="email"
										label="E-mail"
										type="email"
										:rules="ruleEmail"></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="4" cols="12">
									<v-text-field 
										v-model="username"
										label="Username"
										:rules="ruleUsername"
										required></v-text-field>
								</v-col>
								<v-col md="4" cols="12">
									<v-text-field 
										v-model="password"
										label="Password"
										type="password"
										:rules="rulePassword"
										required></v-text-field>
								</v-col>
								<v-col md="4" cols="12">
									<v-text-field 
										v-model="cpassword"
										label="Confirm Password"
										type="password"
										:rules="ruleCPassword"
										:error-messages="cpassErrMsg"
										required></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<v-btn class="mt-3" text color="primary" :disabled="!valid" @click="submit">Save</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-responsive>
		<LoadingComponent :showOverlay="isLoading" caption="Processing..."/>
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
			isAlert: false,
			alertMsg: '',
			alertType: 'error',
			menu: false,
			valid: false,
			username: '',
			password: '',
			cpassword: '',
			gender: '',
			firstname: '',
			middlename: '',
			lastname: '',
			cpassErrMsg: '',
			bdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			email: '',
			ruleEmail: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid',
			],
			ruleGender: [
				v => !!v || 'Gender is required',
			],
			ruleFirstName: [
				v => !!v || 'First Name is required',
			],
			ruleLastName: [
				v => !!v || 'Last Name is required',
			],
			ruleUsername: [
				v => !!v || 'Username is required',
			],
			rulePassword: [
				v => !!v || 'Password is required',
				v => v.length >= 8 || 'Password must be 8 character or more',
			],
			ruleCPassword: [
				v => !!v || 'Confirm Password is required',
				v => v.length >= 8 || 'Password must be 8 character or more',
			]
		}),
		watch: {
			cpassword(value) {
				if (value.length >= 8) {
					this.cpassErrMsg = this.password != value ? 'Password and Confirm password is not match.' : ''
				}	
				else {
					this.ruleCPassword
				}
			}
		},
		methods: {
			submit() {
				let data = {}
				this.$store.dispatch('setOverlay', true)
				this.$store.dispatch('getCSRFToken')
				.then(() => {
					data.username = this.username
					data.password = this.password
					data.firstname = this.firstname
					data.middlename = this.middlename
					data.email = this.email
					data.lastname = this.lastname
					data.gender_id = this.gender
					data.DOB = this.bdate
					this.$store.dispatch('register', data)
					.then(resp => {
						this.$store.dispatch('setOverlay', false)
						if (resp.success == 1) {
							this.$router.push({ name: 'login' })
						}
						else {
							let msg = '',
									response = JSON.parse(resp);
							
							for (let key in response.errors) {
								msg += (response.errors[key] + '<br>')
							}

							this.isAlert = true
							this.alertMsg = msg
							this.alertType = 'error'
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