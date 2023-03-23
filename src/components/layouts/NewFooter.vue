<template>
  <section class="user-footer">
    <!-- footer  -->
    <Footer class="dark-bg pt-50 pb-1">
      <div class="container">
        <div class="footer-middle-wrap py-3">
          <div class="row">
            <div class="col-md-8 col-sm-6">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <h4>For Help</h4>
                  <nav class="menu-links text-center">
                    <ul
                      class="d-flex justify-content-between align-items-start flex-column"
                    >
                      <!-- <li>
                        <router-link to="/">{{ $t("items.home") }}</router-link>
                      </li> -->
                      <li>
                        <router-link to="/about">{{
                          $t("home.about")
                        }}</router-link>
                      </li>

                      <li>
                        <router-link to="/suppliers">{{
                          $t("home.suppliers")
                        }}</router-link>
                      </li>
                      <li>
                        <a
                          :href="`${supplierDomain}auth/login?lang=${$i18n.locale}`"
                          target="_blank"
                          >{{ $t("home.vendors") }}</a
                        >
                      </li>
                      <li>
                        <router-link to="/b2b-login">{{
                          $t("home.corporat")
                        }}</router-link>
                      </li>
                      <li>
                        <router-link to="/contact-us">{{
                          $t("home.contactUs")
                        }}</router-link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div class="title">
                    <h4>{{ $t("home.contactUs") }}</h4>
                    <div v-for="(link, index) in links" :key="index">
                      <p v-if="link.key === 'mysupply_link'">
                        
                        <a :href="link.value" target="_blank">Info@MySupply.com</a
                        >
                      </p>
                    </div>
                    <p>22986001</p>
                    <p>
                      {{$t('profile.subscribeNewsletter')}}
                    </p>
                    <p>
                        <span><font-awesome-icon icon="fa-solid fa-location-dot" /></span>
                        <span class="mx-2">Kuwait , city</span>
                    </p>
                  </div>
                </div>

                <div class="col-12">
                  <div class="newLinks footer-middle-wrap mt-5">
                    <div class="d-flex align-items-center">
                      <ul class="" v-for="(link, index) in links" :key="index">
                        <li v-if="link.key && link.key === 'google_play'">
                          <a :href="link.value" target="_blank">
                            <img
                              src="@/assets/images/play_store1.png"
                              :alt="link.key"
                              class="img-fluid"
                            />
                          </a>
                        </li>
                        <li
                          v-if="link.key && link.key === 'app_store'"
                          class="mx-3"
                        >
                          <a :href="link.value" target="_blank">
                            <img
                              src="@/assets/images/app_store1.png"
                              :alt="link.key"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-sm-6">
              <div
                class="footer-social d-flex justify-content-center align-items-end flex-column"
              >
                <div v-for="(link, index) in links" :key="index">
                  <ul>
                    <li v-if="link.key && link.key === 'facebook'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/facebook.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                    <li v-if="link.key && link.key === 'twitter'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/twitter.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                    <li v-if="link.key && link.key === 'youtube'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/youtube.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                    <li v-if="link.key && link.key === 'instagram'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/instagram.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                    <li v-if="link.key && link.key === 'linkedin'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/linkedin.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                    <li v-if="link.key && link.key === 'pinterest'">
                      <a :href="link.value" target="_blank">
                        <img
                          src="@/assets/images/pinterest.png"
                          :alt="link.key"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChatUs :whatsapp="whatsapp" />
      </div>
    </Footer>
  </section>
</template>

