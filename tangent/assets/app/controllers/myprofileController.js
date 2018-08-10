app.controller("myprofileController", function ($scope, Getter, Delete, $stateParams) {

    $(".tab").removeClass("active");
    $("#myprofile").addClass("active");
    $.LoadingOverlay("show");
	$scope.employeeprofile = null;
    $scope.profile = null;	
    $scope.fullname = null;	
    $scope.email = null;
    $scope.username = null;	
    $scope.activestatus = null;
    $scope.email = null;
    $scope.studentId = $stateParams.id;	
    $scope.numofEmployees = $stateParams.numofemployees;	
    $scope.students = [];
    $scope.deletedRelationChart = null;
	var birthdays = [];
	var birthday = {"id":"","fullname":"","birthdate":"","birthmonth":"", "birthday":"","email":""};	
    Getter.getData("api/user/me/").then(function (d) {
        console.log(d);
	    $scope.profile = d; 
	    $scope.numofEmployees = d.length; 
		$scope.fullname =  $scope.profile.first_name + " " + $scope.profile.last_name;
		$scope.email = $scope.profile.email;
		$scope.username = $scope.profile.username;
		$scope.activestatus =  $scope.profile.is_active;
        console.log("dax: " + $scope.profile.first_name + " " + $scope.profile.last_name);		
		//$scope.studentId = $scope.students[0].user.id;    
		$scope.studentChange();		
        $.LoadingOverlay("hide");
    });

	$scope.studentChange = function() {    
	 Getter.getData("api/employee/me").then(function (d) {
        console.log(d);
    $scope.employeeprofile =d;    
    
});    
}  

    $scope.attemptDeleteRelationChart = function (relationchart) {
        $scope.deletedRelationChart = relationchart;
        $('#deleteRelationChart').modal('show');


    };


      $scope.dateFormat = function (date) {
            date = date.substr(0, 10);
            //console.log(date);
            return date;
        };


});
