<template>
  <div class="return-data-holder">
    <div class="new-design">
      <div class="serial" v-if="return_item">
        <h4 class="m-0">
          <span>{{ $t("profile.returnSerial") }} : #</span>
          <span v-if="return_item.serial">{{ return_item.serial }} </span>
        </h4>
      </div>
      <h4 class="mt-5 mb-3 text-head">order details:</h4>
      <div class="">
        <div class="row align-content-center">
          <div class="col-md-6 col-sm-12">
            <div class="" v-if="clinet_info">
              <div class="hold-data">
                <div class="">
                  <p class="text-head">{{ $t("contactUs.address") }} :</p>
                  <p v-if="clinet_info.country">{{ clinet_info.country }}</p>
                  <p v-if="clinet_info.governorate">
                    ,{{ clinet_info.governorate }}
                  </p>
                  <p v-if="clinet_info.city">,{{ clinet_info.city }}</p>
                  <p v-if="clinet_info.address">,{{ clinet_info.address }}</p>
                  <p v-if="clinet_info.floor">,{{ clinet_info.floor }}</p>
                  <p v-if="clinet_info.location">,{{ clinet_info.location }}</p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="hold-data" v-if="clinet_info">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.contactInfo") }} :</p>
                  <p v-if="clinet_info.first_name">
                    {{ clinet_info.first_name }}
                  </p>
                  <p v-if="clinet_info.last_name" class="mx-2">
                    {{ clinet_info.last_name }}
                  </p>
                  <p v-if="clinet_info.phone">,{{ clinet_info.phone }}</p>
                </div>
              </div>
            </div>
            <div class="" v-if="return_item">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.createdAt") }} :</p>
                  <p v-if="return_item.return_request_date">
                    {{ return_item.return_request_date | formatDate }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="" v-if="return_item">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("payment.buyMethod") }} :</p>
                  <p v-if="return_item.payment_type">
                    {{ return_item.payment_type }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="clinet_info">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.subtotal") }} :</p>
                  <p v-if="clinet_info.first_name">
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="supplier_oreder_item">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("cart.discount") }} :</p>
                  <p v-if="supplier_oreder_item.discount >= 0">
                    {{ supplier_oreder_item.discount | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="supplier_oreder_item">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.total_price") }} :</p>
                  <p v-if="supplier_oreder_item.total_price >= 0">
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="details mt-3 mb-3">
        <h4>{{ $t("profile.returnDetails") }}:</h4>
        <h5 class="mt-3 mb-3 text-head">
          {{ $t("profile.productDetails") }} :
        </h5>
        <div
          class="supplier-products mt-3"
          v-if="fields && supplier_oreder_item"
        >
          <div class="holder text-center">
            <table
              class="table table-striped table-hover selectable"
              v-if="
                supplier_oreder_item.basket_promotion_id ||
                supplier_oreder_item.baskets
              "
            >
              <thead class="font-weight-bold">
                <tr>
                  <th
                    scope="col"
                    class="text-center"
                    v-for="(tab, index) in basketFields"
                    :key="index"
                  >
                    {{ tab.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-if="return_item.item_names">
                    <span>
                      <img
                        :src="return_item.image"
                        alt=""
                        class="product-image2"
                        srcset=""
                      />
                    </span>
                    <span>
                      {{ return_item.item_names }} ({{
                        supplier_oreder_item.status_lang
                      }})
                    </span>
                  </td>
                  <td v-else>-</td>
                  <td v-if="supplier_oreder_item.price">
                    {{ supplier_oreder_item.price | fixedCurrency }}
                    {{ currency }}
                  </td>
                  <td v-if="return_item.quantity">
                    {{ return_item.quantity }}
                  </td>
                  <td v-else>-</td>
                  <!-- <td v-if="supplier_oreder_item.sup_total"> -->
                  <td v-if="supplier_oreder_item.total_price">
                    <!-- {{ supplier_oreder_item.sup_total | fixedCurrency }} -->
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </td>
                  <td v-else>-</td>
                </tr>
              </tbody>
            </table>
            <table
              class="table table-striped table-hover selectable text-center"
              v-else
            >
              <thead class="font-weight-bold">
                <tr>
                  <th
                    scope="col"
                    class="text-center"
                    v-for="(tab, index) in fields"
                    :key="index"
                  >
                    {{ tab.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-if="return_item.item_names">
                    <span>
                      <img
                        :src="return_item.image"
                        alt=""
                        class="product-image2"
                        srcset=""
                      />
                    </span>
                    <span class="mx-3">
                      {{ return_item.item_names }} ({{
                        supplier_oreder_item.status_lang
                      }})
                    </span>
                  </td>
                  <td v-else>-</td>
                  <td v-if="supplier_oreder_item.price">
                    {{ supplier_oreder_item.price | fixedCurrency }}
                    {{ currency }}
                  </td>
                  <td v-if="return_item.quantity">
                    {{ return_item.quantity }}
                  </td>
                  <td v-else>-</td>
                  <!-- <td v-if="supplier_oreder_item.sup_total"> -->
                  <td v-if="supplier_oreder_item.total_price">
                    <!-- {{ supplier_oreder_item.sup_total | fixedCurrency }} -->
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </td>
                  <td v-else>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="return-info" v-if="return_item">
        <div class="row align-content-center">
          <div class="col-md-6 col-sm-12">
            <div class="" v-if="return_item.updated_at">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.createdAt") }} :</p>
                  <p >
                    {{ return_item.updated_at | formatDate }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="return_item.retrun_option">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.requestType") }} :</p>
                  <p >
                    {{ return_item.retrun_option }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="return_item.return_reason">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.returnReason") }} :</p>
                  <p >
                    {{ return_item.return_reason }}
                  </p>
                </div>
              </div>
            </div>
            <div class="" v-if="return_item.reshipping_fee">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.deleiveryFees") }} :</p>
                  <p
                    
                    class="main-color font-weight-bold"
                  >
                    {{ return_item.reshipping_fee | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12" v-if="return_item.client_bank_info">
            <!-- <div class="">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("payment.country") }} :</p>
                  <p v-if="return_item.payment_type">
                    {{ return_item.payment_type }}
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.bank_name") }} :</p>
                  <p v-if="clinet_info.first_name">
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.branch") }} :</p>
                  <p v-if="supplier_oreder_item.discount >= 0">
                    {{ supplier_oreder_item.discount | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="hold-data">
                <div class="d-flex align-content-center">
                  <p class="text-head">{{ $t("profile.ibanCertificate") }} :</p>
                  <p v-if="supplier_oreder_item.total_price >= 0">
                    {{ supplier_oreder_item.total_price | fixedCurrency }}
                    {{ currency }}
                  </p>
                </div>
              </div>
            </div> -->

            <p class="text-head" v-html="return_item.client_bank_info"></p>
          </div>
        </div>
      </div>
      <div
        class="uploadedImages mt-5 mb-3"
        v-if="return_item && return_item.images && return_item.images.length"
      >
        <h4>{{ $t("profile.uploadedImages") }} :</h4>
        <ul class="d-flex">
          <li
            v-for="(item, index) in return_item.images"
            :key="index"
            class="product-image-holder"
          >
            <button
              @click="
                selectedImage = ReturnImageBaseUrl + item.image;
                $bvModal.show('showImage');
                
              "
              class="border-0"
            >
              <img
                :src="ReturnImageBaseUrl + item.image"
                alt=""
                class="product-image2"
              />
            </button>
          </li>
        </ul>
      </div>
      <b-modal id="showImage" centered size="xl" :title="$t('profile.productImage')">
        <img
          :src="selectedImage"
          alt="product-image"
          class="img-responsive w-100"
        />
        <template #modal-footer="{ ok }">
          <b-button size="sm" variant="success" @click="ok()"> {{$t('home.ok')}} </b-button>
        </template>
      </b-modal>

      <div class="actions mt-5 mb-3 w-75">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <button class="action-btn" @click="printScreen">
              {{ $t("profile.printMemo") }}
            </button>
          </div>
          <div class="col-md-6 col-sm-12">
            <button class="action-btn" @click="$router.push('/profile/ReturnRequests')">
              {{ $t("profile.returnBack") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["return_item", "supplier_oreder_item", "clinet_info"],
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
      selectedImage: null,
    };
  },
  methods: {
    printScreen() {
      window.print();
    },
  },
};
</script>

<style lang="scss" scoped>
.new-design {
  .text-head {
    font-weight: bold;
    margin: 0 5px;
  }
  p.text-head {
    font-size: 17px;
  }
  .hold-data {
    font-size: 15px;
    margin: 15px 0;
    p {
      margin-bottom: 0;
      display: inline-block;
    }
  }
}
.product-image2 {
  width: 80px;
  height: 80px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 5px;
}

.product-image-holder {
  border-radius: 5px;
  margin: 0 5px;
}
.action-btn {
  background: $gray;
  padding: 15px 20px;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: $text-color;
  font-weight: bold;
}
</style>
