<template>
  <div class="register-wrapper pt-11">
    <h1 class="mb-8 text-center">Login</h1>
    <form @submit.prevent="submit" class="w-50 m-auto">
      <!-- <label for="email">Email <span class="required">*</span></label> -->
      <v-text-field
        label="Email"
        variant="outlined"
        v-model="form.email"
      ></v-text-field>

      <span class="mb-3" v-if="AuthErrors">
        <div
          class="error text-red"
          v-for="(error, index) in AuthErrors.email"
          :key="index"
        >
          {{ error }}
        </div>
      </span>
      <!-- <label for="password">Password <span class="required">*</span></label> -->
      <v-text-field
        label="Password"
        variant="outlined"
        v-model.trim="form.password"
        autocomplete="new-password"
        :rules="repeatPasswordRules"
        :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show2 = !show2"
        :type="show2 ? 'text' : 'password'"
      />

      <span class="mb-3" v-if="AuthErrors">
        <div
          class="error text-red"
          v-for="(error, index) in AuthErrors.password"
          :key="index"
        >
          {{ error }}
        </div>
      </span>
      <div class="text-center">
        <v-btn class="me-4" type="submit" @click="login"> submit </v-btn>

        <v-btn @click="form = {}"> clear </v-btn>
        <p class="my-5">
          <span class="text-gray">Don't Have An Account?</span
          ><span>
            <router-link to="/auth/register" class="text-red">
              SignUp
            </router-link>
          </span>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      form: {
        email: null,
        password: null,
        token:localStorage.getItem('firebaseToken'),
        device_type:'web'
      },
      errors: null,
    };
  },
  computed: {
    AuthErrors() {
      return this.$store.getters['Auth/AuthErrors'];
    },
  },
  methods: {
    login() {
      this.$store.dispatch("Auth/Login", this.form);
    },
  },
  mounted() {
    this.$store.dispatch("Auth/resetErrors");
  },
};
</script>

<style></style>