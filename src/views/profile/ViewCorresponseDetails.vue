<template>
  <div :class="$i18n.locale">
    <div class="container">
      <div class="my-5 py-5 text-center">
        <h1>
          {{ $t("profile.corresponceDetail") }}
        </h1>
      </div>
      <div class="my-5" v-if="items">
        <b-button
          variant="outline-danger"
          id="show-btn"
          class="mx-2"
          @click="$bvModal.show('bv-modal-example')"
          >{{ $t("supplier.sendSupplierMessage") }}</b-button
        >
      </div>
      <table class="table custom-margin">
        <thead
          :class="{
            'text-left': $i18n.locale == 'en',
            'text-right': $i18n.locale == 'ar',
          }"
        >
          <tr class="row">
            <th class="col-sm-2">{{ $t("profile.sentBy") }}</th>
            <th class="col-sm-2">{{ $t("contactUs.formSubject") }}</th>
            <th class="col-sm-6">{{ $t("profile.quoteMessage") }}</th>
            <th class="col-sm-2">{{ $t("profile.sentdate") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(item, index) in items" :key="index">
            <th class="col-sm-2">
              {{ item.sent_by }}
            </th>
            <td class="col-sm-2">
              <div>
                <span>{{ item.subject }}</span>
              </div>
            </td>

            <td class="col-sm-6">
              <div>
                <span class="comment">{{ item.message }}</span>
              </div>
            </td>

            <td class="col-sm-2">
              <div>
                <span>{{ item.created_at | formatDate }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="bv-modal-example" centered hide-footer>
        <template #modal-title> {{ $t("profile.yourMessage") }} </template>
        <div class="d-block">
          <div class="data-holder">
            <form>
              <div class="form-group">
                <label for="subject">
                  {{ $t("supplier.subject") }}
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
        <!-- <b-button class="mt-3" variant="outline-success" block @click="$bvModal.hide('bv-modal-example')"
          >{{$t('cart.addToCart')}}</b-button
        > -->
      </b-modal>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
export default {
  data() {
    return {
      id: this.$route.query.id,
      items: null,
      message: null,
      subject: null,
      errors: {},
      supplierId: null,
    };
  },
  methods: {
    suppliersingleCorrespondence() {
      profile
        .suppliersingleCorrespondence(this.id)
        .then((resp) => {
          console.log(resp);
          this.items = resp.data.items;
          if(this.items){

            this.supplierId = resp.data.items[0].chat.supplier_id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendSupplierMessage() {
      let data = {
        supplier_id: this.supplierId,
        message: this.message,
        subject: this.subject,
      };
      profile
        .sendsupplierCorrespondenceMessage(data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".close").click();
            this.message = "";
            this.subject = "";
            this.suppliersingleCorrespondence()
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          console.log(error);
        });
    },
  },
  mounted() {
    this.suppliersingleCorrespondence();
  },
};
</script>

<style lang="scss" scoped>
.ar {
  thead th {
    text-align: right !important;
  }
}
.en {
  thead th {
    text-align: left !important;
  }
}
.comment {
  word-break: break-all;
}
.custom-margin {
  margin-bottom: 80px;
}
</style>
