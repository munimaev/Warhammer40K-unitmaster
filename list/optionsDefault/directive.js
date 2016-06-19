myApp.directive('myListOptionsdefault', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {


      getGlobalVariable($scope,['unit','listsPos']);

      $scope.types = {
        'addModel' : {
          label : {
            rus : 'Добавить модель'
          },
        },
        'multiChange' : {
          label : {
            rus : 'Мультизамена'
          },
        },
        'upgradeModel' : {
          label : {
            rus : 'Улучшить модель'
          },
        },
        'selectiveChange' : {
          label : {
            rus : 'Замена с выбором'
          },
        },
        'dedicatedTransport' : {
          label : {
            rus : 'Прикомандированный транспорт'
          },
        }
      };
      $scope.optKey = $scope.info.path[1];
      $scope.header = function() {
        if ($scope.unit.optionsDefault[ $scope.info.path[1] ].type
          && $scope.types[ $scope.unit.optionsDefault[ $scope.info.path[1] ].type ]
        ) {
          return $scope.types[ $scope.unit.optionsDefault[ $scope.info.path[1] ].type ].label.rus
        } 
        return 'Опция ' +( Number($scope.info.path[1])+1)
      }
      $scope.disabledOpt = function() {
        for (var i in $scope.unit.optionsDefault[ $scope.info.path[1] ]) {
          if (i != 'type' && i != '$$hashKey') {
            return true;
          } 
        }
        return false;
      }
      $scope.deleteOpt = function() {
        $scope.unit.optionsDefault.splice($scope.info.path[1],1);
        $scope.listsPos.splice($scope.info.key,1);
      }

    }],
    templateUrl: 'list/index.html'
  };
})
