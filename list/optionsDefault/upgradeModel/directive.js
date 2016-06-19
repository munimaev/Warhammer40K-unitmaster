
myApp.directive('myListOptionUpgrademodel', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.selectList = fabric_selectList( $scope, ['unit','models','listsPos']);

      $scope.optionAdd = function() {
        $scope.unit.optionsDefault[$scope.optKey].funCanDisable.push({});
      }

      $scope.optKey = $scope.info.path[1];

    }],
    templateUrl : 'list/optionsDefault/upgradeModel/index.html'
  };
})

