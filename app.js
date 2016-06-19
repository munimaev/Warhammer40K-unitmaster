var getGlobalVariable = function($scope, arr) {
  var arr = arr || ['listsPos','unit'];
  for (var i in arr) {
    var parent = $scope;
    // console.log($scope);
    while (!$scope[arr[i]]) {

      parent = parent.$parent;
      if (parent.hasOwnProperty(arr[i])) {
        $scope[arr[i]] = parent[arr[i]];
      }
    }
  }  
}


var fabric_selectList = function( $scope, arr) {
  var arr = arr || null;
  getGlobalVariable($scope, arr);

  return function(event,  key, type, path) {
    // console.log('selectList')

    var offsetY = event.target.offsetParent.offsetTop ;
    var lastParent = event.target.offsetParent; 

    while (lastParent.classList[0] != 'list') {
      lastParent = lastParent.parentNode;
      if (~['list','genOpt','card'].indexOf(lastParent.classList[0]) ){
        offsetY += lastParent.offsetTop 
      }
    }

    $scope.listsPos[key] = {
      x    : (key+1) * 301,
      y    : offsetY -8,
      key  : key,
      path : path,
      type : type
    }

    $scope.listsPos.splice(key+1, $scope.listsPos.length - key - 1);

    // console.log($scope.listsPos)
  }
};
var prefix_User  = 'MrMoon';
var prefix_Army  = 'SM';
var prefix_Date  = '12345678990';
var prefix_Count = 0;
var prefix       = prefix_User + '_' + prefix_Date + '_' + prefix_Army + '_';

var myApp = angular.module('myApp',[]);

