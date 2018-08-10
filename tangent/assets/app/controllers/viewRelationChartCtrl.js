app.controller("viewRelationChartController", function ($scope, Getter, Post, $window,$state,$stateParams) {
    $.LoadingOverlay("show");
    $scope.relationchartId= $stateParams.id;
    
    $scope.relationchartData = {

        employeeId: 0,
        name: null,
        address: null,
        location: null,
        telephone: null,
        telephone2: null,
        email: null,
        relationchartManager: null,
        monthlyBudget: null,
        regionId: 0,
        salesRepId: 0,
        merchantId: 0,
        bank:null,
        salesRep:null,
        merchant:null

    };

    Getter.getData("api/RelationCharts/"+$scope.relationchartId).then(function (d) {
        console.log(d);
        $scope.relationchartData = d;
        $.LoadingOverlay("hide");
        //$.LoadingOverlay("hide");

    });


});
