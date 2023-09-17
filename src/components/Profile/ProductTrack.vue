<template>
  <div class="page-wrapper">
    <div class="progressContainer">
      <ul class="progress">
        <li class="progress__item progress__item--completed">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Order Sent</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
        <li class="progress__item progress__item--active">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Ready For Shipping</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
        <li class="progress__item">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Dispatched</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
        <li class="progress__item">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Xyz Distribution Station</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
        <li class="progress__item">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Abc Distribution Station</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
        <li class="progress__item">
          <div class="d-md-flex d-block justify-space-between">
            <div class="">
              <p class="progress__title">Delivered</p>
            </div>
            <div class="text-gray-dark">June 11, 2022, 17:33</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
// CONFIG
$SPACER_XS: 0.5rem;
$SPACER_SM: 0.75rem;
$SPACER: 1rem;
$SPACER_MD: 1.5rem;
$SPACER_LG: 2rem;
$BORDER_RADIUS: 3px;
$PROGRESS_HEIGHT: 600px;
$PROGRESS_LIST_HEIGHT: 75px;
$PROGRESS_COUNTER_WIDTH: 26px;
$LIST_ITEM_WIDTH: 100px;
$PROGRESS_BG: #392a60;
$BODY_BG: #2e1f47;
$ICON_COLOR: #f3597d;
.page-wrapper {
  p {
    font-size: 13px;
    margin: 0 0 11px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  header {
    text-align: center;
    margin-bottom: $SPACER_LG * 2;
    h1 {
      font-size: 1.8rem;
      line-height: 2.1rem;
    }
    p {
      margin-top: $SPACER;
    }
    .icon {
      color: $ICON_COLOR;
    }
  }

  // THE GOOD STUFF
  .progressContainer {
    position: relative;
    padding: $SPACER_LG;
    color: $gray;
  }

  .progress {
    position: relative;
    padding: 0 $SPACER 0 3.5rem;
    margin: $SPACER_LG 0 0;
    list-style: none;
  }

  .progress__item {
    position: relative;
    min-height: $PROGRESS_LIST_HEIGHT;
    counter-increment: list;
    padding-left: $SPACER_XS;
    &:before {
      content: "";
      position: absolute;
      left: -1.7rem;
      top: 29px;
      height: 60%;
      width: 1px;
      border-left: 2px solid #64b0fc;
    }
    &:after {
      //content: counter(list);
      content: "";
      position: absolute;
      top: 0;
      left: -2.5rem;
      width: $PROGRESS_COUNTER_WIDTH;
      height: $PROGRESS_COUNTER_WIDTH;
      border-radius: 50%;
      background: transparent;
      color: $gray;
      font-weight: 400;
      font-size: 13px;
      line-height: 26px;
      text-align: center;
      border: 2px solid #bfcbe3;
    }
    //Hide border for Last Step
    &:last-child {
      &:before {
        border: none;
      }
    }
    //Completed
    &.progress__item--completed {
      opacity: 0.6;
      color: #fff;
      &:after {
        //@at-rootcontent: "\2713";
        content: "";
        font-weight: 400;
        background: #fff;
        color: $PROGRESS_BG;
      }
    }
    //Active
    &.progress__item--active {
      &:after {
        background: #1da521;
        color: $PROGRESS_BG;

        border: 3px solid #fff;
        box-shadow: 0 0 0px 3px #1da521;
      }
    }
  }

  .progress__title {
    font-size:16px;
  }

  .progress__info {
    font-size: 13px;
  }
}
</style>
