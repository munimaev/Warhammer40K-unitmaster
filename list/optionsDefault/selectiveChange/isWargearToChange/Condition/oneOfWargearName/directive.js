
myApp.directive('myListIswargeartochangeOneofwargearname', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.k1 = $scope.info.path[1];
      $scope.k2 = $scope.info.path[2];
      $scope.k3 = $scope.info.path[3];
      $scope.k4 = $scope.info.path[4];


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
      getGlobalVariable($scope,['unit','wargears','models'/*,'listsPos'*/]);


      $scope.selectDel = function (key) {
        console.log('selectDel')
        $scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3][$scope.k4].names.splice(key,1)
      }

      $scope.selectAdd = function () {
        console.log('selectAdd')
        if (!$scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3][$scope.k4].hasOwnProperty('names')) {
          $scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3][$scope.k4].names = [];
        }
        $scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3][$scope.k4].names.push({})
      }

    }],
    templateUrl: 'list/optionsDefault/selectiveChange/isWargearToChange/Condition/oneOfWargearName/index.html'
  };
})
