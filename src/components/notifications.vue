<template>
  <div class="notifications notifications-content">
    <div class="notification-ui_dd-content">
      <div
        class="notification-list "
        v-for="(x, index) in 6"
        :key="index"
      >
        <div class="row">
        <div class="col-md-3 col-sm-12">
            <div class="notification-list_feature-img">
              <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
            </div>
          </div>
          <div class="col-md-9 col-sm-12">
            <div class="notification-list_detail">
              <p><b>John Doe</b> reacted to your post</p>
              <p><small>10 mins ago</small></p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="notification-ui_dd-footer">
      <router-link
        to="/profile/Notifications"
        class="btn btn-success btn-block"
        >{{ $t("cart.viewAll") }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notifications {
  position: relative;
  right: 0;
  background: #fff;
  opacity: 0;
  padding: 1.5rem;
  position: absolute;
  top: 2rem;
  transition: all 0.5s ease 0s;
  z-index: 9;
  box-shadow: 0px 12px 24px 0px rgb(120 120 120 / 30%);
  visibility: hidden;
  transform: translateY(10px);
  width: 23rem;

  .notification-ui a:after {
    display: none;
  }

  .notification-ui_icon {
    position: relative;
  }

  .notification-ui_icon .unread-notification {
    display: inline-block;
    height: 7px;
    width: 7px;
    border-radius: 7px;
    background-color: #66bb6a;
    position: absolute;
    top: 7px;
    left: 12px;
  }

  @media (min-width: 900px) {
    .notification-ui_icon .unread-notification {
      left: 20px;
    }
  }

  .notification-ui_dd {
    padding: 0;
    border-radius: 10px;
    -webkit-box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.16);
    box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.16);
    border: 0;
    max-width: 400px;
  }

  @media (min-width: 900px) {
    .notification-ui_dd {
      min-width: 400px;
      position: absolute;
      left: -192px;
      top: 70px;
    }
  }

  .notification-ui_dd:after {
    content: "";
    position: absolute;
    top: -30px;
    left: calc(50% - 7px);
    border-top: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
    border-left: 15px solid transparent;
  }

  .notification-ui_dd .notification-ui_dd-header {
    border-bottom: 1px solid #ddd;
    padding: 15px;
  }

  .notification-ui_dd .notification-ui_dd-header h3 {
    margin-bottom: 0;
  }

  .notification-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 25px;
    border-bottom: 1px solid #ddd;
  }

  .notification-list--unread {
    position: relative;
  }

  .notification-list--unread:before {
    content: "";
    position: absolute;
    top: 0;
    left: -25px;
    height: calc(100% + 1px);
    border-left: 2px solid #29b6f6;
  }

  .notification-list .notification-list_img img {
    height: 48px;
    width: 48px;
    border-radius: 50px;
  
  }

  .notification-list .notification-list_detail p {
    margin-bottom: 5px;
    line-height: 1.2;
  }

  .notification-list .notification-list_feature-img img {
    height: 48px;
    width: 48px;
    border-radius: 5px;
  
  }
  .notification-ui_dd-footer {
    margin-top: 20px;
  }
  .notification-ui_dd-content {
    height: 360px;
    overflow-y: scroll;
  }
}
</style>
