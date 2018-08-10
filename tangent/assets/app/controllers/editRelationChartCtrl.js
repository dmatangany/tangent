app.controller("editRelationChartController", function ($scope, Getter, Post, $window, $state, Edit, $stateParams) {
    $.LoadingOverlay("show");
   $(".tab").removeClass("active");
    $("#relationchart").addClass("active");
    $scope.studentId = $stateParams.id;	
    $scope.studentname = null;	
	//alert("editChart: " + $stateParams.id);	
    $scope.numofEmployees = $stateParams.numofemployees;	
    $scope.students = [];
    $scope.deletedRelationChart = null;
	Getter.getData("api/employee/?user=" + $scope.studentId ).then(function (d) {
	//alert("getChart: " + $stateParams.id);	
    $scope.studentMarks =d;    
	$.LoadingOverlay("hide");	
	$scope.studentname = $scope.studentMarks[0].user.first_name + " " + $scope.studentMarks[0].user.last_name;    
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
            name: $scope.studentMarks[0].user.first_name,    
            data: [$scope.studentMarks[0].days_to_birthday, $scope.studentMarks[0].age, $scope.studentMarks[0].years_worked]    
        }]    
    }); 
});    
 

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
