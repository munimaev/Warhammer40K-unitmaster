
myApp.directive('myListOptionDedicatedtransport', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {


      $scope.k1 = $scope.info.path[1];
      $scope.selectList = fabric_selectList( $scope, ['unit','models','listsPos','linkClass', 'transport']);

      $scope.optionAdd = function() {
        $scope.unit.optionsDefault[$scope.k1].funCanDisable.push({});
      }
      $scope.optionAddSub = function() {
        if (!$scope.unit.optionsDefault[$scope.k1].defaultSubOptions) {
          $scope.unit.optionsDefault[$scope.k1].defaultSubOptions = [];
        }
         $scope.unit.optionsDefault[$scope.k1].defaultSubOptions.push({})
        
      }

    }],
    templateUrl : 'list/optionsDefault/dedicatedTransport/index.html'
  };
})

