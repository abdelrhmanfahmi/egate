<template>
  <div class="page-wrapper header sideHomeCategories">
    <nav class="menu">
      <h5 class="text-gray-dark mb-2">Categories</h5>
      <ul class="menu-main">
        <li
          class="menu-item-has-children"
          v-for="(x, index) in 10"
          :key="index"
        >
          <div class="hold-link d-flex justify-space-between align-center">
            <router-link to="/"     >
              <span title="Men">link - {{ index + 1 }}</span>
            </router-link>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </div>
          <div class="sub-menu mega-menu mega-menu-column-4">
            <div class="list-item">
              <h4 class="title">Men's Fashion</h4>
              <ul>
                <li><router-link to="/">T-Shirts</router-link></li>
                <li><router-link to="/">Jeans</router-link></li>
                <li><router-link to="/">Suit</router-link></li>
                <li><router-link to="/">Kurta</router-link></li>
                <li><router-link to="/">Watch</router-link></li>
              </ul>
              <h4 class="title">Beauty</h4>
              <ul>
                <li><router-link to="/">Moisturizer</router-link></li>
                <li><router-link to="/">Face powder</router-link></li>
                <li><router-link to="/">Lipstick</router-link></li>
              </ul>
            </div>
            <div class="list-item">
              <h4 class="title">Women's Fashion</h4>
              <ul>
                <li><router-link to="/">Sarees</router-link></li>
                <li><router-link to="/">Sandals</router-link></li>
                <li><router-link to="/">Watchs</router-link></li>
                <li><router-link to="/">Shoes</router-link></li>
              </ul>
              <h4 class="title">Furniture</h4>
              <ul>
                <li><router-link to="/">Chairs</router-link></li>
                <li><router-link to="/">Tables</router-link></li>
                <li><router-link to="/">Doors</router-link></li>
                <li><router-link to="/">Bed</router-link></li>
              </ul>
            </div>
            <div class="list-item">
              <h4 class="title">Home, Kitchen</h4>
              <ul>
                <li><router-link to="/">Kettle</router-link></li>
                <li><router-link to="/">Toaster</router-link></li>
                <li><router-link to="/">Dishwasher</router-link></li>
                <li>
                  <router-link to="/">Microwave oven</router-link>
                </li>
                <li><router-link to="/">Pitcher</router-link></li>
                <li><router-link to="/">Blender</router-link></li>
                <li><router-link to="/">Colander</router-link></li>
                <li><router-link to="/">Tureen</router-link></li>
                <li><router-link to="/">Cookware</router-link></li>
              </ul>
            </div>
            <div class="list-item">
              <!-- <img src="@/assets/images/logo.png" alt="image" /> -->
              <v-img
                src="@/assets/images/product/Image15.png"
                lazy-src="@/assets/images/product/Image15.png"
                class="img-fluid"
              ></v-img>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
