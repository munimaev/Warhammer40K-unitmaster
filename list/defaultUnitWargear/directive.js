myApp.directive('myListDefaultunitwargear', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {


      getGlobalVariable($scope,['unit','listsPos','getWargearName','wargears','getModelName']);
      $scope.p0 = $scope.info.path[0]; // 'defaultSpecialRules'
      $scope.p1 = $scope.info.path[1]; // 'none'  / 'onModelName'
      $scope.p2 = $scope.info.path[2]; // 'toAll' / 'SM_SpaceMarine'
      $scope.p3 = $scope.info.path[3]; // 'rules'
      

      $scope.header = function() {
        if ($scope.p1 == 'none'  &&  $scope.p2 == 'toAll') {
          return 'Для всех моделей в отряде';
        }
        if ($scope.p1 == 'onModelName') {
          return 'Для моделей ' + $scope.getModelName($scope.p2);
        }
        // return $scope.getRulelName($scope.unit[$scope.p0][$scope.p1][$scope.p2][$scope.p3][$scope.p4]);
      }

      $scope.addWargear = function(key) {
        if (!$scope.unit[$scope.p0].hasOwnProperty($scope.p1)) {
          $scope.unit[$scope.p0][$scope.p1] = {};
        }
        if (!$scope.unit[$scope.p0][$scope.p1].hasOwnProperty($scope.p2)) {
          $scope.unit[$scope.p0][$scope.p1][$scope.p2] = {};
          $scope.unit[$scope.p0][$scope.p1][$scope.p2][$scope.p3] = [];
        }
        $scope.unit[$scope.p0][$scope.p1][$scope.p2][$scope.p3].push(null);
      }

      $scope.delWargear = function() {
        $scope.unit[$scope.p0][$scope.p1][$scope.p2][$scope.p3].splice(key,1);
      }

    }],
    templateUrl: 'list/defaultUnitWargear/index.html'
  };
})