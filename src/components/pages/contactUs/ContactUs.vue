<template>
  <div class="contact-form">
    <!-- contact us page  -->
    <div class="container">
      <div class="row mb-4">
        <div class="col-12 col-lg-8 col-xl-9 form-body">
          <span class="side-info">{{ $t("contactUs.contactUs") }}</span>
          <p class="title">{{ $t("contactUs.writeMessage") }}</p>
          <form class="row" @submit.prevent="contactUs">
            <div class="form-input col-6 required">
              <label for="full_name">
                {{ $t('contactUs.formName') }} <span class="required text-danger">*</span>
              </label>

              <input v-model="form.full_name" type="text" />
              <div class="" v-if="errors">
                <div class="error" v-for="(error, index) in errors.full_name" :key="index">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <label for="email">
                {{ $t('contactUs.formEmail') }} <span class="required text-danger">*</span>
              </label>
              <input v-model="form.email" type="text" />
              <div class="" v-if="errors">
                <div class="error" v-for="(error, index) in errors.email" :key="index">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <label for="mobile_number">
                {{ $t('contactUs.formPhone') }} <span class="required text-danger">*</span>
              </label>
              <input v-model="form.mobile_number" type="text"  />
              <div class="" v-if="errors">
                <div class="error" v-for="(error, index) in errors.mobile_number" :key="index">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <label for="subject">
                {{ $t('contactUs.formSubject') }} <span class="required text-danger">*</span>
              </label>
              <input v-model="form.subject" type="text" />
              <div class="" v-if="errors">
                <div class="error" v-for="(error, index) in errors.subject" :key="index">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-12">
              <label for="message">
                {{ $t('contactUs.formMessage') }} <span class="required text-danger">*</span>
              </label>
              <b-form-textarea v-model="form.message" rows="5" style="resize: none"></b-form-textarea>
              <div class="" v-if="errors">
                <div class="error" v-for="(error, index) in errors.message" :key="index">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-2 col-sm-6">
              <b-button type="submit" class="login-button">
                {{ $t("contactUs.formSend") }}
              </b-button>
            </div>
          </form>
        </div>
        <div class="col-12 col-lg-4 col-xl-3 info-data">
          <div class="contact-info">
            <div class="info " v-if="contactPhone">
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <div class="icon">
                    <b-icon-telephone-outbound></b-icon-telephone-outbound>
                  </div>
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <div class="data">
                    <span class="title">{{ contactPhone.title }}</span>
                    <ul class="contact-data">
                      <li>
                        <p v-html="contactPhone.description"></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="info" v-if="contactEmail">
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <div class="icon">
                    <b-icon-envelope></b-icon-envelope>
                  </div>
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <div class="data pl-2">
                    <span class="title">{{ contactEmail.title }}</span>
                    <ul class="contact-data">
                      <li>
                        <p v-html="contactEmail.description"></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="info" v-if="contactAddress">
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <div class="icon">
                    <b-icon-map-fill></b-icon-map-fill>
                  </div>
                </div>
                <div class="col-md-8 col-sm-12 mb-2">
                  <div class="data">
                    <span class="title">{{ contactAddress.title }}</span>
                    <ul class="contact-data">
                      <li>
                        <p v-html="contactAddress.description"></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map" v-if="contactMap">
      <iframe :src="contactMap.value" width="100%" height="450" style="border: 0" allowfullscreen
        loading="lazy"></iframe>
    </div>
  </div>
</template>
<script>
import { BIconTelephoneOutbound, BIconEnvelope, BIconMapFill } from "bootstrap-vue";
import profile from "@/services/profile";
export default {
  components: {
    BIconTelephoneOutbound,
    BIconEnvelope,
    BIconMapFill
  },
  data() {
    return {
      form: {
        full_name: "",
        email: "",
        mobile_number: "",
        subject: "",
        message: "",
      },
      errors: [],
      contactMap: null,
      contactPhone: null,
      contactEmail: null,
      contactAddress: null,
    };
  },
  methods: {
    /**
     * @vuese
      *  contact us method  ( send data to backend)
    */
    contactUs() {
      profile
        .contactUs(this.form)
        .then((res) => {
          
          this.sucessMsg(res.data.message);
          this.errors = []
        })
        .catch((error) => {
          console.log(error);
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    contactUsMap() {
      /**
       * @vuese
      *  contact us map  
    */
      profile
        .contactUsMap()
        .then((res) => {
          
          this.contactMap = res.data.items;
        })
    },
    contactUsPhone() {
      /**
       * @vuese
      *  contact us phone  
    */
      profile
        .contactUsPhone()
        .then((res) => {
          
          this.contactPhone = res.data.items;
        })
    },
    contactUsEmail() {
      /**
       * @vuese
      *  contact us email  
    */
      profile
        .contactUsEmail()
        .then((res) => {
          
          this.contactEmail = res.data.items;
        })
    },
    contactUsAddress() {
      /**
       * @vuese
      *  contact us address  
    */
      profile
        .contactUsAddress()
        .then((res) => {
          
          this.contactAddress = res.data.items;
        })
    },
  },
  mounted() {
    this.contactUsMap();
    this.contactUsPhone();
    this.contactUsEmail();
    this.contactUsAddress();
  },
};
</script>
<style lang="scss" scoped>
/**
  *  component style
*/
.contact-form {
  color: #000;

  .form-body {
    color: #000;

    .side-info {
      display: block;
      font-size: 10pt;
      color: $main-color;
      margin-bottom: 0.5rem;
    }

    .title {
      color: #444;
      font-weight: bold;
      text-align: center;
      font-size: 26pt;
      margin-bottom: 4rem;
    }

    form {
      .form-input {
        margin-bottom: 1rem;

        input,
        textarea {
          width: 100%;
          border: none;
          background: #ecf0f1;
          font-weight: 500;
          color: #878686;
          height: 60px;
          padding: 1rem 1.5rem;
        }

        textarea {
          height: unset;
        }
      }
    }
  }

  .info-data {
    color: #000;

    .contact-info {
      background-color: $main-color;
      padding: 2rem;

      .info {
        align-items: center;

        &:not(:last-child) {
          border-bottom: 1px dashed #ebebeb;
          margin: 1rem 0 2rem 0;
        }

        .icon {
          width: 75px;
          height: 75px;
          margin-inline-end: 1.3rem;
          background: #ffd7c3;
          position: relative;
          z-index: 1;
          border-radius: 50%;
          font-size: 16pt;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $main-color;

          &::before {
            content: "";
            position: absolute;
            width: 62px;
            height: 62px;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
            border-radius: 50%;
          }

          svg {}
        }

        .data {
          color: #000;

          .title {
            font-size: 13pt;
            color: #fff;
            font-weight: 600;
            margin-bottom: 0.4rem;
          }

          .contact-data {
            color: #000;

            li {
              color: #000;

              a,
              p {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}

html:lang(ar) {
  svg {
    transform: rotateZ(260deg);
  }
}
</style>
