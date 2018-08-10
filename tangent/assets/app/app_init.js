var app = angular.module("myApp", ['ui.router']);

app.run(function ($window) { // instance-injector
    
    if ($window.sessionStorage.getItem("User") == null) {
       $window.location.href="index.html";
        

    }
});

app.config(function ($stateProvider, $urlRouterProvider) {

    // config loader
    $.LoadingOverlaySetup({
        image: "assets/Loader/loading.gif"

    });

    // For any unmatched url, redirect to /state1


    $urlRouterProvider.otherwise("/dashboard");
    //
    // Now set up the states
    $stateProvider
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "assets/templates/dashboard.html",
        controller: "dashboardController"
    })
    .state('employees', {
        url: "/employees",
        templateUrl: "assets/templates/employees.html",
        controller: "employeesController"
    })
    .state('birthdays', {
        url: "/birthdays",
        templateUrl: "assets/templates/birthdays.html",
        controller: "birthdaysController"
    })

    .state('relationcharts', {
        url: "/relationcharts",
        templateUrl: "assets/templates/relationcharts.html",
        controller: "relationchartsController"
    })

    .state('myprofile', {
        url: "/myprofile",
        templateUrl: "assets/templates/myprofile.html",
        controller: "myprofileController"
    })

    .state('createRelationChart', {
        url: "/createRelationChart",
        templateUrl: "assets/templates/createRelationChart.html",
        controller: "createRelationChartController"
    })

    .state('employee', {
        url: "/employee/{id}",
        templateUrl: "assets/templates/employee.html",
        controller: "viewEmployeeController"
    })

    .state('editEmployee', {
        url: "/editEmployee/{id}",
        templateUrl: "assets/templates/editEmployee.html",
        controller: "editEmployeeController"
    })

    .state('relationchart', {
        url: "/relationchart/{id}",
        templateUrl: "assets/templates/relationchart.html",
        controller: "viewRelationChartController"
    })

    .state('editRelationChart', {
        url: "/editrelationchart/{id}",
        templateUrl: "assets/templates/editRelationChart.html",
        controller: "editRelationChartController"
    })

    .state('editOrder', {
        url: "/editOrder/{id}/{orderNumber}",
        templateUrl: "assets/templates/editOrder.html",
        controller: "editOrderCtrl"
    })

});

function notify_error(msg){
    $.notify({
                icon: 'fa fa-times',
                message: msg
            }, {
                type: 'danger',
                timer: 2000
            });
}

function notify_success(msg){
    $.notify({
                icon: 'fa fa-check',
                message: msg
            }, {
                type: 'success',
                timer: 2000
            });
}

function notify_network_err(msg){
    $.notify({
                icon: 'fa fa-wifi',
                message: msg
            }, {
                type: 'danger',
                timer: 2000
            });

}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
