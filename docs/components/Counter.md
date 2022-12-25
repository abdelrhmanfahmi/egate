# Counter

## Props

<!-- @vuese:Counter:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|quantity|-|`Number`|`true`|0|
|product|-|`Object`|`false`|-|
|minimum|-|`Number`|`false`|1|

<!-- @vuese:Counter:props:end -->


## Events

<!-- @vuese:Counter:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|changeTitle|-|-|

<!-- @vuese:Counter:events:end -->


## Slots

<!-- @vuese:Counter:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|main|@slot Use this slot header|<span class="product-counter-number"> {{ countValue }}</span>|

<!-- @vuese:Counter:slots:end -->


