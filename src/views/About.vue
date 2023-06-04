<template>
  <!-- about page  -->
  <div class="about about-page-about">
    <div
      class="d-flex justify-content-center align-items-center CUSTOM-SPINNER"
      v-if="loading"
    >
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>
    <div class="" v-else>
      <!-- <h2 class="about-title text-center">{{ $t("home.about") }}</h2> -->
      <!-- <div class="about-content">
        <div class="about-content-one">
          <div class="row">
            <div class="col-md-6">
              <div class="image w-100">
                <img src="@/assets/images/ab.png" alt="" />
              </div>
            </div>
            <div class="col-md-6" v-if="aboutGeneralData">
              <div class="container">
                <div class="content">
                  <h2 class="title" v-if="aboutGeneralData.title">
                    {{ aboutGeneralData.title }}
                  </h2>
                  <p
                    class="body"
                    v-html="aboutGeneralData.description"
                    v-if="aboutGeneralData.description"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-content-third text-center">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="content" v-if="vision">
                  <div class="img">
                    <img src="@/assets/images/vision.png" alt="" />
                  </div>
                  <h3 class="title" v-if="vision.title">{{ vision.title }}</h3>
                  <div class="body" v-if="vision.description">
                    <p
                      v-html="vision.description"
                      v-if="vision.description"
                    ></p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="content" v-if="message">
                  <div class="img">
                    <img src="@/assets/images/mission.png" alt="" />
                  </div>
                  <h3 class="title">{{ message.title }}</h3>
                  <div class="body">
                    <p
                      v-html="message.description"
                      v-if="message.description"
                    ></p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="content" v-if="principle">
                  <div class="img">
                    <img src="@/assets/images/values.png" alt="" />
                  </div>
                  <h3 class="title">{{ principle.title }}</h3>
                  <div class="body">
                    <p
                      v-html="principle.description"
                      v-if="principle.description"
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="new-design">
        <div class="my-bread">
          <b-container>
            <div class="cover-title text-white font-weight-bold">
              <b-breadcrumb
                class="d-flex px-0 justify-content-start align-items-center"
              >
                <b-breadcrumb-item href="#home">
                  <router-link to="/">
                    {{ $t("supplier.home") }}
                  </router-link>
                </b-breadcrumb-item>
                <b-breadcrumb-item active class="main-color">
                  <router-link to="/home.about" class="main-color">
                    {{ $t("home.about") }}
                  </router-link>
                </b-breadcrumb-item>
              </b-breadcrumb>
            </div>
          </b-container>
        </div>
        <section class="py-5">
          <div class="about-intro">
            <div class="container">
              <div class="row align-items-center" v-if="aboutGeneralData">
                <div class="col-md-6 col-sm-12 my-2">
                  <div class="content">
                    <h2 class="page-title" v-if="aboutGeneralData.title">
                      {{ aboutGeneralData.title }}
                    </h2>
                    <!-- <h2 class="page-title">{{ $t('home.ourStory') }}</h2> -->
                    <p
                      class="body"
                      v-html="aboutGeneralData.description"
                      v-if="aboutGeneralData.description"
                    ></p>
                  </div>
                </div>
                <div
                  class="col-md-6 col-sm-12 my-2 d-flex justify-content-start align-items-center"
                >
                  <img
                    src="@/assets/images/new-design/about/about.png"
                    alt="about-page"
                    class="about-page"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="stats text-cenrter" v-if="supplier_count || b2c_count || b2b_count">
          <div class="container">
            <div class="row">
              <div
                class="col-md-4 col-sm-12 my-3 d-flex flex-column justify-content-center align-items-center"
                v-if="supplier_count"
              >
                <p>
                  <font-awesome-icon icon="fa-solid fa-house" />
                </p>
                <p class="mt-2 p-title">{{ $t("home.suppliers") }}</p>
                <p class="stat-number px-0 mx-0">{{  supplier_count }} <span class="mx-0 px-0">+</span></p> 
              </div>
              <div
                class="col-md-4 col-sm-12 my-3 d-flex flex-column justify-content-center align-items-center"
                v-if="b2c_count"
              >
                <p>
                  <font-awesome-icon icon="fa-solid fa-users" />
                </p>
                <p class="mt-2 p-title">{{ $t("home.consumers") }}</p>
                <p class="stat-number px-0 mx-0">{{ b2c_count }} <span class="mx-0 px-0">+</span></p> 
              </div>
              <div
                class="col-md-4 col-sm-12 my-3 d-flex flex-column justify-content-center align-items-center"
                v-if="b2b_count"
              >
                <p>
                  <font-awesome-icon icon="fa-solid fa-shop" />
                </p>
                <p class="mt-2 p-title">{{ $t("home.b2bClients") }}</p>
                <p class="stat-number px-0 mx-0">{{ b2b_count }} <span class="mx-0 px-0">+</span></p> 
              </div>
            </div>
          </div>
        </section>
        <section class="supliers">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col">
                <h2 class="h1">{{ $t("home.ourSuppliers") }}</h2>
              </div>
              <div class="col d-flex justify-content-end">
                <router-link to="/suppliers">
                  <h4 class="text-dark">
                    <ins>{{ $t("cart.viewAll") }}</ins>
                  </h4>
                </router-link>
              </div>
            </div>
            <div class="all-suppliers">
              <AboutSuppliers />
            </div>
          </div>
        </section>
        <section>
          <NewAppsDownloadSec />
        </section>
        <section class="clients">
          <div class="container">
            <div class="row">
              <div class="col">
                <h2 class="h1">{{ $t("home.ourClients") }}</h2>
              </div>
              <div class="col d-flex justify-content-end">
                <router-link to="/clients">
                  <h4 class="text-dark">
                    <ins>{{ $t("cart.viewAll") }}</ins>
                  </h4>
                </router-link>
              </div>
            </div>
            <div class="all-suppliers">
              <AboutClients />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// about page
