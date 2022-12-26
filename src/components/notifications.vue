<template>
  <!-- notifications popup that in navbar  -->
  <div class="notifications notifications-content">
    <!-- if there is notifications  -->
    <div class="" v-if="notificationsLength > 0">
      <div class="notification-ui_dd-content">
        <div
          class="readAllNotifications px-4 d-flex justify-content-end align-items-center"
        >
          <button
            @click="readAllNotifications"
            class="btn-light border-0 btn-outline-none bg-white"
          >
            <span class="font-weight-bold mr-2">{{
              $t("profile.readAllNotifications")
            }}</span>
            <font-awesome-icon icon="fa-solid fa-rotate" />
          </button>
        </div>
        <!-- take 5 only of notifications in popup for responsive  -->
        <div
          class="notification-list"
          v-for="(notification, index) in notifications.slice(0, 5)"
          :key="index"
          :class="{
            readed: notification.is_read == 1,
            unreaded: notification.is_read == 0,
          }"
        >
          <div class="row">
            <div class="col-md-2 col-sm-12">
              <div
                class="notification-list_feature-img"
                v-if="notification.status_type === 'success'"
              >
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="text-success"
                  size="2x"
                />
              </div>
            </div>
            <div class="col-md-10 col-sm-12">
              <div
                class="notification-list_detail"
                @click="goNotificationPage(notification)"
              >
                <h6 class="notification-title">
                  <b>{{ notification.title }}</b>
                </h6>
                <p v-if="notification.body" class="">
                  <small>{{ notification.body }}</small>
                </p>
              </div>
              <span v-if="notification.created_at">{{
                notification.created_at | timeDefer(notification.created_at)
              }}</span>
            </div>
            <span class="ml-auto" v-if="notification.is_read == 0">
              <b class="text-success">
                <button
                  class="btn text-success m-0"
                  @click="readNotification(notification)"
                >
                  <small>{{ $t("profile.markRead") }}</small>
                </button>
              </b>
            </span>
          </div>
        </div>
      </div>
      <div class="notification-ui_dd-footer">
        <router-link
          to="/profile/Notifications"
          class="btn btn-success btn-block"
          >{{ $t("cart.viewAll") }}</router-link
        >
      </div>
    </div>

    <!-- if no notitications  -->

    <div class="" v-else>
      <div class="d-flex justify-content-center align-content-center">
        <h6 class="m-0">{{ $t("profile.noNotifications") }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import profile from "@/services/profile";
export default {
  /**
   * @vuese
   *  pass product data as prop
   */
  props: {
    notifications: {
      // notifications prop
      type: Array,
      required: false,
    },
  },
  computed: {
    /**
     * @vuese
     *  get notifications Length from store
     */
    notificationsLength() {
      return this.$store.state.notificationsLength;
    },
  },
  methods: {
    /**
     * @vuese
     *  check current time
     */
    myTimeNow(date1) {
      if (date1) {
        var c_date = moment(String(date1)).format("DD-MM-YYYY");

        var timeNow = Date();

        var now = moment(String(timeNow)).format("DD-MM-YYYY");

        var diff = now - c_date;

        return diff;
      }
    },
    /**
     * @vuese
     *  read single notification
     */
    readNotification(notification) {
      profile
        .readNotification(notification)
        .then((res) => {
          if (res.status == 200) {
            this.$store.dispatch("getNotifications");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     *  go to notification data in notifications page
     */
    goNotificationPage(notification) {
      if (notification.type === "return_item") {
        this.$router.push({
          path: "/ReturnedRequest",
          query: {
            UUID: notification.type_id,
          },
        });
      } else if (notification.type === "order") {
        this.$router.push({
          path: "/viewOrderDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "RFQ") {
        this.$router.push({
          path: "/quotationDetails",
          query: {
            id: notification.itype_idd,
          },
        });
      } else if (notification.type === "chat") {
        this.$router.push({
          path: "/viewCorresponseDetails",
          query: {
            id: notification.type_id,
          },
        });
      }
    },
    /**
     * @vuese
     *  read all notifications
     */
    readAllNotifications() {
      profile
        .readAllNotifications()
        .then((res) => {
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
};
</script>

<style lang="scss" scoped>
/**
  *  component style
*/
.notifications {
  position: relative;
  right: 0;
  background: #fff;
  opacity: 0;
  padding: 1rem 0;
  position: absolute;
  top: 2rem;
  transition: all 0.5s ease 0s;
  z-index: 9;
  box-shadow: 0px 12px 24px 0px rgb(120 120 120 / 30%);
  visibility: hidden;
  transform: translateY(10px);
  width: 23rem;

  .notification-ui a:after {
    display: none;
  }

  .notification-ui_icon {
    position: relative;
  }

  .notification-ui_icon .unread-notification {
    display: inline-block;
    height: 7px;
    width: 7px;
    border-radius: 7px;
    background-color: #66bb6a;
    position: absolute;
    top: 7px;
    left: 12px;
  }

  @media (min-width: 900px) {
    .notification-ui_icon .unread-notification {
      left: 20px;
    }
  }

  .notification-ui_dd {
    padding: 0;
    border-radius: 10px;
    -webkit-box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.16);
    box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.16);
    border: 0;
    max-width: 400px;
  }

  @media (min-width: 900px) {
    .notification-ui_dd {
      min-width: 400px;
      position: absolute;
      left: -192px;
      top: 70px;
    }
  }

  .notification-ui_dd:after {
    content: "";
    position: absolute;
    top: -30px;
    left: calc(50% - 7px);
    border-top: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
    border-left: 15px solid transparent;
  }

  .notification-ui_dd .notification-ui_dd-header {
    border-bottom: 1px solid #ddd;
    padding: 15px;
  }

  .notification-ui_dd .notification-ui_dd-header h3 {
    margin-bottom: 0;
  }

  .notification-list {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 20px 10px;
    margin: 0 25px;
    border-bottom: 1px solid #ddd;
  }
  .readed {
    background: #fff;
  }
  .unreaded {
    background: #f4f4f4;
  }

  .notification-list--unread {
    position: relative;
  }

  .notification-list--unread:before {
    content: "";
    position: absolute;
    top: 0;
    left: -25px;
    height: calc(100% + 1px);
    border-left: 2px solid #29b6f6;
  }

  .notification-list .notification-list_img img {
    height: 48px;
    width: 48px;
    border-radius: 50px;
  }

  .notification-list .notification-list_detail p {
    margin-bottom: 5px;
    line-height: 1.2;
    cursor: pointer;
  }

  .notification-list .notification-list_feature-img img {
    height: 48px;
    width: 48px;
    border-radius: 5px;
    position: relative;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 5px;
      background: $main_color;
      border-radius: 50%;
    }
  }
  .notification-ui_dd-footer {
    margin-top: 20px;
    padding: 0 1rem;
  }
  .notification-ui_dd-content {
    height: 360px;
    overflow-y: scroll;
  }
}
.btn:focus,
.btn.focus {
  box-shadow: none !important;
}
.notification-title,
.notification-body {
  cursor: pointer;
}
</style>
