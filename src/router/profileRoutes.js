import profile from "../views/profile";
import Categories from "../views/profile/Categories";
import ShoppingCart from "../views/profile/ShoppingCart";
import AccountInformation from "../views/profile/AccountInformation";
import AdressBook from "../views/profile/AdressBook";
import SubscribeNewsletter from "../views/profile/SubscribeNewsletter";
import Favorite from "../views/profile/Favorite";
import changePassword from "../views/profile/changePassword";

export default {
  path: "/profile",
  name: "Profile",
  component: profile,
  children: [
    { path: "/profile/categories", name: "Categories", component: Categories },
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
      path: "/profile/adress-book",
      name: "AdressBook",
      component: AdressBook,
    },
    {
      path: "/profile/subscribe-newsletter",
      name: "SubscribeNewsletter",
      component: SubscribeNewsletter,
    },
    {
      path: "/profile/favorite",
      name: "Favorite",
      component: Favorite,
    },
    {
      path: "/profile/change-password",
      name: "changePassword",
      component: changePassword,
    },
  ],
};
