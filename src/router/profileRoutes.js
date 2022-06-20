import profile from "../views/profile";
import Categories from "../views/profile/Categories";
import ShoppingCart from "../views/profile/ShoppingCart";
import AccountInformation from "../views/profile/AccountInformation";
import AdressBook from "../views/profile/AdressBook";
import SubscribeNewsletter from "../views/profile/SubscribeNewsletter";
import Favorite from "../views/profile/Favorite";
import changePassword from "../views/profile/changePassword";

// b2bProfile
import AccountInformationB2b from "../views/profile/AccountInformationB2b";
import productReviews from "../views/profile/productReviewsB2b";
import DocumentsB2b from "../views/profile/DocumentsB2b.vue";
import SupplierRatingB2b from "../views/profile/SupplierRatingB2b.vue";
import QuotationsB2b from "../views/profile/QuotationsB2b.vue";
import BankNotificationsB2b from "../views/profile/BankNotificationsB2b.vue";
import ResidentsB2b from "../views/profile/ResidentsB2b.vue";
import SupplierCorrespondenceB2b from "../views/profile/SupplierCorrespondenceB2b.vue";
import OrdersListsB2b from "../views/profile/OrdersListsB2b.vue";
import GiftCardB2b from "../views/profile/GiftCardB2b.vue";
import ReturnRequests from "../views/profile/ReturnRequests.vue";
import Wallet from "../views/profile/Wallet.vue";




export default {
  path: "/profile",
  name: "Profile",
  component: profile,
  children: [
    { path: "/profile/categories", name: "Categories", component: Categories },
    { path: "/profile/documents", name: "Documents", component: DocumentsB2b },
    {
      path: "/profile/supplierRatingB2b",
      name: "SupplierRatingB2b",
      component: SupplierRatingB2b,
    },
    {
      path: "/profile/quotationsB2b",
      name: "QuotationsB2b",
      component: QuotationsB2b,
    },
    
    {
      path: "/profile/BankNotificationsB2b",
      name: "BankNotificationsB2b",
      component: BankNotificationsB2b,
    },
    {
      path: "/profile/ResidentsB2b",
      name: "ResidentsB2b",
      component: ResidentsB2b,
    },
    {
      path: "/profile/SupplierCorrespondenceB2b",
      name: "SupplierCorrespondenceB2b",
      component: SupplierCorrespondenceB2b,
    },
    {
      path: "/profile/OrdersListsB2b",
      name: "OrdersListsB2b",
      component: OrdersListsB2b,
    },
    {
      path: "/profile/GiftCardB2b",
      name: "GiftCardB2b",
      component: GiftCardB2b,
    },
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
    {
      path: "/profile/account-information-b2b",
      name: "AccountInformationB2b",
      component: AccountInformationB2b,
    },
    {
      path: "/profile/product-reviews-b2b",
      name: "productReviews",
      component: productReviews,
    },
    {
      path: "/profile/ReturnRequests",
      name: "ReturnRequests",
      component: ReturnRequests,
    },
    {
      path: "/profile/Wallet",
      name: "Wallet",
      component: Wallet,
    },
    
    
  ],
};
