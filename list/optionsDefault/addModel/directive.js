
myApp.directive('myListOptionAddmodel', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.selectList = fabric_selectList( $scope, ['unit','models','listsPos','linkClass']);

      $scope.optionAdd = function() {
        $scope.unit.optionsDefault[$scope.optKey].funCanDisable.push({});
      }

      $scope.optKey = $scope.info.path[1];

    }],
    templateUrl : 'list/optionsDefault/addModel/index.html'
  };
})

