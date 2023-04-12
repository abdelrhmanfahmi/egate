<template>
  <!-- View  Corresponse Details page  -->
  <div :class="$i18n.locale">
    <div class="container">
      <div class="my-5 py-5 text-center">
        <h1>
          {{ $t("profile.corresponceDetail") }}
        </h1>
      </div>
      <!-- <div class="my-5" v-if="items">
        <b-button
          variant="outline-danger"
          id="show-btn"
          class="mx-2"
          @click="$bvModal.show('bv-modal-example')"
          >{{ $t("supplier.sendSupplierMessage") }}</b-button
        >
      </div> -->
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
      <div class="chat-holder">
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
              <span v-if="item.sent_by == 'supplier'" class="main-color">
                <span v-if="item.chat.supplier.company_name">{{
                  item.chat.supplier.company_name
                }}</span>
                <span v-else>{{ item.chat.supplier.company_name_en }}</span>
              </span>
              <span v-if="item.sent_by == 'client'" class="main-color">
                <span v-if="item.chat.client.company_name">{{
                  item.chat.client.company_name
                }}</span>
                <span v-else>{{ item.chat.client.company_name_en }}</span>
              </span>
              <span class="message">{{ item.message }}</span>
              <span
                class="message-image"
                v-if="chatImageBaseUrl && item.file"
                @click="
                  showImage(chatImageBaseUrl + item.file);
                  showWithdrawFile();
                "
              >
                <img :src="chatImageBaseUrl + item.file" alt="" />
              </span>
              <span class="messageDate">{{ item.created_at | formatDate }}</span>
            </p>
          </li>
        </ul>
        <div class="my-5 sendMessageHolder" v-if="items">
          <div class="row justify-content-center align-content-center">
            <div class="col-md-9 col-sm-9 mb-2">
              <div class="input-holder">
                <input
                  v-model="message"
                  type="text"
                  class="form-control"
                  :placeholder="$t('supplier.sendSupplierMessage')"
                />

                <div class="company-logo">
                  <main>
                    <div @dragover.prevent @drop.prevent class="data-holder">
                      <div @drop="handleFileDrop">
                        <div class="file-wrapper">
                          <input
                            type="file"
                            name="file-input"
                            @change="handleFileInput"
                          />
                          <div class="d-flex flex-column text-holder">
                            <font-awesome-icon
                              icon="fa-solid fa-paperclip"
                              class="myIcon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
            <div class="col-md-2 col-sm-12 mb-2">
              <b-button
                id="show-btn"
                class="p-2 border-main"
                @click="sendSupplierMessage"
                :disabled="requestInProgress"
              >
                <span>{{ $t("profile.send") }}</span>
                <span v-if="requestInProgress">
                  ...
                  <span>
                    <b-spinner label="Spinning" small></b-spinner>
                  </span>
                </span>
              </b-button>
            </div>
          </div>
          <div class="company-logo">
            <main>
              <div @dragover.prevent @drop.prevent class="data-holder">
                <div @drop="handleFileDrop">
                  <ul class="files mt-4">
                    <li v-for="(file, index) in files" :key="index">
                      <div class="file-data">
                        <span class="file-name">{{ file.name }}</span>
                        <span class="file-size">({{ file.size }} b)</span>
                        <button
                          @click="removeFile(index)"
                          class="border-none mx-2"
                          title="Remove"
                        >
                          X
                        </button>
                      </div>
                    </li>
                  </ul>
                  <img v-if="chatImage" :src="chatImage" alt="" srcset="" />
                </div>
              </div>
            </main>
          </div>
          <div class="error mt-2">
            <p v-for="(error, index) in errors.message" :key="index">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="withdrawFile" hide-footer centered>
      <template #modal-header="{ close }">
        <h5>{{ $t("profile.message") }}</h5>
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()"> x </b-button>
      </template>
      <div class="d-block">
        <img :src="selectedImage" class="withdrow-image" alt="withdrow-image" />
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button class="mt-3" variant="outline-danger" @click="hideWithdrawFile">{{
          $t("home.ok")
        }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
/**
 * Corresponse Details page
 * @displayName Corresponse Details page
 */
import profile from "@/services/profile";
import { createdFormData } from "@/services/helpers.js";
export default {
  data() {
    return {
      id: this.$route.query.id,
      items: null,
      message: null,
      subject: null,
      file: null,
      errors: {},
      supplierId: null,
      chatImage: null,
      files: [],
      requestInProgress: false,
      selectedImage: null,
    };
  },
  methods: {
    handleFileDrop(e) {
      let droppedFiles = e.dataTransfer.files[0];
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      this.files = [];
      this.files.push(droppedFiles);
      let myFile = droppedFiles;
      this.chatImage = URL.createObjectURL(myFile);
    },
    handleFileInput(e) {
      let files = e.target.files[0];
      files = e.target.files[0];
      if (!files) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      this.files = [];
      this.files.push(files);
      let myFile = files;
      this.chatImage = URL.createObjectURL(myFile);
    },
    removeFile(fileKey) {
      this.files.splice(fileKey, 1);
      this.chatImage = null;
    },
    /**
     * supplier single Correspondence function
     * @vuese
     */
    suppliersingleCorrespondence() {
      profile
        .suppliersingleCorrespondence(this.id)
        .then((resp) => {
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
      this.requestInProgress = true;
      let data = {
        supplier_id: this.supplierId,
        message: this.message,
        // subject: this.subject,
        file: this.files[0],
      };
      profile
        .sendsupplierCorrespondenceMessage(createdFormData(data))
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
        })
        .finally(() => {
          this.message = null;
          this.files = [];
          this.chatImage = null;
          this.requestInProgress = false;
          this.suppliersingleCorrespondence();
        });
    },
    /**
     * show withdrow Image
     * @vuese
     */
    showImage(fileImage) {
      this.selectedImage = fileImage;
    },
    /**
     * hide WithdrawFile modal
     * @vuese
     */
    hideWithdrawFile() {
      this.$refs["withdrawFile"].hide();
    },
    /**
     * show show Withdraw File
     * @vuese
     */
    showWithdrawFile() {
      this.$refs["withdrawFile"].show();
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
    width: 70%;
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
  //p {
  // display: flex !important;
  //justify-content: flex-end !important;
  //align-items: center !important;
  //}
}
li {
  p {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
}
.sendMessageHolder {
  //display: flex;
  //justify-content: center;
  width: 70%;
  margin: auto;
  button {
    height: 53px;
    width: 100%;
  }
  //align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    .row {
      text-align: center;
      button {
        width: 50%;
        margin: auto;
      }
    }
  }
}
.left,
.right {
  position: relative;
  .message {
    margin-bottom: 20px;
  }
  .messageDate {
    position: absolute;
    right: 15px;
    bottom: 5px;
    opacity: 0.5;
  }
}

.company-logo {
  .data-holder {
    width: 40%;
  }
  button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    border: none;
  }
  .file-wrapper {
    text-align: center;
    height: 20px;
    vertical-align: middle;
    position: absolute;
    right: 35px;
    top: -5px;
    font-size: 20px;
  }

  .file-wrapper input {
    position: absolute;
    top: 5px;
    right: -12px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    height: 50px;
    //width: 36px;
    cursor: pointer;
  }

  .file-input {
    color: #f0f0f0;
  }
  .text-holder {
    color: #bebebe;
    margin: 20px 0;
    cursor: pointer;
  }
}
.myIcon {
  cursor: pointer;
}
.message-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.withdrow-image {
  max-height: 50vh;
  width: 100%;
  object-fit: contain;
}
</style>
