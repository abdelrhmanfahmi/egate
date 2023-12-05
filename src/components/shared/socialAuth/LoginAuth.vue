<template>
  <div>
    <div class="social-login">
      <a href="#" class="google btn d-flex align-center">
        <span class="icon google-icon">
          <img :src="require('@/assets/images/auth/google-icon.png')" alt="" srcset="">
        </span>

        <span>Sign In With Google</span>
      </a>

      <a href="#" class="apple btn d-flex align-center">
        <span class="icon apple-icon"><img :src="require('@/assets/images/auth/apple-icon.png')" alt="" srcset=""></span>
        <span>Sign In With Apple</span>
      </a>
      <a href="#" class="fb btn d-flex align-center">
        <span class="icon facebbok-icon ">
          <img :src="require('@/assets/images/auth/face-icon.png')" alt="" srcset="">
        </span> <span>Sign In With
          Facebook</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.social-login {

  display: flex;
  justify-content: center;
  flex-direction: column;


  /* style inputs and link buttons */
  input,
  .btn {
    border: none;
    border-radius: 10px;
    margin: 13px 0;
    font-size: 17px;
    // line-height: 20px;
    text-decoration: none;

    span {
      padding: 7px 10px;
    }

    /* remove underline from anchors */
  }

  input:hover,
  .btn:hover {
    opacity: 1;
  }

  /* add appropriate colors to fb, apple and google buttons */
  .fb {
    background-color: #3975EA;
    color: white;
  }

  .icon {
    margin: 0 20px 0 0;

    img {
      width: 30px
    }

    .google {
      background: #fff;
    }
  }

  .google-icon {
    background: #fff;
    border-radius: 10px 0 0 10px;
    border: 1px solid #4286F5;
  }

  .apple {
    background-color: #000000;
    color: white;
  }

  .google {
    background-color: #4286F5;
    color: white;
  }

  /* style the submit button */
  input[type=submit] {
    background-color: #04AA6D;
    color: white;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  /* Two-column layout */
  .col {
    float: left;
    width: 50%;
    margin: auto;
    padding: 0 50px;
    margin-top: 6px;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  /* vertical line */
  .vl {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    border: 2px solid #ddd;
    height: 175px;
  }

  /* text inside the vertical line */
  .vl-innertext {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 8px 10px;
  }

  /* hide some text on medium and large screens */
  .hide-md-lg {
    display: none;
  }

  /* bottom container */
  .bottom-container {
    text-align: center;
    background-color: #666;
    border-radius: 0px 0px 10px 10px;
  }

  /* Responsive layout - when the screen is less than 650px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 650px) {
    .col {
      width: 100%;
      margin-top: 0;
    }

    /* hide the vertical line */
    .vl {
      display: none;
    }

    /* show the hidden text on small screens */
    .hide-md-lg {
      display: block;
      text-align: center;
    }
  }

  .login-image {

    img {
      width: 330px;

    }
  }
}
</style>