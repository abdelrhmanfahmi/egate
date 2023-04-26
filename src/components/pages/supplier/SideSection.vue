<template>
  <!-- side section that appear in supplier page  -->
  <div class="side-sections" v-if="supplier">
    <p class="title" v-if="supplier.image_path">
      {{ $t("supplier.about") }}
      <span class="supplier-name">{{ supplier.company_name }}</span>
    </p>
    <div class="company-info">
      <img
        class="supplier-logo"
        :src="supplier.image_path"
        alt="Company Name"
        v-if="supplier.image_path"
      />
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 col-sm-12 mb-2">
          <ul class="social-accounts d-flex flex-wrap" v-if="supplierMSite">
            <li class="account" v-if="supplierMSite.facebook_page">
              <a :href="supplierMSite.facebook_page" target="_blank"
                ><b-icon-facebook font-scale="1.5"></b-icon-facebook
              ></a>
            </li>
            <li class="account" v-if="supplierMSite.twitter_page">
              <a :href="supplierMSite.twitter_page" target="_blank"
                ><b-icon-twitter font-scale="1.5"></b-icon-twitter
              ></a>
            </li>
            <li class="account" v-if="supplierMSite.instagram_page">
              <a :href="supplierMSite.instagram_page" target="_blank"
                ><b-icon-instagram font-scale="1.5"></b-icon-instagram
              ></a>
            </li>
            <li class="account" v-if="supplierMSite.google_page">
              <a :href="supplierMSite.google_page" target="_blank"
                ><b-icon-google font-scale="1.5"></b-icon-google
              ></a>
            </li>
          </ul>
        </div>
        <div class="col-md-6 col-sm-12 mb-2">
          <div class="" v-if="buyerUserData">

            <b-button
              v-if="supplier_messages"
              variant="outline-success"
              id="show-btn"
              class="mx-2"
              @click="$bvModal.show('bv-modal-example')"
              >{{ $t("supplier.sendSupplierMessage") }}</b-button
            >
          </div>
          <div class="" v-else>

            <b-button
             
              variant="outline-success"
              id="show-btn"
              class="mx-2"
              @click="loginFirst"
              >{{ $t("supplier.sendSupplierMessage") }}</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="other-sections" v-if="supplier.categories">
      <h5 class="title">{{ $t("supplier.sections") }}</h5>
      <ul class="sections">
        <li class="section" v-for="item in supplier.categories" :key="item.id">
          <router-link
            :to="{
              path: '/supplier-products',
              query: { supId: `${supplier.id}`, catId: `${item.category_id}` },
            }"
          >
            {{ item.category.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <b-modal id="bv-modal-example" centered hide-footer>
      <template #modal-title> {{ $t("profile.yourMessage") }} </template>
      <div class="d-block">
        <div class="data-holder">
          <form>
            <div class="form-group">
              <label for="subject">
                {{ $t("supplier.subject") }} <span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" v-model="subject" />
              <div class="error mt-2">
                <p v-for="(error, index) in errors.subject" :key="index">
                  {{ error }}
                </p>
              </div>
            </div>
            <div class="form-group">
              <label for="message">
                {{ $t("contactUs.formMessage") }}
                <span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="10"
                v-model="message"
                required
              ></textarea>
            </div>
            <div class="error mt-2">
              <p v-for="(error, index) in errors.message" :key="index">
                {{ error }}
              </p>
            </div>
          </form>
        </div>
      </div>
      <b-button
        class="mt-3"
        variant="outline-success"
        block
        @click="sendSupplierMessage"
        >{{ $t("profile.send") }}</b-button
      >
    </b-modal>
  </div>
</template>
<script>
// side section that appear in supplier page
import profile from "@/services/profile";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
import {
  BIconTwitter,
  BIconFacebook,
  BIconInstagram,
  BIconGoogle,
} from "bootstrap-vue";
export default {
  components: {
    BIconTwitter,
    BIconFacebook,
    BIconInstagram,
    BIconGoogle,
  },
  data() {
    return {
      count: 0,
      message: null,
      subject: null,
      errors: [],
      id: this.$route.params.id,
    };
  },
  /**
   * @vuese
   *  supplier and supplierMSite as props
   */
  props: {
    supplier: {
      // supplier prop
      type: Object,
      required: false,
    },
    supplierMSite: {
      // supplier Micro Site data prop
      type: Object,
    },
  },
  methods: {
    /**
     * @vuese
     *  send Supplier Message
     */
    sendSupplierMessage() {
      let data = {
        supplier_id: this.id,
        message: this.message,
        subject: this.subject,
      };
      profile
        .sendSupplierMessage(data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".close").click();
            this.message = "";
            this.subject = "";
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          console.log(error);
        });
    },
    /**
     * @vuese
     *  if not logged in
     */
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        dangerMode: true,
      }).then(() => {
        this.$router.push("/user-register");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/**
      *  component style
  */
.side-sections {
  .title {
    font-weight: bold;
    &::before {
      content: "";
      display: inline-block;
      width: 1rem;
      height: 3px;
      background-color: $main-color;
      vertical-align: middle;
      margin-inline-end: 0.3rem;
    }
  }
  .company-info {
    margin: 2rem 0;
    img {
      margin-bottom: 1.5rem;
    }
    .name {
      color: #312620;
    }
    .social-accounts {
      color: #878686;
      .account {
        a {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-inline-end: 0.3rem;
          color: #878686;
          &:hover {
            color: $main-color;
          }
        }
      }
    }
  }
  .other-sections {
    max-height: 500px;
    overflow-y: scroll;
    color: $main-color;
    .sections {
      color: $main-color;
      .section {
        display: flex;
        align-items: center;
        border: 1px dashed #dadada;
        border-width: 0 0 1px 0;
        &::before {
          content: "";
          width: 0.4rem;
          height: 1px;
          background-color: #878686;
          display: inline-block;
          margin-inline-end: 1rem;
        }
        a {
          color: #878686;
          display: block;
          width: 100%;
          padding: 1rem 0;
          &:hover {
            color: $main-color;
          }
        }
      }
    }
  }
}
.supplier-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0 8px;
}
.company-info {
  .supplier-logo {
    width: 300px;
    object-fit: cover;
  }
}
</style>
