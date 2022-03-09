<template>
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <span class="sub-title"></span>
        <h2 class="main-header">{{ $t("register.resetPassword") }}</h2>
      </div>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <form>
              <b-row class="justify-content-center">
                <!-- First Name -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="password">{{ $t("register.password") }}</label>
                    <b-form-input id="password" type="password" />
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group>
                    <label for="passwordConfirmation">{{
                      $t("register.passwordConfirmation")
                    }}</label>
                    <b-form-input id="passwordConfirmation" type="password" />
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="submition-box">
                <b-button type="submit" variant="danger">
                  {{ $t("register.save") }}
                </b-button>
              </div>
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
    return {};
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
    .terms {
      a {
        color: $main-color;
        text-decoration: underline !important;
        display: inline-block;
      }
    }
    .submition-box {
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 0.251);
      border-radius: 4px;
      background-color: rgba(216, 220, 221, 0.251);
      padding: 40px 30px;
    }
    .help {
      text-align: center;
      .main-header {
        text-transform: uppercase;
      }
      .tel {
        background-color: #3b5998;
        padding: 20px;
        margin: 10px 0;
        color: #fff;
        display: inline-block;
        direction: ltr;
      }
    }
  }
}

// style arabic
html:lang(ar) {
  .user-register {
    .user-register-form {
      text-align: right;
    }
  }
}
</style>
