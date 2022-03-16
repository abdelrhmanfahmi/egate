<template>
  <div>
    <div class="cover text-center">
      <div
        class="cover-data p-5 d-flex justify-content-center align-items-center flex-column"
      >
        <b-container>
          <div class="cover-title">
            <h2>cover title</h2>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">{{ $t("Home") }}</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">{{ $t("Library") }}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ $t("Data") }}
                </li>
              </ol>
            </nav>
          </div>
        </b-container>
      </div>
    </div>
    <div class="data-holder py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-9 col-sm-12 mb-3">
            <div class="container" id="people">
              <div class="row">
                <div class="col-sm-4">
                  <!-- <b-form-select
                    v-model="category"
                    class="mb-3"
                    title="Please select an option"
                  >
                    <b-form-select-option-group label="Please select an option">
                      <b-form-select-option value="Accessories"
                        >AccessoriesA</b-form-select-option
                      >
                      <b-form-select-option value="Laptop"
                        >Laptop</b-form-select-option
                      >
                      <b-form-select-option value="Stationary"
                        >Stationary</b-form-select-option
                      >
                    </b-form-select-option-group>
                  </b-form-select> -->
                </div>
                <!-- <select name="" id="" v-model="category" labeel="select"> -->
                <select name="" id="" labeel="select">
                  <option value="AccessoriesA">AccessoriesA</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Stationary">Stationary</option>
                </select>
              </div>
              <!-- <ul>
                <li
                  v-for="product in filterProductsByCategory"
                  :key="product.id"
                >
                  Product Name : {{ product.name }} - Price :
                  {{ product.price }} ({{ product.category }})
                </li>
              </ul> -->
            </div>
          </div>
          <div class="col-md-3 col-sm-12 mb-3">
            <form class="xt-blog-form" role="search">
              <div class="input-group add-on">
                <input
                  class="form-control"
                  name="srch-term"
                  id="srch-term"
                  type="text"
                />
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="tabs-holder">
          <div class="tabs-content">
            <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab1">
                <div class="product-desc-content">
                  <p>tab1</p>
                </div>
              </div>

              <div class="tab-pane fade" id="tab2">
                <div class="product-desc-content">
                  <p>tab2</p>
                </div>
              </div>

              <div class="tab-pane fade" id="tab3">
                <div class="product-desc-content">
                  <p>tab3</p>
                </div>
              </div>

              <div class="tab-pane fade" id="tab4">
                <p>tab4</p>
              </div>
              <div class="tab-pane fade" id="tab5">
                <p>tab5</p>
              </div>
              <div class="tab-pane fade" id="tab6">
                <p>tab6</p>
              </div>
              <div class="tab-pane fade" id="tab7">
                <p>tab7</p>
              </div>
              <div class="tab-pane fade" id="tab8">
                <p>tab8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
export default {
  data() {
    return {
      id: this.$route.params.slug,
      tabsData: [
        {
          id: "tab1",
          title: this.$t("All"),
          active: true,
        },
        {
          id: "tab2",
          title: "tab2",
        },
        {
          id: "tab3",
          title: "tab3",
        },
        {
          id: "tab4",
          title: "tab4",
        },
        {
          id: "tab5",
          title: "tab5",
        },
        {
          id: "tab6",
          title: "tab6",
        },
        {
          id: "tab7",
          title: "tab7",
        },
        {
          id: "tab8",
          title: "tab8",
        },
      ],
      category: "",
      products: [
        { name: "Keyboard", price: 44, category: "Accessories" },
        { name: "Mouse", price: 20, category: "Accessories" },
        { name: "Monitor", price: 399, category: "Accessories" },
        { name: "Dell XPS", price: 599, category: "Laptop" },
        { name: "MacBook Pro", price: 899, category: "Laptop" },
        { name: "Pencil Box", price: 6, category: "Stationary" },
        { name: "Pen", price: 2, category: "Stationary" },
        { name: "USB Cable", price: 7, category: "Accessories" },
        { name: "Eraser", price: 2, category: "Stationary" },
        { name: "Highlighter", price: 5, category: "Stationary" },
      ],
    };
  },
  computed: {
    filterProductsByCategory: function () {
      return this.products.filter(
        (product) => !product.category.indexOf(this.category)
      );
    },
  },
  components: {
    Tabs,
  },
};
</script>

<style lang="scss" scoped>
.cover-data {
  //local now
  background: url("../../assets/images/cover.png") no-repeat center;
}
select {
  border: none;
  outline: none;
  box-shadow: none;
}
form {
  .xt-blog-form {
    margin-top: 50px;
  }
  .input-group-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #ccc;
    }
  }
}
input {
  &:hover,
  &:focus {
    box-shadow: none;
  }
}
</style>
