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
          <form class="returnData mb-5 px-5" @submit.prevent="returnOrder">
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

            <b-form-textarea
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
export default {
  data() {
    return {
      returnData: {
        image: null,
        return_reason: null,
        item_uuid: this.$route.query.orderId ? this.$route.query.orderId : null,
        return_option: 1, // refund = 0  , replace = 1
        refund_option: 0, // 0=Wallet,1=Visa,2=Bank,3=Cash
      },
      uploadErrors: [],
      btn1Disabled: false,
      loading: false,
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
      formData.append("return_reason", this.returnData.return_reason);
      formData.append("item_uuid", this.returnData.item_uuid);
      formData.append("return_option", this.returnData.return_option);
      formData.append("refund_option", this.returnData.refund_option);

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

              this.$router.push('/')
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
  },
};
</script>

<style></style>
