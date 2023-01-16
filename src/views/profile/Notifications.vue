<template>
  <!-- notifications page  -->
  <div class="notifications">
    <div class="">
      <div class="text-center">
        <h1>
          {{ $t("profile.Notifications") }}
        </h1>
      </div>
      <div
        class="readAllNotifications px-4 d-flex justify-content-end align-items-center"
      >
        <button
          @click="readAllNotifications"
          class="btn-light border-0 btn-outline-none"
        >
          <span class="font-weight-bold mr-2">{{
            $t("profile.readAllNotifications")
          }}</span>
          <font-awesome-icon icon="fa-solid fa-rotate" />
        </button>
      </div>
      <div
        class="row data-holder"
        v-for="(notify, index) in notifications"
        :key="index"
      >
        <div class="col-12">
          <div class="new-message-box">
            <div
              class="new-message-box-warning"
              :class="{
                'new-message-box-warning': notify.status_type === 'warning',
                'new-message-box-success': notify.status_type === 'success',
              }"
            >
              <div
                :class="{
                  'info-tab tip-icon-warning': notify.status_type === 'warning',
                  'info-tab tip-icon-success': notify.status_type === 'success',
                }"
                title="error"
              >
                <i></i>
              </div>
              <div
                :class="{
                  'tip-box-warning': notify.status_type === 'warning',
                  'tip-box-success': notify.status_type === 'success',
                  unread: notify.is_read == 0,
                  readed: notify.is_read == 1,
                }"
              >
                <div>
                  <div class="row justify-content-between">
                    <div class="col-12">
                      <p>{{ notify.title }}</p>
                    </div>
                  </div>
                  <div
                    to=""
                    class="btn btn-sm"
                    @click="goNotificationPage(notify)"
                  >
                    <h5>
                      <b>{{ notify.body }}</b>
                    </h5>
                  </div>
                </div>
                <div class="row justify-content-around align-items-center">
                  <div class="col-6">
                    <span
                      ><i>{{
                        notify.created_at | timeDefer(notify.created_at)
                      }}</i></span
                    >
                  </div>
                  <div
                    class="col-6"
                    :class="{
                      'text-right': $i18n.locale == 'en',
                      'text-left': $i18n.locale == 'ar',
                    }"
                  >
                    <span v-if="notify.is_read == 0">
                      <b class="text-success">
                        <button
                          class="btn text-success m-0"
                          @click="readNotification(notify)"
                        >
                          <b class="text-capitalize">{{
                            $t("profile.markRead")
                          }}</b>
                        </button>
                      </b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-5">
      <Paginate
        v-if="notifications"
        :total-pages="totalPages"
        :per-page="totalPages"
        :current-page="page"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * Notificatinos page
 * @displayName Notificatinos page
 */
