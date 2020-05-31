<template>
  <div>
    <v-app-bar app
    :prominent="!reduced"
    :short="reduced"
    :absolute="!reduced"
    dense
    elevation="5"
    class="primary"
    id="app-bar"
  >
      <v-toolbar-items>
        <v-btn to="/"
          exact
          depressed
          exact-active-class="logo-active"
          class="v-btn--flat"
        >
          <v-img :src="require('../assets/escut.svg')"
            alt="Castellers de Berlin"
            :max-height="logoSize"
            :max-width="logoSize">
          </v-img>
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="link in links"
          :key="link.name"
          :to="{ name: link.path }"
          text
          exact
          class="font-weight-black theme--light"
        >
          {{ $t(link.name) }}
        </v-btn>
        <v-btn
          v-if="authenticated"
          to="/"
          text
          exact
          class="font-weight-black theme--light"
          v-on:click.native="logout()"
        >
          {{ $t('logout') }}
        </v-btn>
        <v-btn
          v-else
          to="/login"
          text
          exact
          class="font-weight-black theme--light"
        >
          {{ $t('login') }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <v-toolbar-items class="hidden-xs-only">
        <LanguageSelector/>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"
                          class="hidden-sm-and-up"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      class="hidden-sm-and-up"
    >
      <v-list dense
              nav>
        <v-list-item/>
        <v-list-item>
          <v-btn to="/"
            text
            exact
            width="100%"
            class="theme--light"
          >
            {{ $t('home') }}
          </v-btn>
        </v-list-item>
        <v-list-item
          v-for="link in links"
          :key="link.name"
        >
          <v-btn
            :to="{ name: link.path }"
            text
            exact
            width="100%"
            class="theme--light"
          >
            {{ $t(link.name) }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <LanguageSelector/>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import LanguageSelector from './LanguageSelector.vue';

export default {
  components: { LanguageSelector },

  props: {
    authenticated: {
      type: Boolean,
    },
  },

  data: () => ({
    drawer: false,
    links: [
      // { path: 'about', name: 'about' },
      // { path: 'calendar', name: 'calendar' },
    ],
  }),

  methods: {
    logout() {
      this.$emit('logout');
    },
  },

  computed: {
    logoSize() {
      return this.reduced ? 50 : 90;
    },

    reduced() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },

  watch: {
    authenticated() {
      return this.authenticated;
    },
  },
};
</script>

<style lang="scss">
  #app-bar {
    .v-toolbar__content {
      background-repeat: repeat;
      background-size: auto 50px;
      padding-top: 0;
    }

    .v-toolbar__items a {
      text-decoration: none;
    }

    .logo-active {
      color: transparent !important;
    }
  }
</style>

<i18n>
en:
  home: "Home"
  about: "About us"
  calendar: "Calendar"
  login: "Log in"
  logout: "Log out"
de:
  home: "Home"
  about: "Über uns"
  calendar: "Kalender"
  login: "Log in"
  logout: "Log out"
ca:
  home: "Home"
  about: "Qui som"
  calendar: "Calendari"
  login: "Log in"
  logout: "Log out"
</i18n>
