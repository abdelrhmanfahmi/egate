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
              id="currentPassword"
              v-model="form.old_password"
              :type="fieldType"
            />
            <div class="icon-passowrd" @click="switchField()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldType === 'password'"
                size="lg"
              />
              <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
            </div>
          </div>
          <div class="error" v-for="(error, index) in errors.old_password" :key="index">
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <!-- Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="NewPassword">{{ $t("profile.NewPassword") }}</label>
          <span class="requried">*</span>
          <div class="show-password">
            <b-form-input
              id="NewPassword"
              @keyup="checkPass"
              v-model="form.password"
              :type="fieldTypeNew"
              class="passwordCheck"
            />
            <div class="icon-passowrd" @click.stop="switchFieldNew()">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                v-if="fieldTypeNew === 'password'"
                size="lg"
              />
              <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
            </div>
          </div>
          <div class="error" v-for="(error, index) in errors.password" :key="index">
            {{ error }}
          </div>
        </b-form-group>
      </b-col>
      <!-- Confirm Password -->
      <b-col lg="6">
        <b-form-group>
          <label for="confirmPassword">{{ $t("register.confirmPassword") }}</label>
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
              <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
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
        <div class="form-content">
          <div class="">
            <div class="myBox">
              <div class="all">
                <p class="font-weight-bold h6 text-gray" id="letter">
                  <span id="check"
                    ><font-awesome-icon icon="fa-solid fa-circle-check"
                  /></span>
                  8 characters
                </p>
                <p class="font-weight-bold h6 text-gray" id="letter1">
                  <span id="check"
                    ><font-awesome-icon icon="fa-solid fa-circle-check"
                  /></span>
                  1 special character
                </p>
                <p class="font-weight-bold h6 text-gray" id="letter2">
                  <span id="check"
                    ><font-awesome-icon icon="fa-solid fa-circle-check"
                  /></span>
                  1 uppercase letter
                </p>
                <p class="font-weight-bold h6 text-gray" id="letter3">
                  <span id="check"
                    ><font-awesome-icon icon="fa-solid fa-circle-check"
                  /></span>
                  1 number
                </p>
              </div>
            </div>
          </div>
        </div>
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
     * @vuese
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
     * @vuese
     */
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    /**
     * switch FieldNew function
     * @vuese
     */
    switchFieldNew() {
      this.fieldTypeNew = this.fieldTypeNew === "password" ? "text" : "password";
    },
    /**
     * switch Field Confirm function
     * @vuese
     */
    switchFieldConfirm() {
      this.fieldTypeConfirm = this.fieldTypeConfirm === "password" ? "text" : "password";
    },
    checkPass() {
      var len = document.getElementById("NewPassword").value;
      let myLetter = document.getElementById("letter");
      let letter1 = document.getElementById("letter1");
      let letter2 = document.getElementById("letter2");
      let letter3 = document.getElementById("letter3");

      // Validate Uppercase letteres
      var uppercaseLetters = /[A-Z]/g;

      if (len.match(uppercaseLetters)) {
        letter2.classList.add("main-color");
        letter2.style.opacity = 1;
      } else {
        letter2.classList.remove("main-color");
        letter2.classList.add("text-gray");
        letter2.style.opacity = 0.5;
      }

      // Validate Special Characters
      var special_chars = /\W/g;

      if (len.match(special_chars)) {
        letter1.classList.add("main-color");
        letter1.style.opacity = 1;
      } else {
        letter1.classList.remove("main-color");
        letter1.classList.add("text-gray");
        letter1.style.opacity = 0.5;
      }

      //Validate Numbers
      var numbers = /[0-9]/g;

      if (len.match(numbers)) {
        letter3.classList.add("main-color");
        letter3.style.opacity = 1;
      } else {
        letter3.classList.remove("main-color");
        letter3.classList.add("text-gray");
        letter3.style.opacity = 0.5;
      }

      // Validate length of string
      if (len.length >= 8) {
        myLetter.classList.add("main-color");

        myLetter.style.opacity = 1;
      } else {
        myLetter.classList.remove("main-color");
        myLetter.classList.add("text-gray");
        myLetter.style.opacity = 0.5;
      }
    },
  },
  mounted() {
    let profileData = this.buyerUserData;
    /**
     * if profile Data not exist redirect to login page
     * @vuese
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
