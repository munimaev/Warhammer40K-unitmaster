myApp.directive('myListTacticalrule', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      $scope.optKey = $scope.info.path[1];
      $scope.disKey = $scope.info.path[3];
      getGlobalVariable($scope,['unit']);

      $scope.selectDel = function(key) {
        $scope.unit.optionsDefault[$scope.optKey].funCanDisable[$scope.disKey].options.splice(key,1);
      }
      $scope.selectAdd = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].funCanDisable[$scope.disKey].hasOwnProperty('options')) {
          $scope.unit.optionsDefault[$scope.optKey].funCanDisable[$scope.disKey].options = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].funCanDisable[$scope.disKey].options.push(null)
      }

      $scope.optionName = function(key) {
        return 'Опция ' + (1+Number(key) );
      }
    }],
    templateUrl: 'list/optionsDefault/addModel/funCanDisable/tactical/index.html'
  };
})