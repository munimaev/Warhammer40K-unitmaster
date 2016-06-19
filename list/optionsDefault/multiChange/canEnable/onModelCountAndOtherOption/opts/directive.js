
myApp.directive('myListOnmodelcountandotheroptionOpts', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      // console.log('path1',$scope.info)
      $scope.optKey = $scope.info.path[1];
      $scope.canKey = $scope.info.path[3];
      $scope.opsKey = $scope.info.path[5];

      // getGlobalVariable($scope,['unit','wargears','models','listsPos']);
      
      $scope.selectList = fabric_selectList($scope,['unit','listsPos'])

      $scope.optionName = function(key) {
        return 'Опция ' + (1+Number(key) );
      }

      $scope.deleteOpt = function () {
        $scope.unit.optionsDefault[$scope.optKey].canEnable[$scope.canKey].opts.splice($scope.opsKey,1);
        $scope.listsPos.splice($scope.info.key,$scope.listsPos.length - $scope.info.key)
      }
    }],
    templateUrl: 'list/optionsDefault/multiChange/canEnable/onModelCountAndOtherOption/opts/index.html'
  };
})
