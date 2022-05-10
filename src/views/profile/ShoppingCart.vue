<template>
  <div>
    <!-- <b-table hover :items="cartItems" :fields="fields" stacked="lg">
      <template #cell(image)="data">
        <img :src="data.value" class="product-img" />
      </template>
      <template #cell(product)="data">
        <a href="#" class="product-name">{{ data.value }}</a>
      </template>
      <template #cell(price)="data">
        <p>{{ data.value }} {{ currency }}</p>
      </template>
      <template #cell(quantity)="data">
        <Counter
          class="justify-content-center"
          :quantity="data.value"
        ></Counter>
      </template>
      <template #cell(totalPrice)="data">
        <p>{{ data.value }} {{ currency }}</p>
      </template>
      <template #cell(action)="data">
        <div class="actions d-flex">
          <b-button @click="removeItem(data.index)">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </b-button>

          <b-button>
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </b-button>
        </div>
      </template>
    </b-table> -->
    <div class="cart-table p-4" stacked="lg">
      <table  class="table table-striped table-hover">
        <thead>
          <tr class="data-holder">
            <th></th>
            <th class="product"  :class="{'text-left' :$i18n.locale == 'en' ,'text-right' :$i18n.locale == 'ar' }">{{ $t("cart.product") }}</th>
            <th class="price " :class="{'text-left' :$i18n.locale == 'en' ,'text-right' :$i18n.locale == 'ar' }">{{ $t("cart.price") }}</th>
            <th class="quantity ">{{ $t("cart.quantity") }}</th>
            <th class="total " :class="{'text-left' :$i18n.locale == 'en' ,'text-right' :$i18n.locale == 'ar' }">{{ $t("cart.total") }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody
          class="supplier"
          v-for="(supplier, index) in cartItems"
          :key="index"
        >
          <tr
            class="item-content"
            v-for="(item, index) in supplier.products"
            :key="index"
          >
            <td class="media">
              <router-link
                :to="{
                  path: '/details',
                  query: { id: `${item.product_supplier_id}` },
                }"
                class="thumb"
              >
                <img v-if="item.product_image == undefined || item.product_image == 'undefined'"
                  :src="item.product_image"
                  :alt="' image'"
                  class="product-img"
                  title="image"
                />
                <img v-else
                  :src="item.product_image"
                  :alt="item.name + ' image'"
                  :title="item.name + ' image'"
                  class="product-img"
                />
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  path: '/details',
                  query: { id: `${item.product_supplier_id}` },
                }"
              >
                {{ item.product_name }}
              </router-link>
            </td>
            <td>{{ item.price | fixedCurrency }} {{ currency }}</td>
            <td>
              <Counter
                :quantity="item.quantity"
                :product="item"
                class="justify-content-center"
                @changeTitle="ChangeQ($event)"
              ></Counter>
            </td>
            <td>{{ item.product_sub_total | fixedCurrency }} {{ currency }}</td>

            <td>
              <div class="actions d-flex">
                <b-button @click="removeFromCart(item)">
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </b-button>

                <!-- <b-button>
                  <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                </b-button> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Counter from "../../components/global/Counter.vue";

import globalAxios from "@/services/global-axios";
export default {
  data() {
    return {
      fields: [
        {
          key: "image",
          label: "",
        },
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "quantity",
          label: this.$t("profile.quantity"),
        },
        {
          key: "totalPrice",
          label: this.$t("profile.totalPrice"),
        },
        {
          key: "action",
          label: "",
        },
      ],
      items: [
        {
          image: "http://dummyimage.com/122x100.png/cc0000/ffffff",
          product: "Ginger - Fresh",
          price: 11.2,
          quantity: 10,
          totalPrice: 112.0,
        },
        {
          image: "http://dummyimage.com/234x100.png/ff4444/ffffff",
          product: "Spice - Onion Powder Granulated",
          price: 11.2,
          quantity: 8,
          totalPrice: 89.6,
        },
        {
          image: "http://dummyimage.com/228x100.png/dddddd/000000",
          product: "Wine - Sauvignon Blanc",
          price: 5.0,
          quantity: 9,
          totalPrice: 45.0,
        },
        {
          image: "http://dummyimage.com/114x100.png/5fa2dd/ffffff",
          product: "Sorrel - Fresh",
          price: 1.2,
          quantity: 10,
          totalPrice: 12.0,
        },
        {
          image: "http://dummyimage.com/189x100.png/ff4444/ffffff",
          product: "Soup - Campbells Chicken",
          price: 9.3,
          quantity: 3,
          totalPrice: 27.9,
        },
        {
          image: "http://dummyimage.com/234x100.png/5fa2dd/ffffff",
          product: "Pasta - Bauletti, Chicken White",
          price: 21.8,
          quantity: 3,
          totalPrice: 65.4,
        },
        {
          image: "http://dummyimage.com/189x100.png/dddddd/000000",
          product: "Wine - Shiraz Wolf Blass Premium",
          price: 0.4,
          quantity: 10,
          totalPrice: 4.0,
        },
        {
          image: "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
          product: "Soup Campbells - Italian Wedding",
          price: 2.4,
          quantity: 9,
          totalPrice: 21.6,
        },
        {
          image: "http://dummyimage.com/201x100.png/5fa2dd/ffffff",
          product: "Sprouts - Bean",
          price: 24.0,
          quantity: 4,
          totalPrice: 96.0,
        },
        {
          image: "http://dummyimage.com/132x100.png/dddddd/000000",
          product: "Bag - Clear 7 Lb",
          price: 7.1,
          quantity: 9,
          totalPrice: 63.9,
        },
      ],
      cartItems: null,
      myQuantity: null,
    };
  },
  components: {
    Counter,
  },
  methods: {
    removeItem(i) {
      this.items.splice(i, 1);
    },
    getCartProducts() {
      this.loading = true;
      globalAxios.post(`cart`).then((res) => {
        this.cartItems = res.data.items.cart_items;
      });
      this.loading = false;
    },
    removeFromCart(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      this.loading = true;
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    ChangeQ(myQuantity) {
      this.myQuantity = myQuantity;
      // console.log(myQuantity);
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 300);
    },
  },
  mounted() {
    this.getCartProducts();
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}
.product-name {
  color: #312620;
  font-weight: 600;
  font-size: 12pt;
}
.actions {
  text-align: center;
  button {
    color: #000 !important;
    background-color: transparent !important;
    border: 0 !important;
  }
  svg {
    font-size: 1.2rem;
    margin: 0 5px;
    cursor: pointer;
  }
}
.table th,
.table td {
  border: none;
}
</style>
