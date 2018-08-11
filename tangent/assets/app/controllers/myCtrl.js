angular.module('myModule',[])
.controller('myCtrl', function($scope){
$scope.count = 0
$scope.add = function(){
$scope.count += 1;
}
})