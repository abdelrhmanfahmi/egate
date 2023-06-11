# BasketCounter

## Props

<!-- @vuese:BasketCounter:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|quantity|quantity prop|`Number`|`true`|0|
|product|-|product prop|`true`|-|
|minimum|-|minimum prop|`false`|1|

<!-- @vuese:BasketCounter:props:end -->


## Events

<!-- @vuese:BasketCounter:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|changeTitle|-|-|

<!-- @vuese:BasketCounter:events:end -->


## Slots

<!-- @vuese:BasketCounter:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|main|@slot Use this slot header|<span class="product-counter-number"> {{ countValue }}</span>|

<!-- @vuese:BasketCounter:slots:end -->


## Methods

<!-- @vuese:BasketCounter:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|incrementQuantity|this function user for increment Quantity|-|
|decrementQuantity|this function user for decrement Quantity|-|
|CustomIncrementQuantity|custom increament for input|-|
|delayChange|this function user for delay Change|-|

<!-- @vuese:BasketCounter:methods:end -->


