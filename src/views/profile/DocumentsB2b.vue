<template>
  <div class="documentsB2b">
    <div class="all-documents">
      <div class="header d-flex justify-content-between">
        <h5>{{ $t("profile.companyDocuments") }}</h5>
        <a href="#">
          {{ $t("profile.saveData") }}
          <span class="save-icon">
            <b-icon-arrow-right></b-icon-arrow-right>
          </span>
        </a>
      </div>
      <form>
        <div class="form-input mb-4">
          <label for="CommercialLicense">
            {{ $t("profile.commercialLicense") }}
          </label>
          <div class="input-img d-flex">
            <input type="file" @change="uploadPicture" id="CommercialLicense" />
            <img :src="image" alt="" />
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="SignatureAccreditation">
            {{ $t("profile.signatureAccreditation") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="uploadPicture"
              id="SignatureAccreditation"
            />
            <img src="" alt="" />
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="CommissionerCard">
            {{ $t("profile.commissionerCard") }}
          </label>
          <div class="input-img d-flex">
            <input type="file" @change="uploadPicture" id="CommissionerCard" />
            <img src="" alt="" />
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="EstablishmentContract">
            {{ $t("profile.establishmentContract") }}
          </label>
          <div class="input-img d-flex">
            <input
              type="file"
              @change="uploadPicture"
              id="EstablishmentContract"
            />
            <img src="" alt="" />
          </div>
        </div>
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
            <img src="" alt="" />
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="IbanCertificate">
            {{ $t("profile.ibanCertificate") }}
          </label>
          <div class="input-img d-flex">
            <input type="file" @change="uploadPicture" id="IbanCertificate" />
            <img src="" alt="" />
          </div>
        </div>
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
            <img src="" alt="" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { BIconArrowRight } from "bootstrap-vue";

export default {
  components: {
    BIconArrowRight,
  },
  methods: {
    uploadPicture(e) {
      e.target.nextElementSibling.style.display = "flex";
      e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
    },
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
