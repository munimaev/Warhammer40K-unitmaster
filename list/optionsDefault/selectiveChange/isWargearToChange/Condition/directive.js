
myApp.directive('myListIswargeartochangecondition', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info',
    },
    controller: ['$scope', function($scope) {
      console.log('msg')

      $scope.optKey = $scope.info.path[1];
      $scope.changeKey = $scope.info.path[3];
      $scope.conditionKey = $scope.info.path[4];


      $scope.types = {
        'oneOfWargearName' : {
          label : {
            rus : 'Имя снаряжения'
          },
          directives : {
            "oneOfWargearName" : {}
          }
        },
        'oneOfWargearType' : {
          label : {
            rus : 'Тип снаряжения'
          },
          directives : {
            "oneOfWargearType" : {}
          }
        },
        'createBySelf' : {
          label : {
            rus : 'Это снаряжение по уолчанию'
          },
          desc : {
            rus : 'Это снаряжение входит в изначальный вргир модели'
          },
          directives : {
            "createBySelf" : {}
          }
        }
      }
      $scope.selectList = fabric_selectList( $scope,['unit','wargears'/*,'models'*/,'listsPos']);

 
      $scope.deleteOpt = function () {
        $scope.unit.optionsDefault[$scope.optKey].isWargearToChange[$scope.changeKey].splice($scope.conditionKey,1);
        $scope.listsPos.splice($scope.info.key,$scope.listsPos.length - $scope.info.key);
      }

    }],
    templateUrl: 'list/optionsDefault/selectiveChange/isWargearToChange/Condition/index.html'
  };
})
