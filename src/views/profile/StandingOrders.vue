<template>
  <div class="standing-orders">
    <div class="row">
      <div class="col-md-3 col-sm-12" v-for="(x, index) in 20" :key="index">
        <router-link :to="{ path: '/StandingOrder', query: { id: x } }">
          <div class="b-box">
            <!-- <div class="icon"></div> -->
            <h4 class="title">
              <span>{{x}} - Maruszczak</span>
              <small>11 item(s)</small>
            </h4>
            <!-- <a href="#"></a> -->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.standing-orders {

  .b-box {
    margin-bottom: 10px;
    // width: 180px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 20px;
    padding: 3rem 1rem 2rem;
    position: relative;
    border-radius: 6px;
    perspective: 600px;
    perspective-origin: center bottom;
    transition: 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 6px;
      z-index: -1px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0), 0 4px 4px rgba(0, 0, 0, 0), 0 8px 8px rgba(0, 0, 0, 0), 0 16px 16px rgba(0, 0, 0, 0), 0 32px 32px rgba(0, 0, 0, 0), 0 64px 64px rgba(0, 0, 0, 0), 0 128px 128px rgba(0, 0, 0, 0);
      transition: 0.7s ease;
      opacity: 0;
      pointer-events: none;
    }

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      height: 100%;
      background: #f3f4f7;
      transition: transform 2.55s cubic-bezier(0.18, 0.79, 0.25, 1) 0s, opacity 0.2s ease 0s;
      opacity: 0;
      transform-style: preserve-3d;
      border-radius: 6px;
      z-index: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 0.7) rotateX(-20deg) translate3d(0, 30px, -85px);
      pointer-events: none;
    }

    a {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
    }

    .icon {
      height: 60px;
      margin: 0 auto 1.5rem;
      position: relative;
      z-index: 2;
      transition: 0.3s ease;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: #eee;
        border-radius: 50%;
        transition: 0.2s;
      }
    }

    .title {
      position: relative;
      z-index: 2;
      text-align: center;
      margin-bottom: 0;
      color: #555;
      line-height: 1.6;

      span {
        display: block;
        transition: transform 0.45s ease 0.2s, color 0.1s ease 0s;
      }

      small {
        display: block;
        opacity: 0.6;
        font-weight: normal;
        font-size: 0.7em;
        transition: transform 0.35s ease 0.1s, color 0.1s ease 0s;
      }
    }

    &:hover {
      transform: scale(1.08);

      &:after {
        box-shadow: 0 2px 2px rgba(50, 55, 60, 0.05), 0 4px 4px rgba(50, 55, 60, 0.05), 0 8px 8px rgba(50, 55, 60, 0.05), 0 16px 16px rgba(50, 55, 60, 0.05), 0 32px 32px rgba(50, 55, 60, 0.0375), 0 64px 64px rgba(50, 55, 60, 0.025), 0 128px 128px rgba(50, 55, 60, 0.025);
        opacity: 1;
      }

      &:before {
        transition: transform 0.45s cubic-bezier(0.18, 0.79, 0.25, 1) 0s, opacity 0.35s ease 0s;
        transform: scale(1, 1) rotateX(0deg) translate3d(0, 0, 0);
        opacity: 1;
      }

      .icon {
        transform: translateY(-10px) scale(1.12);

        &:after {
          background: #ddd;
        }
      }

      .title {
        color: #0f6eca;

        span {
          transform: translateY(-6px);
        }

        small {
          transform: translateY(-10px);
        }
      }
    }
  }
}
</style>
