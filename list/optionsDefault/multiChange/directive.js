
myApp.directive('myListOptionMultichange', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      // console.log(!)

      $scope.optKey = $scope.info.path[1];
      $scope.selectList = fabric_selectList($scope, ['unit', 'models', 'wargears', 'listsPos','linkClass']);

      $scope.optionAddSub = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].hasOwnProperty('defaultSubOptions')) {
          $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].defaultSubOptions.push({});
      }

      $scope.optionAddEnable = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].hasOwnProperty('canEnable')) {
          $scope.unit.optionsDefault[$scope.optKey].canEnable = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].canEnable.push({});
      }

      $scope.optionAddModelCan = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].hasOwnProperty('isModelCanChange')) {
          $scope.unit.optionsDefault[$scope.optKey].isModelCanChange = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].isModelCanChange.push({});
      }

      console.log($scope.wargears)


      $scope.miltyChangeVarianView = function(opt) {
        var addArr = [];
        var remArr = [];
        var addTxt = '';
        var remTxt = '';
        var needenWargear = {};
        var result = '';
        if (!opt.addItems || !opt.removeItems) {
          return '';
        }

        for (var i in $scope.wargears) {
          if (~opt.addItems.indexOf($scope.wargears[i].wargearName)) {
            addArr.push($scope.wargears[i].visibleName);
          }
          if (~opt.removeItems.indexOf($scope.wargears[i].wargearName)) {
            remArr.push($scope.wargears[i].wargearName);
          }
        }

        result += 'За '+opt.cost+' можно ';

        if (remArr.length) {
          result += 'удалить '+ remArr.join(', ');
          if (addArr.length) {
            result += ', ';
          }
        }

        if (addArr.length) {
          result += 'добавить '+ addArr.join(', ');
        }

        result += '.';

        return result;

      }
    }],
    templateUrl : 'list/optionsDefault/multiChange/index.html'
  };
})

