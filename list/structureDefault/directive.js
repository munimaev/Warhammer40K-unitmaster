myApp.directive('myListStructuredefault', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {


      getGlobalVariable($scope,['unit','listsPos','models','getModelName']);
      $scope.p0 = $scope.info.path[0];
      $scope.p1 = $scope.info.path[1];
      // $scope.types = {
      //   'addModel' : {
      //     label : {
      //       rus : 'Добавить модель'
      //     },
      //   },
      //   'multiChange' : {
      //     label : {
      //       rus : 'Мультизамена'
      //     },
      //   },
      //   'upgradeModel' : {
      //     label : {
      //       rus : 'Улучшить модель'
      //     },
      //   },
      //   'selectiveChange' : {
      //     label : {
      //       rus : 'Замена с выбором'
      //     },
      //   },
      //   'dedicatedTransport' : {
      //     label : {
      //       rus : 'Прикомандированный транспорт'
      //     },
      //   }
      // };
      // $scope.optKey = $scope.info.path[1];
      $scope.header = function() {
        return $scope.getModelName($scope.unit.structureDefault[$scope.p1].name);
      }
      // $scope.disabledOpt = function() {
      //   for (var i in $scope.unit.optionsDefault[ $scope.info.path[1] ]) {
      //     if (i != 'type' && i != '$$hashKey') {
      //       return true;
      //     } 
      //   }
      //   return false;
      // }
      $scope.deleteOpt = function() {
        $scope.unit.structureDefault.splice($scope.info.path[1],1);
        $scope.listsPos.splice($scope.info.key,1);
      }

    }],
    templateUrl: 'list/structureDefault/index.html'
  };
})