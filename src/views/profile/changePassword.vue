<template>
  <div class="change-password py-4">
    <h3>change password</h3>
    <form class="py-3">
      <!-- Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="password">{{ $t("register.password") }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              id="password"
              v-model="form.password"
              :type="fieldType"
            />
            <div class="icon-passowrd" @click="switchField()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldType === 'password'"
                size="lg"
              />
              <font-awesome-icon
                icon="fa-solid fa-eye-slash"
                v-else
                size="lg"
              />
            </div>
          </div>
          <div
            class="error"
            v-for="(error, index) in errors.password"
            :key="index"
          >
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <!-- Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="password">{{ $t("register.password") }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              id="password"
              v-model="form.password"
              :type="fieldType"
            />
            <div class="icon-passowrd" @click="switchField()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldType === 'password'"
                size="lg"
              />
              <font-awesome-icon
                icon="fa-solid fa-eye-slash"
                v-else
                size="lg"
              />
            </div>
          </div>
          <div
            class="error"
            v-for="(error, index) in errors.password"
            :key="index"
          >
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <!-- Confirm Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="confirmPassword">{{
            $t("register.confirmPassword")
          }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              :type="fieldType"
              id="confirmPassword"
              v-model="form.password_confirmation"
            />
            <div class="icon-passowrd" @click="switchField()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldType === 'password'"
                size="lg"
              />
              <font-awesome-icon
                icon="fa-solid fa-eye-slash"
                v-else
                size="lg"
              />
            </div>
          </div>
          <div
            class="error"
            v-for="(error, index) in errors.password_confirmation"
            :key="index"
          >
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <b-button type="submit" class="login-button">
        {{ $t("login.login") }}
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: "",
      },
      fieldType: "password",
      errors: {},
    };
  },
  methods: {
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss" >
.change-password {
  .login-button{
    margin:30px 15px;
    width: 20%;
  }

}
</style>