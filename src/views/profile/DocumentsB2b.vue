<template>
  <div class="documentsB2b">
    <div class="all-documents">
      <div class="header d-flex justify-content-between">
        <h5>{{ $t("profile.companyDocuments") }}</h5>
        <!-- <a href="#">
          {{ $t("profile.saveData") }}
          <span class="save-icon">
            <b-icon-arrow-right></b-icon-arrow-right>
          </span>
        </a> -->
      </div>
      <!-- buissnessinfoUpload -->
      <form class="buissnessinfo" @submit.prevent="buissnessinfoUpload">
        <div class="form-input mb-4">
          <label for="CommercialLicense">
            {{ $t("profile.commercialLicense") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="CommercialLicense"
              id="CommercialLicense"
            />
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.ccl"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="signatureAccreditation">
            {{ $t("profile.signatureAccreditation") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="signatureAccreditation"
              id="CommissionerCard"
            />
            <!-- <img
              src=""
              alt=""
              v-b-modal.modal-center
              v-if="buissnessinfo.auth_civil_copy.image"
            /> -->

            <!-- <a
              :href="buissnessinfo.auth_civil_copy.url"
              v-if="buissnessinfo.auth_civil_copy.document"
              download
              >Download</a
            > -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.auth_civil_copy"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="commissionerCard">
            {{ $t("profile.commissionerCard") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="commissionerCard"
              id="SignatureAccreditation"
            />
            <!-- <img
              src=""
              alt=""
              v-b-modal.modal-center
              v-if="buissnessinfo.ccs.image"
            />

            <a
              :href="buissnessinfo.ccs.url"
              v-if="buissnessinfo.ccs.document"
              download
              >Download</a
            > -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.ccs"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="certificateAdministration">
            {{ $t("profile.certificateAdministration") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="certificateAdministration"
              id="certificateAdministration"
            />
            <!-- <img
              src=""
              alt=""
              v-b-modal.modal-center
              v-if="buissnessinfo.rmcm.image"
            />

            <a
              :href="buissnessinfo.rmcm.url"
              v-if="buissnessinfo.rmcm.document"
              download
              >Download</a
            > -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.rmcm"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button type="submit" class="login-button" :disabled="btn1Disabled">
          {{ $t("profile.save") }}
          <span class="loader" v-if="buissnessinfoUploadLoading"></span>
        </b-button>
      </form>

      <!-- suppDocUpload -->

      <form class="suppDoc" @submit.prevent="suppDocUploadForm">
        <div class="form-input mb-4">
          <label for="establishmentContract">
            {{ $t("profile.establishmentContract") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="suppDocUploadMoa"
              id="establishmentContract"
            />
            <div class="d-flex" v-if="suppData">
              <img
                v-b-modal.moaModal
                :src="suppData.moa_path"
                alt="moa-image"
                v-if="suppData.moa_path"
              />

              <b-modal
                id="moaModal"
                :title="$t('profile.certificateAdministration')"
              >
                <template #modal-header="{ close }">
                  <!-- Emulate built in modal header close button action -->
                  <h5>
                    {{ $t("profile.certificateAdministration") }}
                  </h5>

                  <b-button size="sm" variant="outline-danger" @click="close()">
                    x
                  </b-button>
                </template>

                <template>
                  <img
                    :src="suppData.moa_path"
                    alt="moa-image"
                    v-if="suppData.moa_path"
                    class="img-fluid w-100"
                  />
                </template>

                <template #modal-footer>
                  <!-- Emulate built in modal footer ok and cancel button actions -->
                  <b-button
                    class="btn-block"
                    variant="info"
                    @click="downloadImage(suppData.moa_path)"
                  >
                    {{ $t("profile.download") }}
                    <span class="loading-span" v-if="suppDataLoading">
                      ...</span
                    >
                  </b-button>
                </template>
              </b-modal>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.moa"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="IbanCertificate">
            {{ $t("profile.establishmentContract") }}
          </label>

          <div class="input-img d-flex">
            <input
              type="file"
              @change="suppDocUploadSad"
              id="CertificateAdministration"
            />
            <div class="d-flex" v-if="suppData">
              <img
                v-b-modal.sadModal
                :src="suppData.sad_path"
                alt="moa-image"
                v-if="suppData.sad_path"
              />

              <b-modal
                id="sadModal"
                :title="$t('profile.establishmentContract')"
              >
                <template #modal-header="{ close }">
                  <!-- Emulate built in modal header close button action -->
                  <h5>
                    {{ $t("profile.establishmentContract") }}
                  </h5>

                  <b-button size="sm" variant="outline-danger" @click="close()">
                    x
                  </b-button>
                </template>

                <template>
                  <img
                    :src="suppData.sad_path"
                    alt="moa-image"
                    v-if="suppData.sad_path"
                    class="img-fluid w-100"
                  />
                </template>

                <template #modal-footer>
                  <!-- Emulate built in modal footer ok and cancel button actions -->
                  <b-button
                    class="btn-block"
                    variant="info"
                    @click="downloadImage(suppData.sad_path)"
                  >
                    {{ $t("profile.download") }}
                  </b-button>
                </template>
              </b-modal>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.sad"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button type="submit" class="login-button" :disabled="btn2Disabled">
          {{ $t("profile.save") }}
          <span class="loader" v-if="suppDataLoading"></span>
        </b-button>
      </form>

      <!-- bank iban  -->

      <form lass="suppDoc" @submit.prevent="ibanUpload">
        <div class="form-input mb-4">
          <label for="LetterAuthorization">
            {{ $t("profile.ibanCertificate") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="bankIbanUpload"
              id="LetterAuthorization"
            />
            <!-- <img src="" alt="" /> -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.iban_code"
            :key="index"
          >
            {{ error }}
          </div>
          <div class="error text-start" v-if="unOuthMesssage">
            {{unOuthMesssage}}
          </div>
        </div>
        <b-button type="submit" class="login-button" :disabled="btn3Disabled">
          {{ $t("profile.save") }}

          <span class="loader" v-if="ibanUploadLoading"></span>
        </b-button>

        <!-- <img src="" alt="" /> -->
      </form>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import profile from "@/services/profile";
export default {
  components: {
    // BIconArrowRight,
  },
  data() {
    return {
      uploadErrors: {},
      errors: {},
      buissnessinfoUploadLoading: false,
      suppDataLoading: false,
      ibanUploadLoading: false,
      btn1Disabled: false,
      btn2Disabled: false,
      btn3Disabled: false,
      buissnessinfo: {
        ccl: null,
        auth_civil_copy: null,
        ccs: null,
        rmcm: null,
      },
      suppDocUploadInfo: {
        moa: null,
        sad: null,
      },
      bankIban: {
        iban: null,
      },
      // represent data
      suppData: null,
      buisnessData: null,
      ibanData: null,
      unOuthMesssage:null
    };
  },
  mounted() {
    profile.getSuppDocUploadData().then((res) => {
      // console.log("second", res.data);
      this.suppData = res.data.items;
    });
    profile.getBuissnessinfodata().then((res) => {
      this.buisnessData = res.data.items;
      // console.log("first", res.data);
    });
    profile.getibanUploadData().then((res) => {
      console.log("third", res.data);
      // this.ibanData = res.data.items;
    });
  },
  methods: {
    downloadImage(url) {
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "image.png");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
      alert("clicked");
    },
    uploadPicture(e) {
      // e.target.nextElementSibling.style.display = "flex";
      // e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
      let formData = new FormData();

      console.log(e.target.files[0].type);
      if (e.target.files[0].type.split("/")[0] === "image") {
        formData.append("file", e);
      } else if (e.target.files[0].type.split("/")[0] === "application") {
        formData.append("file", e);
      } else {
        console.log("other format");
        // return false
      }
    },
    async suppDocUpload() {
      let formData = "";
      await profile
        .suppDocUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // buisness info change functions
    CommercialLicense(e) {
      this.buissnessinfo.ccl = e.target.files[0];
      // this.buissnessinfo.ccl.value = e.target.files[0];
      // if (e.target.files[0].type.split("/")[0] === "image") {
      //   this.buissnessinfo.ccl.image = true;
      //   this.buissnessinfo.ccl.document = false;

      //   setTimeout(() => {
      //     e.target.nextElementSibling.style.display = "flex";
      //     e.target.nextElementSibling.src = URL.createObjectURL(
      //       e.target.files[0]
      //     );
      //   }, 300);

      //   console.log("image");
      // } else if (e.target.files[0].type.split("/")[0] === "application") {
      //   this.buissnessinfo.ccl.image = false;
      //   this.buissnessinfo.ccl.document = true;
      //   this.buissnessinfo.ccl.url = e.target.files[0].ccl;
      // }
      this.checkBtn1();
    },
    signatureAccreditation(e) {
      this.buissnessinfo.auth_civil_copy = e.target.files[0];
      // this.checkBtn1();
    },
    commissionerCard(e) {
      this.buissnessinfo.ccs = e.target.files[0];
      // this.checkBtn1();
    },
    certificateAdministration(e) {
      this.buissnessinfo.rmcm = e.target.files[0];
      // this.checkBtn1();
    },

    // buisness info upload function
    async buissnessinfoUpload() {
      this.buissnessinfoUploadLoading = true;
      this.btn1Disabled = true;
      const formData = new FormData();
      if (this.buissnessinfo.ccl !== null) {
        formData.append("ccl", this.buissnessinfo.ccl);
      }
      if (this.buissnessinfo.auth_civil_copy !== null) {
        formData.append("auth_civil_copy", this.buissnessinfo.auth_civil_copy);
      }
      if (this.buissnessinfo.ccs !== null) {
        formData.append("ccs", this.buissnessinfo.ccs);
      }
      if (this.buissnessinfo.rmcm !== null) {
        formData.append("rmcm", this.buissnessinfo.rmcm);
      }

      await profile
        .buissnessinfoUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.getBuissnessinfodata();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.buissnessinfoUploadLoading = false;
          this.btn1Disabled = false;
        });
    },

    // buisness info get data function
    async getBuissnessinfodata() {
      await profile
        .getBuissnessinfodata()
        .then((res) => {
          this.sucessMsg(res.data.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // suppDocUpload change functions
    suppDocUploadMoa(event) {
      this.suppDocUploadInfo.moa = event.target.files[0];
      this.checkBtn2();
    },
    suppDocUploadSad(event) {
      this.suppDocUploadInfo.sad = event.target.files[0];
      this.checkBtn2();
    },

    // suppDocUpload upload function

    async suppDocUploadForm() {
      this.suppDataLoading = true;
      this.btn2Disabled = true;
      const formData = new FormData();
      
      if (this.suppDocUploadInfo.moa !== null) {
        formData.append("moa", this.suppDocUploadInfo.moa);
      }
      if (this.suppDocUploadInfo.sad !== null) {
        formData.append("sad", this.suppDocUploadInfo.sad);
      }

      await profile
        .suppDocUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.suppData = res.data.items;
          console.log(res);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.suppDataLoading = false;
          this.btn2Disabled = false;
        });
        console.log(formData);
    },

    // suppDocUpload get data function
    async getSuppDocUploadData() {
      await profile
        .getSuppDocUploadData()
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // bankIbanUpload change function
    bankIbanUpload(event) {
      this.bankIban.iban = event.target.files[0];
      this.checkBtn3();
    },

    // bankIbanUpload upload function
    async ibanUpload() {
      this.ibanUploadLoading = true;
      this.btn3Disabled = true;
      const formData = new FormData();
      if (this.bankIban.iban !== null) {
        formData.append("iban_code", this.bankIban.iban);
      }
      await profile
        .ibanUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.getibanUploadData();
          }
          
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
          if(error.response.status == 401){
            this.unOuthMesssage = error.response.data.message;
            setTimeout(() => {
              localStorage.clear();
              window.location.push('/')
            }, 1500);
          }
        })
        .finally(() => {
          this.ibanUploadLoading = false;
          this.btn3Disabled = false;
        });
    },

    // buisness info get data function
    async getibanUploadData() {
      await profile
        .getibanUploadData()
        .then((res) => {
         
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },
    //btn 1 check
    checkBtn1() {
      if (
        this.buissnessinfo.ccc !== null &&
        this.buissnessinfo.auth_civil_copy !== null &&
        this.buissnessinfo.ccs !== null &&
        this.buissnessinfo.rmcm !== null
      ) {
        this.btn1Disabled = false;
      }
    },
    //btn 2 check
    checkBtn2() {
      if (
        this.suppDocUploadInfo.moa !== null &&
        this.suppDocUploadInfo.sad !== null
      ) {
        this.btn2Disabled = false;
      }
    },
    //btn 3 check
    checkBtn3() {
      if (this.bankIban.iban !== null) {
        this.btn3Disabled = false;
      }
    },

    // checkURL(url) {
    //   return url.match(/.(jpeg|jpg|gif|png)$/) != null;
    // },

    // suppDocUpload change functionsF
  },
};
</script>
<style lang="scss" scoped>
.documentsB2b {
  .all-documents {
    .header {
      h5 {
        font-size: 16pt;
        margin-bottom: 1rem;
      }
      a {
        color: #312620;
        &:hover {
          color: #ed2124;
        }
      }
    }
    form {
      .form-input {
        label {
          text-align: start;
          display: block;
          font-size: 10pt;
          color: #565656;
          margin-bottom: 0.7rem;
        }
        input {
          width: 100%;
          border: 1px solid #dcdcdc;
          padding: 1.25rem;
          margin-inline-end: 1rem;
        }
        img {
          width: 10rem;
          // display: none;
        }
        .input-img {
          height: 4.5rem;
        }
      }
    }
  }
}
html:lang(ar) {
  .save-icon {
    transform: rotateZ(180deg);
  }
}
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid blue;
  border-bottom: 4px solid blue;
  width: 20px;
  height: 20px;
  margin: -4px 4px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button:disabled {
  cursor: no-drop;
}
</style>
