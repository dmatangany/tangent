app.controller("viewEmployeeController", function ($scope, Getter, Post, $state, $window, $stateParams) {
    $.LoadingOverlay("show");
    $scope.employeeId = $stateParams.id;
    $scope.birthdays = [];
    $scope.prices = [];
    $scope.employee = {
        tradingName: null,
        vat: null,
        notes: null,
        prices: []
    };
    Getter.getData("api/Birthdays").then(function (d) {
        console.log(d);
        $scope.birthdays = d;
        //$.LoadingOverlay("hide");

    });

    Getter.getData("api/Employees/"+$scope.employeeId).then(function (d) {
        console.log(d);
        $scope.employee = d;
        //$.LoadingOverlay("hide");

    });

    Getter.getData("api/employeeBirthdayPrices?id="+$scope.employeeId).then(function (d) {
        console.log(d);
        $scope.prices = d;
        $.LoadingOverlay("hide");

    });

    $scope.addpricing = function (birthday) {
        for (i = 0; i < $scope.prices.length; i++) {
            if (birthday.id == $scope.prices[i].birthdayId) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Birthday has been selected already"
                }, {
                    type: 'danger',
                    timer: 2000
                });
                return;
            }
        }
        var price =
            {
                amount: null,
                sku: birthday.sku,
                description: null,
                case_size: null,
                name: birthday.name,
                birthdayId: birthday.id

            };



        $scope.prices.push(price);
        console.log($scope.prices);
    };

    $scope.removepricing = function (price) {

        for (i = 0; i < $scope.prices.length; i++) {
            if (price.birthdayId == $scope.prices[i].birthdayId) {

                $scope.prices.splice(i, 1);
                break;
            }
        }
    };


    $scope.prepareCompany = function () {
        if ($scope.employee.tradingName == null) {
            $.notify({
                icon: 'fa fa-times',
                message: "Trading name required"
            }, {
                type: 'danger',
                timer: 2000
            });
            return;
        }
        $scope.employee.tradingName = $scope.employee.tradingName.trim();
        if ($scope.employee.tradingName == "") {
            $.notify({
                icon: 'fa fa-times',
                message: "Trading name required"
            }, {
                type: 'danger',
                timer: 2000
            });
            return;
        }
        if ($scope.prices.length == 0) {
            $.notify({
                icon: 'fa fa-times',
                message: "Put at least one price"
            }, {
                type: 'danger',
                timer: 2000
            });
            return;
        }

        for (i = 0; i < $scope.prices.length; i++) {

            if ($scope.prices[i].amount == null) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Put the price for the " + $scope.prices[i].name + " entry"
                }, {
                    type: 'danger',
                    timer: 2000
                });
                return;
            }

            if ($scope.prices[i].case_size == null) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Put the case size for the " + $scope.prices[i].name + " entry"
                }, {
                    type: 'danger',
                    timer: 2000
                });
                return;
            }
        }
        $.LoadingOverlay("show");
        $scope.employee.prices = $scope.prices;
        console.log($scope.employee);
        console.log(JSON.stringify($scope.employee));

        Post.postData("api/Employees", $scope.employee).then(function (d) {
            console.log(d);
            $.LoadingOverlay("hide");
            $.notify({
                icon: 'fa fa-check',
                message: "Employee successfully entered"
            }, {
                type: 'success',
                timer: 4000
            });
            //$state.go('employees');
            $window.history.back();
            //$.LoadingOverlay("hide");

        });


    }
});
