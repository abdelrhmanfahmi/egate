<template>
    <!-- contact page  -->
    <div class="mb-4">
        <v-app>
            <div class="wrapper">
                <div class="container h-100">
                    <v-breadcrumbs :items="items" class="text-gray">
                        <template v-slot:prepend>
                            <v-icon size="small" icon="mdi-home"></v-icon>
                        </template>
                        <template v-slot:divider>
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </template>
                    </v-breadcrumbs>

                    <h1 class="text-center">CONTACT US</h1>
                    <div class="row h-100 w-100">
                        <div class="col-md-6 styleBackDiv">
                            <h3 class="text-white text-center">Contact Info</h3>
                            <br>
                            <br>
                            <div class="styleDivBlockAll">
                                <div class="styleDivContactInside">
                                    <ul>
                                        <li>
                                            <div>
                                                <span>
                                                    <img :src="require('@/assets/images/home/phoneContact.png')" alt="">
                                                </span>
                                                &nbsp;&nbsp;
                                                <p>+ (202) 22684500</p>
                                            </div>
                                        </li>
                                        <br>
                                        <li>
                                            <div>
                                                <span>
                                                    <img :src="require('@/assets/images/home/emailContact.png')" alt="">
                                                </span>
                                                &nbsp;&nbsp;
                                                <p>E-Gate@Gmail.Com</p>
                                            </div>
                                        </li>
                                        <br>
                                        <li>
                                            <div>
                                                <span>
                                                    <img :src="require('@/assets/images/home/locationContact.png')" alt="">
                                                </span>
                                                &nbsp;&nbsp;
                                                <p>1150/8 Emtedad Abd El Hamid Badawy St., New Giza
                                                    Buildings, Cairo, Egypt</p>
                                            </div>
                                        </li>
                                        <br>
                                        <li>
                                            <div>
                                                <span>
                                                    <img :src="require('@/assets/images/home/hotLineContact.png')" alt="">
                                                </span>
                                                &nbsp;&nbsp;
                                                <p>16466 (Hotline)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <br>
                                <br>
                                <div class="styleDivSocial">
                                    <a href="#">
                                        <img :src="require('@/assets/images/home/linkedinContact.svg')" alt="">
                                    </a>
                                    <a href="#">
                                        <img :src="require('@/assets/images/home/instagramContact.svg')" alt="">
                                    </a>
                                    <a href="#">
                                        <img :src="require('@/assets/images/home/facebookContact.svg')" alt="">
                                    </a>
                                    <a href="#">
                                        <img :src="require('@/assets/images/home/instagramContact.svg')" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 styleBackDivTwo">
                            <h3 class="text-center" style="color:#0048D9">Send Us A Message</h3>
                            <p class="text-center" style="color: #6A6A6A;">We Are Always Here To Help You</p>

                            <Form id="submitForm" @submit="storeContactForm" class="styleForm">
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3">
                                        <label>Your Name<span class="text-danger">*</span></label>
                                        <Field type="text" name="name" class="form-control" :rules="isRequired" />
                                        <ErrorMessage class="text-danger" name="name" />
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3">
                                        <label>Your Email<span class="text-danger">*</span></label>
                                        <Field type="email" name="email" class="form-control" :rules="validateEmail" />
                                        <ErrorMessage style="font-size: 12px;" class="text-danger" name="email" />
                                    </div>
                                </div>
                                <div class="row d-flex justify-content-start">
                                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3">
                                        <label>Phone Number<span class="text-danger">*</span></label>
                                        <Field type="text" name="phone" class="form-control" :rules="isRequired" />
                                        <ErrorMessage class="text-danger" name="phone" />
                                    </div>
                                </div>
                                <div class="col mb-3">
                                    <label>Subject<span class="text-danger">*</span></label>
                                    <Field type="text" class="form-control" name="subject" :rules="isRequired" />
                                    <ErrorMessage class="text-danger" name="subject" />
                                </div>
                                <div class="col mb-4">
                                    <Field id="message" name="message" as="textarea" cols="30" rows="10"
                                        class="form-control" style="resize: none;" placeholder="Write Your Message Here ..."
                                        :rules="isRequired" />
                                    <ErrorMessage class="text-danger" name="message" />
                                </div>
                                <div class="col mb-3">
                                    <button class="btn btn-primary StyleSendButton">Send</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </v-app>
    </div>
