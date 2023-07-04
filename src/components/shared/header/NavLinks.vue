<template>
    <nav class="menu">
        <div class="mobile-menu-head">
          <div class="go-back">
            <v-icon icon="mdi-chevron-left"></v-icon>
          </div>
          <div class="current-menu-title"></div>
          <div class="mobile-menu-close">&times;</div>
        </div>
        <ul class="menu-main header-main-links">
          <!-- <li class="menu-item-has-children">
            <router-link to="/">
              <span title="Men">link</span>
              <v-icon icon="mdi-chevron-down"></v-icon
            ></router-link>
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
                <img src="@/assets/images/logo.png" alt="image" />
              </div>
              <v-img
                src="@/assets/images/product/Image15.png"
                lazy-src="@/assets/images/product/Image15.png"
                width="100"
              ></v-img>
            </div>
          </li> -->
        
        <li class="menu-item-has-children">
          <router-link to="/" class="text-white">Home</router-link>
        </li>
        <li class="menu-item-has-children">
          <router-link to="/categories" class="text-white">All categories</router-link>
        </li>
        <li class="menu-item-has-children">
          
          <router-link to="/profile" class="text-white">My Account</router-link>
        </li>
        <li class="menu-item-has-children">
          Returns / Exchange
        </li>
        <li class="menu-item-has-children">
          <router-link to="/faq" class="text-white">FAQs</router-link>
        </li>
        </ul>
      </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>