
myApp.directive('myListOnmodelcountandotheroption', function() {
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

      // getGlobalVariable($scope,['unit','wargears','models','listsPos']);
      
      $scope.selectList = fabric_selectList($scope,['unit','wargears','linkClass','listsPos'])

      $scope.optionAdd = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].canEnable[$scope.canKey].hasOwnProperty('opts')) {
          $scope.unit.optionsDefault[$scope.optKey].canEnable[$scope.canKey].opts = [];
        }
        $scope.unit.optionsDefault[$scope.optKey].canEnable[$scope.canKey].opts.push({});
      }
    }],
    templateUrl: 'list/optionsDefault/multiChange/canEnable/onModelCountAndOtherOption/index.html'
  };
})
