
myApp.directive('myListCanenable', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      // console.log('path1',$scope.info.path)
      $scope.optKey = $scope.info.path[1];
      $scope.canKey = $scope.info.path[3];


      $scope.types = {
        'onModelCountAndOtherOption' : {
          label : {
            rus : 'По количесвту моделей со снаряжением из опций'
          },
          desc : {
            rus : 'При каком количестве моделей в отряде, модели из отряда могут брать снаряжение из указанных опций '
          },
          directives : {
            "onmodelcountandotheroption" : {}
          }
        }
      }
      getGlobalVariable($scope,['unit','wargears'/*,'models'*/,'listsPos']);

      $scope.deleteOpt = function () {
        $scope.unit.optionsDefault[$scope.optKey].canEnable.splice($scope.canKey,1);
        $scope.listsPos.splice($scope.info.key,$scope.listsPos.length - $scope.info.key)
      
      }

    }],
    templateUrl: 'list/optionsDefault/multiChange/canEnable/index.html'
  };
})
