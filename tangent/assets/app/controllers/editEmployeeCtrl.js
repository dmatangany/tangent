app.controller("editEmployeeController", function ($scope, Getter, Post, $state, $window, $stateParams, Edit, Delete) {
    $.LoadingOverlay("show");
    $scope.employeeId = $stateParams.id;
    $scope.birthdays = [];
    $scope.prices = [];
    $scope.newprices = [];
    $scope.employee = {
        tradingName: null,
        vat: null,
        notes: null,
        prices: []
    };

    Getter.getData("api/Employees/" + $scope.employeeId).then(function (d) {
        console.log(d);
        $scope.employee = d;
        //$.LoadingOverlay("hide");

    });


    Getter.getData("api/employeeBirthdayPrices?id=" + $scope.employeeId).then(function (d) {
        console.log(d);
        $scope.prices = d;
        //$.LoadingOverlay("hide");

    });

    Getter.getData("api/Birthdays").then(function (d) {
        console.log(d);
        $scope.birthdays = d;
        $.LoadingOverlay("hide");

    });

    $scope.addpricing = function (birthday) {
        for (i = 0; i < $scope.prices.length; i++) {
            if (birthday.id == $scope.prices[i].birthdayId) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Birthday already exists, you may consider editing"
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
                birthdayId: birthday.id,
                employeeId: $scope.employeeId

            };



        $scope.newprices.push(price);
        console.log($scope.newprices);
    };

    $scope.removepricing = function (price) {
        if ($scope.prices.length <= 1) {
            notify_error("you must have at least 1 birthday pricing");
            return;
        }
        var index = 0;
        for (i = 0; i < $scope.prices.length; i++) {
            if (price.birthdayId == $scope.prices[i].birthdayId) {
                index = i;
                break;
            }
        }
        $.LoadingOverlay("show");
        Delete.deleteData("api/BirthdayPrices/" + price.id).then(function (d) {
            $.LoadingOverlay("hide");
            console.log(d);
            $scope.prices.splice(index, 1);
            $.notify({
                icon: 'fa fa-check',
                message: "Birthday pricing successfully removed"
            }, {
                type: 'success',
                timer: 4000
            });


        });


    };

    $scope.removeNewpricing = function (price) {

        for (i = 0; i < $scope.newprices.length; i++) {
            if (price.birthdayId == $scope.newprices[i].birthdayId) {

                $scope.newprices.splice(i, 1);
                break;
            }
        }

    };

    $scope.updatepricing = function (price) {
        if (!price.case_size) {
            notify_error("case size is required");
            return;
        }
        if (!price.amount) {
            notify_error("case size is required");
            return;
        }
        $.LoadingOverlay("show");
        Edit.editData("api/editBirthdayPrice", price).then(function (d) {
            $.LoadingOverlay("hide");
            console.log(d);

            $.notify({
                icon: 'fa fa-check',
                message: "Birthday pricing updated successfully entered"
            }, {
                type: 'success',
                timer: 4000
            });


        });

    };

    $scope.editCompany = function () {


        if (!$scope.employee.tradingName) {
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
        $.LoadingOverlay("show");
        console.log($scope.employee);
        console.log(JSON.stringify($scope.employee));
        Edit.editData("api/editEmployee", $scope.employee).then(function (d) {
            $.LoadingOverlay("hide");
            console.log(d);

            notify_success("Employee profile updated successfully");

        });

    };




    $scope.updateNewPricing = function () {

        if ($scope.newprices.length == 0) {
            $.notify({
                icon: 'fa fa-times',
                message: "No new Pricing added"
            }, {
                type: 'danger',
                timer: 2000
            });
            return;
        }

        for (i = 0; i < $scope.newprices.length; i++) {

            if (!$scope.newprices[i].amount) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Put the price for the " + $scope.newprices[i].name + " entry"
                }, {
                    type: 'danger',
                    timer: 2000
                });
                return;
            }

            if (!$scope.newprices[i].case_size) {
                $.notify({
                    icon: 'fa fa-times',
                    message: "Put the case size for the " + $scope.newprices[i].name + " entry"
                }, {
                    type: 'danger',
                    timer: 2000
                });
                return;
            }
        }


        $.LoadingOverlay("show");
        Post.postData("api/addRangeBirthdayPricing", $scope.newprices).then(function (d) {
            
            console.log(d);
            Getter.getData("api/employeeBirthdayPrices?id=" + $scope.employeeId).then(function (d) {
                console.log(d);
                $scope.prices = d;
                $.LoadingOverlay("hide");

            });
            $scope.newprices = [];
            $.notify({
                icon: 'fa fa-check',
                message: "Employee successfully entered"
            }, {
                type: 'success',
                timer: 4000
            });
           

        });


    }



});