/**
 * @group About
 * This is a description of the component
 */
import profile from "@/services/profile";
import NewAppsDownloadSec from "@/components/pages/home/NewAppsDownloadSec.vue";

import AboutSuppliers from "@/components/pages/about/aboutSuppliers.vue";
import AboutClients from "@/components/pages/about/aboutClients.vue";
export default {
  mounted() {
    setTimeout(() => {
      this.loading = true;
      this.getAboutData();
    }, 50);
    // setTimeout(() => {
    //   this.getAboutVisionData();
    // }, 100);
    // setTimeout(() => {
    //   this.getAboutMessageData();
    // }, 150);
    // setTimeout(() => {
    //   this.getAboutPrincipleData();
    // }, 200);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    /**
     * @vuese
     * get About Data function when page load
     */
    getAboutData() {
      // get About Data function when page load
      profile
        .getAboutData()
        .then((res) => {
          this.aboutGeneralData = res.data.items;
        })
        .then(() => {
          profile.getAboutDataStats().then((res) => {
            console.log("res", res);
            this.b2b_count = res.data.items.b2b_count
            this.b2c_count = res.data.items.b2c_count
            this.supplier_count = res.data.items.supplier_count
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * get About Vision Data
     */
    getAboutVisionData() {
      // get About Vision Data
      profile
        .getAboutVisionData()
        .then((res) => {
          this.vision = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * get About Message Data
     */
    getAboutMessageData() {
      //get About Message Data
      profile
        .getAboutMessageData()
        .then((res) => {
          this.message = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * get About Principle Data
     */
    getAboutPrincipleData() {
      //get About Principle Data
      profile
        .getAboutPrincipleData()
        .then((res) => {
          this.principle = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      aboutGeneralData: null,
      vision: null,
      message: null,
      principle: null,
      loading: false,
      b2b_count:null,
      b2c_count:null,
      supplier_count:null,
    };
  },
  components: {
    NewAppsDownloadSec,
    AboutSuppliers,
    AboutClients,
  },
};
</script>
<style lang="scss" scoped>
.about {
  .about-title {
    padding: 40px 0;
    margin: 0;
  }
  .about-content {
    .about-content-one {
      background: #f5f5f5;
      color: #000;
      overflow: hidden;
      .image {
        height: 564px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .content {
        padding: 100px 0;
        .title {
          // padding: 30px 0 0 0;
          // color: $main-color;
          display: block;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          color: $main-color;
          margin-bottom: 10px;
          line-height: 1;
        }
        .body {
          padding: 19px 0;
        }
      }
    }
    .about-content-sec {
      .content {
        padding: 40px 0 30px 0;
      }
    }
    .about-content-third {
      padding-bottom: 45px;
      .content {
        // padding: 40px 0 30px 0;
        .img {
          // padding: 50px;
          // box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
          box-shadow: 0px 3px 3px 0px rgb(35 35 35 / 10%);
          margin-bottom: 25px;
        }
        .title {
          margin-bottom: 15px;
          padding-right: 0;
        }
        .body {
          font-weight: 500;
          color: #676565;
          margin-bottom: 18px;
          padding-right: 50px;
        }
      }
    }
    .about-content-four {
      padding-bottom: 100px;
      .content {
        text-align: center;
        padding: 55px 100px;
        // .title {
        // }
        // .body {
        // }
      }
    }

    /* 15. Newsletter */
    .mb-65 {
      margin-bottom: 65px;
    }
    .pb-100 {
      padding-bottom: 100px;
    }
    .newsletter-bg {
      text-align: center;
      background-position: center;
      background-size: cover;
      padding: 55px 100px 155px;
    }
    .newsletter-title .title {
      font-size: 20px;
      text-transform: uppercase;
      color: #fff;
      font-weight: 800;
      letter-spacing: 2px;
      margin-bottom: 13px;
    }
    .newsletter-title .sub-title {
      font-size: 13px;
      text-transform: uppercase;
      color: #fff;
      background: #373840;
      font-weight: 500;
      max-width: 355px;
      margin: 0 auto;
      padding: 8px 40px;
      position: relative;
    }
    .newsletter-title .sub-title::before,
    .newsletter-title .sub-title::after {
      content: "";
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: $main-color;
      border-radius: 50%;
    }
    .newsletter-title .sub-title::after {
      right: 15px;
      left: auto;
    }
    .newsletter-form {
      max-width: 620px;
      margin: 0 auto;
      position: relative;
    }
    .newsletter-form input {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 2px solid #fff;
      font-size: 14px;
      color: #fff;
      font-family: "Almarai", sans-serif;
      padding: 0 0 9px;
    }
    .newsletter-form input::placeholder {
      color: #fff;
      font-size: 14px;
    }
    .newsletter-form button {
      position: absolute;
      right: 0;
      border: none;
      background: transparent;
      color: #fff;
      padding: 0;
      top: 0;
      font-size: 16px;
      font-weight: 500;
      font-family: "Almarai", sans-serif;
      svg {
        transform: rotate(0deg);
      }
    }
    .newsletter-form button i {
      margin-left: 5px;
    }
    .newsletter-style-two .newsletter-title .title {
      color: $main-color;
    }
    .newsletter-style-two .newsletter-form input,
    .newsletter-style-two .newsletter-form input::placeholder,
    .newsletter-style-two .newsletter-form button {
      color: #373840;
    }
    .newsletter-style-two .newsletter-form input {
      border-bottom: 2px solid #5a5a5e;
    }
  }
}

.body {
  word-break: unset !important;
  text-align: initial;
}

// style arabic
html:lang(ar) {
  .newsletter-form input {
    text-align: left;
  }
}
.CUSTOM-SPINNER {
  min-height: 80vh;
}

.new-design {
  .page-title {
    font-weight: bold;
    font-size: 3rem !important;
    margin-bottom: 3rem;
    + p {
      width: 80%;
      line-height: 2;
    }
  }
  .p-title {
    font-size: 2rem !important;
  }
  img.about-page {
    width: 75%;
  }
  section.stats {
    padding: 5% 0;
    font-size: 3rem;
    background: $main-color;
    color: #fff;
  }
  .stat-number{
    margin-top: 10px;
  }
}
section {
  padding: 5% 0;
}
</style>
