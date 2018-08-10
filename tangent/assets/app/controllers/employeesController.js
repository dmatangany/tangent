app.controller("employeesController", function ($scope, Getter,Delete) {
    $.LoadingOverlay("show");
    $(".tab").removeClass("active");
    $("#cus").addClass("active");

    $scope.employees = [];
    $scope.deletedEmployee = null;
    Getter.getData("api/employee/").then(function (d) {
        console.log(d);
        $scope.employees = d;
        $.LoadingOverlay("hide");

    });

    $scope.attemptDeleteEmployee = function (employee) {
        $scope.deletedEmployee = employee;
        $('#deletedEmployee').modal('show');


    };

    $scope.clearDelete = function () {
        $scope.deletedEmployee = null;
        $('#deletedEmployee').modal('hide');
    };

    $scope.deleteEmployee = function () {
        $.LoadingOverlay("show");
        $('#deletedEmployee').modal('hide');

        Delete.deleteData("api/Employees/" + $scope.deletedEmployee.id).then(function (d) {

            console.log(d);

            $.notify({
                icon: 'fa fa-check',
                message: "Employee successfully removed"
            }, {
                type: 'success',
                timer: 4000
            });

            Getter.getData("api/Employees").then(function (d) {
                console.log(d);
                $scope.employees = d;
                $.LoadingOverlay("hide");

            });
        });


    };
});
