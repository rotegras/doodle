<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import Parse from 'parse';
import initParse from '../utils/initParse';

export default {
  name: 'Login',

  props: {
    authenticated: {
      type: Boolean,
    },
  },

  data: () => ({
    input: {
      username: '',
      password: '',
    },
  }),

  created() {
    initParse();
  },

  methods: {
    login() {
      // eslint-disable-next-line
      const user = Parse.User.logIn(this.input.username, this.input.password)
        .then((loggedUser) => {
          console.log(`
          Access successfull for user: ${loggedUser.get('username')} 
        `);
          this.$emit('setStatus', true);
          this.$router.replace({ name: 'doodle' });
        }).catch((error) => {
          console.log(error.code + error.message);
        });
    },
  },
};
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 2rem 1rem 3rem;
  }
  h1 {
    margin-bottom: 1rem;
    color: rgb(252, 191, 67);
  }
</style>
