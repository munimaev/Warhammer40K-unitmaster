
myApp.directive('myListIsmodelcanchange', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.optKey = $scope.info.path[1];
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
      getGlobalVariable($scope,['unit','wargears'/*,'models'*/,'listsPos']);

 
      $scope.deleteOpt = function () {
        $scope.unit.optionsDefault[$scope.optKey].isModelCanChange.splice($scope.canKey,1);
        $scope.listsPos.splice($scope.info.key,$scope.listsPos.length - $scope.info.key);
      }

    }],
    templateUrl: 'list/optionsDefault/multiChange/isModelCanChange/index.html'
  };
})
