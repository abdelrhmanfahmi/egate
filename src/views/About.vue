<template>
  <div class="about">
    <h2 class="about-title text-center">{{ $t("home.about") }}</h2>
    <div class="about-content">
      <!-- First Section -->
      <div class="about-content-one">
        <div class="row">
          <div class="col-md-6">
            <div class="image w-100">
              <img src="@/assets/images/ab.png" alt="" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="container">
              <div class="content">
                <h2 class="title">{{ $t("home.about") }}</h2>
                <p class="body">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                  exercitationem deserunt, ex officiis ducimus nesciunt autem
                  optio nisi atque quidem quo provident iure! <br />
                  <br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                  exercitationem deserunt, ex officiis ducimus nesciunt autem
                  optio nisi atque quidem quo provident iure! <br />
                  <br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                  exercitationem deserunt, ex officiis ducimus nesciunt autem
                  optio nisi atque quidem quo provident iure! <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Section -->
      <div class="about-content-sec">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="content">
                <div class="body text-center m-auto">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                    exercitationem deserunt, ex officiis ducimus nesciunt autem
                    optio nisi atque quidem quo provident iure! ex officiis
                    ducimus nesciunt autem optio nisi atque quidem quo provident
                    iure! ex officiis ducimus nesciunt autem optio nisi atque
                    quidem quo provident iure!
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                    exercitationem deserunt, ex officiis ducimus nesciunt autem
                    ex officiis ducimus nesciunt autem optio nisi atque quidem
                    quo provident iure! optio
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum ex officiis
                    ducimus nesciunt autem optio nisi atque quidem quo provident
                    iure!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Third Section -->
      <div class="about-content-third text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="content">
                <div class="img">
                  <img src="@/assets/images/vision.png" alt="" />
                </div>
                <h3 class="title">{{ $t("home.vision") }}</h3>
                <div class="body">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="content">
                <div class="img">
                  <img src="@/assets/images/mission.png" alt="" />
                </div>
                <h3 class="title">{{ $t("home.message") }}</h3>
                <div class="body">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="content">
                <div class="img">
                  <img src="@/assets/images/values.png" alt="" />
                </div>
                <h3 class="title">{{ $t("home.myPrinciples") }}</h3>
                <div class="body">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- news letter Section -->
      <div class="newsletter-bg newsletter-style-two pb-100">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="newsletter-title mb-65">
                <h2 class="title">{{ $t("home.registerForTheNewsletter") }}</h2>
                <h6 class="sub-title">
                 {{ $t("home.beTheFirstToGetExclusiveOffersAndCoupons") }}
                </h6>
              </div>
              <form action="#" class="newsletter-form">
                <input type="email" :placeholder='$t("home.email")' />
                <button>
                  <span>{{ $t("home.subscribe") }}</span>
                  <font-awesome-icon class="mx-2" icon="fa-solid fa-circle-arrow-right" />
                  <i class="far fa-arrow-alt-circle-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  mounted() {
    this.getAllCountires();
  },
  methods: {
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
        .title {
        }
        .body {
        }
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
      svg{
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

// style arabic
html:lang(ar) {
     .newsletter-form input {
     text-align: left;
    }

}

</style>
