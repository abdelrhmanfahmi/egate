<template>
  <div class="product-reviews">
    <h4 class="main-header my-4">{{ $t("profile.productReviews") }}</h4>
    <!-- <b-table hover :items="items" :fields="fields" stacked="lg">
      <template #cell(created_at)="data">
        <span>
          {{ new Date(data.value).toLocaleString() }}
        </span>
      </template>
      <template #cell(product_supplier)="data">
        <router-link
          :to="{ path: '/details', query: { id: data.value.product_id } }"
          v-if="$i18n.locale == 'en'"
          >{{ data.value.short_description_en }}
        </router-link>
        <router-link
          :to="{ path: '/details', query: { id: data.value.product_id } }"
          v-if="$i18n.locale == 'ar'"
          >{{ data.value.short_description_ar }}
        </router-link>
      </template>
      <template #cell(evaluation)="data">
        <b>{{ data.value }}</b>
      </template>
      <template #cell(review)>
        <Rate @changeRate="ChangeRateValue($event)" @input="checkSupplier" />
      </template>
      <template #cell(is_reviewed)="data">
        <b-button
          class="login-button"
          diabled
          @click="rate(data)"
          v-if="is_reviewed"
        >
          {{ $t("profile.review") }}
        </b-button>
        <b-button class="login-button" @click="rate(data)" v-if="!is_reviewed">
          {{ $t("profile.review") }}
        </b-button>
      </template>
    </b-table> -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" v-for="(field, index) in fields" :key="index">
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr>
          <td class="text-center">
            <p
              v-if="item.product_supplier.product"
              class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
            >
              <span>{{ new Date(item.created_at).toLocaleString() }}</span>
            </p>
          </td>
          <td class="text-center">
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
            </router-link>
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
                color="#000"
                disabled
              ></b-form-rating>
            </div>
            <div class="" v-else>
              <Rate
                @changeRate="ChangeRateValue($event)"
                @input="checkSupplier"
              />
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
      items: [
        // {
        //   age: "07/24/2021",
        //   productName: "فيجيتا شوربة الدجاج والنود لز 60جم",
        //   evaluation: "test",
        //   review: 3,
        // },
      ],
      myRate: null,
      product_supplier_id: null,
    };
  },
  methods: {
    postProductRate(data) {
      let requestData = {
        product_supplier_id: data,
        rate: this.myRate,
      };
      profile
        .postProductRate(requestData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getProductRate()
        })
        .catch((err) => {
          console.log(err);
            let error = Object.values(err)[2].data;
            this.errors = error.items;
            this.errMsg(error.message);
        });
    },
    getProductRate() {
      profile
        .getProductRate()
        .then((res) => {
          console.log(res);
          this.items = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ChangeRateValue(myRate) {
      this.myRate = myRate;
      console.log(myRate);
    },
    checkSupplier() {
      alert("test");
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
    tbody{
      tr{
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
  .table-striped tbody tr:nth-of-type(odd){
    margin: 30px 0;
    display: block;
  }
  .actions{
    justify-content: center;
    align-items: center;
  }
}
</style>
