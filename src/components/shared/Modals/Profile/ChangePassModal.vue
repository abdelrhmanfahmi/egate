<template>
  <div class="wrapper">
    <div class="modal-wrapper">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
          </template>

          <v-card class="dialog-parent py-10 px-4 pb-5" v-if="!passChanged">
            <v-card-text class="text-center">
              <h4 class="mb-5">Change Password</h4>
              <form @submit.prevent="changePass">
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="
                      form.oldPass ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="form.oldPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="Current Password"
                    variant="outlined"
                    @click:append-inner="form.oldPass = !form.oldPass"
                    label="Current Password *"
                    v-model="form.oldPass"
                  ></v-text-field>
                </div>
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="
                      form.newPass ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="form.newPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="New Password"
                    variant="outlined"
                    @click:append-inner="form.newPass = !form.newPass"
                    label="New Password*"
                    v-model="form.newPass"
                  ></v-text-field>
                </div>
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="
                      form.confirmPass ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="form.confirmPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="Confirm New Password"
                    variant="outlined"
                    @click:append-inner="form.confirmPass = !form.confirmPass"
                    label="Confirm New Password*"
                    v-model="form.confirmPass"
                  ></v-text-field>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" block @click="dialog = false"
                  >Close Dialog</v-btn
                > -->
              <v-btn
                color="primary"
                block
                class="bg-main br-20"
                @click.stop="changePass"
                >submit</v-btn
              >
            </v-card-actions>
            <div class="close-dialog" @click="dialog = false">
              <v-icon icon="mdi-close"></v-icon>
            </div>
          </v-card>
          <v-card class="dialog-parent py-10 px-4 pb-5" v-else>
            <v-card-text
              class="text-center d-flex flex-column justify-space-between align-center"
            >
              <h4 class="mb-5">Change Password</h4>
              <v-img
                src="@/assets/images/check.png"
                height="64"
                width="64"
                class="mb-4"
              ></v-img>
              <p class="text-gray">
                Your password has been changed successfully
              </p>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" block @click="dialog = false"
                  >Close Dialog</v-btn
                > -->
              <v-btn
                color="primary"
                block
                class="border-main br-20"
                @click="
                  dialog = false;
                  passChanged = false;
                  form.oldPass = null;
                  form.newPass = null;
                  form.confirmPass = null;
                "
                >DONE</v-btn
              >
            </v-card-actions>
            <div
              class="close-dialog"
              @click="
                dialog = false;
                passChanged = false;
                form.oldPass = null;
                form.newPass = null;
                form.confirmPass = null;
              "
            >
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
      form: {
        oldPass: null,
        newPass: null,
        confirmPass: null,
      },
      passChanged: false,
    };
  },
  methods: {
    changePass() {
      console.log(this.form);
      // this.passChanged = true;
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
