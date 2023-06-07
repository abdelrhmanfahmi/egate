<template>
  <!-- complete checkout page  -->
  <div>
    <div class="container">
      <!-- fi order completed successfully  -->
      <div class="card success" v-if="valid">
        <div
          style="
            border-radius: 200px;
            height: 200px;
            width: 200px;
            background: #f8faf5;
            margin: 0 auto;
          "
        >
          <i class="checkmark">✓</i>
        </div>
        <h1>
          {{ $t("home.authorized") }}
        </h1>
        
        <h2>{{$t('login.resetPassword')}}</h2>
        <form @submit.prevent="changeAuthUserPass()">
            <b-row>
                <b-col lg="6">
                    <b-form-group>
                      <label for="password">{{ $t("register.password") }}</label>
                      <span class="requried">*</span>
                      <div class="show-password">
                        <b-form-input id="password" v-model="form.password" :type="fieldType" />
                        <div class="icon-passowrd" @click="switchField()">
                          <font-awesome-icon icon="fa-solid fa-eye" v-if="fieldType === 'password'" size="lg" />
                          <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
                        </div>
                      </div>
                     <div class="localCheck" v-if="errorsExist == false">
                        <span for="passCheck1">
                            {{ $t('register.passCheck1') }}
                          </span>
                          <br />
                          <span for="passCheck2">
                            {{ $t('register.passCheck2') }}
                          </span>
                     </div>
                      <div class="error" v-for="(error, index) in errors.password" :key="index">
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
                        <b-form-input :type="fieldType" id="confirmPassword" v-model="form.password_confirmation" />
                        <div class="icon-passowrd" @click="switchField()">
                          <font-awesome-icon icon="fa-solid fa-eye" v-if="fieldType === 'password'" size="lg" />
                          <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
                        </div>
                      </div>
                      <div class="error" v-for="(error, index) in errors.password_confirmation" :key="index">
                        {{ error }}
                      </div>
                    </b-form-group>
                  </b-col>
            </b-row>
            <div class="submition-box">
                <b-button type="submit"  variant="danger">
                  {{ $t("register.submit") }}
                </b-button>
              </div>
        </form>
        <router-link
          :to="{ path: 'viewOrderDetails', query: { id: orderId } }"
          v-if="buyerUserData"
        >
          <b-button variant="outline-success mt-4">
            {{ $t("payment.orderTrack") }}
          </b-button>
        </router-link>
      </div>
      <!-- if order fail  -->
      <div class="card fail" v-if="invalid">
        <div
          style="
            border-radius: 200px;
            height: 200px;
            width: 200px;
            background: #f8faf5;
            margin: 0 auto;
          "
        >
          <i class="checkmark m-0">
            <font-awesome-icon icon="fa-solid fa-exclamation" />
          </i>
        </div>
       <div v-if="failReason == null">
        <h1 class="mt-3" >
            {{ $t("home.unAuthorized") }}
        </h1>
        <b-button variant="outline-success" to="/">
          {{$t('home.home')}}
        </b-button>
       </div>
        <h1 class="mt-3" v-else>
          <p>
            {{ $t("home.unAuthorized") }}
          </p>
          <p>
            {{ failReason }}
          </p>
          <b-button variant="outline-success" to="/">
            {{$t('home.home')}}
          </b-button>
          
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
// complete checkout page
import auth from "@/services/auth";
export default {
  data() {
    return {
      valid: false,
      invalid: false,
      failReason: null,
      orderId: null,
      form: {

        password: "",
        password_confirmation: "",

      },
      fieldType:'password',
      errors: [],
      errorsExist:false
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to check if order Completed or not
     */
    checkUserValidity() {
      let data = {
        email: this.$route.query.email,
        token: this.$route.query.token,
      };
      auth
        .checkUserValidity(data)
        .then((res) => {
          if(res.status == 200 ){
            this.valid = true  
            this.invalid = false 
          }else{
           this.valid = false 
            this.invalid =true
        }})
        .catch(() => {
          // console.log(err);
          this.valid = false 
            this.invalid =true
        });
    },
     switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    changeAuthUserPass(){
        let data = {
            password:this.form.password,
            password_confirmation:this.form.password_confirmation,
            email: this.$route.query.email,
            token: this.$route.query.token,
        }
        auth.changeAuthUserPass(data).then(res =>{
            if(res.status == 200){
                this.$router.push('/b2b-login')
            }else{
                this.errorsExist = true
            }
        }).catch(err =>{
            this.errorsExist = true
            let errors = Object.values(err)[2].data;
            this.errors = errors.items;
            this.errMessage(err.message);
        })
    }
  },
  mounted() {
    this.checkUserValidity();
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  padding: 40px 0;
  // background: #ebf0f5;
  min-height: 500px;
}
h1 {
  color: #88b04b;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
}
p {
  color: #404f5e;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  margin: 0;
}
i {
  color: #9abc66;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
}
.card {
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  display: inline-block;
  margin: 0 auto;
}
.success {
  h1 {
    color: #88b04b;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  }
  i {
    color: #9abc66;
  }
}
.fail {
  h1 {
    color: $main-color;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  }
  i {
    color: $main-color;
  }
}
</style>
