<template>
  <div class="side-links">
    <ul>
      <li v-for="(link, index) in sideLinks" :key="index">
        <router-link :to="`/profile/` + link.to" class="link"
          ><span>{{ link.name }}</span></router-link
        >
      </li>
      <li>
        <a @click.prevent="logOut" class="link cursor-pointer"><span>Log Out</span></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideLinks: [
        {
          name: "My Account",
          to: "account",
        },
        {
          name: "My Orders",
          to: "orders",
        },
        {
          name: "My Wish List",
          to: "wishlist",
        },
        {
          name: "Address Book",
          to: "addresses",
        },
        // {
        //   name: "Account Information",
        //   to: "account-information",
        // },
        // {
        //   name: "My Product Reviews",
        //   to: "reviews",
        // },
        // {
        //   name: "Newsletter Subscriptions",
        //   to: "newsLetters",
        // },
        // {
        //   name: "Store Credit & Refunds",
        //   to: "refunds",
        // },
        // {
        //   name: "My Social Accounts",
        //   to: "social-accounts",
        // },
        {
          name: "My Returns",
          to: "returns",
        },
      ],
    };
  },
  methods:{
    async logOut(){
      await this.$store.dispatch('Auth/LogOut');
    }
  }
};
</script>

<style lang="scss" scoped>
.link-holder {
  padding: 15px 20px;
  border-radius: 8px;
}
a {
  margin: 27px 0;
  display: block;
  color: #33322d !important;
}
.router-link-exact-active {
  color: #33322d !important;
  span {
    background: $main-color;
    width: 100%;
    display: block;
    border-radius: 10px;
    padding: 14px 30px 14px 18px;
    margin: auto -14px;
    color: #fff;
  }
}
</style>