import Paginate from "@/components/global/Paginate.vue";
import profile from "@/services/profile";
export default {
  components: {
    Paginate,
  },
  methods: {
    /**
     * get Notificatinos function
     * @vuese
     */
    getNotificatinos() {
      profile
        .getNotificatinos(this.page)
        .then((resp) => {
          console.log(resp);
          this.notifications = resp.data.items.notifications.data;

          this.total = resp.data.items.notifications.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.notifications.meta.total /
              resp.data.items.notifications.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.notifications.meta.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getNotificatinos();
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getNotificatinos();
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getNotificatinos();
      }
    },
    /**
     * read Notification function
     * @vuese
     */
    readNotification(notification) {
      profile
        .readNotification(notification)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$store.dispatch("getNotifications");
            this.getNotificatinos();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * go to Notification Page function
     * @vuese
     */
    goNotificationPage(notification) {
      if (notification.type === "return_item") {
        this.readNotification(notification)
        this.$router.push({
          path: "/ReturnedRequest",
          query: {
            UUID: notification.type_id,
          },
        });
      } else if (notification.type === "order") {
        this.readNotification(notification)
        this.$router.push({
          path: "/viewOrderDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "RFQ") {
        this.readNotification(notification)
        this.$router.push({
          path: "/profile/quotationDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "chat") {
        this.readNotification(notification)
        this.$router.push({
          path: "/viewCorresponseDetails",
          query: {
            id: notification.type_id,
          },
        });
      }
    },
    /**
     * read All Notifications function
     * @vuese
     */
    readAllNotifications() {
      profile
        .readAllNotifications()
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$store.dispatch("getNotifications");
            this.getNotificatinos();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (this.buyerUserData) {
      this.getNotificatinos();
    }
  },
  data() {
    return {
      notifications: [],
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.notifications {
  /*==================================================
=            Bootstrap 3 Media Queries             =
==================================================*/

  /*==========  Mobile First Method  ==========*/

  /* Custom, iPhone Retina */
  @media only screen and (min-width: 320px) {
  }

  /* Extra Small Devices, Phones */
  @media only screen and (min-width: 480px) {
  }

  /* Small Devices, Tablets */
  @media only screen and (min-width: 768px) {
  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width: 992px) {
  }

  /* Large Devices, Wide Screens */
  @media only screen and (min-width: 1200px) {
  }

  /*==========  Non-Mobile First Method  ==========*/

  /* Large Devices, Wide Screens */
  @media only screen and (max-width: 1200px) {
  }

  /* Medium Devices, Desktops */
  @media only screen and (max-width: 992px) {
  }

  /* Small Devices, Tablets */
  @media only screen and (max-width: 768px) {
  }

  /* Extra Small Devices, Phones */
  @media only screen and (max-width: 480px) {
  }

  /* Custom, iPhone Retina */
  @media only screen and (max-width: 320px) {
  }

  /*=====================================================
=            Bootstrap 2.3.2 Media Queries            =
=====================================================*/
  @media only screen and (max-width: 1200px) {
  }

  @media only screen and (max-width: 979px) {
  }

  @media only screen and (max-width: 767px) {
  }

  @media only screen and (max-width: 480px) {
  }

  @media only screen and (max-width: 320px) {
  }

  /* default styles here for older browsers. 
       I tend to go for a 600px - 960px width max but using percentages
    */
  @media only screen and (min-width: 960px) {
    /* styles for browsers larger than 960px; */
  }

  @media only screen and (min-width: 1440px) {
    /* styles for browsers larger than 1440px; */
  }

  @media only screen and (min-width: 2000px) {
    /* for sumo sized (mac) screens */
  }

  @media only screen and (max-device-width: 480px) {
    /* styles for mobile browsers smaller than 480px; (iPhone) */
  }

  @media only screen and (device-width: 768px) {
    /* default iPad screens */
  }

  /* different techniques for iPad screening */
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    /* For portrait layouts only */
  }

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: landscape) {
    /* For landscape layouts only */
  }

  /*******Nuevos mensajes de error******/

  .new-message-box {
    margin: 15px 0;
    padding-left: 20px;
    margin-bottom: 25px !important;
  }

  .new-message-box p {
    font-size: 1.15em;
    font-weight: 600;
  }

  .info-tab {
    width: 40px;
    height: 40px;
    display: inline-block;
    position: relative;
    top: 8px;
  }

  .info-tab {
    float: left;
    margin-left: -23px;
  }

  .info-tab i::before {
    width: 24px;
    height: 24px;
    box-shadow: inset 12px 0 13px rgba(0, 0, 0, 0.5);
  }

  .info-tab i::after {
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    bottom: -18px;
  }

  .info-tab i::before,
  .info-tab i::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: -17px;
    transform: rotateX(60deg);
  }

  .note-box,
  .warning-box,
  .tip-box-success,
  .tip-box-danger,
  .tip-box-warning,
  .tip-box-info,
  .tip-box-alert {
    padding: 12px 8px 3px 26px;
  }

  /***Success****/

  .new-message-box-success {
    background: #eeeeee;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-icon-success {
    background: #8bc34a; //500
  }

  .tip-box-success {
    color: #33691e; //900
    background: #dcedc8; //100
  }

  .tip-icon-success::before {
    font-size: 25px;
    content: "\f00c";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-success i::before {
    background: #8bc34a; //500
  }

  /*******Danger*******/
  .new-message-box-danger {
    background: #eeeeee;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-icon-danger {
    background: #f44336; //500
  }

  .tip-box-danger {
    color: #b71c1c; //900
    background: #ffccbc; //100
  }

  .tip-icon-danger::before {
    font-size: 25px;
    content: "\f00d";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-danger i::before {
    background: #f44336; //500
  }

  /*******warning*******/
  .new-message-box-warning {
    background: #eeeeee;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-icon-warning {
    background: #ffeb3b; //500
  }

  .tip-box-warning {
    color: #212121; //900
    background: #fff9c4; //100
  }

  .tip-icon-warning::before {
    font-size: 25px;
    content: "\f071";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: #212121;
  }

  .tip-icon-warning i::before {
    background: #ffeb3b; //500
  }

  /*******info*******/
  .new-message-box-info {
    background: #eeeeee;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-box-info {
    color: #01579b; //900
    background: #b3e5fc; //100
  }

  .tip-icon-info {
    background: #03a9f4; //500
  }

  .tip-icon-info::before {
    font-size: 25px;
    content: "\f129";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-info i::before {
    background: #03a9f4; //500
  }

  /*******info*******/
  .new-message-box-alert {
    background: #ff6f00;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-box-alert {
    color: #212121; //900
    background: #fff8e1; //100
  }

  .tip-icon-alert {
    background: #ff6f00; //500
  }

  .tip-icon-alert::before {
    font-size: 25px;
    content: "\f06a";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-alert i::before {
    background: #ff6f00; //500
  }

  /*************************/

  body {
    background-color: #ffffff;
  }

  .data-holder {
    width: 100%;
    margin: auto;
  }
}

.btn:focus,
.btn.focus {
  box-shadow: none !important;
}

.readed {
  background: #f4f4f4 !important;
}

.unreaded {
  background: #8bc34a !important;
}
</style>
