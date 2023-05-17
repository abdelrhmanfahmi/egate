<template>
  <div class="form-content">
    <div class="">
      <div class="myBox">
        <div class="all">
          <p class="font-weight-bold h6 text-gray" id="letter">
            <span id="check"
              ><font-awesome-icon icon="fa-solid fa-circle-check"
            /></span>
            8 {{ $t("login.characters") }}
          </p>
          <p class="font-weight-bold h6 text-gray" id="letter1">
            <span id="check"
              ><font-awesome-icon icon="fa-solid fa-circle-check"
            /></span>
            1 {{ $t("login.specialCharacter") }}
          </p>
          <p class="font-weight-bold h6 text-gray" id="letter2">
            <span id="check"
              ><font-awesome-icon icon="fa-solid fa-circle-check"
            /></span>
            1 {{ $t("login.uppercaseLetter") }}
          </p>
          <p class="font-weight-bold h6 text-gray" id="letter4">
            <span id="check"
              ><font-awesome-icon icon="fa-solid fa-circle-check"
            /></span>
            1 {{ $t("login.lowercaseLetter") }}
          </p>
          <p class="font-weight-bold h6 text-gray" id="letter3">
            <span id="check"
              ><font-awesome-icon icon="fa-solid fa-circle-check"
            /></span>
            1 {{ $t("login.number") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

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
