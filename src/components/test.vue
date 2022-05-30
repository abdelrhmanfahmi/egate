localStorage.setItem("addressUUID", this.selectedAddress.uuid);
      setTimeout(() => {
        let address_uuid = localStorage.getItem("addressUUID");

        suppliers
          .getFirstShippingFees(address_uuid)
          .then((res) => {
            // console.log(res);
            this.firstFees = res.data.items;
            this.sucessMsg(res.data.message);

            let arr = res.data.items;
            var size = Object.values(arr);
            // console.log("arr" , size);
            let myData = 0;
            for (let index = 0; index < size.length; index++) {
              const element = size[index].shipping_fee;
              // console.log(`element${index}`, element);
              myData += parseFloat(element);
            }

            // this.shippingCartFee = myData + 'reda';
            this.shippingCartFee = myData;

            // this.cart_sub_total = res.data.items.cart_sub_total;
            // this.totalDiscount = res.data.items.cart_sub_total_disc.toFixed(3);
            this.totalPaymentReplacement += parseFloat(myData);

            console.log("myData" , myData);
            console.log("this.totalPayment" , this.totalPayment.toFixed(3));
            if(myData == 0){
              this.totalPaymentReplacement = this.totalPayment
            }
            console.log("this.totalPaymentReplacement" , this.totalPaymentReplacement.toFixed(3));
            // this.totalPayment += myData;
            // this.shippingCartFee = res.data.items.cart_total_shipping_fee;

            // console.log("myData", myData);
          })
          .catch((err) => {
            console.log(err);
            let error = Object.values(err)[2].data;
            this.errors = error.items;
            this.errMsg(error.message);
          });
      }, 200);




      //////
      getLoggedFirstShippingFees
      
      let arr = res.data.items;
          var size = Object.values(arr);
          // console.log("arr" , size);
          let myData = 0
          for (let index = 0; index < size.length; index++) {
            const element = size[index].shipping_fee;
            // console.log(`element${index}`, element);
            myData += parseInt(element)
          }