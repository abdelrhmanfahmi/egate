<template>
  <div class="contact-form">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12 col-lg-8 col-xl-9 form-body">
          <span class="side-info">{{ $t("contactUs.contactUs") }}</span>
          <p class="title">{{ $t("contactUs.writeMessage") }}</p>
          <form class="row" @submit.prevent="contactUs">
            <div class="form-input col-6">
              <input
                v-model="form.full_name"
                type="text"
                :placeholder="$t('contactUs.formName')"
              />
              <div class="" v-if="errors">
                <div
                  class="error"
                  v-for="(error, index) in errors.full_name"
                  :key="index"
                >
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <input
                v-model="form.email"
                type="text"
                :placeholder="$t('contactUs.formEmail')"
              />
              <div class="" v-if="errors">
                <div
                  class="error"
                  v-for="(error, index) in errors.email"
                  :key="index"
                >
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <input
                v-model="form.mobile_number"
                type="number"
                :placeholder="$t('contactUs.formPhone')"
                min="0"
              />
              <div class="" v-if="errors">
                <div
                  class="error"
                  v-for="(error, index) in errors.mobile_number"
                  :key="index"
                >
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-6">
              <input
                v-model="form.subject"
                type="text"
                :placeholder="$t('contactUs.formSubject')"
              />
              <div class="" v-if="errors">
                <div
                  class="error"
                  v-for="(error, index) in errors.subject"
                  :key="index"
                >
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="form-input col-12">
              <b-form-textarea
                v-model="form.message"
                :placeholder="$t('contactUs.formMessage')"
                rows="5"
                style="resize: none"
              ></b-form-textarea>
              <div class="" v-if="errors">
                <div
                  class="error"
                  v-for="(error, index) in errors.message"
                  :key="index"
                >
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <b-button type="submit" class="login-button">
                {{ $t("contactUs.formSend") }}
              </b-button>
            </div>
          </form>
        </div>
        <div class="col-12 col-lg-4 col-xl-3 info-data">
          <div class="contact-info">
            <div class="info d-flex">
              <div class="icon">
                <b-icon-telephone-outbound></b-icon-telephone-outbound>
              </div>
              <div class="data">
                <span class="title">{{ $t("contactUs.phone") }}</span>
                <ul class="contact-data">
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="info d-flex">
              <div class="icon">
                <b-icon-telephone-outbound></b-icon-telephone-outbound>
              </div>
              <div class="data">
                <span class="title">{{ $t("contactUs.formEmail") }}</span>
                <ul class="contact-data">
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="info d-flex">
              <div class="icon">
                <b-icon-telephone-outbound></b-icon-telephone-outbound>
              </div>
              <div class="data">
                <span class="title">{{ $t("contactUs.address") }}</span>
                <ul class="contact-data">
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                  <li>
                    <a href="tel:+201458745896">+201458745896</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6973.918440151834!2d48.131962!3d29.077350000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcdc0ee30a97dfb01!2sMySupply.me!5e0!3m2!1sen!2skw!4v1646740867580!5m2!1sen!2skw"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { BIconTelephoneOutbound } from "bootstrap-vue";
import profile from "@/services/profile";
export default {
  components: {
    BIconTelephoneOutbound,
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
    };
  },
  methods: {
    contactUs() {
      profile
        .contactUs(this.form)
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-form {
  color: #000;
  .form-body {
    color: #000;
    .side-info {
      display: block;
      font-size: 10pt;
      color: #ed2124;
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
      background-color: #ed2124;
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
          color: #ed2124;
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
          svg {
          }
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
              a {
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
