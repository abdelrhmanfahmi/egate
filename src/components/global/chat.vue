<template>
  <div class="layout chat-holder">
    <!-- popup chat  -->
    <SocialChat icon :attendants="attendants" class="whatsapp-chat">
      <div slot="header" class="haeder">
        <div class="header-chat">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-2 col-sm-12mb-3 img-col">
              <div class="logo-holder">
                <img src="@/assets/images/logo.png" alt="logo" />
              </div>
            </div>
            <div class="col-md-10 col-sm-12">
              <h5 class="font-weight-bold">
                {{ $t("home.siteName") }}
              </h5>
              <small class="font-italic">
                {{ $t("home.siteSupport") }}
              </small>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:button>
        <img
          src="https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons/whatsapp.svg"
          alt="icon whatsapp"
          aria-hidden="true"
        />
      </template>
      <template v-slot:body>
        <div class="home-chat"></div>
        <div class="start-chat">
          <div
            pattern="https://elfsight.com/assets/chats/patterns/whatsapp.png"
            class="WhatsappChat__Component-sc-1wqac52-0 whatsapp-chat-body"
          >
            <div class="WhatsappChat__MessageContainer-sc-1wqac52-1 dAbFpq">
              <div
                style="opacity: 0"
                class="WhatsappDots__Component-pks5bf-0 eJJEeC"
              >
                <div class="WhatsappDots__ComponentInner-pks5bf-1 hFENyl">
                  <div
                    class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotOne-pks5bf-3 ixsrax"
                  ></div>
                  <div
                    class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotTwo-pks5bf-4 dRvxoz"
                  ></div>
                  <div
                    class="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotThree-pks5bf-5 kXBtNt"
                  ></div>
                </div>
              </div>
              <div
                style="opacity: 1"
                class="WhatsappChat__Message-sc-1wqac52-4 kAZgZq"
              >
                <div class="WhatsappChat__Author-sc-1wqac52-3 bMIBDo">
                  HumHumm
                </div>
                <div class="WhatsappChat__Text-sc-1wqac52-2 iSpIQi">
                  <span>{{ $t("home.hiThere") }} 👋 </span> <br /><br /><span>{{
                    $t("home.helpYou")
                  }}</span>
                </div>
                <div class="WhatsappChat__Time-sc-1wqac52-5 cqCDVm">1:40</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div slot="footer">
        <div class="">
          <div class="button-holder" v-if="whatsapp">
            <a
              :href="whatsapp.value"
              target="_blank"
              class="d-flex justify-content-center align-items-center text-white"
              v-if="whatsapp.value"
            >
              <span class="mx-2">
                <img
                  src="https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons/whatsapp.svg"
                  alt="whatsapp-img"
                />
              </span>
              <h6>{{ $t("home.startCaht") }}</h6>
            </a>
          </div>
        </div>
      </div>
    </SocialChat>
  </div>
</template>

<script>

//chat component 
/**
 * import SocialChat
 */

import { SocialChat } from "vue-social-chat";
export default {
  components: {
    SocialChat,
  },
  data: () => ({
    /**
     *  SocialChat data
     */
    attendants: [
      {
        app: "whatsapp",
        label: "Contact",
        name: "Hum Hum",
        // number: "5581983383532",
        avatar: {
          src: "@/assets/images/logo.png",
          alt: "Website logo",
        },
      },
      // ...
    ],
  }),
  props:{
    // whatsapp prop 
    whatsapp:{
      type:Object,
      required:false
    }
  },
};
</script>

<style lang="scss" scoped>
/**
    * page style
  */
