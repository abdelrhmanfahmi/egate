<template>
  <div class="top-footer-wapper" :class="$i18n.locale">
    <v-container>
      <v-row class="aligned-row">
        <v-col cols="12" sm="12" md="7">
          <v-row class="aligned-row" justify="center" align="center">
            <v-col cols="12" md="6" sm="12">
              <span
                ><font-awesome-icon icon="fa-solid fa-paper-plane" /> Sign Up To
                Newsletter</span
              >
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <span> … And Receive 100 Egp For First Shopping</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-form @submit.prevent>
            <div class="input-holder">
              <input
                class="enterEmail"
                type="text"
                placeholder="Email Address"
              />
              <button class="mailBtn">Sign Up</button>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.top-footer-wapper {
  padding: 10px;
  background-color: $main-color;
  font-size: 16px;
  color: #fff;
  svg {
    font-size: 22px !important;
  }
}

.input-holder {
  position: relative;
  .mailBtn {
    position: absolute;
    right: -5px;
    top: 0;
    bottom: 0;
    background: #143152;
    color: #fff;
    border-radius: 0 20px 20px 0;
    padding: 10px 25px;
  }
  .enterEmail {
    background: #fff;
    padding: 10px 15px;
    border-radius: 20px;
    width: 100%;

    &:active,
    &:hover,
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
}
.ar {
  .input-holder {
    position: relative;
    .mailBtn {
      left: 0;
      border-radius: 20px 0 0 20px;
      position: absolute;
    padding: 10px 25px;
    right: auto;

    }
  }
}
</style>
