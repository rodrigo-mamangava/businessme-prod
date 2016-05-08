myApp.controller('AssineCoontroller', ['$scope', '$http', function ($scope, $http) {


        var token = "CXD4ZTOTO50KKZBMAB7ZHTT3HVMUNXF2";


        $http({
            method: "GET",
            url: "js/assinatura-moip/model/estados-cidades.json"
        }).then(function mySucces(response) {
            $scope.estados = response.data.estados;

        }, function myError(response) {
            $scope.estados = '';
        });

        $http({
            method: "GET",
            url: "js/registration/model/areas-atuacao.json"
        }).then(function mySucces(response) {
            $scope.areas = response.data;

        }, function myError(response) {
            $scope.areas = '';
        });


        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };



        $scope.carregarCidades = function () {
            $scope.cidades = $scope.estados[$scope.id_estado].cidades;
        };




        var build_customer = function () {
            var customer_params = {
                fullname: 'Dayara',
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

            console.log($scope.assinatura);

            var moip = new MoipAssinaturas(token);

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
                        console.log(erro);
                    }
                    return;
                }
                alert("Assinatura criada com sucesso");
            });



//
        };//getListaAssinaturas







    }]);// Controller
