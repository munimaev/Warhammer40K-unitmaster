
myApp.directive('myListIswargeartochangeOneofwargeartype', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.optKey = $scope.info.path[1];
      $scope.modKey = $scope.info.path[2];
      $scope.changeKey = $scope.info.path[3];
      $scope.conditionKey = $scope.info.path[4];

      console.log($scope.info.path)

      getGlobalVariable($scope,['unit'/*,'wargears'*/,'weaponstype'/*,'listsPos'*/]);

     $scope.selectDel = function (key) {
        console.log('selectDel')
        $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.changeKey][$scope.conditionKey].types.splice(key,1)
      }

      $scope.selectAdd = function () {
        console.log('selectAdd')
        if (!$scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.changeKey][$scope.conditionKey].hasOwnProperty('types')) {
          $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.changeKey][$scope.conditionKey].types = [];
        }
        $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.changeKey][$scope.conditionKey].types.push({})
      }

    }],
    templateUrl: 'list/optionsDefault/selectiveChange/isWargearToChange/Condition/oneOfWargearType/index.html'
  };
})
