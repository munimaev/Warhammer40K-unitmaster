
myApp.directive('myListIswargeartochange', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {

      $scope.k1 = $scope.info.path[1];
      $scope.k2 = $scope.info.path[2];
      $scope.k3 = $scope.info.path[3];


      $scope.types = {
        'oneOfModelName' : {
          label : {
            rus : 'По имени модели'
          },
          desc : {
            rus : 'Только модель с указанным именем может использовать эту опцию'
          },
          directives : {
            "oneofmodelname" : {}
          }
        }
      }
      $scope.selectList = fabric_selectList( $scope,['unit','wargears','weaponstype','listsPos','linkClass']);


      $scope.deleteOpt = function () {
        $scope.unit.optionsDefault[$scope.k1][$scope.k2].splice($scope.k3,1);
        $scope.listsPos.splice($scope.info.key,$scope.listsPos.length - $scope.info.key);
      }
 
      $scope.optionAdd = function() {
        if (!$scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3] === undefined) {
          $scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3] = [];
        }
        $scope.unit.optionsDefault[$scope.k1][$scope.k2][$scope.k3].push({})
      }

      $scope.conditionView = function(o) {
        switch (o.type) {
          case "oneOfWargearType":
            var arr = [];
            for (var i in o.types) {
              arr.push($scope.weaponstype[o.types[i]]);
            }
            return {h:"Тип снаряжения",d:arr.join(', ')};
            break;
          case "oneOfWargearName":
            var arr = [];
            for (var i in o.names) {
              for (var k in $scope.wargears) {
                if ($scope.wargears[k].wargearName == o.names[i]) {
                  arr.push($scope.wargears[k].visibleName);
                }
              }
            }
            return {h:"Имя снаряжения",d:arr.join(', ')};
            break;
          case "createBySelf":
            return {h:"Это снаржяение по умолчанию"};
            break;
          default:
            return {h:"Требование"};
            break;
        }
        return o;
      }

    }],
    templateUrl: 'list/optionsDefault/selectiveChange/isWargearToChange/index.html'
  };
})
