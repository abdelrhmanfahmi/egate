<template>
  <div class="user-login">
    <b-sidebar
      id="login"
      backdrop
      width="450px"
      :right="getDir === 'rtl'"
      shadow
      z-index="5"
      body-class="sidebar-login"
      bg-variant="#fff"
    >
      <div class="user-login-form">
        <h6 class="title">Login</h6>
        <p class="mb-2">Welcome again</p>
        <p class="error">{{ errorMsg }}</p>
        <form @submit.prevent="loginB2c()">
          <b-form-input v-model="form.email" type="email" placeholder="Email" />
          <b-form-input
            class="my-2"
            v-model="form.password"
            type="password"
            placeholder="password"
          />
          <b-button type="submit" class="login-button"> Login </b-button>
        </form>
      </div>
      <button @click="getLink('facebook')" class="yes">facebook</button>
      <button @click="getLink('google')" class="yes">google</button>
      <button @click="getLink('azure')" class="yes">microsoft</button>
      <button @click="getLink('apple')" class="yes">apple</button>
    </b-sidebar>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    loginB2c() {
      auth
        .login("b2c", this.form)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errorMsg = err.message;
        });
    },
    getLink(provider) {
      auth
        .getSocialLink("b2c", provider, "http://localhost:8081")
        .then((res) => {
          window.location.href = res.data.items.url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-login {
  .user-login-form {
    text-align: center;
    border: 1px solid rgba(204, 204, 204, 0.251);
    border-radius: 4px;
    background-color: rgba(216, 220, 221, 0.251);
    padding: 40px 30px;
    .title {
      padding-bottom: 10px;
      position: relative;
      &:after {
        margin: 0 auto;
        right: 0;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 20px;
        height: 3px;
        background: #ed2124;
      }
    }
  }
  .yes {
    display: block;
    margin: 10px 0;
    padding: 20px;
  }
}
</style>
