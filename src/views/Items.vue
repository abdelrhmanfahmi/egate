<template>
  <div class="items-body">
    <div class="container">
      <div
        class="navigation d-none d-lg-flex justify-content-between align-items-center w-75 mx-auto my-4"
      >
        <a href="#" class="prev"><span>&#60;</span>{{ $t("items.prev") }}</a>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <a href="#" class="next">{{ $t("items.next") }}<span>&#62;</span></a>
      </div>
      <div class="content">
        <b-row align-h="center" align-v="center" class="py-5">
          <b-col cols="12" lg="6" xl="5" class="item-content">
            <a href="#" class="link">{{ $t("items.category") }}</a>
            <h5 class="name">{{ $t("items.fruit") }}</h5>
            <p class="description">
              {{ $t("items.description") }}
            </p>
            <p class="description">
              {{ $t("items.description") }}
            </p>
            <div class="customize">
              <div class="customize-selection">
                <label for="select">{{ $t("items.typesSelect") }}</label>
                <b-form-select
                  v-model="selected"
                  :options="types"
                ></b-form-select>
              </div>
              <div class="customize-selection">
                <label for="select">{{ $t("items.weightSelect") }}</label>
                <b-form-select
                  v-model="selected"
                  :options="types"
                ></b-form-select>
              </div>
              <div class="customize-selection">
                <label for="select">{{ $t("items.facilitySelect") }}</label>
                <b-form-select
                  v-model="selected"
                  :options="types"
                ></b-form-select>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="6" xl="5" class="item-media mt-3 m-lg-0">
            <img :src="require('@/assets/images/ftb.png')" alt="item-name" />
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="products text-center">
      <h4 class="header font-weight-bold my-5">{{ $t("items.products") }}</h4>
      <div class="products-table">
        <b-table
          bordered
          hover
          :items="tableItems"
          :fields="tableFields"
          stacked="lg"
        >
          <template #cell(item)="data">
            <a href="#">{{ data.value }}</a>
          </template>
          <template #cell(image)="data">
            <img :src="data.value" />
          </template>
          <template #cell(unit)="data">
            {{ data.value }} {{ $t("items.kg") }}
          </template>
          <template #cell(quantity)="data">
            <Counter
              class="justify-content-center"
              :quantity="data.value"
            ></Counter>
          </template>
          <template #cell(addTo)>
            <div class="add-to d-flex justify-content-center">
              <a href="#">
                <span>{{ $t("items.addToCart") }}</span>
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
              </a>
              <a href="#"><font-awesome-icon icon="fa-solid fa-star" /></a>
              <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a>
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <div class="most-sold text-center">
      <div class="container">
        <h4 class="header font-weight-bold mt-5 mb-3">
          {{ $t("items.products") }}
        </h4>
        <hr />
        <b-row class="justify-content-center justify-content-sm-between">
          <b-col
            cols="10"
            sm="6"
            lg="4"
            xl="2"
            v-for="(item, index) in 4"
            :key="index"
          >
            <Product :data="product[index]"></Product
          ></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import Counter from "@/components/global/Counter.vue";
import Product from "@/components/pages/supplier/products/Product.vue";

export default {
  data() {
    return {
      items: [
        {
          text: this.$t("items.home"),
          href: "#",
        },
        {
          text: this.$t("items.category"),
          href: "#",
        },
        {
          text: this.$t("items.fruit"),
          active: true,
        },
      ],
      selected: null,
      types: [
        { value: null, text: this.$t("items.optionSelect") },
        { value: "a", text: "First option" },
        { value: "b", text: "Second option" },
        { value: "c", text: "Third option" },
        { value: "d", text: "Fourth option" },
      ],
      tableFields: [
        {
          key: "type",
          label: this.$t("items.type"),
        },
        {
          key: "item",
          label: this.$t("items.item"),
        },
        {
          key: "image",
          label: this.$t("items.image"),
        },
        {
          key: "supplier",
          label: this.$t("items.supplier"),
        },
        {
          key: "unit",
          label: this.$t("items.unit"),
        },
        {
          key: "price",
          label: this.$t("items.price"),
        },
        {
          key: "quantity",
          label: this.$t("items.quantity"),
        },
        {
          key: "addTo",
          label: this.$t("items.addTo"),
        },
      ],
      tableItems: [
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
        {
          type: "Announcement",
          item: "American red apple",
          image: require("@/assets/images/ftb1.png"),
          supplier: "Aalm Alfrda",
          unit: 1,
          price: "3.10",
          quantity: 2,
        },
      ],
      product: [
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          discount: 20,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
          discount: 35,
        },
      ],
    };
  },
  components: {
    Counter,
    Product,
  },
};
</script>
<style lang="scss" scoped>
.items-body {
  color: #000;
  .content {
    color: #000;
    .item-content {
      color: #000;
      .link {
        color: #403a37;
        font-size: 11pt;
        margin-bottom: 0.5rem;
      }
      .name {
        color: #312620;
        font-weight: 600;
        margin-bottom: 2rem;
        font-size: 20pt;
      }
      .description {
        font-size: 11pt;
        color: #676565;
        margin-bottom: 1rem;
      }
      .customize {
        color: #000;
        .customize-selection {
          label {
            color: #7e7e7e;
            cursor: pointer;
            font-size: 10pt;
            margin-bottom: 0;
            margin-top: 0.5rem;
          }
          select {
            height: 2.3rem;
          }
        }
      }
    }
    .item-media {
      color: #000;
      img {
        color: #000;
      }
    }
  }
}
.products {
  .header {
    color: #312620;
  }
  .add-to {
    color: #000;
    a {
      background: #fff;
      color: #312620;
      box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 10%);
      padding: 1rem 2rem;
      border-radius: 0.2rem;
      margin: 0 0.3rem;
      &:hover {
        color: #ed2124;
      }
      span {
        margin-inline-end: 0.5rem;
      }
    }
  }
}
</style>