myApp.controller('CtrlUnit', ['$scope','$http', function($scope,$http) {


  $http.get('data/WH_models_SM.json').success(function(data) {
    $scope.models = data.models;
    $scope.models.sort(function(a,b){
      if (a.visibleModelName > b.visibleModelName) return 1;
      if (a.visibleModelName < b.visibleModelName) return -1;
      return 0;
    })
    $scope.wargears = data.wargear;
    $scope.wargears.sort(function(a,b){
      if (a.visibleName > b.visibleName) return 1;
      if (a.visibleName < b.visibleName) return -1;
      return 0;
    })
    $scope.specialRules = data.specialRules;
    $scope.wargears.sort(function(a,b){
      if (a.visibleName > b.visibleName) return 1;
      if (a.visibleName < b.visibleName) return -1;
      return 0;
    })
  });

  $scope.getUnitId = function() {
    var unitName = $scope.unit.visibleName.split(' ').join('')
    return  prefix + unitName;
  }


  $scope.getModelName = function() {
    var hash = {};
    return function(id) {
      if (hash[id]) {
        return hash[id];
      }
      for (var i in $scope.models) {
        if ($scope.models[i].modelName == id) {
          hash[id] = $scope.models[i].visibleModelName;
          return $scope.models[i].visibleModelName;
        }
      }
      return "-"
    }
  }()

  $scope.getRulelName = function() {
    var hash = {};
    return function(id) {
      if (hash[id]) {
        return hash[id];
      }
      for (var i in $scope.specialRules) {
        if ($scope.specialRules[i].specialRuleName == id) {
          hash[id] = $scope.specialRules[i].visibleName;
          return $scope.specialRules[i].visibleName;
        }
      }
      return "-"
    }
  }()

  $scope.getWargearName = function() {
    var hash = {};
    return function(id) {
      if (hash[id]) {
        return hash[id];
      }
      for (var i in $scope.wargears) {
        if ($scope.wargears[i].wargearName == id) {
          hash[id] = $scope.wargears[i].visibleName;
          return $scope.wargears[i].visibleName;
        }
      }
      return "-"
    }
  }()


  $scope.weaponstype = {
    'RangedWeapon' : 'Дальнобойное оружие',
    'MeleeWeapon' : 'Оружие ближнего боя',
  }

  $scope.transport = {
    SM_DropPod : 'Drop Pod',
    SM_Rhino : 'Rhino',
    SM_Razorback : 'Razorback',
  }
  $scope.unitTypes = {
    'Infantry':'Infantry',
    'Vehicle' :'Vehicle',
  }

  var data = {
    "type": null,
    "visibleName": "Tactical Squad",
    "unitName": "SM_TacticalSquad",
    "price": 70,
    "structureDefault": [

    ],
    "defaultSpecialRules": [
    ],
    "optionsDefault": [
    ],
    "defaultUnitWargear": [
    ],
    "pic": "units_DA/TacticakSquade.jpg"
  }

  var desrialize = function (data, tag) {
    var specialRules = {none:{}};
    data.forEach(function(o){
      if (typeof o == "string") {
        if (!specialRules.none.hasOwnProperty('toAll'))  {
          specialRules.none.toAll = {};
          specialRules.none.toAll[tag] = [];
        }
        specialRules.none.toAll[tag].push( o );
      } 
      else if (o.type == 'onModelName') {
        if (!specialRules.hasOwnProperty('onModelName'))  specialRules.onModelName = {};
        o.names.forEach(function(n){
          if (!specialRules.onModelName.hasOwnProperty(n)) {
            specialRules.onModelName[n] = {};
            specialRules.onModelName[n][tag] = [];
          }
          specialRules.onModelName[n][tag] = o[tag];  
        })
      }
    });
    return specialRules;
  }
  data.defaultSpecialRules = desrialize(data.defaultSpecialRules, 'rules');
  data.defaultUnitWargear = desrialize(data.defaultUnitWargear, 'wargears');
  $scope.unit =  data; 



  $scope.listsPos = []

  $scope.selectList = fabric_selectList( $scope);

  $scope.optionViewName = function(opt, optKey) {

    var h = "["+(Number(optKey)+1)+"] Опция " + (Number(optKey)+1);
    var d = "";
    switch (opt.type) {
      case 'addModel':
        h = "["+(Number(optKey)+1)+"] Добавить модель";
        for (var i in $scope.models) {
          if ($scope.models[i].modelName == opt.modelToAdd) {
            d = "Можно добавить до "+opt.maxCountAdding+" моделей "+$scope.models[i].visibleModelName+" по "+opt.cost+" очков.";  
            break;
          }
        }
        break; 
      case 'multiChange':
        h = "["+(Number(optKey)+1)+"] Мультизамена";
        d = opt.headerText;
        break; 
      case 'upgradeModel':
        h = "["+(Number(optKey)+1)+"] Улчшение модели";
        for (var i in $scope.models) {
          if ($scope.models[i].modelName == opt.upgaredForm) {
            for (var k in $scope.models) {
              if ($scope.models[k].modelName == opt.upgaredTo) {
                d = "Можно улучшить "+$scope.models[i].visibleModelName+ " до "+$scope.models[k].visibleModelName+" за "+opt.cost+" очков.";  
                break;
              }
            }
          }
        }
        break; 
      case 'selectiveChange':
        h = "["+(Number(optKey)+1)+"] Замена с выбором";
        d = opt.headerText;
        break;  
      case 'dedicatedTransport':
        h = "["+(Number(optKey)+1)+"] Прикомандированный транспорт";
        d = "Отряд может выбратьв качестве прикомандированного транспорта одно из следующего";
        break; 
      default:
        break; 

    }

    return {h:h,d:d};
  }

  $scope.addOption = function() {
    $scope.unit.optionsDefault.push({}); 
  }

  $scope.structureDefaultViewName = function(name, count) {

    var h = count + " x " +$scope.getModelName(name);
    var d = "";

    return {h:h,d:d};
  }
  $scope.addStructureDefault = function() {
    $scope.unit.structureDefault.push( { count:1 } );  
  }
  $scope.addtSpecialRule = function(key1, key2) {
    
    if (!$scope.unit.defaultSpecialRules.hasOwnProperty(key1)) {
      $scope.unit.defaultSpecialRules[key1] = {};
    }
    if (!$scope.unit.defaultSpecialRules[key1].hasOwnProperty(key2)) {
      $scope.unit.defaultSpecialRules[key1][key2] = {rules:[]};
    }
    if (!~$scope.unit.defaultSpecialRules[key1][key2].rules.indexOf(null)) {
      $scope.unit.defaultSpecialRules[key1][key2].rules.push( null );   
    }
  }

  $scope.linkClass = function(n,a) {
    if (!$scope.listsPos[n]) {
      return 'card_link';  
    }
    var p = $scope.listsPos[n].path;
    for (var i in a) {
      if (a[i] != p[i]) {
        return 'card_link'
      }
    }
    return 'card_link card_link_active';
  }


  $scope.saveUnit = function() {
    var defaultSpecialRules = [
      // "AndTheyShallKnowNoFear",
      // {
        // "type": "onModelName",
        // "names": [
          // "SM_SpaceMarine_Sergeant"
        // ],
        // "rules": [
          // "AndTheyShallKnowNoFear",
          // "IndependentCharacter",
          // "BlessingOfTheOmnissiah",
        // ]
      // }
    ]
    for (var k in $scope.unit.defaultSpecialRules) {
      if (k == 'none') {
        for (var l in $scope.unit.defaultSpecialRules[k]) {
          if (l == 'toAll') {
            var arr = [].concat($scope.unit.defaultSpecialRules[k][l].rules);
            for (var i = arr.length - 1; i >= 0; i--) {
              if (arr[i] == null) {
                arr.splice(i,1);
              }
            };
            defaultSpecialRules  = defaultSpecialRules.concat(arr);
          }
        }
      } else if ( k == 'onModelName') {
        for (var l in $scope.unit.defaultSpecialRules[k]) {
          if ($scope.unit.defaultSpecialRules[k][l].rules.length) {
            var o = {
              type: "onModelName",
              names: [l],
              rules: [].concat($scope.unit.defaultSpecialRules[k][l].rules)
            }
            for (var i = o.rules.length - 1; i >= 0; i--) {
              if (o.rules[i] == null) {
                o.rules.splice(i,1);
              }
            };
            defaultSpecialRules.push(o);
          }
        }
      }
    }
    return defaultSpecialRules;
  }

}]);






myApp.directive('myListGenerator', function($compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      info: '=info'
    },
    controller: ['$scope', function($scope) {
    }],
    link: function(scope, element) {
      var generatedTemplate = '<my-list-'+scope.info.type+' info="info"></my-list-'+scope.info.type+'>';
      element.append($compile(generatedTemplate)(scope));
    }
  };
})



