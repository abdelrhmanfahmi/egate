import profile from "../views/profile";
import Shop from "../views/profile/Shop";
import ShoppingCart from "../views/profile/ShoppingCart";
import changePassword from "../views/profile/changePassword";
import Categories from "../views/profile/Categories";
import AccountInformation from "../views/profile/AccountInformation";

export default {
  path: "/profile",
  name: "Profile",
  component: profile,
  children: [
    { path: "/profile/shop", name: "Shop", component: Shop },
    {
      path: "/profile/shopping-cart",
      name: "ShoppingCart",
      component: ShoppingCart,
    },
    {
      path: "/profile/account-information",
      name: "AccountInformation",
      component: AccountInformation,
    },
    {
      path: "/profile/change-password",
      name: "changePassword",
      component: changePassword,
    },
    { path: "/profile/categories", name: "Categories", component: Categories },
  ],
};
