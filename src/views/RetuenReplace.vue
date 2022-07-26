<template>
  <div>
    <div class="container">
      <div class="row justify-content-center align-items-center pt-5 mt-5">
        <h2 class="title">
          {{ $t("profile.replaceMethods") }}
        </h2>
      </div>
      <div class="row justify-content-center align-items-center pb-5 my-5">
        <div class="col-7">
          <form class="returnData mb-5 px-5" >
            <div class="form-input mb-4">
              <label for="CommercialLicense">
                {{ $t("profile.returnImage") }}
                <span class="text-danger">*</span>
              </label>
              <b-form-group>
                <b-form-file
                  size="lg"
                  id="returnImage"
                  @change="uploadImage"
                  :placeholder="$t('profile.returnImage')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
              <div
                class="error text-start"
                v-for="(error, index) in uploadErrors.image"
                :key="index"
              >
                {{ error }}
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <label>
                  {{$t('profile.ReturnedNumber')}}
                </label>
                <div class="product-counter mb-2">
                  <div class="value">
                    <span class="product-counter-number">
                      {{ returnData.quantity ? returnData.quantity : 1 }}</span
                    >
                  </div>
                  <div class="actions d-flex flex-column">
                    <button
                      class="product-counter-btn"
                      @click="incrementQuantity"
                      type="button"
                    >
                      <b-icon-plus />
                    </button>
                    <button
                      class="product-counter-btn"
                      @click="decrementQuantity(returnData.quantity)"
                      :disabled="returnData.quantity == 1"
                      type="button"
                    >
                      <b-icon-dash />
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-9">
                 <label>
                  {{$t('profile.returnReason')}}
                </label>
                <b-form-select v-model="returnData.return" class="mb-3">
                  <b-form-select-option disabled value="null">{{
                    $t("cart.selectOption")
                  }}</b-form-select-option>
                  <b-form-select-option
                    :value="reason.name"
                    v-for="(reason, index) in reasons"
                    :key="index"
                    >{{ reason.name }}</b-form-select-option
                  >
                </b-form-select>
              </div>
              
            </div>

            <b-form-textarea
              v-if="
                returnData.return == 'others' || returnData.return == 'سبب اخر'
              "
              id="textarea-rows"
              :placeholder="$t('profile.returnReason')"
              rows="8"
              v-model="returnData.return_reason"
            ></b-form-textarea>
            <b-button
              type="submit"
              variant="outline-danger"
              class="saveBtn btn-block py-3 mt-3"
              :disabled="btn1Disabled"
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
</template>

<script>
import profile from "@/services/profile";
import { BIconPlus, BIconDash } from "bootstrap-vue";
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
    };
  },
  methods: {
    async returnOrder() {
      this.loading = true;
      this.btn1Disabled = true;

      // let data = {
      //   image: this.returnData.image,
      //   return_reason: this.returnData.return_reason,
      //   uuid: this.returnData.uuid,
      // };

      let formData = new FormData();

      if (this.returnData.image !== null) {
        formData.append("image", this.returnData.image);
      }

      if (
        this.returnData.return === "others" ||
        this.returnData.return == "سبب اخر"
      ) {
        formData.append("return", null);

        formData.append("return_reason", this.returnData.return_reason);
      } else {
        formData.append("return", this.returnData.return);
        formData.append("return_reason", null);
      }
      formData.append("item_uuid", this.returnData.item_uuid);
      formData.append("return_option", this.returnData.return_option);
      formData.append("refund_option", this.returnData.refund_option);
      formData.append("quantity", this.returnData.quantity);

      await profile
        .returnOrder(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            setTimeout(() => {
              // this.$router.push({
              //   path: "ReturnedRequest",
              //   query: {
              //     UUID: res.data.items.uuid,
              //   },
              // });

              this.$router.push("/");
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
    uploadImage(event) {
      // this.returnData.image = event.target.files;
      this.returnData.image = event.target.files[0];
      // console.log(this.returnData.image);
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
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
    incrementQuantity() {
      this.returnData.quantity += 1;
    },
    decrementQuantity() {
      this.returnData.quantity > 1
        ? this.returnData.quantity--
        : this.returnData.quantity == 1;
    },
  },
  mounted() {
    this.returnReasons();
  },
  components: {
    BIconPlus,
    BIconDash,
  },
};
</script>

<style lang="scss" scoped>
.product-counter {
  display: flex;
  align-items: center;
  // justify-content: left;
  .actions {
    color: #606266;
    .product-counter-btn {
      width: 2rem;
      height: 1.55rem;
      border-radius: 0;
      border: 1px solid transparent;
      color: #606266;
      background: #eef1f2;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        border-bottom: 1px solid #dcdcdc;
      }
    }
  }
  .value {
    border-radius: 0;
    border: 1px solid #f0f0f0;
    color: #544842;
    font-weight: 500;
    width: 6rem;
    height: 3.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
