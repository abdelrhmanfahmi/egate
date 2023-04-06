<template>
  <!-- View  Corresponse Details page  -->
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
      <!-- <table class="table custom-margin">
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
      </table> -->
      <b-modal id="bv-modal-example" centered hide-footer>
        <template #modal-title> {{ $t("profile.yourMessage") }} </template>
        <div class="d-block">
          <div class="data-holder">
            <form>
              <div class="form-group">
                <label for="subject">
                  {{ $t("supplier.subject") }}
                  <span class="text-danger">*</span>
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
    <div class="new-design">
      <div class="container">
        <ul class="chat row">
          <!-- <li class="stamp">
            Saturday
            <span>20:32</span>
          </li> -->
          <li
            :class="{
              'col-sm-12': item.sent_by == 'supplier',
              'col-sm-6 offset-sm-6 ': item.sent_by == 'client',
            }"
            v-for="(item, index) in items"
            :key="index"
          >
            <p
              :class="{
                'left w-50': item.sent_by == 'supplier',
                'right w-100': item.sent_by == 'client',
              }"
            >
              <span>{{ item.message }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Corresponse Details page
 * @displayName Corresponse Details page
 */
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
    /**
     * supplier single Correspondence function
     * @vuese
     */
    suppliersingleCorrespondence() {
      profile
        .suppliersingleCorrespondence(this.id)
        .then((resp) => {
          console.log(resp);
          this.items = resp.data.items;
          if (this.items) {
            this.supplierId = resp.data.items[0].chat.supplier_id;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * send Supplier Message function
     * @vuese
     */
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
            this.suppliersingleCorrespondence();
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
    if (!this.id) {
      this.$router.push("/profile/SupplierCorrespondenceB2b");
    }
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

.new-design {
  ul.chat {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    width: 50%;
    max-height: 500px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 6px $main-color;
    }

    @media (max-width: 992px) {
      width: 100%;
    }

    p {
      margin-bottom: 10px;
      display: inline-block;
      border-radius: 8px;
      padding: 10px;
      width: 50%;

      min-height: 90px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .left {
      background: #e3e3e3;
      //float: left;
      width: 100%;
      border-top-left-radius: 0;
      border-radius: 30px 30px 30px 0;
    }

    .right {
      background: transparent;
      border: 2px solid #e3e3e3;
      border-top-right-radius: 0;
      //float: right;
      width: 100%;
      border-radius: 30px 30px 0px 30px;
    }

    &.stamp {
      color: #666;
      font-size: 80%;
      text-align: center;
      width: 100%;
      span {
        color: #999;
      }
    }
  }
}
.en .chat,
.ar .chat {
  direction: ltr !important;
}
.ar .chat {
  text-align: right !important;
  p {
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
  }
}
</style>
