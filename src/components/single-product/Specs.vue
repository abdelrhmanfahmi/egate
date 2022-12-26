<template>
  <!-- product specs  -->
  <div class="specs">
    <div class="content">
      <div class="product-info">
        <table class="table table-bordered m-0">
          <tr v-if="myProduct.client !== null">
            <th>{{ $t("singleProduct.supplierName") }}</th>
            <td>
              <router-link :to="`/suppliers/${myProduct.client_id}`">
                {{ myProduct.client.company_name }}
              </router-link>
            </td>
          </tr>
          <tr v-if="myProduct.country">
            <th>{{ $t("singleProduct.country") }}</th>
            <td>{{ myProduct.country.title }}</td>
          </tr>
          <tr v-if="myProduct.delivery_time !== null">
            <th>{{ $t("singleProduct.deliveryTime") }}</th>
            <td v-if="myProduct.delivery_time.title">
              {{ myProduct.delivery_time.title }}
            </td>
          </tr>
          <tr v-if="myProduct.warranty !== null">
            <th>{{ $t("singleProduct.warantyType") }}</th>
            <td>{{ myProduct.warranty.title }}</td>
          </tr>
          <tr
            v-if="myProduct.product_details_by_type.min_order_quantity !== null"
          >
            <th>{{ $t("singleProduct.min_order_quantity") }}</th>
            <td>
              {{ myProduct.product_details_by_type.min_order_quantity.title }}
            </td>
          </tr>
          <tr v-if="myProduct.return_time !== null">
            <th>{{ $t("singleProduct.return_time") }}</th>
            <td>{{ myProduct.return_time.title }}</td>
          </tr>
          <tr v-if="myProduct.product_details_by_type !== null">
            <th>{{ $t("singleProduct.PcsperUnit") }}</th>
            <td>{{ myProduct.product_details_by_type.pieces_number }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
/**
  *  component style
*/
.specs {
  .content {
    .header {
      font-size: 11pt;
      border-bottom: 1px solid #696969;
      color: #312620;
    }
    .description {
      font-size: 11pt;
      color: #676565;
    }
    .side-data {
      margin-bottom: 2rem;
      span {
        display: block;
        color: #676565;
      }
    }
    .product-info {
      background: #fff;
      padding: 2rem;
      border-radius: 0.5rem;
      table {
        tr {
          th {
            font-weight: normal;
            color: #ed2124;
            text-align: center;
          }
          td {
            font-weight: normal;
            color: #676565;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
