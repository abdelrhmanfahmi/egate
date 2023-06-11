# Cart

## Methods

<!-- @vuese:Cart:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|checkDynamicInputs|check Dynamic Inputs|-|
|changeCoupon|when change coupon|-|
|getCartProducts|get cart data from backend|-|
|removeFromCart|remove product from cart|-|
|removebasketFromCart|remove basket product from cart|-|
|removeDisabled|this fnction user when using the old coupon style to remove disaple input|-|
|checkCoupon|this fnction user when using the old coupon style to check coupon validity and dislay response and display data|-|
|loginFirst|login First if you want to add coupon if you'r a guest|-|
|ChangeQ|change quantity of product that in table|-|
|ChangebasketQ|change basket quantity  in table|-|
|closeModal|close modal|-|
|openModal|open modal|-|
|changeAddress|change selected address and display the result of new address|-|
|selectAddressUUID|select address uuid to pass it to ckeckout data and setting coasts data|-|
|selectType|select type (shipping or pickup ) and store it in store.js|-|
|getAllAdresses|address functions|-|
|getAllCountires|Countires|-|
|getAllRegions|getAllRegions|-|
|getAllCities|Cities|-|
|checkAddressesForm|// order-shipping page functions checkAddressesForm|-|
|createAdress|createAdress|-|
|localStoreAdresses|store address if guest|-|
|getSupplierAddress|supplier addresses pickup addresses|-|
|changeShipping|choose shipping|-|
|changePickup|choose pickup|-|
|shippingStore|store shipping data to store.js|-|
|getShippingFeesExist|get first shipping fees of suppliers|-|
|getLoggedFirstShippingFees|get shipping fee of supplier to user|-|
|getGuestFirstShippingFees|get shipping fee of supplier to guest|-|
|checkSupplierFees|check SupplierFees|-|
|toggleOptionsSelect|toggle Options Select|-|
|closeOptions|close Options|-|
|payment|user payment|-|
|guestPayment|guest  payment|-|
|paymentGetAllCountires|payment GetAll Countires|-|
|paymentGetAllRegions|getAllRegions|-|
|paymentGetAllCities|Cities|-|
|getTerms|get terms|-|
|acceptMyTerms|check terms as true|-|
|getWallet|get wallet data|-|
|ChangeRateValue|change payment coasts after change quantity of product|-|
|changeCouponStatus|change Coupon Status|-|
|goTop|got to the top of page|-|
|handleScroll|handleScroll|-|
|addCoupon|add new coupon|-|
|removeMyCoupon|remove exist coupon|-|
|uploadBankImage|upload bank file when select bank payment method|-|
|getCompanyIban|get Company Iban|-|

<!-- @vuese:Cart:methods:end -->


## Computed

<!-- @vuese:Cart:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|newPrice|-|check newPrice|No|
|mySuppliers|-|get suppliers function|Yes|

<!-- @vuese:Cart:computed:end -->


## Data

<!-- @vuese:Cart:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|form|`Object`|if logged in|-|
|newForm|`Object`|if not logged in|-|
|count|`Number`|payment|0|
|paymentFormData|`Object`|collect all checkout data here|-|

<!-- @vuese:Cart:data:end -->


