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
    >
      <div class="user-login-form">
        <h6>Login</h6>
      </div>
      <button @click="getLink('facebook')" class="yes">facebook</button>
      <button @click="getLink('google')" class="yes">google</button>
      <button @click="getLink('microsoft')" class="yes">microsoft</button>
      <button @click="getLink('apple')" class="yes">microsoft</button>
    </b-sidebar>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  methods: {
    getLink(provider) {
      auth
        .getSocialLink("b2c", provider, "http://localhost:8080")
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
  }
  .yes {
    display: block;
    margin: 10px 0;
    padding: 20px;
  }
}
</style>