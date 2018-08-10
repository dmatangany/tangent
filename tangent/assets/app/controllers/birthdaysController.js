app.controller("birthdaysController", function ($scope, Getter, Delete, $stateParams) {

    $(".tab").removeClass("active");
    $("#birthdays").addClass("active");
    $.LoadingOverlay("show");
    $scope.studentId = $stateParams.id;	
    $scope.numofEmployees = $stateParams.numofemployees;	
    $scope.employees = [];
	$scope.customdata = [10, 12, 36, 4, 51, 6, 8, 24];
    $scope.deletedRelationChart = null;
	$scope.birthdays = new Array(12); 
	//$scope.birthdays =[]; 
	$scope.birthday = {"id":"","fullname":"","birthdate":"","birthmonth":"","monthname":"", "monthtitle":"", "birthday":""};	
var i;
for (i = 0; i < $scope.birthdays.length; i++) { 
		$scope.birthday = new Object();
		$scope.birthday.id = i;
		$scope.birthday.fullname = "NoData";
		$scope.birthday.birthdate = "0000-00-00";
		$scope.birthday.birthmonth = i;
		$scope.birthday.birthday = 0;
		$scope.birthday.monthname = "NoData";
		$scope.birthday.monthtitle = "NoData";
		$scope.birthday.email = "NoData";
		$scope.birthdays[i]=$scope.birthday;
		//$scope.birthdays.push($scope.birthday);
		console.log("xx: " +$scope.birthday.fullname + " "  + i);
		}
	
    Getter.getData("api/employee/").then(function (d) {
        console.log(d);
	    $scope.employees = d; 
		$scope.employees.sort(dynamicSort("birth_date"));
	    $scope.numofEmployees = $scope.employees.length; 
		var ix = 0;
		angular.forEach($scope.employees, function(value, key) {
		$scope.birthday = new Object();
		$scope.birthday.id = value.user.id;
		$scope.birthday.fullname = value.user.first_name + " " + value.user.last_name;
		$scope.birthday.birthdate = value.birth_date;
		var datestring = value.birth_date;
		var dsmonth = datestring.substring(5, 7);
		var intmonth = parseInt(dsmonth);
		var dsday = datestring.substring(8, 10);
		var intday = parseInt(dsday);
		//console.log("update: " + $scope.birthday.fullname + " dsm:" + intmonth + " strm: " + getMonthName(intmonth) + " ix: " + ix + " dayint: " + intday);
		$scope.birthday.birthmonth = intmonth;
		$scope.birthday.monthname =  getMonthName(intmonth);
		$scope.birthday.monthtitle =  $scope.birthday.fullname + " (" + intday + " " + getMonthName(intmonth) + ")";
		$scope.birthday.birthday = intday;
		$scope.birthday.email = value.email;
		var bindex = intmonth - 1;
		$scope.birthdays[ix]=$scope.birthday;		
		//$scope.birthdays.insert(ix, $scope.birthday);
		console.log("z: " + ix + ' m: ' + $scope.birthdays[ix].birthmonth + ' d: ' + $scope.birthdays[ix].birthday + ' nm: ' + $scope.birthdays[ix].fullname);
		ix++;
		});	
		
		$scope.birthdays.sort(dynamicSort("birthmonth"));
		angular.forEach($scope.birthdays, function(value, key) {
		console.log("sorted: " + key + ' m: ' + value.birthmonth + ' d: ' + value.birthday + " name: " + value.fullname + " month: " + value.monthname);
		});		
		
			//console.log("xx: " + $scope.birthdays);
        $.LoadingOverlay("hide");

    $scope.employeerecords =d;    
    Highcharts.chart('container', {    
        chart: {    
            type: 'line'    
        },    
        title: {    
            text: 'Year Report: Birth Day Monthly Distribution',    
            x: -20 //center    
        },    
        subtitle: {    
            text: 'Source: Tangent Employees',    
            x: -20    
        },    
        xAxis: {    
            categories: [$scope.birthdays[0].monthname,$scope.birthdays[1].monthname,$scope.birthdays[2].monthname,$scope.birthdays[3].monthname,$scope.birthdays[4].monthname,$scope.birthdays[5].monthname,$scope.birthdays[6].monthname,$scope.birthdays[7].monthname,$scope.birthdays[8].monthname,$scope.birthdays[9].monthname,$scope.birthdays[10].monthname,$scope.birthdays[11].monthname]        
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
            name:'Birth Day',    
            data: [{name:$scope.birthdays[0].monthtitle,y:$scope.birthdays[0].birthday},
		 {name:$scope.birthdays[1].monthtitle,y:$scope.birthdays[1].birthday},
		 {name:$scope.birthdays[2].monthtitle,y:$scope.birthdays[2].birthday},
		 {name:$scope.birthdays[3].monthtitle,y:$scope.birthdays[3].birthday},
		 {name:$scope.birthdays[4].monthtitle,y:$scope.birthdays[4].birthday},
		 {name:$scope.birthdays[5].monthtitle,y:$scope.birthdays[5].birthday},
		 {name:$scope.birthdays[6].monthtitle,y:$scope.birthdays[6].birthday},
		 {name:$scope.birthdays[7].monthtitle,y:$scope.birthdays[7].birthday},
		 {name:$scope.birthdays[8].monthtitle,y:$scope.birthdays[8].birthday},
		 {name:$scope.birthdays[9].monthtitle,y:$scope.birthdays[9].birthday},
		 {name:$scope.birthdays[10].monthtitle,y:$scope.birthdays[10].birthday},
		 {name:$scope.birthdays[11].monthtitle,y:$scope.birthdays[11].birthday}]    
        }]    
    });    
    });
	
    $scope.attemptDeleteRelationChart = function (relationchart) {
        $scope.deletedRelationChart = relationchart;
        $('#deleteRelationChart').modal('show');

    };

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}

function getMonthName(property) {
	if(property==1)
	{
		return "Jan";
	}
	if(property==2)
	{
		return "Feb";
	}
	if(property==3)
	{
		return "Mar";
	}
	if(property==4)
	{
		return "Apr";
	}
	if(property==5)
	{
		return "May";
	}
	if(property==6)
	{
		return "Jun";
	}
	if(property==7)
	{
		return "Jul";
	}
	if(property==8)
	{
		return "Aug";
	}
	if(property==9)
	{
		return "Sep";
	}
	if(property==10)
	{
		return "Oct";
	}
	if(property==11)
	{
		return "Nov";
	}	
	if(property==12)
	{
		return "Dec";
	}	
		return "Jan";
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

	$scope.dateFormat = function (date) {
            date = date.substr(0, 10);
            //console.log(date);
            return date;
        };


});
