<template>
  <div class="my-5">
    <div class="container">
      <div
        class="data-holder serial-holder d-flex justify-content-between align-items-center"
      >
        <div class="serial">
          <h4 class="m-0">#serial</h4>
        </div>
        <div class="print" @click="printScreen">
          <font-awesome-icon icon="fa-solid fa-print" />
          <span class="mx-2">
            {{ $t("profile.printIno") }}
          </span>
        </div>
      </div>
      <section class="account-address-info">
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.accountInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.addressInfo") }}
              <sub> ( {{ $t("profile.billingAddress") }} ) </sub>
            </h4>
            <div class="pl-2">
              <div class="">
                <h5 class="font-weight-bold h4">
                  {{ $t("userName") }}
                </h5>
                <p>data</p>
                <p>data</p>
                <p>data</p>
                <p>country</p>
                <p><font-awesome-icon icon="fa-solid fa-phone" /> phone</p>
                <p><font-awesome-icon icon="fa-solid fa-envelope" /> email</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="payment">
        <div
          class="data-holder serial-holder d-flex justify-content-between align-items-center mb-4"
        >
          <div class="">
            <h4 class="m-0">{{ $t("profile.payment") }}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.paymentInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.shoppingInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">free delivery</div>
                  <div class="col-6">{{ currency }} 20.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="item-order">
        <div class="my-5">
          <h5 class="h4">
            {{ $t("profile.itemsOrder") }}
          </h5>
          <hr />
        </div>
        <div class="supplier-products-data">
          <div class="supplier-info">
            <div class="supplier-data info-data info-colored">
              <p class="m-0 p-2 px-3">
                supplier : supplier name | supplier order : #860680 | status :
                New
              </p>
            </div>
            <div class="d-flex justify-content-end">
              <b-button variant="outline-danger" v-if="$i18n.locale == 'en'"
                ><font-awesome-icon icon="fa-solid fa-x" />
                <span class="mx-2">cancel</span></b-button
              >
              <b-button variant="outline-danger" v-else
                ><span class="mx-2">الغاء</span
                ><font-awesome-icon icon="fa-solid fa-x"
              /></b-button>
            </div>
          </div>
          <div class="supplier-products mt-3">
            <div class="holder">
              <table class="table table-striped table-hover selectable">
                <thead class="font-weight-bold">
                  <tr>
                    <th
                      scope="col"
                      v-for="(tab, index) in fields"
                      :key="index"
                      class="text-center"
                    >
                      {{ tab.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(x, index) in 10" :key="index">
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                    <td>test {{ index }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section class="item-order">
        <div class="my-5">
          <h5 class="h4">
            {{ $t("profile.itemsOrder") }}
          </h5>
          <hr />
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.paymentInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.shoppingInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">free delivery</div>
                  <div class="col-6">{{ currency }} 20.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "itemStatus",
          label: this.$t("profile.itemStatus"),
        },
        {
          key: "originalPrice",
          label: this.$t("profile.originalPrice"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "qty",
          label: this.$t("profile.qty"),
        },
        {
          key: "subTotal",
          label: this.$t("profile.subTotal"),
        },
        {
          key: "taxAmount",
          label: this.$t("profile.taxAmount"),
        },
        {
          key: "taxPercent",
          label: this.$t("profile.taxPercent"),
        },
        {
          key: "discountPercent",
          label: this.$t("profile.discountPercent"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
      ],
    };
  },
  methods: {
    printScreen() {
      window.print();
    },
  },
};
</script>

<style lang="scss" scoped>
.data-holder {
  padding: 20px;
  background: #f7f7f7;
}
.serial-holder {
  font-size: 20px;
}
h4 {
  background: #f7f7f7;
  margin-bottom: 2%;
}
section {
  margin: 2% 0;
}

.info {
  font-size: 20px;
  padding: 10px 0;
  margin: 0 15px;
}
.info-data {
  padding: 10px 0;
}
.info-colored {
  background: #f7f7f7;
}
.supplier-info {
  font-size: 20px;
}
table,
table tr,
table td {
  text-align: center !important;
}
.print {
  cursor: pointer;
}
</style>
