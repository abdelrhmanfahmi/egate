<template>
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <span class="sub-title"></span>
        <h2 class="main-header">create customer account</h2>
      </div>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <div class="register-info">
              <h4 class="main-header">main information</h4>
              <router-link to="/" class="back">
                <span> &#60; Already have account</span></router-link
              >
            </div>
            <form>
              <b-row class="justify-content-center">
                <!-- First Name -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="f-name">frist name</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="f-name"
                      v-model="form.firstName"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Last Name -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="l-name">last name</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="l-name"
                      v-model="form.lastName"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Email -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="email">email</label>
                    <span class="requried">*</span>
                    <b-form-input id="email" v-model="form.email" required />
                  </b-form-group>
                </b-col>
                <!-- Password -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="password">password</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Confirm Password -->
                <b-col lg="6">
                  <b-form-group
                    label="confirm password"
                    label-for="confirmPassword"
                  >
                    <b-form-input
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- country code -->
                <b-col lg="2" cols="4">
                  <b-form-group>
                    <label for="countryCode">country code</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="countryCode"
                      v-model="form.countryCode"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- phone -->
                <b-col lg="10" cols="8">
                  <b-form-group>
                    <label for="phone">phone </label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="phone"
                      v-model="form.confirmPassword"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </form>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryCode: "",
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.user-register {
  .main-title {
    text-align: center;
    padding: 30px 0;
  }
  .user-register-form {
    .register-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;
      .back {
        font-weight: 500;
        color: $header-color;
        &:hover {
          color: $main-color;
        }
      }
    }
  }
}
</style>