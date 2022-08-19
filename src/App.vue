<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="title-width">{{ setAppBarTitle }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list nav>
        <v-list-item to="/">
          <v-icon class="ma-2">mdi-home</v-icon>
          Home
        </v-list-item>
        <v-list-item to="/login">
          <v-icon class="ma-2">mdi-login</v-icon>
          Login
        </v-list-item>
        <v-list-item to="/register">
          <v-icon class="ma-2">mdi-account-plus</v-icon>
          Register
        </v-list-item>
        <v-list-item to="/logout">
          <v-icon class="ma-2">mdi-logout</v-icon>
          Logout
        </v-list-item>
        <v-list-item>
          <v-switch class="mx-auto" inset style="width: 110px;" v-model="darkmode"
            prepend-icon="mdi-white-balance-sunny" append-icon="mdi-weather-night"
          >
          </v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: false,
    darkmode: false,
  }),
  created() {
    this.$store.dispatch('getStoredDarkState')
    this.darkmode = this.$store.state.darkmode.darkMode
  },
  watch: {
    darkmode(newval) {
      this.darkmode = newval
      this.$vuetify.theme.dark = newval
      this.$store.dispatch('changeStoredState', newval)
    }
  },
  computed: {
    setAppBarTitle() {
      let title
      switch (this.$route.name) {
        case 'home':
          title = 'Home'
          break
        case 'login':
          title = 'Login'
          break
        case 'register':
          title = 'Registration'  
          break
        default:
          title = '404 Not Found'
      }
      return title
    },
  },
}
</script>

<style scoped>
  .title-width {
    width: 300px;
  }
</style>
