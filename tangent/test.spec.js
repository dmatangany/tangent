describe('editRelationChartCtrl', function () {
    var $controller;
    beforeEach(module('myApp'));
 
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));
    it('should exist', function () {
        expect($controller).toBeDefined()
    });

        mockuser = { 
					id:36,
					birth_date:"1981-07-30",
					days_to_birthday:145,
					email:"captain@gmail.com",
					gender:"M",
					github_user:"Captain",
					phone_number:"0824478876",
					position:{id: 1, name: "Front-end Developer", level: "Senior", sort: 0},
					race:"B",
					user:{id: 8, username: "captain", email: "captain@gmail.com", first_name: "Captain", last_name: "America"},
					years_worked:3
        };

		it('Test Tangent Controller', function () {
        var $scope = {};
        var controller = $controller('editRelationChartCtrl', { $scope: $scope });
        $scope.Username = "8";
  expect($scope.employeedata).toBeDefined();
  expect($scope.employeedata.length).toEqual(1);
  expect($scope.employeedata).toBe(mockuser);
  expect($scope.employeedata.length).toEqual(3);	
  });
});