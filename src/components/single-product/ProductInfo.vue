<template>
  <div class="product-info">
    <div class="content">
      <a href="#" class="category">Fruit</a>
      <h4 class="name">Apple</h4>
      <b-form-rating></b-form-rating>
      <p class="serial">SKU : WI56OMTJ</p>
      <p class="price">Price : 1.500 KD</p>
      <hr />
      <p class="supplier">
        Supplier
        <a href="#">عالم الفرضة</a>
      </p>
      <div class="weight">
        <p class="title">Weight</p>
        <div class="available-weight d-flex justify-content-end">
          <span>500</span>
          <span>1500</span>
        </div>
      </div>
      <span class="is-available">Available</span>
      <hr />
      <div
        class="product-actions d-flex flex-wrap justify-content-between align-items-center"
      >
        <div class="short-links">
          <a href="#">
            Bid request
            <span>
              <font-awesome-icon icon="fa-solid fa-list" />
            </span>
          </a>
          <a href="#">
            Add to favorites
            <span>
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
          </a>
          <a href="#">
            Add to purchase lists
            <span>
              <font-awesome-icon icon="fa-solid fa-repeat" />
            </span>
          </a>
        </div>
        <a href="#" class="add-cart">Add to Cart</a>
        <Counter class="my-3"></Counter>
      </div>
      <hr />
    </div>
  </div>
</template>
<script>
import Counter from "../global/Counter.vue";
export default {
  components: {
    Counter,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.product-info {
  .content {
    .category {
      color: #403a37;
      font-size: 11pt;
      margin-bottom: 0.3rem;
      display: block;
    }
    .name {
      color: #312620;
      font-weight: bold;
      font-size: 20pt;
      margin-bottom: 1rem;
    }
    .serial {
      font-size: 12pt;
      margin-bottom: 1rem;
      color: #403a37;
    }
    .price {
      font-size: 14pt;
      font-weight: bold;
      color: #312620;
      margin-bottom: 1rem;
    }
    .supplier {
      font-size: 12pt;
      color: #403a37;
      margin-bottom: 1.2rem;
      a {
        text-decoration: underline;
        color: #403a37;
        font-weight: bold;
      }
    }
    .weight {
      .title {
        font-size: 11pt;
        margin-bottom: 1.5rem;
        padding-inline-start: 2rem;
        font-weight: bold;
      }
      .available-weight {
        span {
          width: 6rem;
          height: 2rem;
          border: 3px solid #ebebeb;
          font-size: 11pt;
          color: #544842;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.2rem;
          cursor: pointer;
          transition: all ease-out 0.3s;
          &:hover {
            background: #ff6000;
            border-color: #ff6000;
            color: #fff;
          }
        }
      }
    }
    .is-available {
      font-size: 11pt;
      margin-bottom: 1.3rem;
      padding-inline-start: 35px;
      font-weight: bold;
    }
    .product-actions {
      .short-links {
        margin-inline-end: 0.5rem;
        min-width: 10rem;
        a {
          display: block;
          color: #676565;
          font-size: 11pt;
          &:hover {
            color: #ed2124;
          }
          span {
            margin-inline-start: 0.25rem;
          }
        }
      }
      .add-cart {
        border-radius: 0;
        font-size: 11pt;
        background: #36363b;
        color: #fff;
        padding: 1rem 2rem;
        height: fit-content;
        margin-inline-end: 0.5rem;
        display: block;
        min-width: 10rem;
        text-align: center;
        &:hover {
          background: #ed2124;
        }
      }
    }
  }
}
</style>
