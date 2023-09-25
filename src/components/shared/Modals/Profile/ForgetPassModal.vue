<template>
  <div class="wrapper">
    <div class="modal-wrapper">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Forgot Password </v-btn>
          </template>

          <v-card class="dialog-parent py-10 px-4 pb-5" v-if="!resetChecked">
            <v-card-text class="text-center">
              <h4 class="mb-5">Forgot Password</h4>
              <p class="text-gray my-2">
                Enter Your Email To Send Your Reset Password Code
              </p>
              <form @submit.prevent="sendEmail" class="w-100">
                <div class="email">
                  <v-text-field
                    type="email"
                    density="compact"
                    placeholder="Email"
                    variant="outlined"
                    label="Email *"
                    v-model="form.email"
                  ></v-text-field>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                class="bg-main br-20"
                @click="sendEmail"
                >submit</v-btn
              >
            </v-card-actions>
            <div class="close-dialog" @click="dialog = false ; resetChecked = false ; form.email = null ; form.code = null">
              <v-icon icon="mdi-close"></v-icon>
            </div>
          </v-card>
          <v-card class="dialog-parent py-10 px-4 pb-5" v-else>
            <v-card-text
              class="text-center d-flex flex-column justify-space-between align-center"
            >
              <h4 class="mb-5">Reset Password Code</h4>
              <form @submit.prevent="confirmWithCode" class="w-100">
                <div >
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Code"
                    variant="outlined"
                    label="Code *"
                    v-model="form.code"
                  ></v-text-field>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                class="bg-main br-20"
                @click="confirmWithCode"
                >CONFIRM</v-btn
              >
            </v-card-actions>
            <div class="my-5">
              <p class="text-gray">
                <span>Didn’t Receive Email?</span>
                <span class="main-color cursor-pointer">Resend</span>
              </p>
            </div>
            <div class="close-dialog" @click="dialog = false ; resetChecked = false ; ; form.email = null ; form.code = null">
              <v-icon icon="mdi-close"></v-icon>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      resetChecked: false,
      form: {
        email: null,
        code: null,
      },
    };
  },
  methods: {
    sendEmail() {
      // this.resetChecked = true;
      console.log(this.form);
    },
    confirmWithCode() {
      // this.resetChecked = true;
      console.log(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-parent {
  position: relative;
  .close-dialog {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