<script>
// footer component
import profile from "@/services/profile";
import { version } from "../../../package";
import ChatUs from "@/components/global/chat.vue";
export default {
  data() {
    return {
      facebook: null,
      twitter: null,
      youtube: null,
      instagram: null,
      linkedin: null,
      pinterest: null,
      googlePlay: null,
      appStore: null,
      version: version,
      links: null,
      whatsapp: null,
    };
  },
  methods: {
    /**
     * @vuese
     * get footer links
     */
    footerLinks() {
      profile
        .footerLinks()
        .then((res) => {
          this.links = res.data.items.data;
          for (let index = 0; index < res.data.items.data.length; index++) {
            const element = res.data.items.data[index];
            if (element.key === "whatsapp") {
              this.whatsapp = element;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.footerLinks();
  },
  components: {
    ChatUs,
  },
};
</script>

<style lang="scss" scoped>
/* 21. Footer */
.dark-bg {
  background: #262626;
}
.pb-50 {
  padding-bottom: 50px;
}
.pt-50 {
  padding-top: 50px;
}
.footer-top-wrap {
  padding: 0 0 40px;
  border-bottom: 1px solid #1c1c1c;
  position: relative;
}
.footer-top-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 150px;
  background: #bc3e00;
  height: 1px;
  margin: 0 auto;
  z-index: 1;
}
.footer-logo {
  text-align: center;
  img {
    height: 75px;
    width: 75px;
  }
}
.footer-link-wrap {
  display: flex;
  // padding: 30px 0 0;
  // direction: rtl;
  // text-align: left;
}
.footer-link-wrap .menu-links {
  flex-grow: 1;
}
.footer-link-wrap .menu-links ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // direction: ltr;
}
// .footer-link-wrap .menu-links li {
//   margin-left: 40px;
// }
// .footer-link-wrap .menu-links li:last-child {
//   margin-right: 48px;
// }
.footer-link-wrap .menu-links li a {
  display: block;
  font-size: 13px;
  color: #fff;
  font-family: "Almarai", sans-serif;
  text-transform: uppercase;
  padding: 10px 9px;
  &:hover {
    color: $main-color;
  }
}
.footer-social ul {
  display: flex;
  align-items: center;
}
.footer-social ul li {
  margin: 0 9px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid;
  padding: 8px;
  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
}
.footer-social ul li a {
  font-size: 13px;
  color: #fff;
}
.footer-social {
  margin-right: 108px;
}
// .copyright-wrap {
//   margin-top: 27px;
// }
.copyright-text {
  p {
    margin-bottom: 0;
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    font-family: "Almarai", sans-serif;
  }
  a {
    color: $main-color;
  }
}
.pay-method-img {
  text-align: revert;
  margin-left: 0;
}
.pay-method-img img {
  max-width: 100%;
}
.footer-style-two .footer-top-wrap {
  border-bottom: 1px solid #d0cfcb;
}
.footer-style-two .footer-top-wrap::after {
  opacity: 0.35;
}
.footer-widget .fw-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 22px;
  text-transform: uppercase;
}
.fw-link ul li + li {
  margin-top: 8px;
}
.fw-link ul li a {
  font-size: 16px;
  color: #fff;
  font-family: "Almarai", sans-serif;
  display: inline-block;
  position: relative;
}
.fw-link ul li a:hover {
  color: #312620;
}
.fw-link ul li a::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #66605c;
  -webkit-transform-origin: right top;
  -ms-transform-origin: right top;
  transform-origin: right top;
  -webkit-transform: scale(0, 1);
  -ms-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
  transition: transform 0.4s cubic-bezier(0.74, 0.72, 0.27, 0.24);
}
.fw-link ul li a:hover::before {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: scale(1, 1);
  -ms-transform: scale(1, 1);
  transform: scale(1, 1);
}
.footer-style-two .footer-social {
  margin-left: 0;
}
.footer-text p {
  margin-bottom: 12px;
  font-size: 16px;
  color: #fff;
  font-family: "Almarai", sans-serif;
}
.footer-style-two .copyright-wrap {
  margin-top: 0;
  background: #e8e6e2;
  padding: 25px 0;
}
.footer-style-two.gray-bg {
  background: #f8f7f2;
}
.footer-style-three.gray-bg {
  background: #f5f5f5;
}
.footer-style-three .copyright-wrap {
  background: #e9e9e9;
}
.footer-style-two .copyright-wrap.gray-light-bg {
  background: #ebeded;
}

/* Medium devices (tablets, 768px and up) */
@media (max-width: 767.98px) {
  .footer-link-wrap .menu-links li a {
    padding: 10px 0;
  }
  .footer-link-wrap {
    display: block;
  }
  .footer-social {
    margin-left: 0;
    margin-top: 15px;
    margin-right: auto;
  }
  .copyright-text {
    text-align: center;
    margin-bottom: 20px;
  }
  .copyright-wrap {
    margin-top: 45px;
  }
  .footer-social ul {
    justify-content: center;
  }
  .footer-link-wrap .menu-links ul {
    justify-content: center;
  }
  .footer-link-wrap .menu-links li,
  .footer-link-wrap .menu-links li:last-child {
    margin: 0 20px;
  }

  .footer-style-two .footer-social ul {
    justify-content: flex-start;
  }
}

// style arabic
html:lang(ar) {
  // .footer-link-wrap .menu-links ul {
  //   direction: rtl;
  // }
  .footer-link-wrap .menu-links li:last-child {
    margin-right: 0;
  }
}
.footer-middle-wrap {
  a {
    color: #fff;
  }
}
.menu-links {
  ul {
    @media (max-width: 767px) {
      flex-direction: column !important;
      font-size: 20px;
      line-height: 1.7;
    }
  }
}
.title,
h4 {
  color: #fff;
}
li {
  margin: 10px 0;
  font-size: 17px;
}
</style>
