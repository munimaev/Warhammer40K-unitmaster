
myApp.directive('myListDefaultsuboptionsslective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      // console.log('path',$scope.info)
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
      getGlobalVariable($scope,['unit','wargears',/*'models',*/'listsPos']);

      $scope.deleteOpt = function() {
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions.splice($scope.subKey,1);
        $scope.listsPos.splice($scope.info.key, $scope.info.key);
      }


    }],
    templateUrl: 'list/optionsDefault/selectiveChange/defaultSubOptions/index.html'
  };
})
