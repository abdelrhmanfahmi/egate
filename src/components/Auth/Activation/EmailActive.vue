<template>
  <div class="register-wrapper pt-11">
    <h2 class="text-center">Activate Your Account</h2>

    <div class="active-email">
      <form @submit.prevent="activateEmail" class="w-50 m-auto">
        <!-- <label for="email">Email <span class="required">*</span></label> -->
        <h3 class="mb-5">Email Activation</h3>
        <div class="email mb-4">
          <v-text-field
            label="Email"
            variant="outlined"
            v-model="emailActive.value"
            hide-details="true"
          ></v-text-field>

          <span class="mb-3" v-if="AuthErrors">
            <div
              class="error text-red"
              v-for="(error, index) in AuthErrors.value"
              :key="index"
            >
              {{ error }}
            </div>
          </span>
        </div>
        <div class="code">
          <v-text-field
            label="Activation code"
            variant="outlined"
            v-model="emailActive.code"
          ></v-text-field>

          <span class="mb-3" v-if="AuthErrors">
            <div
              class="error text-red"
              v-for="(error, index) in AuthErrors.code"
              :key="index"
            >
              {{ error }}
            </div>
          </span>
        </div>
        <div class="text-center">
          <v-btn class="me-4" type="submit" @click.prevent="activateEmail">
            submit
          </v-btn>

          <v-btn @click.stop="emailActive.value = null , emailActive.code = null "> clear </v-btn>
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
  </div>
</template>
    
    <script>
export default {
  data() {
    return {
      emailActive: {
        type: "email",
        value: null,
        code: null,
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
    activateEmail() {
      this.$store.dispatch("Auth/ActiveEmailAccount", this.emailActive);
    },
  },
  mounted() {
    this.$store.dispatch("Auth/resetErrors");
  },
};
</script>
    
    <style></style>