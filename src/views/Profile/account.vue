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
                  <p>{{ info?.full_name }}</p>
                </div>
                <div class="address">
                  <p>{{ info?.email }}</p>
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
        <div class="my-11 mb-3 text-left">
          <h3 class="title">Address Book</h3>
        </div>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12" v-for="(addressBook, idx) in address_books" :key="idx">
            <div class="account-info">
              <h4 v-if="idx == 0">Default Billing Address</h4>
              <h4 v-else>Address</h4>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="name-address">
                <div class="name">
                  <p>{{ addressBook.address }}</p>
                </div>
              </div>
              <div class="">
                <v-divider class="border-opacity-25 my-3"></v-divider>
              </div>
              <div class="actions">
                <v-row>
                  <v-col md="6" sm="6" xs="12">
                    <router-link :to="{ name: 'editAddress', params: { id: addressBook.id } }">
                      <p class="red-text" role="button">
                        Edit Address
                      </p>
                    </router-link>
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
import globalAxios from '@/services/global-axios';
import { useMeta } from "vue-meta";
export default {
  setup() {
    useMeta({
      title: "Profile Account",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  mounted() {
    this.info = this.$store.state.Auth.user.user;
    this.getAddressBooksData();
  },
  data() {
    return {
      info: {},
      address_books: []
    }
  },
  methods: {
    async getAddressBooksData() {
      const response = await globalAxios.get('client/address-books', {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.Auth.user.token
        }
      });
      this.address_books = response.data.items.data;
    }
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
