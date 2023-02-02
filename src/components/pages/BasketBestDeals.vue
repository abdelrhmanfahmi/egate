<template>
    <!-- best daes component that appera in home page in middle after deadline  -->
    <div class="product position-relative w-100 text-center single-supplier bg-white position-relative">

      <div class="supplier-data">
        <div class="thumb">
          <a
            @click="goProduct(deal)"
            v-if="deal.image_path !== null"
            class="d-flex justify-content-center align-items-center product-image"
          >
            <img
              :src="deal.image_path"
              alt="Product Image"
              class="Product-Image"
            />
          </a>
          <a
            @click="goProduct(deal)"
            v-else
            class="d-flex justify-content-center align-items-center product-image"
          >
            <img
              :src="deal.image_path"
              alt="Product Image"
              class="Product-Image"
            />
          </a>
          <div class="actions">
            <ul>
              <li v-if="buyerUserData">
                <router-link :to="{ path: '/basketOfferDetails', query: { id: deal.id } }" v-if="deal.is_favorite == true && dealType"  class="is_favorite">
                  <b-icon-heart></b-icon-heart>
                </router-link>
                <router-link :to="{ path: '/basketOfferDetails', query: { id: deal.id } }" v-else-if="deal.is_favorite == true && !dealType"  class="is_favorite">
                  <b-icon-heart></b-icon-heart>
                </router-link>
              </li>
              <li>
                <router-link v-if="dealType" :to="{ path: '/basketOfferDetails', query: { id: deal.id } }" @click="goPage2(deal)"><b-icon-eye></b-icon-eye></router-link>
                <router-link v-else :to="{ path: '/basketOfferDetails', query: { id: deal.id } }" @click="goPage2(deal)"><b-icon-eye></b-icon-eye></router-link>
              </li>
            </ul>
          </div>
          <div
            class="info d-flex flex-column align-items-center my-3"
            v-if="deal"
          >
            <router-link
              :to="{ path: '/basketOfferDetails', query: { id: deal.product_supplier_id } }"
              class="name text-dark"
              v-if="deal.title"
              ><h4>{{ deal.title }}</h4></router-link
            >
            <!-- <h4 v-if="deal.description" v-html="deal.description" ></h4> -->
            <div class="price">
              <h5 v-if="deal.basket_price">
                {{ deal.basket_price | fixedCurrency }}
                {{ currency }}
              </h5>
              <p
                class="m-0 price-after"
                v-if="
                  deal.discount_percentage &&
                  deal.discount_percentage >
                    deal.basket_price
                "
              >
                {{
                  deal.discount_percentage
                    | fixedCurrency
                }}
                {{ currency }}
              </p>
            </div>
          </div>
          <span class="discount d-block text-white" v-if="deal.discount_percentage">
            - {{ deal.discount_percentage }} %
          </span>
          <span class="new d-block text-white" v-if="deal.view_status_text">{{
            deal.view_status_text
          }}</span>
          <span class="new d-block text-white bg-white" v-else>
            &nbsp;
          </span>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { BIconHeart, BIconEye } from "bootstrap-vue";
  import globalAxios from "@/services/global-axios";
  export default {
    data() {
      return {
        errors:[]
      };
    },
    props: ["deal" , "dealType"],
    components: {
      BIconHeart,
      BIconEye,
    },
    methods: {
      /**
       * @vuese
        *  add product To Wishlist
      */
      addToWishlist(item) {
        let data = {
          product_supplier_id: item.id,
        };
        return globalAxios
          .post(`members/profile/favorite`, data)
          .then((res) => {
            if (res.status == 200) {
              this.sucessMsg(res.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      },
      /**
       * @vuese
        *  go to product page
      */
      goProduct(data) {
        this.$router.push({
          path: "/basketOfferDetails",
          query: {
            id: data.id,
          },
        });
        // location.reload();
      },
      /**
       * @vuese
        *  go to product page by supplier
      */
      goPage2(data) {
        this.$router.push({
          path: "/basketOfferDetails",
          query: {
            id: data.id,
          },
        });
        // location.reload();
      },
  
      /**
       * @vuese
        *  change value function
      */
  
      changevalue() {
        this.$emit('getWishlistData')
      },
      
    },
  };
  </script>
  <style lang="scss" scoped>
  /**
    *  component style
  */
  .product {
    margin: 1rem;
    .thumb {
      .actions {
        position: absolute;
        top: 25px;
        right: 25px;
        z-index: 1;
        transform: translateX(30px);
        transition: 0.3s linear;
        opacity: 0;
        ul {
          li {
            margin-bottom: 1rem;
            a {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 27px;
              height: 27px;
              background: #3a3a43;
              border-radius: 50%;
              color: #fff;
              &:hover {
                background: #ed2124;
              }
            }
          }
        }
      }
      &:hover {
        .actions {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .info {
        padding: 10px 0;
        .name {
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 6px;
          color: #544842;
          &:hover {
            color: #ed2124;
          }
        }
        .price {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #544842;
          font-family: "Almarai", sans-serif;
        }
      }
      .new,
      .discount {
        margin: 0.2rem 0;
      }
      .new {
        background: red;
      }
      .discount {
        background: #ca84ac;
      }
    }
  }
  .Product-Image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .is_favorite {
    background: #ed2124 !important;
  }
  </style>
  