<template>
  <!-- notifications page  -->
  <div class="notifications">
    <div class="new-style">
      <div class="">
        <h3 class="mb-4">{{ $t("profile.Notifications") }} ({{ total }})</h3>
        <div class="row justify-content-between align-items-center mb-3">
          <div class="col-md-6 col-sm-12 ">
            <div class="">


              <div class="my-2">
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="d-flex justify-content-start align-items-center">
                      <span>
                        <input type="checkbox" class="myproject--checkbox" v-model="checkAll" />
                      </span>
                      <h5 class="mx-2">{{ $t('profile.selectAll') }}</h5>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="d-flex align-items-start mx-4 bulk-actions-holder">
                      <div class="select-holder">
                        <b-form-select v-model="selectedAction" class="mb-3">
                          <b-form-select-option value="null" disabled>{{ $t('profile.bulkAction')
                          }}</b-form-select-option>
                          <b-form-select-option value="bulk-read">{{ $t('profile.readSelected') }}</b-form-select-option>
                          <b-form-select-option value="bulk-delete">{{ $t('profile.deleteSelected')
                          }}</b-form-select-option>
                        </b-form-select>
                      </div>
                      <div class="mx-4">
                        <button class="bg-main br-5" @click.prevent="bulkAction">{{ $t('payment.Apply') }}</button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 d-flex justify-content-end">
            <h6 class="m-0 mx-3">
              <router-link to="/profile/NotificationSettings" class="text-dark">
                <ins>{{ $t("profile.NotificationSettings") }}</ins>
              </router-link>
            </h6>
            <h6 class="m-0">

              <ins>
                <div @click="readAllNotifications">

                  <span class="mr-2 text-decoration-underline">{{
                    $t("profile.readAllNotifications")
                  }}</span>
                </div>
              </ins>
            </h6>
          </div>
        </div>

      </div>
      <div class="perPage">
        <div class="d-flex justify-content-end align-items-center">

          <div>
            <b-form-select v-model="filterPerPage" class="mb-3" @change="getNotificatinosWithLimit">
              <b-form-select-option :value="null" disabled>{{ $t('profile.perPage') }}</b-form-select-option>
              <b-form-select-option value="">{{ $t('home.All') }}</b-form-select-option>
              <b-form-select-option value="5">5</b-form-select-option>
              <b-form-select-option value="10">10</b-form-select-option>
              <b-form-select-option value="15">15</b-form-select-option>
              <b-form-select-option value="20">20</b-form-select-option>
              <b-form-select-option value="25">25</b-form-select-option>
              <b-form-select-option value="30">30</b-form-select-option>
            </b-form-select>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th :class="{
              'text-left': $i18n.locale == 'en',
              'text-right': $i18n.locale == 'ar',
            }">
              {{ $t("profile.Notifications") }}
            </th>
            <th class="text-center">
              {{ $t("profile.actions") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notify, index) in notifications" :key="index">
            <td>
              <div class="data-holder">
                <div class="">
                  <div class="">
                    <div>
                      <div>
                        <div>
                          <div class="d-flex justify-content-start align-items-center">
                            <div class="d-flex flex-column align-items-center justify-content-center">
                              <div v-if="notify.is_read == 0">
                                <span class="unreaded"></span>
                              </div>
                              <div class="">
                                <input type="checkbox" class="myproject--checkbox" :value="notify.id"
                                  v-model="checkedOrder" />
                              </div>
                            </div>

                            <div class="mx-3">
                              <div @click="goNotificationPage(notify)">
                                <h5 class="m-0">
                                  <b>{{ notify.body }}</b>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td colspan="3">
              <div class="d-flex justify-content-center align-items-center actions">
                <span v-if="notify.is_read == 0" class="">
                  <button
                    class="btn btn-loght border-0 outline-none shadow-none d-block add-cart add-cart-rfq bg-dark text-white px-3"
                    @click="readNotification(notify)" v-b-tooltip.hover :title="$t('profile.markRead')">
                    <font-awesome-icon icon="fa-regular fa-envelope-open" />
                  </button>
                </span>
                <span>
                  <button v-b-tooltip.hover :title="$t('items.remove')" @click="removeNotification(notify)"
                    class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq bg-gray m-2">
                    <span>
                      <font-awesome-icon icon="fa-solid fa-trash-can" />
                    </span>
                  </button>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-start align-items-center mt-5">
        <Paginate v-if="notifications" :total-pages="totalPages" :per-page="totalPages" :current-page="page"
          @pagechanged="onPageChange" />
      </div>
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
          this.notifications = resp.data.items.notifications.data;

          this.total = resp.data.items.notifications.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.notifications.meta.total /
            resp.data.items.notifications.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.notifications.meta.total;
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
    },
    /**
     * get Notificatinos function
     * @vuese
     */
    getNotificatinosWithLimit() {
      profile
        .getNotificatinosWithLimit(this.page, this.filterPerPage)
        .then((resp) => {
          this.notifications = resp.data.items.notifications.data;

          this.total = resp.data.items.notifications.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.notifications.meta.total /
            resp.data.items.notifications.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.notifications.meta.total;
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
    },
    /**
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getNotificatinos(this.page);
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getNotificatinos(this.page);
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getNotificatinos(this.page);
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
          if (res.status == 200) {
            this.$store.dispatch("getNotifications");
            this.getNotificatinos(this.page);
            setTimeout(() => {
              this.checkedOrder = []
            }, 300);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
    },
    removeNotification(notification) {
      profile
        .removeNotification(notification)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.$store.dispatch("getNotifications");
            this.getNotificatinos(this.page);
            setTimeout(() => {
              this.checkedOrder = []
            }, 300);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
    },
    /**
     * go to Notification Page function
     * @vuese
     */
    goNotificationPage(notification) {
      if (notification.type === "return_item") {
        this.readNotification(notification);
        this.$router.push({
          path: "/ReturnedRequest",
          query: {
            UUID: notification.type_id,
          },
        });
      } else if (notification.type === "order") {
        this.readNotification(notification);
        this.$router.push({
          path: "/viewOrderDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "RFQ") {
        this.readNotification(notification);
        this.$router.push({
          path: "/profile/quotationDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "chat") {
        this.readNotification(notification);
        this.$router.push({
          path: "/viewCorresponseDetails",
          query: {
            id: notification.type_id,
          },
        });
      } else if (notification.type === "charge_wallet") {
        this.readNotification(notification);
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
          if (res.status == 200) {
            this.$store.dispatch("getNotifications");
            this.getNotificatinos();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
    },
    bulkAction() {
      if (this.selectedAction == 'bulk-read') {
        this.notificationBulkRead()
        this.getNotificatinos(this.page);
        this.checkedOrder = []
      }
      else if (this.selectedAction == 'bulk-delete') {
        this.notificationBulkDelete()
        this.getNotificatinos(this.page);
        this.checkedOrder = []
      }
      else {
        if (this.$i18n.locale == 'en') {
          this.errMsg('Choose Action First');
        } else {
          this.errMsg('قم باختيار الاجراء اولا');
        }
      }
    },
    notificationBulkRead() {
      let payload = {
        ids: this.checkedOrder
      }
      profile.notificationBulkRead(payload).then(res => {
        this.sucessMsg(res.data.message);
      }).catch((error) => {
        const err = Object.values(error)[2].data;
        this.errors = err.items;
        this.errMsg(err.message);
      })
    },
    notificationBulkDelete() {
      let payload = {
        ids: this.checkedOrder
      }
      profile.notificationBulkDelete(payload).then(res => {
        this.sucessMsg(res.data.message);
      }).catch((error) => {
        const err = Object.values(error)[2].data;
        this.errors = err.items;
        this.errMsg(err.message);
      })
    }
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
      checkedOrder: [],
      selectedAction: null,
      errors: [],
      filterPerPage: null
    };
  },
  computed: {
    checkAll: {
      get: function () {
        return this.notifications
          ? this.checkedOrder.length == this.notifications.length
          : false;
      },
      set: function (value) {
        var checkedOrder = [];
        if (value) {
          this.notifications.forEach(function (order) {
            checkedOrder.push(order.id);
          });
        }
        this.checkedOrder = checkedOrder;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.notifications {


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

.unreaded {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $main-color !important;
}

td {
  padding: 35px 15px !important;
}

.bulk-actions-holder {
  .select-holder {
    min-width: 200px;
    min-height: 65px;
  }

  button {
    width: 85px;
    height: 50px !important;
    padding: 8px;
  }
}
</style>
