<template>
  <!-- notification settings  page -->
  <div>
    <div class="wrapper">
      <div class="text-center">
        <h1>{{ $t("profile.NotificationSettings") }}</h1>
      </div>
      <div class="wrapper py-4">
        <!-- Orders notifications  -->
        <div class="orders mt-5" v-if="orders">
          <div class="row justify-content-center align-items-center">
            <div
              class="col-md-6 col-sm-12"
              v-if="orders.sms || orders.mail || orders.notifications"
            >
              <h2>{{ $t("profile.ordersLists") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-4" v-if="orders.sms">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="order"
                      :id="orders.sms.id"
                      type="checkbox"
                      v-model="orders.sms.status"
                      @change="changeNotificationSettings(orders.sms)"
                    />
                    <label :for="orders.sms.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="orders.mail">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="order"
                      type="checkbox"
                      v-model="orders.mail.status"
                      :id="orders.mail.id"
                      @change="changeNotificationSettings(orders.mail)"
                    />
                    <label :for="orders.mail.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="orders.notifications">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="order"
                      type="checkbox"
                      v-model="orders.notifications.status"
                      :id="orders.notifications.id"
                      @change="changeNotificationSettings(orders.notifications)"
                    />
                    <label :for="orders.notifications.id"><span></span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- product notifications  -->
        <div class="orders mt-5" v-if="products">
          <div
            class="row justify-content-center align-items-center"
            v-if="products.sms || products.mail || products.notifications"
          >
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.product") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-4" v-if="products.sms">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="product"
                      type="checkbox"
                      v-model="products.sms.status"
                      :id="products.sms.id"
                      @change="changeNotificationSettings(products.sms)"
                    />
                    <label :for="products.sms.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="products.mail">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="product"
                      type="checkbox"
                      v-model="products.mail.status"
                      :id="products.mail.id"
                      @change="changeNotificationSettings(products.mail)"
                    />
                    <label :for="products.mail.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="products.notifications">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="product"
                      type="checkbox"
                      v-model="products.notifications.status"
                      :id="products.notifications.id"
                      @change="
                        changeNotificationSettings(products.notifications)
                      "
                    />
                    <label for="productsnotifications"><span></span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quotations notifications  -->
        <div class="orders mt-5" v-if="quotations">
          <div
            class="row justify-content-center align-items-center"
            v-if="quotations.sms || quotations.mail || quotations.notifications"
          >
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.quotations") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-4" v-if="quotations.sms">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="quotations"
                      type="checkbox"
                      v-model="quotations.sms.status"
                      :id="quotations.sms.id"
                      @change="changeNotificationSettings(quotations.sms)"
                    />
                    <label :for="quotations.sms.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="quotations.mail">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="quotations"
                      type="checkbox"
                      v-model="quotations.mail.status"
                      :id="quotations.mail.id"
                      @change="changeNotificationSettings(quotations.mail)"
                    />
                    <label :for="quotations.mail.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="quotations.notifications">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="quotations"
                      type="checkbox"
                      v-model="quotations.notifications.status"
                      :id="quotations.notifications.id"
                      @change="
                        changeNotificationSettings(quotations.notifications)
                      "
                    />
                    <label :for="quotations.notifications.id"
                      ><span></span
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Others notifications  -->
        <div class="orders mt-5" v-if="others">
          <div
            class="row justify-content-center align-items-center"
            v-if="others.sms || others.mail || others.notifications"
          >
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.others") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-4" v-if="others.sms">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="others"
                      type="checkbox"
                      v-model="others.sms.status"
                      :id="others.sms.id"
                      @change="changeNotificationSettings(others.sms)"
                    />
                    <label :for="others.sms.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="others.mail">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="others"
                      type="checkbox"
                      v-model="others.mail"
                      :id="others.mail.id"
                      @change="changeNotificationSettings(others.mail)"
                    />
                    <label :for="others.mail.id"><span></span></label>
                  </div>
                </div>
                <div class="col-4" v-if="others.notifications">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="others"
                      type="checkbox"
                      v-model="others.notifications"
                      :id="others.notifications.id"
                      @change="changeNotificationSettings(others.notifications)"
                    />
                    <label :for="others.notifications.id"><span></span></label>
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
/**
 * Notificatino settings page
 * @displayName Notificatino settings page
 */

import profile from "@/services/profile";
export default {
  data() {
    return {
      orders: {
        sms: null,
        mail: null,
        notifications: null,
      },
      products: {
        sms: 0,
        mail: 0,
        notifications: 0,
      },
      quotations: {
        sms: 0,
        mail: 0,
        notifications: 0,
      },
      others: {
        sms: 0,
        mail: 0,
        notifications: 0,
      },
    };
  },
  methods: {
    /**
     * get Notification Settings function
     * @vuese
     */
    getNotificationSettings() {
      profile
        .getNotificationSettings()
        .then((res) => {
          console.log(res);
          let response = res.data.items.data;
          let ordersData = [];
          let productsData = [];
          let rfqData = [];
          let othersData = [];
          response.forEach((element) => {
            if (element.type == "order") {
              ordersData.push(element);
            }
            if (element.type == "product") {
              productsData.push(element);
            }
            if (element.type == "rfq") {
              rfqData.push(element);
            }
            if (element.type == "others") {
              othersData.push(element);
            }
          });
          // console.log(ordersData);
          // console.log(productsData);
          // console.log(rfqData);
          // console.log(othersData);

          ordersData.forEach((element) => {
            if (element.notification_type == "sms" && element.type == "order") {
              this.orders.sms = element;
            }
            if (
              element.notification_type == "email" &&
              element.type == "order"
            ) {
              this.orders.mail = element;
            }
            if (
              element.notification_type == "notification" &&
              element.type == "order"
            ) {
              this.orders.notifications = element;
            }
          });
          productsData.forEach((element) => {
            if (
              element.notification_type == "sms" &&
              element.type == "product"
            ) {
              this.products.sms = element;
            }
            if (
              element.notification_type == "email" &&
              element.type == "product"
            ) {
              this.products.mail = element;
            }
            if (
              element.notification_type == "notification" &&
              element.type == "product"
            ) {
              this.products.notifications = element;
            }
          });
          rfqData.forEach((element) => {
            if (element.notification_type == "sms" && element.type == "rfq") {
              this.quotations.sms = element;
            }
            if (element.notification_type == "email" && element.type == "rfq") {
              this.quotations.mail = element;
            }
            if (
              element.notification_type == "notification" &&
              element.type == "rfq"
            ) {
              this.quotations.notifications = element;
            }
          });
          othersData.forEach((element) => {
            if (
              element.notification_type == "sms" &&
              element.type == "others"
            ) {
              this.others.sms = element;
            }
            if (
              element.notification_type == "email" &&
              element.type == "others"
            ) {
              this.others.mail = element;
            }
            if (
              element.notification_type == "notification" &&
              element.type == "others"
            ) {
              this.others.notifications = element;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * change tNotification Settings function
     * @vuese
     */
    changeNotificationSettings(notify) {
      let data = {
        notification_setting_id: notify.id,
        status: notify.status == true ? 1 : 0,
      };
      profile
        .changeNotificationSettings(data)
        .then((res) => {
          console.log(res);
          this.getNotificationSettings();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(notify);
    },
  },
  mounted() {
    this.getNotificationSettings();
  },
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  visibility: hidden;
  position: absolute;
  top: -9999px;
  height: 0;
  width: 0;
}

label {
  font-size: 18px;
}

input[type="checkbox"] + label {
  //   margin-left: 1rem;
  display: flex;
  height: 24.8px;
  width: 54px;
  border-radius: 2rem;
  background: linear-gradient(to right, #0a0 50%, #a00 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25) inset,
    0 2px 5px -1px rgba(0, 0, 0, 0.2) inset;
  transition: all 250ms ease-in-out;
  cursor: pointer;
}

input[type="checkbox"] + label > span {
  display: block;
  position: relative;
  height: 28.8px;
  width: 28.8px;
  border-radius: 50%;
  top: -2px;
  left: -2px;
  background: hsl(175, 5%, 95%);
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3), 0 2px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease-in-out;
}

input:checked + label {
  background-position: 0 0;
  transition: all 250ms ease-in-out;
}

input:checked + label > span {
  left: 27.2px;
  transition: all 250ms ease-in-out;
}
</style>
