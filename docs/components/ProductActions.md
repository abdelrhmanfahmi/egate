# ProductActions

import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";

## Props

<!-- @vuese:ProductActions:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|myProduct|selected Product prop|`Object`|`true`|-|

<!-- @vuese:ProductActions:props:end -->


## Methods

<!-- @vuese:ProductActions:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|addToCart|add product to cart|-|
|addPromotionToCart|add To Cart function|-|
|addToCartWithRFQ|add product to cart with rfq|-|
|loginFirst|login first|-|
|requestQuotation|rfq request|-|
|loggedBidRequest|login rfq request|-|
|selectedOption|select standing order option|-|
|incrementQuantity|increment Quantity|-|
|decrementQuantity|decrement Quantity|-|
|closeModal|close Modal|-|
|openModal|open Modal|-|
|addToWishlist|add product to favorite|-|
|productDetails|get product details|-|
|sendSupplierMessage|send message to supplier|-|
|removeFromWishlist|remove product From Wishlist|-|
|showDeleteModal|this function used to show Delete Modal|-|
|hideDeleteModal|this function used to hide Delete Modal|-|

<!-- @vuese:ProductActions:methods:end -->


## Computed

<!-- @vuese:ProductActions:computed:start -->
|Computed|Type|Description|From Store|
|---|---|---|---|
|url|-|get url to share socially|No|

<!-- @vuese:ProductActions:computed:end -->


