app.controller("dashboardController", function ($scope) {
     $(".tab").removeClass("active");
     $("#dash").addClass("active");
   
    $.LoadingOverlay("show");

    setTimeout(function () {
        $.LoadingOverlay("hide");
    }, 3000);
    $scope.profile = {};

});