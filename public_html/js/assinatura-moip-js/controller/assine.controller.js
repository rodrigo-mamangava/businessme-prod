myApp.controller('AssineCoontroller', ['$scope', '$http', function ($scope, $http) {


       



        var build_customer = function () {
            var customer_params = {
                fullname: 'Rodrigo Muniz',
                email: 'rodrigobmuniz@gmail.com',
                code: new Date().getTime(),
                cpf: '091.711.957-69',
                birthdate_day: '01',
                birthdate_month: '10',
                birthdate_year: '1981',
                phone_area_code: '21',
                phone_number: '965331140',
                billing_info: build_billing_info(),
                address: build_address()
            };
            return new Customer(customer_params);
        };

        var build_billing_info = function () {
            var billing_info_params = {
                fullname: 'Rodrigo Muniz',
                expiration_month: '05',
                expiration_year: '18',
                credit_card_number: '5555666677778884'
            };
            return new BillingInfo(billing_info_params);
        };

        var build_address = function () {
            var address_params = {
                street: 'Av. das americas',
                number: '16400',
                complement: 'Nice, 906',
                district: 'Recreio',
                zipcode: '22793-704',
                city: 'Rio de Janeiro',
                state: 'RJ',
                country: "BRA"
            };
            return new Address(address_params);
        };




        $scope.subscribe = function () {

            var moip = new MoipAssinaturas("S10K4KHQWNR8TYVDOHKIRJKG9IMHUBGX");

            var customer = build_customer();
            var plan_code = 'mvp-001';




            moip.subscribe(
                    new Subscription()
                    .with_code(new Date().getTime())
                    .with_new_customer(customer)
                    .with_plan_code(plan_code)
                    //.with_coupon(coupon_code)
                    ).callback(function (response) {
                if (response.has_errors()) {
                    for (i = 0; i < response.errors.length; i++) {
                        var erro = response.errors[i].description;
                        //jQuery("#erros").append(erro);
                        console.log(erro)
                    }
                    return;
                }
                alert("Assinatura criada com sucesso");
            });





//            var urlAssinatura = 'moip-engine/assinatura-moip-v01.php';
//
//            console.log('subscribe aqui!');
//
//            jQueryhttp({
//                method: 'GET',
//                url: urlAssinatura,
//                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
//            })
//                    .success(function (data) {
//
//                        console.log(data);
//
//                    });
//
        };//getListaAssinaturas







    }]);// Controller
