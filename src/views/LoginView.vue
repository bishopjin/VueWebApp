<template>
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

					<v-btn class="mt-3" block outlined :disabled="!valid" @click="submit">Login</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-responsive>
</template>

<script>
	export default {
		data: () => ({
			valid: false,
			username: '',
			password: '',
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
				alert(this.username)
			}
		}
	}
</script>