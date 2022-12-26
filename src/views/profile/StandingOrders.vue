<template>
  <!-- standing orders page  -->
  <div>
    <p class="add-address" @click="showForm = !showForm">
      <span>+ </span>{{ $t("items.addNew") }}
    </p>
    <form
      @submit.prevent="CreateStandingOrders()"
      class="account-information-form"
      v-if="showForm"
    >
      <b-row class="justify-content-center align-items-center">
        <!-- country  -->
        <b-col lg="5" class="mb-3">
          <label>{{ $t("profile.name") }}</label>
          <span class="requried">*</span>
          <b-form-input id="name" v-model="standingOrder.name" />
          <div class="error" v-for="(error, index) in errors.name" :key="index">
            {{ error }}
          </div>
        </b-col>
        <b-col lg="5">
          <b-form-group>
            <label>{{ $t("items.time") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="standingOrder.time">
              <b-form-select-option :value="null" disabled>{{
                $t("payment.selectExist")
              }}</b-form-select-option>
              <b-form-select-option
                :value="time.id"
                v-for="(time, index) in times"
                :key="index"
                >{{ time.title }}</b-form-select-option
              >
            </b-form-select>
            <div
              class="error"
              v-for="(error, index) in errors.time_id"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="2">
          <b-button type="submit" class="login-button">
            {{ $t("register.submit") }}
          </b-button>
        </b-col>
      </b-row>
    </form>
    <div class="d-flex justify-content-center align-items-center">
      <hr class="w-75" />
    </div>

    <div class="standing-orders">
      <div class="plans" v-if="standingOrdersLength > 0">
        <div class="row">
          <div
            class="col-md-3 col-sm-12"
            v-for="(order, index) in standingOrders"
            :key="index"
          >
            <label class="plan basic-plan">
              <input
                type="radio"
                name="plan"
                :value="order.id"
                v-model="selectedPlan"
              />
              <div class="plan-content-holder">
                <div class="plan-content">
                  <div class="b-box">
                    <div class="actions">
                      <span
                        role="button"
                        id="show-btn"
                        @click="
                          showDeleteModal();
                          selectGroupToEdit(order);
                        "
                        class="removeOrder"
                        ><font-awesome-icon icon="fa-solid fa-trash"
                      /></span>
                      <span
                        role="button"
                        id="show-btn"
                        @click="
                          showEditModal();
                          selectGroupToEdit(order);
                        "
                        class="EditOrder"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></span>
                    </div>
                    <!-- <div class="icon"></div> -->
                    <h4 class="title" @click="goToGroup(order)">
                      <span>{{ order.name }}</span>
                      <div class="row">
                        <div class="col-12">
                          <small
                            >{{ order.items_count }}
                            {{ $t("items.item") }}</small
                          >
                        </div>
                        <div class="col-12">
                          <small v-if="$i18n.locale == 'en'">{{
                            order.time.title_en
                          }}</small>
                          <small v-else>{{ order.time.title_ar }}</small>
                        </div>
                      </div>
                    </h4>
                    <!-- <a href="#"></a> -->
                  </div>
                  <!-- </router-link> -->
                </div>
              </div>
            </label>
            <!-- </router-link> -->
          </div>
        </div>
        <b-row class="mb-3" v-if="quantitySelected">
          <b-col lg="5">
            <label for="">{{ $t("cart.standQuantity") }}</label>
            <b-form-input
              id="quantity"
              type="number"
              min="0"
              v-model="ProductQuantity"
            />
            <div
              class="error"
              v-for="(error, index) in errors.quantity"
              :key="index"
            >
              {{ error }}
            </div>
          </b-col>
        </b-row>
        <!-- edit modal  -->
        <b-modal
          ref="edit-modal"
          id="modal-center"
          centered
          hide-footer
          :title="$t('items.editGroup')"
        >
          <div class="d-block">
            <form @submit.prevent="editOrder" v-if="selectedOrder">
              <label>{{ $t("profile.name") }}</label>
              <span class="requried">*</span>
              <b-form-input id="name" v-model="selectedOrder.name" />
              <div
                class="error"
                v-for="(error, index) in errors.name"
                :key="index"
              >
                {{ error }}
              </div>
            </form>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="hideEditModal"
                >{{ $t("cart.cancel") }}</b-button
              >
            </div>
            <div class="col-md-6 col-sm-12">
              <b-button
                class="mt-3"
                variant="outline-success"
                block
                @click="editOrder"
                >{{ $t("items.edit") }}</b-button
              >
            </div>
          </div>
        </b-modal>
        <!-- delete modal  -->
        <b-modal
          ref="delete-modal"
          id="modal-center"
          centered
          hide-footer
          :title="$t('items.deleteGroup')"
        >
          <div class="d-block">
            <form @submit.prevent="editOrder" v-if="selectedOrder">
              <h5>
                {{ $t("items.sureDelete") }}
                <span>({{ selectedOrder.name }}) ?</span>
              </h5>
              <div
                class="error"
                v-for="(error, index) in errors.name"
                :key="index"
              >
                {{ error }}
              </div>
            </form>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="hideDeleteModal"
                >{{ $t("cart.cancel") }}</b-button
              >
            </div>
            <div class="col-md-6 col-sm-12">
              <b-button
                class="mt-3"
                variant="outline-success"
                block
                @click="deleteStandingOrder"
                >{{ $t("items.remove") }}</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
      <div class="text-center" v-else>
        <h2>{{ $t("home.noData") }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * standing orders page
 * @displayName standing orders page
 */
import profile from "@/services/profile";
export default {
  data() {
    return {
      id: this.$route.query.id,
      standingOrders: null,
      standingOrdersLength: null,
      showForm: false,
      standingOrder: {
        name: null,
        time: null,
      },
      errors: [],
      selectedPlan: null,
      times: null,
      quantitySelected: false,
      ProductQuantity: 1,
      selectedOrder: null,
    };
  },
  methods: {
    /**
     * show Edit Modal function
     * @vuese
     */
    showEditModal() {
      this.$refs["edit-modal"].show();
    },
    /**
     * show Delete Modal function
     * @vuese
     */
    showDeleteModal() {
      this.$refs["delete-modal"].show();
    },
    /**
     * hide Edit Modal function
     * @vuese
     */
    hideEditModal() {
      this.$refs["edit-modal"].hide();
    },
    /**
     * hide Delete Modal function
     * @vuese
     */
    hideDeleteModal() {
      this.$refs["delete-modal"].hide();
    },
    /**
     * get Standing Orders function
     * @vuese
     */
    async getStandingOrders() {
      await profile
        .getStandingOrders()
        .then((resp) => {
          this.standingOrders = resp.data.items.data;
          this.standingOrdersLength = resp.data.items.data.length;
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * get Standing Orders Times function
     * @vuese
     */
    async getStandingOrdersTimes() {
      await profile
        .getStandingOrdersTimes()
        .then((resp) => {
          this.times = resp.data.items;
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * add Product To Standing Orders function
     * @vuese
     */
    addProductToStandingOrders() {
      let payload = {
        product_supplier_id: this.id,
        client_standing_id: this.selectedPlan,
        quantity: this.ProductQuantity,
      };
      profile
        .addProductToStandingOrders(payload)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            setTimeout(() => {
              this.$router.push({
                path: "/StandingOrder",
                query: {
                  id: this.selectedPlan,
                },
              });
            }, 700);
          }
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
        });
    },
    /**
     * select Plan function
     * @vuese
     */
    selectPlan(plan) {
      console.log(plan);
      this.quantitySelected = true;
    },
    /**
     * Create StandingOrders function
     * @vuese
     */
    CreateStandingOrders() {
      let payLoad = {
        name: this.standingOrder.name,
        time_id: this.standingOrder.time,
      };
      profile
        .CreateStandingOrders(payLoad)
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);
          this.standingOrder.name = null;
          this.standingOrder.time = null;
          this.getStandingOrders();
          this.errors = [];
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
        });
    },
    /**
     * edit Order function
     * @vuese
     */
    editOrder() {
      let payLoad = {
        name: this.selectedOrder.name,
        time_id: this.selectedOrder.time.id,
        id: this.selectedOrder.id,
      };
      profile
        .CreateStandingOrders(payLoad)
        .then((res) => {
          console.log(res);
          this.sucessMsg(res.data.message);
          this.standingOrder.name = null;
          this.standingOrder.time = null;
          this.getStandingOrders();
          setTimeout(() => {
            this.hideEditModal();
          }, 500);
          this.errors = [];
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
        });
    },
    /**
     * go To standing order group function
     * @vuese
     */
    goToGroup(group) {
      setTimeout(() => {
        this.$router.push({
          path: "/StandingOrder",
          query: {
            id: group.id,
          },
        });
      }, 400);
    },
    /**
     * delete Standing Order function
     * @vuese
     */
    deleteStandingOrder() {
      profile
        .deleteStandingOrder(this.selectedOrder.id)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.hideDeleteModal();
            this.getStandingOrders();
          }
        })
        .catch((err) => {
          this.errMsg(err.message);
          console.log(err);
        });
    },
    /**
     * select Group To Edit function
     * @vuese
     */
    selectGroupToEdit(order) {
      this.selectedOrder = order;
      console.log("order", order);
    },
  },
  mounted() {
    this.getStandingOrders();
    this.getStandingOrdersTimes();
  },
};
</script>

