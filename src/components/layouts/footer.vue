<template>
  <section class="user-footer">
        <footer class="dark-bg pt-100 pb-80">
            <div class="container">
                <div class="footer-top-wrap">
                    <div class="row">
                        <div class="col-12">
                            <div class="footer-logo">
                                <a href="https://humhum.work/user-interface/public/en_kw"><img src="@/assets/images/mysupply-logo.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-middle-wrap">
                    <div class="row">
                        <div class="col-12">
                            <div class="footer-link-wrap">
                                <nav class="menu-links">
                                    <ul>
                                        <li><router-link to="">{{ $t("home.about") }}</router-link></li>
                                        <li><router-link to="">{{ $t("home.contactUs") }}</router-link></li>
                                        <li><router-link to="">{{ $t("home.suppliers") }}</router-link></li>
                                        <li><router-link to="">{{ $t("home.suppliers") }}</router-link></li>
                                        <li><router-link to="">{{ $t("home.suppliers") }}</router-link></li>
                                        <li><router-link to="">{{ $t("home.suppliers") }}</router-link></li>
                                    </ul>
                                </nav>
                                <div class="footer-social">
                                    <ul>
                                        <li><router-link to=""><i class=""></i></router-link></li>
                                        <li><router-link to=""><img src="https://humhum.work/user-interface/public/assets/img/images/f.png" alt=""></router-link></li>                                        
                                        <li><router-link to=""><img src="https://humhum.work/user-interface/public/assets/img/images/t.png" alt=""></router-link></li>                                        
                                        <li><router-link to=""><img src="https://humhum.work/user-interface/public/assets/img/images/y.png" alt=""></router-link></li>                                        
                                        <li><router-link to=""><img src="https://humhum.work/user-interface/public/assets/img/images/i.png" alt=""></router-link></li>                                        
                                        <li><router-link to=""><img src="https://humhum.work/user-interface/public/assets/img/images/l.png" alt=""></router-link></li>                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copyright-wrap">
                    <div class="row">

                        <div class="col-lg-8" style="">
                            <div class="pay-method-img d-none">
                                <img src="img/images/payment.png" alt="">
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="copyright-text">
                                <p>© 2022 <a href="https://humhum.work/user-interface/public/en_kw">{{ $t("home.mySupply") }}</a>. {{ $t("home.allRightsReserved") }}</p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
/* 21. Footer */
.dark-bg{
        background: #262626;
}
.pb-80{
    padding-bottom: 80px;
}
.pt-100{
    padding-top: 100px;
}
.footer-top-wrap {
    padding: 0 0 40px;
    border-bottom: 1px solid #1c1c1c;
    position: relative;
}
.footer-top-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 150px;
    background: #bc3e00;
    height: 1px;
    margin: 0 auto;
    z-index: 1;
}
.footer-logo {
    text-align: center;
    img{
       height: 75px;
    width: 75px;
    }
}
.footer-link-wrap {
    display: flex;
    padding: 30px 0 0;
    direction: rtl;
    text-align: left;
}
.footer-link-wrap .menu-links {
	flex-grow: 1;
}
.footer-link-wrap .menu-links ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    direction: ltr;
}
.footer-link-wrap .menu-links li {
	margin-left: 40px;
}
.footer-link-wrap .menu-links li:last-child {
	margin-right: 48px;
}
.footer-link-wrap .menu-links li a {
    display: block;
    font-size: 13px;
    color: #898481;
    font-family: 'Almarai', sans-serif;
    text-transform: uppercase;
    padding: 10px 9px;
    &:hover{
            color: #ed2124;
    }
}
.footer-social ul {
    display: flex;
    align-items: center;
}
.footer-social ul li + li {
	margin-left: 18px;
}
.footer-social ul li a {
	font-size: 13px;
	color: #898481;
}
.footer-social {
    margin-right: 108px;
}
.copyright-wrap {
    margin-top: 27px;
}
.copyright-text {
    p {
        margin-bottom: 0;
        font-size: 13px;
        text-transform: uppercase;
        color: #898481;
        font-family: 'Almarai', sans-serif;
    }
    a{
            color: #ed2124;
    }
}
.pay-method-img {
    text-align: revert;
    margin-left: 0;
}
.pay-method-img img {
	max-width: 100%;
}
.footer-style-two .footer-top-wrap {
    border-bottom: 1px solid #d0cfcb;
}
.footer-style-two .footer-top-wrap::after {
    opacity: .35;
}
.footer-widget .fw-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 22px;
    text-transform: uppercase;
}
.fw-link ul li + li {
    margin-top: 8px;
}
.fw-link ul li a {
    font-size: 16px;
    color: #747372;
    font-family: 'Almarai', sans-serif;
    display: inline-block;
    position: relative;
}
.fw-link ul li a:hover {
    color: #312620;
}
.fw-link ul li a::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #66605c;
    -webkit-transform-origin: right top;
    -ms-transform-origin: right top;
    transform-origin: right top;
    -webkit-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    transform: scale(0, 1);
    -webkit-transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
    transition: transform 0.4s cubic-bezier(.74,.72,.27,.24);
}
.fw-link ul li a:hover::before {
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    transform: scale(1, 1);
}
.footer-style-two .footer-social {
    margin-left: 0;
}
.footer-text p {
    margin-bottom: 12px;
    font-size: 16px;
    color: #757473;
    font-family: 'Almarai', sans-serif;
}
.footer-style-two .copyright-wrap {
    margin-top: 0;
    background: #e8e6e2;
    padding: 25px 0;
}
.footer-style-two.gray-bg {
    background: #f8f7f2;
}
.footer-style-three.gray-bg {
    background: #f5f5f5;
}
.footer-style-three .copyright-wrap {
    background: #e9e9e9;
}
.footer-style-two .copyright-wrap.gray-light-bg {
    background: #ebeded;
}

/* Medium devices (tablets, 768px and up) */
@media (max-width: 767.98px) {
  .footer-link-wrap .menu-links li a{
      padding:  10px 0;
  }
.footer-link-wrap {
    display: block;
}
.footer-social {
    margin-left: 0;
    margin-top: 15px;
    margin-right: auto
}
.copyright-text {
    text-align: center;
    margin-bottom: 20px;
}
.copyright-wrap {
    margin-top: 45px;
}
.footer-social ul {
    justify-content: center;
}
.footer-link-wrap .menu-links ul {
    justify-content: center;
}
.footer-link-wrap .menu-links li,
.footer-link-wrap .menu-links li:last-child {
    margin: 0 20px;
}

.footer-style-two .footer-social ul {
    justify-content: flex-start;
}

}

// style arabic
html:lang(ar) {
  .footer-link-wrap .menu-links ul{
      direction: rtl;
  }
  .footer-link-wrap .menu-links li:last-child{
          margin-right: 0;
  }

}

</style>