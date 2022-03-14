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
      <form class="buissnessinfo" @submit.prevent="buissnessinfoUpload">
        <div class="form-input mb-4">
          <label for="CommercialLicense">
            {{ $t("profile.commercialLicense") }}
          </label>
          <div class="input-img d-flex">
            <input type="file" @change="uploadPicture" id="CommercialLicense" />
            <!-- <img :src="image" alt="" /> -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.password"
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
            <input type="file" @change="uploadPicture" id="CommissionerCard" />
            <!-- <img src="" alt="" /> -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.password"
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
              @change="uploadPicture"
              id="SignatureAccreditation"
            />
            <!-- <img src="" alt="" /> -->
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.password"
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
              @change="uploadPicture"
              id="certificateAdministration"
            />
            <!-- <img src="" alt="" /> -->
          </div>
        </div>
        <b-button type="submit" class="login-button">
          {{ $t("save") }}
        </b-button>
      </form>
      <form class="suppDoc" @submit.prevent="suppDocUpload">
        <div class="form-input mb-4">
          <label for="CertificateAdministration">
            {{ $t("profile.certificateAdministration") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="uploadPicture"
              id="CertificateAdministration"
            />
            <!-- <img src="" alt="" /> -->
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="IbanCertificate">
            {{ $t("profile.ibanCertificate") }}
          </label>
          <div class="input-img d-flex">
            <input type="file" @change="uploadPicture" id="IbanCertificate" />
            <!-- <img src="" alt="" /> -->
          </div>
        </div>
        <b-button type="submit" class="login-button">
          {{ $t("save") }}
        </b-button>
      </form>
      <form lass="suppDoc" @submit.prevent="suppDocUpload">
        <div class="form-input mb-4">
          <label for="LetterAuthorization">
            {{ $t("profile.letterAuthorization") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="uploadPicture"
              id="LetterAuthorization"
            />
            <!-- <img src="" alt="" /> -->
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
    async buissnessinfoUpload() {
      let formData = "";
      await profile
        .buissnessinfoUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
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
  },
  data() {
    return {
      uploadErrors: {},
      errors: {},
      buissnessinfo: {
        ccc: "",
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