<style lang="scss" scoped>
.add-address {
  font-size: 17px;
  color: #312620;
  margin: 15px 0;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    color: $main-color;
  }

  span {
    font-size: 23px;
    font-weight: 600;
  }
}

.login-button {
  margin: 0 !important;
  margin-top: 15px !important;
}

.standing-orders {
  label {
    width: 100%;
  }

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
    z-index: 1;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 6px;
      z-index: -1px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0), 0 4px 4px rgba(0, 0, 0, 0),
        0 8px 8px rgba(0, 0, 0, 0), 0 16px 16px rgba(0, 0, 0, 0),
        0 32px 32px rgba(0, 0, 0, 0), 0 64px 64px rgba(0, 0, 0, 0),
        0 128px 128px rgba(0, 0, 0, 0);
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
      transition: transform 0.7s cubic-bezier(0.18, 0.79, 0.25, 1) 0s,
        opacity 0.2s ease 0s;
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
      word-break: break-all;

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
      .removeOrder,
      .EditOrder {
        opacity: 1;
      }

      &:after {
        box-shadow: 0 2px 2px rgba(50, 55, 60, 0.05),
          0 4px 4px rgba(50, 55, 60, 0.05), 0 8px 8px rgba(50, 55, 60, 0.05),
          0 16px 16px rgba(50, 55, 60, 0.05),
          0 32px 32px rgba(50, 55, 60, 0.0375),
          0 64px 64px rgba(50, 55, 60, 0.025),
          0 128px 128px rgba(50, 55, 60, 0.025);
        opacity: 1;
      }

      &:before {
        transition: transform 0.45s cubic-bezier(0.18, 0.79, 0.25, 1) 0s,
          opacity 0.35s ease 0s;
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

  .plan-content {
    cursor: pointer;
  }

  .plans
    .plan
    input[type="radio"]:checked
    + .plan-content-holder
    > .plan-content
    > .b-box {
    border: 2px solid #216ee0;
    background: #eaf1fe;
    -webkit-transition: ease-in 0.1s;
    -o-transition: ease-in 0.1s;
    transition: ease-in 0.1s;
  }

  /* inspiration */
}

input[type="radio"],
input[type="checkbox"] {
  opacity: 0;
}
.removeOrder {
  background: red;
  color: #fff;
  z-index: 99;
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  @media (max-width: 992px) {
    opacity: 1;
  }
}
.EditOrder {
  background: #ccc;
  color: #000;
  z-index: 99;
  position: absolute;
  top: -10px;
  left: -10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  @media (max-width: 992px) {
    opacity: 1;
  }
}
</style>
