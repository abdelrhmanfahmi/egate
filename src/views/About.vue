<template>
  <!-- about page  -->
  <div class="about">
    <div
      class="d-flex justify-content-center align-items-center CUSTOM-SPINNER"
      v-if="loading"
    >
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>
    <div class="" v-else>
      <h2 class="about-title text-center">{{ $t("home.about") }}</h2>
      <div class="about-content">
        <!-- First Section -->
        <div class="about-content-one">
          <div class="row">
            <!-- about page banner  -->
            <div class="col-md-6">
              <div class="image w-100">
                <img src="@/assets/images/ab.png" alt="" />
              </div>
            </div>
            <!-- about page descriptions  -->
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
        <!-- Third Section -->
        <div class="about-content-third text-center">
          <div class="container">
            <div class="row">
              <!-- vision  -->
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
              <!-- Message  -->
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
              <!-- Our principles -->
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
      </div>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";

export default {
  mounted() {
    setTimeout(() => {
      this.loading = true;
      this.getAboutData();
    }, 50);
    setTimeout(() => {
      this.getAboutVisionData();
    }, 100);
    setTimeout(() => {
      this.getAboutMessageData();
    }, 150);
    setTimeout(() => {
      this.getAboutPrincipleData();
    }, 200);
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
    };
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
          // color: #ed2124;
          display: block;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          color: #ed2124;
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
      background: #ed2124;
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
      color: #ed2124;
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
</style>
