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
              required
            />

            <!-- <img
              src=""
              alt=""
              v-b-modal.modal-center
              v-if="buissnessinfo.ccl"
            /> -->

            <!-- <b-modal id="modal-center" centered title="BootstrapVue">
              <img
                src=""
                alt=""
                v-if="buissnessinfo.ccl.image"
                @click="openMyModal"
              />
            </b-modal> -->

            <!-- <b-button
              class="btn login-button btn-secondary btn-sm"
              v
              @click="downloadFile()"
            >
              {{ $t("download") }}
            </b-button> -->

            <!-- <a
              :href="buissnessinfo.ccl.url"
              v-if="buissnessinfo.ccl.document"
              download
              >Download</a
            > -->
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
              required
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
              required
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
              required
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
        <b-button type="submit" class="login-button">
          {{ $t("save") }}
        </b-button>
      </form>

      <!-- suppDocUpload? -->
      <form class="suppDoc" @submit.prevent="suppDocUploadForm">
        <div class="form-input mb-4">
          <label for="CertificateAdministration">
            {{ $t("profile.certificateAdministration") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="suppDocUploadMoa"
              id="CertificateAdministration"
            />
            <img src="" alt="" />
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
            {{ $t("profile.ibanCertificate") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="suppDocUploadSad"
              id="IbanCertificate"
            />
            <img src="" alt="" />
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.sad"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button type="submit" class="login-button">
          {{ $t("save") }}
        </b-button>
      </form>

      <!-- suppDocUpload -->

      <form lass="suppDoc" @submit.prevent="suppDocUpload">
        <div class="form-input mb-4">
          <label for="LetterAuthorization">
            {{ $t("profile.letterAuthorization") }}
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
            v-for="(error, index) in uploadErrors.iban"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button type="submit" class="login-button">
          {{ $t("save") }}
        </b-button>
      </form>
    </div>
  </div>
</template>
<script>
// import { BIconArrowRight } from "bootstrap-vue";

import profile from "@/services/profile";
export default {
  components: {
    // BIconArrowRight,
  },
  methods: {
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
    },
    signatureAccreditation(e) {
      this.buissnessinfo.auth_civil_copy = e.target.files[0];
      // this.buissnessinfo.auth_civil_copy.value = e.target.files[0];
      // if (e.target.files[0].type.split("/")[0] === "image") {
      //   this.buissnessinfo.auth_civil_copy.image = true;
      //   this.buissnessinfo.auth_civil_copy.document = false;

      //   setTimeout(() => {
      //     e.target.nextElementSibling.style.display = "flex";
      //     e.target.nextElementSibling.src = URL.createObjectURL(
      //       e.target.files[0]
      //     );
      //   }, 300);

      //   console.log("image");
      // } else if (e.target.files[0].type.split("/")[0] === "application") {
      //   this.buissnessinfo.auth_civil_copy.image = false;
      //   this.buissnessinfo.auth_civil_copy.document = true;
      //   this.buissnessinfo.auth_civil_copy.url =
      //     e.target.files[0].auth_civil_copy;
      // }
    },
    commissionerCard(e) {
      this.buissnessinfo.ccs = e.target.files[0];
      // this.buissnessinfo.ccs.value = e.target.files[0];
      // if (e.target.files[0].type.split("/")[0] === "image") {
      //   this.buissnessinfo.ccs.image = true;
      //   this.buissnessinfo.ccs.document = false;

      //   setTimeout(() => {
      //     e.target.nextElementSibling.style.display = "flex";
      //     e.target.nextElementSibling.src = URL.createObjectURL(
      //       e.target.files[0]
      //     );
      //   }, 300);

      //   console.log("image");
      // } else if (e.target.files[0].type.split("/")[0] === "application") {
      //   this.buissnessinfo.ccs.image = false;
      //   this.buissnessinfo.ccs.document = true;
      //   this.buissnessinfo.ccs.url = e.target.files[0].ccs;
      // }
    },
    certificateAdministration(e) {
      this.buissnessinfo.rmcm = e.target.files[0];
      // this.buissnessinfo.rmcm.value = e.target.files[0];
      // if (e.target.files[0].type.split("/")[0] === "image") {
      //   this.buissnessinfo.rmcm.image = true;
      //   this.buissnessinfo.rmcm.document = false;

      //   setTimeout(() => {
      //     e.target.nextElementSibling.style.display = "flex";
      //     e.target.nextElementSibling.src = URL.createObjectURL(
      //       e.target.files[0]
      //     );
      //   }, 300);

      //   console.log("image");
      // } else if (e.target.files[0].type.split("/")[0] === "application") {
      //   this.buissnessinfo.rmcm.image = false;
      //   this.buissnessinfo.rmcm.document = true;
      //   this.buissnessinfo.rmcm.url = e.target.files[0].rmcm;
      // }
    },

    // buisness info upload functions

    async buissnessinfoUpload() {
      const formData = new FormData();
      formData.append("ccl", this.buissnessinfo.ccl);
      formData.append("auth_civil_copy", this.buissnessinfo.auth_civil_copy);
      formData.append("ccs", this.buissnessinfo.ccs);
      formData.append("rmcm", this.buissnessinfo.rmcm);
      await profile
        .buissnessinfoUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.buissnessinfodata();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });

      console.log(formData);
    },

    async buissnessinfodata() {
      await profile
        .getBuissnessinfodata()
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);
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
      console.log(URL.createObjectURL(event.target.files[0]));
    },
    suppDocUploadSad(event) {
      this.suppDocUploadInfo.sad = event.target.files[0];
      console.log(URL.createObjectURL(event.target.files[0]));
    },
    // checkURL(url) {
    //   return url.match(/.(jpeg|jpg|gif|png)$/) != null;
    // },

    // suppDocUpload change functions

    bankIbanUpload(event) {
      this.bankIban.iban = event.target.files[0];
    },

    async suppDocUploadForm() {
      const formData = new FormData();
      formData.append("iban", this.bankIban.iban);
      await profile
        .ibanUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });

      console.log(this.suppDocUploadInfo);
    },
  },
  data() {
    return {
      uploadErrors: {},
      errors: {},
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
    };
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
          display: none;
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
</style>
