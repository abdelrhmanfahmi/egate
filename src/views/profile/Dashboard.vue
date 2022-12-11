<template>
  <div class="dashboard text-center">
    <div class="row justify-content-center align-items-center">
      <div class="col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-2">
        <router-link to="/profile/ordersListsB2b" class="link">
          <div class="bordered">
            <h5 class="title">{{ $t("profile.ordersLists") }}</h5>
            <span class="icon">
              <font-awesome-icon
                icon="fa-solid fa-money-bill-1"
                class="fa-2x"
              />
            </span>

            <div class="info">
              <div class="p-3" :class="{'border-right' :$i18n.locale =='en' , 'border-left' :$i18n.locale == 'ar'}">
                <p class="number">1</p>
                <h5 class="text">{{$t('profile.orders')}}</h5>
              </div>
              <div class="p-3">
                <p class="number">0</p>
                <h5 class="text">{{$t('profile.pending')}}</h5>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-2">
        <router-link to="/profile/ordersListsB2b" class="link">
          <div class="bordered">
            <h5 class="title">{{ $t("profile.totalQuotations") }}</h5>
            <span class="icon">
              <font-awesome-icon icon="fa-solid fa-list-ol" class="fa-2x" />
            </span>

            <div class="info">
              <div class="p-3" :class="{'border-right' :$i18n.locale =='en' , 'border-left' :$i18n.locale == 'ar'}">
                <p class="number">1</p>
                <h5 class="text">{{$t('profile.orders')}}</h5>
              </div>
              <div class="p-3">
                <p class="number">0</p>
                <h5 class="text">{{$t('profile.pending')}}</h5>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-2">
        <router-link to="/profile/refund" class="link">
          <div class="bordered">
            <h5 class="title">{{ $t("profile.totalRefunds") }}</h5>
            <span class="icon">
              <font-awesome-icon
                icon="fa-solid fa-arrow-rotate-left"
                class="fa-2x"
              />
            </span>

            <div class="info">
              <div class="p-3" :class="{'border-right' :$i18n.locale =='en' , 'border-left' :$i18n.locale == 'ar'}">
                <p class="number">1</p>
                <h5 class="text">{{$t('profile.orders')}}</h5>
              </div>
              <div class="p-3">
                <p class="number">0</p>
                <h5 class="text">{{$t('profile.pending')}}</h5>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-2">
        <router-link to="/profile/ordersListsB2b" class="link">
          <div class="bordered">
            <h5 class="title">{{ $t("profile.wallet") }}</h5>
            <span class="icon">
              <font-awesome-icon icon="fa-solid fa-wallet" class="fa-2x" />
            </span>

            <div class="info">
              <div class="p-3" :class="{'border-right' :$i18n.locale =='en' , 'border-left' :$i18n.locale == 'ar'}">
                <p class="number">1</p>
                <h5 class="text">{{$t('profile.orders')}}</h5>
              </div>
              <div class="p-3">
                <p class="number">0</p>
                <h5 class="text">{{$t('profile.pending')}}</h5>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <div class="my-table mt-5">
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              {{ tab.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.serial }}</td>
            <td>{{ order.created_at | formatDate }}</td>
            <td>{{ order.order_supplier_items_count }}</td>
            <td>
              <span v-if="order.total_price"
                >{{ order.total_price | fixedCurrency }} {{ currency }}</span
              >
            </td>
            <td>{{ order.payment_status_lang }}</td>
            <td>{{ order.payment }}</td>

            <td>
              <router-link
                :to="{
                  path: '/viewOrderDetails',
                  query: { id: `${order.id}` },
                }"
                class="text-dark"
              >
                <b-button variant="outline-secondary" class="m-2">
                  {{ $t("profile.view") }}
                </b-button>
              </router-link>
              <router-link
                v-if="
                  order.payment_status === 'Unpaid' &&
                  order.payment_type === 'bank'
                "
                :to="{
                  path: '/checkout-details',
                  query: {
                    order_serial: order.serial,
                    date: order.created_at,
                    total_price: order.total_price,
                    payment_type: order.payment_type,
                    payment: order.payment,
                    uuid: order.uuid,
                  },
                }"
                class="text-dark"
              >
                <b-button variant="outline-success" class="m-2">
                  {{ $t("profile.bankTransDocs") }}
                </b-button>
              </router-link>
              <b-button
                id="show-btn"
                @click="
                  $bvModal.show('bv-modal-example');
                  saveUUID(order);
                "
                variant="outline-success"
                class="m-2"
                v-if="
                  order.payment_status === 'Unpaid' &&
                  order.payment_type === 'visa'
                "
              >
                {{ $t("profile.pay") }}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center align-items-center mt-5">
        <Paginate
          v-if="orders"
          :total-pages="totalPages"
          :per-page="totalPages"
          :current-page="page"
          @pagechanged="onPageChange"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
// import Paginate from "@/components/global/Paginate.vue";
export default {
  components: {
    // Paginate,
  },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: 'ID#',
        },
        {
          key: "aprovedProducts",
          label: this.$t("profile.aprovedProducts"),
        },
        {
          key: "lowInvenity",
          label: this.$t("profile.lowInvenity"),
        },

        {
          key: "bestSeller",
          label: this.$t("profile.bestSeller"),
        },
        {
          key: "mostViewed",
          label: this.$t("profile.mostViewed"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  .bordered {
    border: 1px solid #ccc;
    padding: 30px 15px 15px;
    position: relative;

    .icon {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .info {
      padding: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      @media (min-width: 1200px) and (max-width: 1600px) {
        display: block;

        .border-right {
          border: none !important;
        }
      }
    }

    .number {
      font-weight: bold;
      font-size: 25px;
    }

    .text {
      text-transform: uppercase;
    }
  }

  .link {
    color: #565656 !important;
  }

  @media (min-width: 1200px) {
    .title {
      word-break: break-all;
    }
  }
}
@media screen and (max-width: 767px) {
  table {
    text-align: center;
    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }
  .actions {
    justify-content: center;
    align-items: center;
  }
}
</style>