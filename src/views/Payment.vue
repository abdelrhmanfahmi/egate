<template>
  <div class="payment py-3">
    <div class="container">
      <h4 class="header text-center py-5 font-weight-bold">
        {{ $t("payment.payment") }}
      </h4>
      <div class="content">
        <div class="row payment-data justify-content-center">
          <div class="col-12 col-lg-7 col-xl-6 payment-delivery">
            <div
              class="d-flex justify-content-between heading align-items-center mb-4"
            >
              <span class="title">{{ $t("payment.deliveryData") }}</span>
              <a href="#">
                {{ $t("payment.backToCart") }}
                <span>
                  <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </span>
              </a>
            </div>
            <form class="row delivery-form">
              <div class="col-6 form-group required">
                <label for="firstName">{{ $t("payment.firstName") }}</label>
                <input type="text" class="form-control" id="firstName" />
              </div>
              <div class="col-6 form-group required">
                <label for="firstName">{{ $t("payment.lastName") }}</label>
                <input type="text" class="form-control" id="lastName" />
              </div>
              <div class="col-12 form-group">
                <label for="companyName">
                  {{ $t("payment.category") }} ({{ $t("payment.optional") }})
                </label>
                <input type="text" class="form-control" id="companyName" />
              </div>
              <div class="col-12 form-group required">
                <label for="country">{{ $t("payment.country") }}</label>
                <select class="custom-select" id="country">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-12 form-group required">
                <label for="address">{{ $t("payment.address") }}</label>
                <input type="text" class="form-control" id="address" />
              </div>
              <div class="col-6 form-group required">
                <label for="governorate">{{ $t("payment.governorate") }}</label>
                <select class="custom-select" id="governorate">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-6 form-group required">
                <label for="city">{{ $t("payment.city") }}</label>
                <select class="custom-select" id="city">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-6 form-group required">
                <label for="postalCode">{{ $t("payment.postalCode") }}</label>
                <input type="text" class="form-control" id="postalCode" />
              </div>
              <div class="col-6 form-group required">
                <label for="phoneNumber">{{ $t("payment.phoneNumber") }}</label>
                <input type="number" class="form-control" id="phoneNumber" />
              </div>
              <div class="col-12 form-group required">
                <label for="email">{{ $t("payment.email") }}</label>
                <input type="email" class="form-control" id="email" />
              </div>
              <div class="col-12 form-group custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="deliveryAddress"
                />
                <label class="custom-control-label" for="deliveryAddress">
                  {{ $t("payment.deliverySameAddress") }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label for="notes">
                  {{ $t("payment.notes") }} ({{ $t("payment.optional") }})
                </label>
                <textarea class="form-control" id="notes" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="col-12 col-lg-5 col-xl-4 payment-method">
            <div class="heading mb-4">
              <span class="title">{{ $t("payment.paymentData") }}</span>
            </div>
            <div class="methods-data">
              <div class="info">
                {{ $t("payment.total") }}: 8.600 {{ $t("payment.priceUnit") }}
              </div>
              <div class="info">
                {{ $t("payment.discount") }}: 0.00 {{ $t("payment.priceUnit") }}
              </div>
              <div class="info delivery">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="freeDelivery"
                  />
                  <label class="custom-control-label" for="freeDelivery">
                    {{ $t("payment.freeDelivery") }}
                  </label>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center total"
              >
                <span class="title">{{ $t("payment.total") }}</span>
                <span class="price">8.600 {{ $t("payment.priceUnit") }}</span>
              </div>
              <div class="methods">
                <div class="method">
                  <div
                    class="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      type="radio"
                      id="paymentMethod1"
                      name="paymentMethod"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="paymentMethod1">
                      {{ $t("payment.bankTransfer") }}
                    </label>
                    <span>{{ $t("payment.paymentByBank") }}</span>
                  </div>
                </div>
                <div class="method">
                  <div
                    class="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      type="radio"
                      id="paymentMethod2"
                      name="paymentMethod"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="paymentMethod2">
                      {{ $t("payment.paymentWhenReceiving") }}
                    </label>
                    <span>{{ $t("payment.requestReceipt") }}</span>
                  </div>
                </div>
                <div
                  class="method d-flex justify-content-between align-content-center"
                >
                  <div
                    class="custom-control custom-radio custom-control-inline"
                  >
                    <input
                      type="radio"
                      id="paymentMethod3"
                      name="paymentMethod"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="paymentMethod3">
                      {{ $t("payment.onlinePayment") }}
                    </label>
                  </div>
                  <div class="online-media">
                    <img src="@/assets/images/cart.png" alt="" srcset="" />
                  </div>
                </div>
              </div>
              <div class="terms my-4">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="terms"
                  />
                  <label class="custom-control-label" for="terms">
                    {{ $t("payment.accept") }}
                    <a href="#">{{ $t("payment.termsAndConditions") }}</a>
                  </label>
                </div>
              </div>
              <div class="submit">
                <b-button type="submit" class="login-button dark">
                  {{ $t("payment.checkout") }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.payment {
  .header {
    color: #312620;
  }
  .content {
    .payment-data {
      .payment-delivery {
        .heading {
          .title {
            color: #312620;
            font-weight: 600;
            font-size: 18pt;
          }
          a {
            font-size: 11pt;
            color: #312620;
            span {
              margin-inline-start: 0.25rem;
            }
            &:hover {
              color: #ed2124;
            }
          }
        }
        .delivery-form {
          .form-group {
            margin-bottom: 1.5rem;
            label {
              margin-bottom: 0;
            }
            textarea {
              resize: none;
            }
            input:focus,
            textarea:focus,
            select:focus {
              outline: none;
              border-color: #ced4da;
              box-shadow: none;
            }
            &.required {
              label::after {
                content: "*";
                color: $main-color;
                padding-inline-start: 0.2rem;
              }
            }
          }
        }
      }
      .payment-method {
        .methods-data {
          background: #ecf0f1;
          padding: 2rem;
          border-radius: 0.5rem;
          .info {
            border-bottom: 1px dashed #c5c6c6;
            padding: 1rem 0.3rem;
            color: #312620;
            font-weight: bold;
          }
          .total {
            padding: 1rem 0;
            color: #312620;
            font-weight: bold;
            .title {
              font-size: 14pt;
            }
          }
          .methods {
            background-color: #fff;
            border-radius: 0.5rem;
            border: 1px dashed #cfd0d0;
            .method {
              padding: 1rem;
              border-bottom: 1px dashed #cfd0d0;
              font-size: 11pt;
              color: #544842;
              .custom-radio {
                flex-wrap: wrap;
              }
              label {
                cursor: pointer;
              }
              span {
                width: 100%;
                font-size: 10pt;
                margin-top: -0.2rem;
                opacity: 0.7;
              }
              .online-media {
                img {
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
    }
    .heading {
      .title {
        color: #312620;
        font-weight: 600;
        font-size: 18pt;
      }
      a {
        font-size: 11pt;
        color: #312620;
        span {
          margin-inline-start: 0.25rem;
        }
        &:hover {
          color: #ed2124;
        }
      }
    }
  }
}
html:lang(ar) {
  svg {
    transform: rotate(180deg);
  }
}
</style>
