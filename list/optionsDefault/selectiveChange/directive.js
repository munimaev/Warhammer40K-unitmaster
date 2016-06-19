myApp.directive('myListOptionSelectivechange', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.optKey = $scope.info.path[1];
      $scope.selectList = fabric_selectList( $scope, ['unit','models','wargears','listsPos','linkClass']);

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
        console.log('msg')
        if (!$scope.unit.optionsDefault[$scope.optKey].hasOwnProperty('isModelToChange')) {
          $scope.unit.optionsDefault[$scope.optKey].isModelToChange = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].isModelToChange.push({});
      }

      $scope.optionAddWargearCan = function() {
        if (!$scope.unit.optionsDefault[$scope.optKey].hasOwnProperty('isWargearToChange')) {
          $scope.unit.optionsDefault[$scope.optKey].isWargearToChange = [];  
        }
        $scope.unit.optionsDefault[$scope.optKey].isWargearToChange.push([]);
      }


      $scope.miltyChangeVarianView = function(opt) {
        var addTxt = '';
        var needenWargear = {};
        var result = '';
        
        if (!opt.changeTo) {
          return 'Вариант замены';
        }

        for (var i in $scope.wargears) {
          if (~opt.changeTo.indexOf($scope.wargears[i].wargearName)) {
            addTxt = $scope.wargears[i].visibleName;
            break;
          }
        }

        result += '' + addTxt +' за '+opt.cost+'';
 
 
        result += '.';

        return result;

      }

    }],
    templateUrl : 'list/optionsDefault/selectiveChange/index.html'
  };
})

