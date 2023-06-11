# Counter

## Props

<!-- @vuese:Counter:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|quantity|quantity prop|`Number`|`true`|0|
|product|-|product prop|`true`|-|
|minimum|-|minimum prop|`false`|1|

<!-- @vuese:Counter:props:end -->


## Events

<!-- @vuese:Counter:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|changeTitle|this event affected on the component main page|-|

<!-- @vuese:Counter:events:end -->


## Slots

<!-- @vuese:Counter:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|main|@slot Use this slot header|<span class="product-counter-number"> {{ countValue }}</span>|

<!-- @vuese:Counter:slots:end -->


## Methods

<!-- @vuese:Counter:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|incrementQuantity|increament function|-|
|decrementQuantity|decreament function|-|
|CustomIncrementQuantity|custom increament for input|-|
|delayChange|this function user for delay Change|-|

<!-- @vuese:Counter:methods:end -->


