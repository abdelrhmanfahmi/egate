<template>
  <div>
    <b-table hover :items="items" :fields="fields" stacked="lg">
      <template #cell(image)="data">
        <img :src="data.value" class="product-img" />
      </template>
      <template #cell(product)="data">
        <a href="#" class="product-name">{{ data.value }}</a>
      </template>
      <template #cell(price)="data">
        <p>{{ data.value }} {{currency}}</p>
      </template>
      <template #cell(quantity)="data">
        <Counter
          class="justify-content-center"
          :quantity="data.value"
        ></Counter>
      </template>
      <template #cell(totalPrice)="data">
        <p>{{ data.value }} {{currency}}</p>
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
    </b-table>
  </div>
</template>

<script>
import Counter from "../../components/global/Counter.vue";
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
    };
  },
  components: {
    Counter,
  },
  methods: {
    removeItem(i) {
      this.items.splice(i, 1);
    },
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
</style>
