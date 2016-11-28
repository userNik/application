angular.module('App')
.controller('MainCtrl', ['$rootScope', '$scope', 'itemSvc', function($rootScope, $scope, itemSvc){


   $rootScope.typeView = itemSvc.currentView();
   $rootScope.activeClass = itemSvc.activeClass;
   $scope.switchStateView = function(state){
      $rootScope.typeView = itemSvc.currentView(state);
      $rootScope.activeClass = state;
  };

  $rootScope.modal = {
    visible:false
  };

  $scope.closeModal = function(){
    $rootScope.modal.visible = false;
  };

  $scope.confirmModal = function(){
    $rootScope.modal.visible = false;
    $rootScope.$broadcast('successState', {});
  }

  $scope.clearData = function(){
    var obj = itemSvc.itemBox;
    obj.fieldsName.forEach(prop => {
      obj[prop].value = '';
    });
    obj.mode = null;
  };
}])
