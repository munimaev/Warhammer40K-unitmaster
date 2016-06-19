myApp.directive('myListFuncandisable', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.optKey = $scope.info.path[1];
      $scope.disKey = $scope.info.path[3];


      $scope.types = {
        'tactical_rull' : {
          label : {
            rus : 'Доступность других опций зависит численности этого отряда'
          },
          desc : {
            rus : 'Если в отряде есть указанное число единиц варгира, взятое из перечисленных опций, удалять модели нельзя.'
          },
          directives : {
            "tacticalrull" : {}
          }
        }
      }
      getGlobalVariable($scope,['unit','models','listsPos']);

      $scope.deleteOpt = function() {
        $scope.unit.optionsDefault[$scope.optKey].funCanDisable.splice($scope.disKey,1);
        $scope.listsPos.splice($scope.info.key,1);
      }

    }],
    templateUrl: 'list/optionsDefault/addModel/funCanDisable/index.html'
  };
})
