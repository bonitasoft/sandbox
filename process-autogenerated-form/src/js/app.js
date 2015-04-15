(function () {
  'use strict';
  var app = angular.module('autogeneratedForm', [
    'ui.bootstrap',
    'ngResource',
    'org.bonita.common.resources'
    ]);

  app.controller('MainCtrl', ['$scope','$location', 'contractSrvc','$window', 'processAPI', function ($scope, $location, contractSrvc, $window, processAPI) {

    var processId = $location.search().id;

    $scope.contract = {};
    $scope.dataToSend = {};
    $scope.process = {};
    $scope.message = undefined;

        $scope.getInputName = function() {
      return 'dataToSend.attribute1';
    };


    contractSrvc.fetchContract(processId).then(function(result){
      $scope.contract = result.data;
    });

    processAPI.get({id:processId}, function(result){

      $scope.process = result;
    });

    $scope.postData = function() {
      $scope.message = undefined;
      contractSrvc.startProcess(processId, $scope.dataToSend).then(function(result){
        console.log($window.top.location.href);
        $window.top.location.href = "/bonita";
      }, function(reason){
        $scope.message = reason.data.explanations?reason.data.explanations:reason.data.message;
    });
    };


  }])
  .config(['$locationProvider',function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);


})();
