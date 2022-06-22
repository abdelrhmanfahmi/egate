<template>
  <section class="user-footer">
    <footer class="dark-bg pt-50 pb-50">
      <div class="container">
        <div class="footer-top-wrap">
          <div class="row">
            <div class="col-12">
              <div class="footer-logo">
                <a href="https://humhum.work/user-interface/public/en_kw"
                  ><img src="@/assets/images/mysupply-logo.png" alt=""
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-middle-wrap py-5">
          <div class="row">
            <!-- <div class="col-12"></div> -->
            <div class="col-md-3 col-sm-12">
              <div class="footer-social">
                <ul>
                  <li v-if="googlePlay">
                    <a :href="googlePlay.value" target="_blank">
                      <img
                        src="@/assets/images/play_store1.png"
                        :alt="googlePlay.key"
                      />
                    </a>
                  </li>
                  <li v-if="appStore">
                    <a :href="appStore.value" target="_blank">
                      <img
                        src="@/assets/images/app_store1.png"
                        :alt="appStore.key"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 my-2">
              <nav class="menu-links text-center">
                <ul class="d-flex justify-content-around align-items-center">
                  <li>
                    <router-link to="/">{{ $t("items.home") }}</router-link>
                  </li>
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
                      href="https://staging2.fabrica-dev.com/humhum-supplier/auth/login"
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
            <div class="col-md-3 col-sm-12 mb-2">
              <!-- <div class="footer-link-wrap">
                <div class="pay-method-img">
                  <img src="@/assets/images/payment.png" alt="image" />
                </div>
              </div> -->
              <div class="footer-social">
                <!-- <ul>
                  <li>
                    <router-link to=""><i class=""></i></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img src="@/assets/images/f.png" alt=""
                    /></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img src="@/assets/images/t.png" alt=""
                    /></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img src="@/assets/images/y.png" alt=""
                    /></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img src="@/assets/images/i.png" alt=""
                    /></router-link>
                  </li>
                  <li>
                    <router-link to=""
                      ><img src="@/assets/images/l.png" alt=""
                    /></router-link>
                  </li>
                </ul> -->
                <ul>
                  <li v-if="facebook">
                    <a :href="facebook.value" target="_blank">
                      <img
                        src="@/assets/images/facebook.png"
                        :alt="facebook.key"
                      />
                    </a>
                  </li>
                  <li v-if="twitter">
                    <a :href="twitter.value" target="_blank">
                      <img
                        src="@/assets/images/twitter.png"
                        :alt="twitter.key"
                      />
                    </a>
                  </li>
                  <li v-if="youtube">
                    <a :href="youtube.value" target="_blank">
                      <img
                        src="@/assets/images/youtube.png"
                        :alt="youtube.key"
                      />
                    </a>
                  </li>
                  <li v-if="instagram">
                    <a :href="instagram.value" target="_blank">
                      <img
                        src="@/assets/images/instagram.png"
                        :alt="instagram.key"
                      />
                    </a>
                  </li>
                  <li v-if="linkedin">
                    <a :href="linkedin.value" target="_blank">
                      <img
                        src="@/assets/images/linkedin.png"
                        :alt="linkedin.key"
                      />
                    </a>
                  </li>
                  <li v-if="pinterest">
                    <a :href="pinterest.value" target="_blank">
                      <img
                        src="@/assets/images/pinterest.png"
                        :alt="pinterest.key"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-wrap">
          <div class="row justify-content-center align-items-center">
            <!-- <div class="col-lg-8" style="">
              <div class="pay-method-img">
                <img src="@/assets/images/payment.png" alt="image" />
              </div>
            </div> -->
            <div class="col-12 text-center w-100">
              <div class="copyright-text">
                <p>
                  © 2022
                  <a href="https://humhum.work/user-interface/public/en_kw">{{
                    $t("home.mySupply")
                  }}</a
                  >. {{ $t("home.allRightsReserved") }}
                </p>
                <p>version 0.0.132</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import profile from "@/services/profile";
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
    };
  },
  methods: {
    footerFacebookLink() {
      profile
        .footerFacebookLink()
        .then((res) => {
          // console.log(res);
          this.facebook = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerTwitterLink() {
      profile
        .footerTwitterLink()
        .then((res) => {
          // console.log(res);
          this.twitter = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerYoutubeLink() {
      profile
        .footerYoutubeLink()
        .then((res) => {
          // console.log(res);
          this.youtube = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerLinkedinLink() {
      profile
        .footerLinkedinLink()
        .then((res) => {
          // console.log(res);
          this.linkedin = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerInstagramLink() {
      profile
        .footerInstagramLink()
        .then((res) => {
          // console.log(res);
          this.instagram = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerPinterestLink() {
      profile
        .footerPinterestLink()
        .then((res) => {
          // console.log(res);
          this.pinterest = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerGoogleLink() {
      profile
        .storeGoogleLink()
        .then((res) => {
          // console.log(res);
          this.googlePlay = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    footerAppLink() {
      profile
        .storeAppLink()
        .then((res) => {
          // console.log(res);
          this.appStore = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.footerFacebookLink();
    this.footerTwitterLink();
    this.footerYoutubeLink();
    this.footerLinkedinLink();
    this.footerInstagramLink();
    this.footerPinterestLink();
    this.footerGoogleLink();
    this.footerAppLink();
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
  color: #898481;
  font-family: "Almarai", sans-serif;
  text-transform: uppercase;
  padding: 10px 9px;
  &:hover {
    color: #ed2124;
  }
}
.footer-social ul {
  display: flex;
  align-items: center;
}
.footer-social ul li  {
  margin:0  9px;
}
.footer-social ul li a {
  font-size: 13px;
  color: #898481;
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
    color: #898481;
    font-family: "Almarai", sans-serif;
  }
  a {
    color: #ed2124;
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
  color: #747372;
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
  color: #757473;
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
    color: #8c8c8c;
  }
}
</style>
