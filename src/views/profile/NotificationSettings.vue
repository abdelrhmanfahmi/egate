<template>
  <!-- notification settings  page -->
  <div>
    <div class="wrapper">
      <div class="text-center">
        <h1>{{ $t("profile.NotificationSettings") }}</h1>
      </div>
      <div class="wrapper py-4">
        <!-- Orders notifications  -->
        <div class="orders mt-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.ordersLists") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="order"
                      id="orderssms"
                      type="checkbox"
                      v-model="orders.sms"
                    />
                    <label for="orderssms"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="order"
                      id="ordersmail"
                      type="checkbox"
                      v-model="orders.mail"
                    />
                    <label for="ordersmail"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="order"
                      id="ordersnotifications"
                      type="checkbox"
                      v-model="orders.notifications"
                    />
                    <label for="ordersnotifications"><span></span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quotations notifications  -->
        <div class="orders mt-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.quotations") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="quotations"
                      id="quotationssms"
                      type="checkbox"
                      v-model="quotations.sms"
                    />
                    <label for="quotationssms"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="quotations"
                      id="quotationsmail"
                      type="checkbox"
                      v-model="quotations.mail"
                    />
                    <label for="quotationsmail"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="quotations"
                      id="quotationsnotifications"
                      type="checkbox"
                      v-model="quotations.notifications"
                    />
                    <label for="quotationsnotifications"><span></span></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Others notifications  -->
        <div class="orders mt-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12">
              <h2>{{ $t("profile.others") }}</h2>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.sms") }}</label>
                    <input
                      name="others"
                      id="otherssms"
                      type="checkbox"
                      v-model="others.sms"
                    />
                    <label for="otherssms"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Mail") }}</label>
                    <input
                      name="others"
                      id="othersmail"
                      type="checkbox"
                      v-model="others.mail"
                    />
                    <label for="othersmail"><span></span></label>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div>
                    <label>{{ $t("profile.Notifications") }}</label>
                    <input
                      name="others"
                      id="othersnotifications"
                      type="checkbox"
                      v-model="others.notifications"
                    />
                    <label for="othersnotifications"><span></span></label>
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
        sms: false,
        mail: false,
        notifications: false,
      },
      quotations: {
        sms: false,
        mail: false,
        notifications: false,
      },
      others: {
        sms: false,
        mail: false,
        notifications: false,
      },
    };
  },
  methods: {
    /**
     * ge tNotification Settings function
     * @vuese
     */
    getNotificationSettings() {
      profile
        .getNotificationSettings()
        .thrn((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
