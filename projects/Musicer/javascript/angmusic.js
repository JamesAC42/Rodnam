var musicer = angular.module('musicer',[]);
musicer.controller('notemenu', ['$scope',
  function($scope) {
	$scope.ttype = "note";
	$scope.iisdot = "";
    $scope.ttools = {
		whole: {
			name:'whole',
			duration: 1.0
		},
		half: {
			name:'half',
			duration: 0.5
		},
		quarter: {
			name: 'quarter',
			duration: 0.25
		},
		eighth: {
			name: 'eighth',
			duration: 0.125
		},
		sixteenth: {
			name: 'sixteenth',
			duration: 0.0625
		},
		thirtysecond: {
			name: 'thirtysecond',
			duration: 0.03125
		}
	};
	$scope.ttoolsmenu = [
		[$scope.ttools.whole,$scope.ttools.half],
		[$scope.ttools.quarter,$scope.ttools.eighth],
		[$scope.ttools.sixteenth,$scope.ttools.thirtysecond]
	];
	$scope.toggledotted = function(){
		if($scope.ttype == "rest"){return}
		else{
		$scope.iisdot = ($scope.iisdot ? "":"dotted");
		}
	};
	$scope.toggletype = function(){
		if($scope.iisdot == "dotted"){
			$scope.iisdot = "";
		}
		$scope.ttype = ($scope.ttype == "note" ? "rest":"note");
		console.log($scope.ttype);
	};
}]);





