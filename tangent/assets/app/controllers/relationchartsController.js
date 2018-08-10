app.controller("relationchartsController", function ($scope, Getter, Delete, $stateParams) {

    $(".tab").removeClass("active");
    $("#relationchart").addClass("active");
    $.LoadingOverlay("show");
    $scope.studentId = $stateParams.id;	
    $scope.numofEmployees = $stateParams.numofemployees;	
    $scope.students = [];
    $scope.deletedRelationChart = null;
	var birthdays = [];
	var birthday = {"id":"","fullname":"","birthdate":"","birthmonth":"", "birthday":"","email":""};	
    Getter.getData("api/employee/").then(function (d) {
        console.log(d);
	    $scope.students = d; 
	    $scope.numofEmployees = d.length; 
		$scope.studentId = $scope.students[0].user.id;    
		$scope.studentChange($scope.studentId);		
        $.LoadingOverlay("hide");
    });

	$scope.studentChange = function(studentId) {    
	 Getter.getData("api/employee/?user=" + studentId ).then(function (d) {

    $scope.employeerecords =d;    
    Highcharts.chart('container', {    
        chart: {    
            type: 'line'    
        },    
        title: {    
            text: 'Relating: Age / Birthday / Years Worked',    
            x: -20 //center    
        },    
        subtitle: {    
            text: 'Source: Tangent Employees',    
            x: -20    
        },    
        xAxis: {    
            categories: ['DaysToBirthday', 'Age', 'YearsWorked']    
        },    
        yAxis: {    
            title: {    
                text: 'Parameter'    
            },    
    
        },    
    
        legend: {    
            layout: 'vertical',    
            align: 'right',    
            verticalAlign: 'middle',    
            borderWidth: 0    
        },    
        series: [{    
            name: $scope.employeerecords[0].user.first_name,    
            data: [$scope.employeerecords[0].days_to_birthday, $scope.employeerecords[0].age, $scope.employeerecords[0].years_worked]    
        }]    
    });    
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