.haeder {
  min-width: 300px;
  text-align: center;
}
.logo-holder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  padding: 10px;
}
.chat-holder {
  a:link,
  a:visited {
    color: #444;
    text-decoration: none;
    transition: all 0.4s ease-in-out;
  }
  h1 {
    font-size: 20px;
    text-align: center;
    display: block;
    background: linear-gradient(to right top, #6f96f3, #164ed2);
    padding: 20px;
    color: #fff;
    border-radius: 50px;
  }

  /* CSS Multiple Whatsapp Chat */
  .whatsapp-name {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 0;
    margin-bottom: 0;
    line-height: 0.5;
  }

  #whatsapp-chat {
    box-sizing: border-box !important;

    outline: none !important;
    position: fixed;
    width: 350px;
    border-radius: 10px;
    box-shadow: 0 1px 15px rgba(32, 33, 36, 0.28);
    bottom: 90px;
    right: 30px;
    overflow: hidden;
    z-index: 99;
    animation-name: showchat;
    animation-duration: 1s;
    transform: scale(1);
  }
  a.blantershow-chat {
    /*   background: #009688; */
    background: #fff;
    color: #404040;
    position: fixed;
    display: flex;
    font-weight: 400;
    justify-content: space-between;
    z-index: 98;
    bottom: 25px;
    right: 30px;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 30px;
    box-shadow: 0 1px 15px rgba(32, 33, 36, 0.28);
  }
  a.blantershow-chat svg {
    transform: scale(1.2);
    margin: 0 10px 0 0;
  }
  .header-chat {
    /*   background: linear-gradient(to right top, #6f96f3, #164ed2); */
    background: #009688;
    background: #095e54;
    color: #fff;
    padding: 15px 0px;
  }
  .header-chat h3 {
    margin: 0 0 10px;
  }
  .header-chat p {
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
  }
  .info-avatar {
    position: relative;
  }
  .info-avatar img {
    border-radius: 100%;
    width: 50px;
    float: left;
    margin: 0 10px 0 0;
  }

  a.informasi {
    padding: 20px;
    display: block;
    overflow: hidden;
    animation-name: showhide;
    animation-duration: 0.5s;
  }
  a.informasi:hover {
    background: #f1f1f1;
  }
  .info-chat span {
    display: block;
  }
  #get-label,
  span.chat-label {
    font-size: 12px;
    color: #888;
  }
  #get-nama,
  span.chat-nama {
    margin: 5px 0 0;
    font-size: 15px;
    font-weight: 700;
    color: #222;
  }
  #get-label,
  #get-nama {
    color: #fff;
  }
  span.my-number {
    display: none;
  }
  /* .blanter-msg {
  color: #444;
  padding: 20px;
  font-size: 12.5px;
  text-align: center;
  border-top: 1px solid #ddd;
} */
  textarea#chat-input {
    border: none;
    font-family: "Arial", sans-serif;
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    padding: 10px;
    font-size: 14px;
  }

  a#send-it {
    width: 30px;
    font-weight: 700;
    padding: 10px 10px 0;
    background: #eee;
    border-radius: 10px;

    svg {
      fill: #a6a6a6;
      height: 24px;
      width: 24px;
    }
  }

  .first-msg {
    background: transparent;
    padding: 30px;
    text-align: center;
    & span {
      background: #e2e2e2;
      color: #333;
      font-size: 14.2px;
      line-height: 1.7;
      border-radius: 10px;
      padding: 15px 20px;
      display: inline-block;
    }
  }

  .start-chat .blanter-msg {
    display: flex;
    min-height: 50px;
  }
  #get-number {
    display: none;
  }
  a.close-chat {
    position: absolute;
    top: 5px;
    right: 15px;
    color: #fff;
    font-size: 30px;
  }

  @keyframes ZpjSY {
    0% {
      background-color: rgb(182, 181, 186);
    }
    15% {
      background-color: rgb(17, 17, 17);
    }
    25% {
      background-color: rgb(182, 181, 186);
    }
  }

  @keyframes hPhMsj {
    15% {
      background-color: rgb(182, 181, 186);
    }
    25% {
      background-color: rgb(17, 17, 17);
    }
    35% {
      background-color: rgb(182, 181, 186);
    }
  }

  @keyframes iUMejp {
    25% {
      background-color: rgb(182, 181, 186);
    }
    35% {
      background-color: rgb(17, 17, 17);
    }
    45% {
      background-color: rgb(182, 181, 186);
    }
  }

  @keyframes showhide {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
  }
  @keyframes showchat {
    from {
      transform: scale(0);
      opacity: 0;
    }
  }
  @media screen and (max-width: 480px) {
    #whatsapp-chat {
      width: auto;
      left: 5%;
      right: 5%;
      font-size: 80%;
    }
  }
  .hide {
    display: none;
    animation-name: showhide;
    animation-duration: 0.5s;
    transform: scale(1);
    opacity: 1;
  }
  .show {
    display: block;
    animation-name: showhide;
    animation-duration: 0.5s;
    transform: scale(1);
    opacity: 1;
  }

  .whatsapp-message-container {
    display: flex;
    z-index: 1;
  }

  .whatsapp-message {
    padding: 7px 14px 6px;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 8px 8px;
    position: relative;
    transition: all 0.3s ease 0s;
    opacity: 0;
    transform-origin: center top 0px;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px;
    margin-top: 4px;
    margin-left: -54px;
    max-width: calc(100% - 66px);
  }

  .whatsapp-chat-body {
    padding: 20px 20px 20px 10px;
    background-color: rgb(230, 221, 212);
    position: relative;
    &::before {
      display: block;
      position: absolute;
      content: "";
      left: 0px;
      top: 0px;
      height: 100%;
      width: 100%;
      z-index: 0;
      opacity: 0.08;
      background-image: url("https://elfsight.com/assets/chats/patterns/whatsapp.png");
      // background-image: url(https://res.cloudinary.com/eventbree/image/upload/v1575782560/Widgets/whatsappbg_opt.jpg);
    }
  }

  .dAbFpq {
    display: flex;
    z-index: 1;
  }

  .eJJEeC {
    background-color: rgb(255, 255, 255);
    width: 52.5px;
    height: 32px;
    border-radius: 16px;
    display: flex;
    -moz-box-pack: center;
    justify-content: center;
    -moz-box-align: center;
    align-items: center;
    margin-left: 10px;
    opacity: 0;
    transition: all 0.1s ease 0s;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px;
  }

  .hFENyl {
    position: relative;
    display: flex;
  }

  .ixsrax {
    height: 5px;
    width: 5px;
    margin: 0px 2px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    top: 0px;
    background-color: rgb(158, 157, 162);
    animation-name: ZpjSY;
  }

  .dRvxoz {
    height: 5px;
    width: 5px;
    margin: 0px 2px;
    background-color: rgb(182, 181, 186);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    top: 0px;
    animation-name: hPhMsj;
  }

  .kAZgZq {
    padding: 7px 14px 6px;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 8px 8px;
    position: relative;
    transition: all 0.3s ease 0s;
    opacity: 0;
    transform-origin: center top 0px;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px;
    margin-top: 4px;
    margin-left: -54px;
    max-width: calc(100% - 66px);
    &::before {
      position: absolute;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAmCAMAAADp2asXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUxpccPDw9ra2m9vbwAAAAAAADExMf///wAAABoaGk9PT7q6uqurqwsLCycnJz4+PtDQ0JycnIyMjPf3915eXvz8/E9PT/39/RMTE4CAgAAAAJqamv////////r6+u/v7yUlJeXl5f///5ycnOXl5XNzc/Hx8f///xUVFf///+zs7P///+bm5gAAAM7Ozv///2fVensAAAAvdFJOUwCow1cBCCnqAhNAnY0WIDW2f2/hSeo99g1lBYT87vDXG8/6d8oL4sgM5szrkgl660OiZwAAAHRJREFUKM/ty7cSggAABNFVUQFzwizmjPz/39k4YuFWtm55bw7eHR6ny63+alnswT3/rIDzUSC7CrAziPYCJCsB+gbVkgDtVIDh+DsE9OTBpCtAbSBAZSEQNgWIygJ0RgJMDWYNAdYbAeKtAHODlkHIv997AkLqIVOXVU84AAAAAElFTkSuQmCC");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
      content: "";
      top: 0px;
      left: -12px;
      width: 12px;
      height: 19px;
    }
  }

  .bMIBDo {
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.4);
  }

  .iSpIQi {
    font-size: 14px;
    line-height: 19px;
    margin-top: 4px;
    color: rgb(17, 17, 17);
  }

  .iSpIQi {
    font-size: 14px;
    line-height: 19px;
    margin-top: 4px;
    color: rgb(17, 17, 17);
  }

  .cqCDVm {
    text-align: right;
    margin-top: 4px;
    font-size: 12px;
    line-height: 16px;
    color: rgba(17, 17, 17, 0.5);
    margin-right: -8px;
    margin-bottom: -4px;
  }
}
.button-holder {
  background: #46c056;
  color: #fff;
  width: 80%;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  padding: 5px;
}
.img-col {
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
