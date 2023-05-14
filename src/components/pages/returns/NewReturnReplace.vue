<template>
  <!-- return replace page  -->
  <div>
    <div class="container">
      <!-- <div class="row justify-content-center align-items-center pt-5 mt-5">
          <h2 class="title">
            {{ $t("profile.replaceMethods") }}
          </h2>
        </div> -->
      <div class="step1 my-5">
        <h5>
          <b>{{ $t("profile.step1") }}</b> {{ $t("profile.specifyQuantity") }} :
        </h5>
        <div class="products-holder text-center">
          <table
            v-if="productsLength > 0"
            class="table table-striped table-hover table-bordered selectable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  v-for="(tab, index) in tableFields"
                  :key="index"
                >
                  {{ tab.label }}
                </th>
              </tr>
            </thead>
            <tbody class="">
              <tr v-for="(product, index) in products" :key="index">
                <td class="position-relative">
                  <div
                    class="d-flex justify-content-center align-items-center"
                    v-if="product.image || product.title"
                  >
                    <div class="product-image" v-if="product.image">
                      <img
                        :src="product.image"
                        alt=""
                        class="product-image br-5"
                        srcset=""
                      />
                    </div>
                    <div class="product-title" v-if="product.title">
                      <p>{{ product.title }}</p>
                    </div>
                  </div>
                  <div class="" v-else>-</div>
                </td>
                <td>
                  <div
                    class="supplier-data"
                    v-if="product.supplier_name || product.supplier_id"
                  >
                    <router-link :to="`/suppliers/${product.supplier_id}`">
                      {{ product.supplier_name }}
                    </router-link>
                  </div>
                  <div class="" v-else>-</div>
                </td>

                <td>
                  <div class="product-weight" v-if="product.Weight">
                    <p>{{ product.Weight }}</p>
                  </div>
                  <div class="" v-else></div>
                </td>
                <td>
                  <p class="mb-0" v-if="product.country">
                    {{ product.country }}
                  </p>
                  <p class="mb-0" v-else>-</p>
                </td>

                <td>
                  <Counter
                    :quantity="0"
                    :product="product"
                    class="justify-content-center"
                    @changeProductQuantity="changeProductQuantity($event)"
                  ></Counter>
                </td>
                <td>
                  <div class="price" v-if="product.price">
                    <p class="main-color">
                      <b>{{ product.price | fixedCurrency }} {{ currency }}</b>
                    </p>
                  </div>
                  <div class="" v-else></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="error text-start"
          v-for="(error, index) in uploadErrors.items"
          :key="index"
        >
          {{ error }}
        </div>
      </div>
      <div class="step2">
        <h5>
          <b>{{ $t("profile.step1") }}</b> {{ $t("profile.returnReason") }} :
        </h5>
        <div class="row align-items-center pb-5 my-5">
          <div class="col-7">
            <form class="returnData mb-5">
              <div class="form-input mb-4">
                <!-- <label>
                    <h4>{{ $t("profile.returnReason") }}</h4>
                  </label> -->
                <!-- dropdown for reasons  -->
                <b-form-select v-model="returnData.return_reason" class="mb-3">
                  <b-form-select-option disabled value="null">{{
                    $t("cart.selectOption")
                  }}</b-form-select-option>
                  <b-form-select-option
                    :value="reason.id"
                    v-for="(reason, index) in reasons"
                    :key="index"
                    >{{ $i18n.locale == 'en' ?  reason.reason_en : reason.reason_ar }}</b-form-select-option
                  >
                </b-form-select>
                <div
                  class="error text-start"
                  v-for="(error, index) in uploadErrors.return_reason"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="images-holder">
                <p class="mb-0">{{ $t("profile.uploadDamageProducts") }}</p>
                <ul class="files">
                  <li
                    v-for="(file, index) in representedImages"
                    :key="index"
                    class="file-holder"
                  >
                    <div class="file-data">
                      <img :src="file" alt="" srcset="" />
                      <button
                        @click.prevent="removeFile(index)"
                        class="border-none mx-2"
                        title="Remove"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash-can" />
                      </button>
                    </div>
                  </li>
                  <li class="file-holder">
                    <div class="company-logo">
                      <main class="">
                        <div class="data-holder">
                          <div @drop.prevent="handleFileDrop">
                            <br />
                            <div class="file-wrapper">
                              <input
                                type="file"
                                name="file-input"
                                @change.prevent="handleFileInput"
                                multiple
                              />
                              <div class="d-flex flex-column text-holder">
                                <p class="text-shown sign m-0 h2">+</p>
                                <p class="text-shown text h2">
                                  {{ $t("profile.Upload") }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </li>
                </ul>
                <div
                  class="error text-start"
                  v-for="(error, index) in uploadErrors.image"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="row">
                <!-- <div class="col-4">
                    <label>
                      {{ $t("profile.ReturnedNumber") }}
                    </label>
                    <div class="product-counter mb-2">
                      <div
                        class="actions d-flex justify-content-center align-items-center"
                        :class="$i18n.locale"
                      >
                        <button
                          class="product-counter-btn"
                          @click="decrementQuantity(returnData.quantity)"
                          :disabled="returnData.quantity == 1"
                          type="button"
                        >
                          <b-icon-dash />
                        </button>
                        <div class="value">
                          <span class="product-counter-number">
                            {{
                              returnData.quantity ? returnData.quantity : 1
                            }}</span
                          >
                        </div>
                        <button
                          class="product-counter-btn"
                          :class="{ disabledBtn: returnData.quantity >= maxQTY }"
                          @click="incrementQuantity"
                          type="button"
                          :disabled="returnData.quantity >= maxQTY"
                        >
                          <b-icon-plus />
                        </button>
    
                      </div>
                    </div>
                  </div> -->
                <!-- upload image of product  -->
                <div class="col-8">
                  <!-- <label for="CommercialLicense">
                      {{ $t("profile.returnImage") }}
                      <span class="text-danger">*</span>
                    </label> -->
                  <!-- <b-form-group>
                      <b-form-file
                        size="lg"
                        multiple
                        id="returnImage"
                        @change="uploadImage"
                        :placeholder="$t('profile.returnImage')"
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                    </b-form-group> -->
                </div>
              </div>

              <!-- enter message  -->

              <b-form-textarea
                v-if="returnData.return_reason == 8"
                id="textarea-rows"
                :placeholder="$t('profile.returnReason')"
                rows="8"
                v-model="returnData.return"
              ></b-form-textarea>
              <b-button
                type="submit"
                class="saveBtn btn-block py-3 mt-3 bg-main"
                :disabled="
                  btn1Disabled ||
                  (returnData.quantity >= maxQTY && returnData.quantity > 1)
                "
                @click.prevent="returnOrder"
              >
                <i class="fa fa-upload"></i> {{ $t("cart.submit") }}
                <span class="loader" v-if="loading"></span>
              </b-button>
            </form>
            <ul>
              <li v-for="(item, index) in returnData.image" :key="index">
                <img :src="item.name" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// return replace page
// this page used when client need to return his products and using replace method
import profile from "@/services/profile";
// import { BIconPlus, BIconDash } from "bootstrap-vue";

import Counter from "@/components/pages/returns/ReturnsCounter.vue";
import { createdFormData } from "@/services/helpers.js";
export default {
  data() {
    return {
      returnData: {
        image: null,
        return_reason: null,
        item_uuid: this.$route.query.orderId ? this.$route.query.orderId : null,
        return_option: 1, // refund = 0  , replace = 1
        refund_option: 0, // 0=Wallet,1=Visa,2=Bank,3=Cash
        return: null,
        quantity: 1,
      },
      uploadErrors: [],
      btn1Disabled: false,
      loading: false,
      // reasons: null,
      reasons: null,
      id: this.$route.query.prodId,
      orderId: this.$route.query.orderId,
      orderData: null,
      maxQTY: null,
      files: [],
      representedImages: [],
      tableFields: [
        // {
        //   key: "image_path",
        //   label: this.$t("items.image"),
        // },
        {
          key: "product.title",
          label: this.$t("items.item"),
        },

        {
          key: "client.company_name",
          label: this.$t("items.supplier"),
        },
        {
          key: "product_details_by_type.unit.title",
          label: this.$t("items.unit"),
        },
        {
          key: "country.title",
          label: this.$t("profile.countryOrigin"),
        },
        {
          key: "quantity",
          label: this.$t("items.quantity"),
        },
        {
          key: "product_details_by_type.price",
          label: this.$t("items.price"),
        },
      ],
      products: null,
      productsLength: 0,
      items: [],
    };
  },
  methods: {
    getCheckedItems() {
      let payload = {
        items: this.orderId,
      };
      profile
        .storeCheckedOrders(payload)
        .then((res) => {
          console.log(res);
          this.products = res.data.items;
          this.productsLength = res.data.items.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFileDrop(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach((f) => {
        this.files.push(f);
        this.representedImages.push(URL.createObjectURL(f));
      });
    },
    handleFileInput(e) {
      let files = e.target.files;
      files = e.target.files;
      if (!files) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...files].forEach((f) => {
        this.files.push(f);
        this.representedImages.push(URL.createObjectURL(f));
      });
      // this.returnData.image = e.target.files[0]
    },
    removeFile(fileKey) {
      this.files.splice(fileKey, 1);
      this.representedImages.splice(fileKey, 1);
    },

    /**
     * @vuese
     * this function used to get Order Data
     */
    getOrderData() {
      profile
        .getSingleOrders(this.id)
        .then((res) => {
          this.orderData = res.data.items.order;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to call backend to return user Order
     */
    async returnOrder() {
      this.loading = true;
      this.btn1Disabled = true;
      let payload = {};

      // if (this.files.length) {
      //   // if (this.returnData.image !== null) {
      //   // formData.append("image", this.returnData.image);
      //   payload.images.push();
      // }

      if (this.files.length) {
        // if (this.returnData.image !== null) {
        // formData.append("image", this.returnData.image);

        // for (var i = 0; i < this.files.length; i++) {
        //   let file = this.files[i];
        //   payload.images = file;
        // }
        payload.images = this.files;
      }

      if (this.items.length) {
        // if (this.returnData.image !== null) {
        // formData.append("image", this.returnData.image);
        payload.items = []
        for (var j = 0; j < this.products.length; j++) {
          let file = this.items[j];
          payload.items.push(file);
        }
      }

      if (
        this.returnData.return_reason === 8 // last id
      ) {
        payload.return_reason = null;

        payload.return = this.returnData.return;
      } else {
        payload.return_reason = this.returnData.return_reason
        payload.return = ''
      }
      // formData.append("item_uuid", this.returnData.item_uuid);
      payload.return_option = this.returnData.return_option
      payload.refund_option = this.returnData.refund_option
      // formData.append("quantity", this.returnData.quantity);

      await profile
        .returnOrder(createdFormData(payload))
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            setTimeout(() => {
              this.$router.push({
                path: "ReturnedRequest",
                query: {
                  UUID: res.data.items.uuid,
                },
              });

              // this.$router.push("/");
            }, 500);
          }
          console.log(res);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.loading = false;
          this.btn1Disabled = false;
        });
    },
    /**
     * @vuese
     * this function used to upload Image
     */
    uploadImage(event) {
      // this.returnData.image = event.target.files;
      this.returnData.image = event.target.files[0];
      // console.log(this.returnData.image);
    },
    /**
     * @vuese
     * this function used to show length of files and names
     */
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    /**
     * @vuese
     * this function used to know return Reasons
     */
    returnReasons() {
      profile
        .returnReasons()
        .then((res) => {
          console.log(res);
          this.reasons = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to increment Quantity
     */
    incrementQuantity() {
      this.returnData.quantity += 1;
    },
    /**
     * @vuese
     * this function used to decrement Quantity
     */
    decrementQuantity() {
      this.returnData.quantity > 1
        ? this.returnData.quantity--
        : this.returnData.quantity == 1;
    },
    /**
     * @vuese
     * this function used to check Returned Product Quantity
     */
    checkReturnedProductQuantity() {
      profile
        .checkReturnedProductQuantity(this.$route.query.orderId)
        .then((res) => {
          this.maxQTY = res.data.items.quantity;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeProductQuantity(productData) {
      let productItem = {
        uuid: productData.uuid,
        quantity: productData.quantity,
      };
      // if(!this.items?.product?.item_uuid){

      //   this.items.push(productItem)
      // }
      if (!this.items.length) {
        this.items.push(productItem);
      } else {
        this.items.forEach((element) => {
          if (
            element.uuid == productData.uuid &&
            element.quantity != productData.quantity
          ) {
            element.quantity = productData.quantity;
          } else if (
            element.uuid == productData.uuid &&
            element.quantity == productData.quantity
          ) {
            return false;
          } else {
            if (element.uuid == productData.uuid) {
              element.quantity = productData.quantity;
              return false;
            } else {
              if (
                element.uuid == productData.uuid &&
                element.quantity !== productData.quantity
              ) {
                element.quantity = productData.quantity;
              } else if (element.uuid !== productData.uuid) {
                this.items.push(productItem);
              }
            }
          }
        });
      }
    },
  },
  mounted() {
    // this.getOrderData()
    this.returnReasons();
    this.checkReturnedProductQuantity();
    this.getCheckedItems();
  },
  components: {
    // BIconPlus,
    // BIconDash,
    Counter,
  },
};
</script>
  
  <style lang="scss" scoped>
/**
      * component style 
    */
.product-counter {
  display: flex;
  align-items: center;
  justify-content: left;
  .actions {
    //color: #606266;
    .product-counter-btn {
      width: 2rem;
      height: 1.75rem;
      border-radius: 0;
      border: 1px solid transparent;
      color: #606266;
      background: #eef1f2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      &:first-child {
        border-bottom: 1px solid #dcdcdc;
      }
    }
  }
  .value {
    border-radius: 0;
    border: 1px solid $top-header-color;
    color: #544842;
    font-weight: 500;
    width: 4rem;
    //height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 50px;
  }
}
.disabledBtn {
  background: #a6a6a6 !important;
  color: #fff !important;
}

.company-logo {
  main {
    //margin-top: -30px;
    height: 100%;
  }

  .file-wrapper {
    text-align: center;
    height: 5em;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center; /* and other things to make it pretty */
  }

  .file-wrapper input {
    position: absolute;
    top: 0;
    right: 0; /* not left, because only the right part of the input seems to
                     be clickable in some browser I can't remember */
    cursor: pointer;
    opacity: 0;
    filter: alpha(
      opacity=0
    ); /* and all the other old opacity stuff you
                                     want to support */
    font-size: 300px; /* wtf, but apparently the most reliable way to make
                             a large part of the input clickable in most browsers */
    height: 200px;
  }
  .data-holder {
    //border: 2px solid $top-header-color;
    border-radius: 5px;
    color: #545454;
    padding: 54px 25px;
  }
  .file-input {
    color: $top-header-color;
  }
  .text-holder {
    color: #bebebe;
    margin: 20px 0;
  }
}
.file-holder {
  position: relative;
  border: 2px solid $gray;
  margin: 10px 3px 15px;
  padding: 30px;
  border-radius: 10px;
  display: inline-block;
  min-height: 250px;

  img {
    width: 150px;
    height: 200px;
    border-radius: 10px;
  }
  button {
    border: none;
    outline: none;
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: $main-color;
    font-size: 15px;
    background: transparent;
  }
}
.method {
  margin: 10px 0;
}

button[type="submit"] {
  width: 50%;
  @media (max-width: 992px) {
    width: 100%;
  }
}
</style>
  