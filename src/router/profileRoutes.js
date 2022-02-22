import profile from "../views/profile";
import Shop from "../views/profile/Shop";
import changePassword from "../views/profile/changePassword";
import Categories from "../views/profile/Categories";

export default {
  path: "/profile",
  name: "Profile",
  component: profile,
  children: [
    { path: "/profile/shop", name: "Shop", component: Shop },
    {
      path: "/profile/change-password",
      name: "changePassword",
      component: changePassword,
    },
    { path: "/profile/categories", name: "Categories", component: Categories },
  ],
};
