<template>
    <div>
      <div class="container">
        <div class="card success" >
          <div
            style="
              border-radius: 200px;
              height: 200px;
              width: 200px;
              background: #f8faf5;
              margin: 0 auto;
            "
          >
            <i class="checkmark">✓</i>
          </div>
          <h4 class="mt-3">
            {{ $t("profile.checkMail") }}
          </h4>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        
      };
    },

  };
  </script>
  
  <style lang="scss" scoped>

  h1 {
    color: #88b04b;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-weight: 900;
    font-size: 40px;
    margin-bottom: 10px;
  }
  p {
    color: #404f5e;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    margin: 0;
  }
  i {
    color: #9abc66;
    font-size: 100px;
    line-height: 200px;
    margin-left: -15px;
  }
  .card {
    background: white;
    padding: 60px;
    border-radius: 4px;
    box-shadow: 0 2px 3px #c8d0d8;
    margin: 0 auto;
  }
  .success {
    h1 {
      color: #88b04b;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    }
    i {
      color: #9abc66;
    }
  }
  .fail {
    h1 {
      color: $main-color;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    }
    i {
      color: $main-color;
    }
  }
  </style>
  