<template>
  <div>
    <div class="wrapper">
      <!-- <template v-if="product.variants.length > 0"> -->
      <div class="details-filter-row details-row-size">
        <label>Color:</label>

        <div class="product-nav product-nav-dots">
          <a
            href="#"
            v-for="(item, index) in colorArray"
            :key="index"
            :class="{
              active: item == selectedVariant.color,
              disabled: item.disabled,
            }"
            :style="{ 'background-color': item }"
            @click.prevent="selectColor(item)"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectColor: function (item) {
      if (item == this.selectedVariant.color) {
        this.selectedVariant = {
          ...this.selectedVariant,
          color: null,
          colorName: null,
          price: item.price,
        };
      } else {
        this.selectedVariant = {
          ...this.selectedVariant,
          color: item,
          colorName: item.colorName,
          price: item.price,
        };
      }
      //   this.refreshSelectableGroup();
    },
    refreshSelectableGroup: function () {
      let tempArray = [...this.variationGroup];
      if (this.selectedVariant.color) {
        tempArray = this.variationGroup.reduce((acc, cur) => {
          if (this.selectedVariant.color !== cur.color) {
            return acc;
          }
          return [...acc, cur];
        }, []);
      }

      this.sizeArray = tempArray.reduce((acc, cur) => {
        if (acc.findIndex((item) => item.size == cur.size) !== -1) return acc;
        return [...acc, cur];
      }, []);

      tempArray = [...this.variationGroup];
      if (this.selectedVariant.size) {
        tempArray = this.variationGroup.reduce((acc, cur) => {
          if (this.selectedVariant.size !== cur.size) {
            return acc;
          }
          return [...acc, cur];
        }, []);
      }

      this.colorArray = this.product.variants.reduce((acc, cur) => {
        if (tempArray.findIndex((item) => item.color == cur.color) == -1) {
          return [
            ...acc,
            {
              color: cur.color,
              colorName: cur.color_name,
              price: cur.price,
              disabled: true,
            },
          ];
        }
        return [
          ...acc,
          {
            color: cur.color,
            colorName: cur.color_name,
            price: cur.price,
            disabled: false,
          },
        ];
      }, []);
    },
  },
  data() {
    return {
      colorArray: [
        "#E0E0E0",
        "#D30E0E",
        "#1C2E95",
        "#3A8B1C",
      ],
      selectedVariant: {
        color: null,
        colorName: null,
        price: null,
        size: null,
      },
    };
  },
  mounted(){
    this.selectedVariant.color = this.colorArray[0]
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.product-nav {
  display: flex;
  align-items: center;
}
.product-nav-dots a {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.2rem solid #fff;
  margin-right: 0.5rem;
  transition: box-shadow 0.35s ease;
  background-repeat: no-repeat;
  background-position: center center;
}
.product-nav-dots a,
.product-nav-dots span {
  width: 2rem;
  height: 2rem;
}
.product-nav-dots a.active {
  box-shadow: 0 0 0 0.1rem #cccccc;
}
</style>
