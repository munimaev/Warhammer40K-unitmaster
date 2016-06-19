
myApp.directive('myListDefaultsuboptionstransport', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.selectList = fabric_selectList( $scope, ['unit','models','listsPos','linkClass', 'transport']);
      console.log($scope.transport)
      console.log($scope.info.path)
      $scope.k1 = $scope.info.path[1];
      $scope.k2 = $scope.info.path[2];
      $scope.k3 = $scope.info.path[3];


      $scope.deleteOpt = function() {
        $scope.unit.optionsDefault[$scope.k1][$scope.k2].splice([$scope.k3], 1);
        $scope.listsPos.splice($scope.info.key,1);
      }

    }],
    templateUrl : 'list/optionsDefault/dedicatedTransport/defaultSubOptionsTransport/index.html'
  };
})

