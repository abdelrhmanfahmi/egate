<template>
  <div class="specs">
    <div class="content">
      <h5 class="header d-inline-block font-weight-bold mb-3">
        {{ $t("singleProduct.specsHeader") }}
      </h5>
      <p class="description">
        {{ myProduct.description }}
      </p>
      <!-- <div class="side-data">
        <span
          >{{ $t("singleProduct.origin") }}:
          {{ $t("singleProduct.originData") }}</span
        >
        <span>{{ $t("singleProduct.importer") }}: عالم الفرضة</span>
      </div> -->
      <div class="product-info">
        <table class="table table-bordered m-0">
          <tr>
            <th>{{ $t("singleProduct.supplierName") }}</th>
            <td>
              {{myProduct.client.company_name}}
            </td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.country") }}</th>
            <td v-if="myProduct.client.country">{{ myProduct.client.country }}</td>
            <td v-else>{{ $t('no info about country') }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.deliveryTime") }}</th>
            <td>{{ myProduct.delivery_time.title }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.warantyType") }}</th>
            <td>{{ myProduct.warranty.title }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.min_order_quantity") }}</th>
            <td>{{ myProduct.min_order_quantity.title }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.delivery_time") }}</th>
            <td>{{ myProduct.delivery_time.title }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.return_time") }}</th>
            <td>{{ myProduct.return_time.title }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.PcsperUnit") }}</th>
            <td>{{ myProduct.product_details[0].pieces_number }}</td>
          </tr>
          <tr>
            <th>{{ $t("singleProduct.expiration_date") }}</th>
            <td>{{ myProduct.product_details[0].expiration_date }}</td>
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
  props:['myProduct']
};
</script>
<style lang="scss" scoped>
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
