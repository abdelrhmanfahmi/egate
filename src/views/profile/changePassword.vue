<template>
  <!-- change password page  -->
  <div class="change-password py-4">
    <h4 class="main-header">{{ $t("profile.changePassword") }}</h4>
    <form class="py-3" @submit.prevent="changePassword()">
      <!-- Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="password">{{ $t("profile.currentPassword") }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              id="password"
              v-model="form.old_password"
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
            v-for="(error, index) in errors.old_password"
            :key="index"
          >
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <!-- Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="password">{{ $t("profile.NewPassword") }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              id="password"
              v-model="form.password"
              :type="fieldTypeNew"
            />
            <div class="icon-passowrd" @click.stop="switchFieldNew()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldTypeNew === 'password'"
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
              :type="fieldTypeConfirm"
              id="confirmPassword"
              v-model="form.password_confirmation"
            />
            <div class="icon-passowrd" @click.stop="switchFieldConfirm()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldTypeConfirm === 'password'"
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
        {{ $t("profile.save") }}
      </b-button>
    </form>
  </div>
</template>

<script>
/**
 *  change password page
 * @displayName  change password page
 */
import auth from "@/services/auth";

export default {
  data() {
    return {
      form: {
        old_password: "",
        password: "",
        password_confirmation: "",
      },
      fieldType: "password",
      fieldTypeNew: "password",
      fieldTypeConfirm: "password",
      errors: {},
    };
  },
  methods: {
    /**
     * change Password function
     * @public This is a public 
     */
    changePassword() {
      auth
        .changePassword(this.form)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(this.$t("profile.changePasswordMessage"));
          }
          this.errors = {};
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * switch Field function to show password
     * @public This is a public 
     */
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    /**
     * switch FieldNew function 
     * @public This is a public 
     */
    switchFieldNew() {
      this.fieldTypeNew =
        this.fieldTypeNew === "password" ? "text" : "password";
    },
     /**
     * switch Field Confirm function 
     * @public This is a public 
     */
    switchFieldConfirm() {
      this.fieldTypeConfirm =
        this.fieldTypeConfirm === "password" ? "text" : "password";
    },
  },
  mounted() {
    let profileData = this.buyerUserData;
    /**
     * if profile Data not exist redirect to login page
     * @public This is a public 
     */
    if (!profileData) {
      this.$router.push("/b2b-login");
    }
  },
};
</script>

<style lang="scss" scoped>
.change-password {
  .login-button {
    margin: 30px 15px;
    width: 20%;
  }
}

html:lang(ar) {
  .change-password {
    text-align: right;
  }
}
</style>
