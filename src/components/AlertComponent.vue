<template>
	<v-alert
		v-model="alert"
		:type="alertTyp"
		border="left"
		close-icon="mdi-close"
		dismissible
		elevation="15"
		transition="scale-transition"
		class="mt-3">
		{{ message }}
	</v-alert>
</template>

<script>
	export default {
		props: {
			message: String,
			alertType: String,
			isAlert: Boolean,
		},
		data: () => ({
			alert: false,
		}),
		method: {
			
		},
		watch: {
			isAlert(newVal) {
				if (newVal) {
					this.alert = newVal
				}
			},
			alert(nval) {
				if (!nval) {
					this.$emit('alertClosed')
				}
			}
		},
		computed: {
			alertTyp() {
				return this.alertType ? this.alertType.toString() :  'error'
			}
		},
	}
</script>