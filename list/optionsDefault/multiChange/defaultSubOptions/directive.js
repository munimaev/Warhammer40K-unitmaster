
myApp.directive('myListDefaultsuboptions', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      console.log('path',$scope.info.path)
      $scope.optKey = $scope.info.path[1];
      $scope.subKey = $scope.info.path[3];


      // $scope.types = {
      //   'tactical_rull' : {
      //     label : {
      //       rus : 'Доступность других опций зависит численности этого отряда'
      //     },
      //     desc : {
      //       rus : 'Если в отряде есть указанное число единиц варгира, взятое из перечисленных опций, удалять модели нельзя.'
      //     },
      //     directives : {
      //       "tacticalrull" : {}
      //     }
      //   }
      // }
      getGlobalVariable($scope,['unit','wargears'/*,'models','listsPos'*/]);

      $scope.deleteOpt = function() {
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions.splice($scope.subKey,1);
        $scope.listsPos.splice($scope.info.key,1);
      }

      $scope.selectAddDel= function(key) {
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].addItems.splice(key,1);
      }

      $scope.selectAddAdd= function(key) {
        if (!$scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].hasOwnProperty('addItems')) {
          $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].addItems = [];
        }
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].addItems.push('');
      }

      $scope.selectRemoveDel= function(key) {
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].removeItems.splice(key,1);
      }

      $scope.selectRemoveAdd= function(key) {
        if (!$scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].hasOwnProperty('removeItems')) {
          $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].removeItems = [];
        }
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions[$scope.subKey].removeItems.push('');
      }

    }],
    templateUrl: 'list/optionsDefault/multiChange/defaultSubOptions/index.html'
  };
})
