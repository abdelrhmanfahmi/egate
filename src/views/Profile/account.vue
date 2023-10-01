<template>
  <div class="profile">
    <div class="account-page">
      <div class="page-title">
        <h2 class="profile-title">My Account</h2>
      </div>
      <div class="account-information">
        <div class="my-11 mb-3">
          <h4 class="title">Account Information</h4>
        </div>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <div class="account-info">
              <h4>Contact Information</h4>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="name-address">
                <div class="name">
                  <p>{{ info.full_name }}</p>
                </div>
                <div class="address">
                  <p>{{ info.email }}</p>
                </div>
              </div>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="actions">
                <v-row>
                  <v-col md="6" sm="6" xs="12">
                    <p class="red-text" role="button">Edit</p>
                  </v-col>
                  <v-col md="6" sm="6" xs="12">
                    <!-- <p class="red-text" role="button">Change Password</p> -->
                    <ChangePassModal />
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <div class="account-info">
              <h4>Newsletters</h4>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="name-address">
                <div class="name">
                  <p>You Aren’t Subscribed To Our Newsletter.</p>
                </div>
              </div>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="actions">
                <v-row>
                  <v-col md="12 " sm="12" xs="12">
                    <p class="red-text" role="button">Edit</p>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="address">
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <div class="my-11 mb-3 text-left">
              <h3 class="title">Address Book</h3>
            </div>
            <div class="account-info">
              <h4>Default Billing Address</h4>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="name-address">
                <div class="name">
                  <p>You Have Not Set A Default Billing Address.</p>
                </div>
              </div>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="actions">
                <v-row>
                  <v-col md="6" sm="6" xs="12">
                    <p class="red-text" role="button">Edit Address</p>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <div class="my-11 mb-3">
              <p class="red-text text-right">Manage Addresses</p>
            </div>
            <div class="account-info">
              <h4>Default Shipping Address</h4>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="name-address">
                <div class="name">
                  <p>You Have Not Set A Default Shipping Address.</p>
                </div>
              </div>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="actions">
                <v-row>
                  <v-col md="12 " sm="12" xs="12">
                    <p class="red-text" role="button">Edit Address</p>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

  
<script>
import ChangePassModal from "@/components/shared/Modals/Profile/ChangePassModal.vue";
import { useMeta } from "vue-meta";
export default {
  setup(){
    useMeta({
      title: "Profile Account",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  data(){
    return {
      info:{}
    }
  },
  mounted(){
    this.info = this.$store.state.Auth.user.user;
  },
  components: {
    ChangePassModal,
  },
};
</script>

<style lang="scss" scoped>
.account-info {
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid $gray;
}
.name-address {
  min-height: 50px;
}
p {
  color: $gray;
}
</style>
