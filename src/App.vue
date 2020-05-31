<template>
  <v-app>
    <NavMenu
      authenticated="authenticated" @logout="logout"
    />

    <v-content>
      <router-view authenticated="authenticated" />
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import NavMenu from './components/NavMenu.vue';
import Footer from './components/Footer.vue';

export default {
  components: { NavMenu, Footer },
  data: () => ({
    authenticated: false,
  }),

  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' });
    }
  },

  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },

};
</script>

<style lang="scss">
.v-parallax img {
  box-shadow: inset 0 0 10px 8px rgba(0, 0, 0, 0.5);
}

.v-application {
  .container {
    padding-top: 80px;
    padding-bottom: 80px;

    .section-title {
      font-weight: 900;
      color: rgba(0, 0, 0, 0.8);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      line-height: 2rem;
      font-size: 1.5rem;
      padding-bottom: 50px;
      text-align: center;

      .v-divider {
        margin-top: 10px;
      }
    }
  }

  .v-btn {
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.192em;
  }

  .title {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
