<template>
  <div class="about">
    <h3 class="about-title text-center">About</h3>
    <div class="about-content">
      <!-- First Section -->
      <div class="about-content-one">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="image">
                <img src="https://picsum.photos/600/400" alt="" srcset="" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="content">
                <div class="title">About</div>
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
                <div class="body text-center w-75 m-auto">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                    exercitationem deserunt, ex officiis ducimus nesciunt autem
                    optio nisi atque quidem quo provident iure!
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum, adipisci sint
                    exercitationem deserunt, ex officiis ducimus nesciunt autem
                    optio
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, neque. Ullam, assumenda accusamus harum
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
                  <img src="https://picsum.photos/150/150" />
                </div>
                <h6 class="title">Vision</h6>
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
                  <img src="https://picsum.photos/150/150" />
                </div>
                <h6 class="title">Vision</h6>
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
                  <img src="https://picsum.photos/150/150" />
                </div>
                <h6 class="title">Vision</h6>
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
      <!-- four Section -->
      <div class="about-content-four text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="content">
                <h6 class="title">Subscribe</h6>
                <h6 class="sub-title">Subscribe</h6>
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
    padding: 20px 0;
  }
  .about-content {
    .about-content-one {
      background: #cccccc6b;
      color: #000;
      .content {
        .title {
          padding: 30px 0 0 0;
          color: #ed2124;
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
      .content {
        // padding: 40px 0 30px 0;
        .img {
          padding: 50px;
          box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 20%);
        }
        .title {
          padding: 15px 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
