
myApp.directive('myListOneofmodelname', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.optKey = $scope.info.path[1];
      $scope.modKey = $scope.info.path[2];
      $scope.canKey = $scope.info.path[3];


      $scope.types = {
        'oneOfModelName' : {
          label : {
            rus : 'По имени модели'
          },
          desc : {
            rus : 'Только модель с указанным именем может использовать эту опцию'
          },
          directives : {
            "oneofmodelname" : {}
          }
        }
      }
      getGlobalVariable($scope,['unit'/*,'wargears'*/,'models'/*,'listsPos'*/]);

      $scope.selectDel = function (key) {
        $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.canKey].names.splice(key,1)
      }

      $scope.selectAdd = function () {
        if (!$scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.canKey].hasOwnProperty('names')) {
          $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.canKey].names = [];
        }
        $scope.unit.optionsDefault[$scope.optKey][$scope.modKey][$scope.canKey].names.push({})
      }

    }],
    templateUrl: 'list/optionsDefault/multiChange/isModelCanChange/oneOfModelName/index.html'
  };
})