</template>

<script>
import home from "@/services/home";
import { useMeta } from "vue-meta";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    setup() {
        useMeta({
            title: "Contact-Us",
            htmlAttrs: { lang: "en", amp: true },
        });
    },

    data() {
        return {
            items: [
                {},
                {
                    title: "CONTACT US",
                    disabled: true,
                    href: "contact",
                },
            ],
        };
    },
    methods: {
        async storeContactForm(values, { resetForm }) {
            const toast = useToast();
            try {
                const response = await home.storeContactUsForm(values);
                if (response.status == 200) {
                    toast.success(`${response.data.message}`, {
                        position: "top-right",
                        transition: "slide",
                        hideProgressBar: false,
                        showIcon: true,
                        timeout: 3000,
                        showCloseButton: true,
                        swipeClose: true,
                    });
                    resetForm();
                }
            } catch (e) {
                console.log(e);
                toast.error(`${e.response.data.message}`, {
                    position: "top-right",
                    transition: "slide",
                    hideProgressBar: false,
                    showIcon: true,
                    timeout: 3000,
                    showCloseButton: true,
                    swipeClose: true,
                });
            }
        },
        isRequired(value) {
            if (value) {
                return true;
            }
            return 'This field is required';
        },
        validateEmail(value) {
            if (!value) {
                return 'This field is required';
            }

            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }

            return true;
        },
    },
    components: {
        Form,
        Field,
        ErrorMessage
    }

};
</script>

<style lang="scss" scoped>
.StyleSendButton {
    width: 25%;
}

ul>li>div {
    display: flex;
}

ul>li>div>p {
    color: #fff;
}

.description {
    line-height: 1.7;
}

img.img-responsive {
    width: 100%;
    min-height: 300px;
    object-fit: cover;
}

.images-holder {
    position: relative;

    @media (max-width: 960px) {
        justify-content: space-between;
        align-items: center;
    }

    .top-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 65%;
        z-index: 2;

        img {
            width: 100%;
        }

        @media (max-width: 960px) {
            position: relative;
            transform: none;

            img {
                width: 90% !important;
            }
        }
    }

    .bottom-image {
        z-index: 1;
        position: absolute;
        top: 30%;
        right: 0;
        transform: translate(0%, 30%);
        width: 65%;

        img {
            width: 100%;
        }

        @media (max-width: 960px) {
            position: relative;
            transform: none;

            img {
                width: 90% !important;
            }
        }
    }
}

.wrapper * {
    text-transform: capitalize;
}

.styleBackDiv {
    padding: 4rem;
    background: transparent linear-gradient(135deg, #00246b 0%, #00dae6 100%) 0% 0% no-repeat padding-box;
    box-shadow: 14px 14px 25px rgba(2, 73, 124, 0.5);
    border-radius: 5px 0px 0px 5px;
    opacity: 1;
    height: 88%;
}

.styleBackDivTwo {
    padding: 3rem;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 19px rgba(249, 250, 250, 0.5);
    border-radius: 0px 5px 5px 0px;
    opacity: 1;
}

.styleForm {
    padding: 2rem;
}

.styleDivContactInside {
    display: flex;
}

.styleDivSocial {
    display: flex;
}

.styleDivSocial>a {
    padding-right: 1rem;
}

.styleDivBlockAll {
    padding: 2rem;
}

@media only screen and (max-width: 600px) {
    .styleDivBlockAll {
        padding: 0rem;
    }

    .styleBackDiv {
        height: 42%;
    }

    .StyleSendButton {
        width: 50%;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
    .styleDivBlockAll {
        padding: 0rem;
    }

    .StyleSendButton {
        width: 50%;
    }

    .styleBackDiv {
        height: 89%;
    }
}
</style>
