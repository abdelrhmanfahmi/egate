<template>
  <div class="wrapper">
    <div class="modal-wrapper">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
          </template>

          <v-card class="dialog-parent py-10 px-4 pb-5">
            <v-card-text class="text-center">
              <h4 class="mb-5">Change Password</h4>
              <form>
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="oldPass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="oldPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="Current Password"
                    variant="outlined"
                    @click:append-inner="oldPass = !oldPass"
                    label="Current Password *"
                  ></v-text-field>
                </div>
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="newPass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="newPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="New Password"
                    variant="outlined"
                    @click:append-inner="newPass = !newPass"
                    label="New Password*"
                  ></v-text-field>
                </div>
                <div class="old-pass">
                  <v-text-field
                    :append-inner-icon="confirmPass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="confirmPass ? 'text' : 'password'"
                    density="compact"
                    placeholder="Confirm New Password"
                    variant="outlined"
                    @click:append-inner="confirmPass = !confirmPass"
                    label="Confirm New Password*"
                  ></v-text-field>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" block @click="dialog = false"
                  >Close Dialog</v-btn
                > -->
              <v-btn color="primary" block class="bg-main br-20">submit</v-btn>
            </v-card-actions>
            <div class="close-dialog" @click="dialog = false">
              <v-icon icon="mdi-close"></v-icon>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      oldPass:null,
      newPass:null,
      confirmPass:null,
    };
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
