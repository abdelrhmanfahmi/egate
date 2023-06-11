<template>
  <!-- products reviews page  -->
  <div class="product-reviews">
    <h4 class="main-header my-4">{{ $t("profile.productReviews") }}</h4>

    <table class="table table-bordered table-striped" v-if="items">
      <thead>
        <tr>
          <th scope="col" v-for="(field, index) in fields" :key="index">
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items.filter((item) => !item.basket_promotion_id)"
          :key="item.id"
        >
          <td class="text-center">
            <div class="" v-if="item.product_supplier">
              <p
                v-if="item.product_supplier.product"
                class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
              >
                <span>{{ new Date(item.created_at).toLocaleString() }}</span>
              </p>
              <div class="" v-else>-</div>
            </div>
            <div class="" v-else>-</div>
          </td>
          <td class="text-center">
            <div class="" v-if="item.product_supplier">
              <router-link
                class="text-dark"
                :to="{
                  path: '/details',
                  query: { id: item.product_supplier.id },
                }"
              >
                <p
                  v-if="item.product_supplier.product"
                  class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
                >
                  <span v-if="$i18n.locale == 'en'"
                    >{{ item.product_supplier.product.title_en }}
                  </span>
                  <span v-if="$i18n.locale == 'ar'"
                    >{{ item.product_supplier.product.title_ar }}
                  </span>
                </p>
                <div class="" v-else>-</div>
              </router-link>
            </div>
            <div class="" v-else>-</div>
          </td>
          <td class="text-center" v-if="item.review">
            {{ new Date(item.review.created_at).toLocaleString() }}
          </td>
          <td class="text-center" v-else>
            {{ $t("profile.notReviewd") }}
          </td>
          <td class="text-center">
            <div class="" v-if="item.is_reviewed">
              <b-form-rating
                id="rating-inline"
                inline
                :value="item.review.rate"
                color="#EF4923"
                disabled
                size="lg"
              ></b-form-rating>
            </div>
            <div class="" v-else>
              <Rate @changeRate="ChangeRateValue($event)" />
            </div>
          </td>
          <td class="text-center">
            <b-button class="login-button" disabled v-if="item.is_reviewed">
              {{ $t("profile.review") }}
            </b-button>
            <b-button
              class="login-button"
              @click="postProductRate(item.product_supplier.id)"
              v-if="!item.is_reviewed"
            >
              {{ $t("profile.review") }}
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * products reviews page
 * @displayName products reviews page
 */
import Rate from "@/components/global/rate.vue";
import profile from "@/services/profile";
export default {
  data() {
    return {
      fields: [
        {
          key: "created_at",
          label: this.$t("profile.construction"),
        },
        {
          key: "product_supplier",
          label: this.$t("profile.productName"),
        },
        {
          key: "evaluation",
          label: this.$t("profile.evaluation"),
        },

        {
          key: "review",
          label: this.$t("profile.review"),
        },
        { key: "actions", label: this.$t("profile.actions") },
      ],
      items: [],
      myRate: null,
      product_supplier_id: null,
    };
  },
  methods: {
    /**
     * post ProductRate function
     * @vuese
     */
    postProductRate(data) {
      let requestData = {
        product_supplier_id: data,
        rate: this.myRate,
      };
      profile
        .postProductRate(requestData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getProductRate();
        })
        .catch((err) => {
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(error.message);
          this.errors.rate ? this.errMsg(this.errors.rate) : null;
        });
    },
    /**
     * get Product Rate function
     * @vuese
     */
    getProductRate() {
      profile
        .getProductRate()
        .then((res) => {
          this.items = res.data.items;
        })
    },
    /**
     * Change Rate Value function
     * @vuese
     */
    ChangeRateValue(myRate) {
      this.myRate = myRate;
    },
  },
  mounted() {
    this.getProductRate();
  },
  components: {
    Rate,
  },
};
</script>
<style lang="scss" scoped>
.product-reviews {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
}
html:lang(ar) {
  .product-reviews {
    text-align: right;
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
