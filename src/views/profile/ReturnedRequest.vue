<template>
  <!-- returned request page  -->
  <div class="my-5">
    <div class="container">
      <!-- when data comes (not loading)  -->
      <div class="wrapper" v-if="!loading">
        <NewReturnRequest
          :return_item="return_item"
          :supplier_oreder_item="supplier_oreder_item"
          :clinet_info="clinet_info"
        />
      </div>
      <!-- when data loading  -->
      <div class="" v-else>
        <div class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * returned request page
 * @displayName return requests page
 */
import profile from "@/services/profile";
import axios from "axios";
// import OldReturnRequest from "@/components/pages/profile/OldReturnRequest.vue";
import NewReturnRequest from "@/components/pages/profile/NewReturnRequest.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "product",
          label: this.$t("profile.productName"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "qty",
          label: this.$t("profile.qty"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
      ],
      basketFields: [
        {
          key: "product",
          label: this.$t("profile.basketName"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "qty",
          label: this.$t("profile.qty"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
      ],
      UUID: this.$route.query.UUID,

      clinet_info: null,
      return_item: null,
      supplier_oreder_item: null,
      message: "",
      errors: [],
      supplierUUID: null,
      loading: false,

      shipingExist: false,
    };
  },
  methods: {
    /**
     * returned Single Orders function
     * @vuese
     */
    returnedSingleOrders() {
      // check if b2b or b2c or supplier
      if (
        this.buyerUserData.type === "buyer" ||
        this.buyerUserData.type === "b2c"
      ) {
        this.loading = true;
        profile
          .returnedSingleBuyerOrders(this.UUID)
          .then((res) => {
            this.return_item = res.data.items.return_item;
            this.supplier_oreder_item = res.data.items.supplier_oreder_item;
            this.clinet_info = res.data.items.clinet_info;

            // this.paymentFormData.order_uuid = res.data.items.order.uuid;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      } else if (this.buyerUserData.type === "supplier") {
        this.loading = true;
        profile
          .returnedSingleSupplierOrders(this.UUID)
          .then((res) => {
            this.return_item = res.data.items.return_item;
            this.supplier_oreder_item = res.data.items.supplier_oreder_item;
            this.clinet_info = res.data.items.clinet_info;

            // this.paymentFormData.order_uuid = res.data.items.order.uuid;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    /**
     * download Image function
     * @vuese
     */

    downloadImage(url, extension, label) {
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${extension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
  },
  mounted() {
    this.returnedSingleOrders();
  },
  components: {
    // OldReturnRequest,
    NewReturnRequest,
  },
};
</script>

<style lang="scss" scoped>

</style>
