angular.module('App')
.controller('itemViewCtrl', ['$rootScope', '$scope', 'itemSvc', '$location', '$timeout', function($rootScope, $scope, itemSvc, $location, $timeout){

  $scope.items = itemSvc;
  $scope.itemsList = itemSvc.getListItem();
  $scope.perPage = 5;
  $scope.itemBox = {
   validateFields: function(form){
     var obj = $scope.items.itemBox;
     obj.fieldsName.forEach(prop => {
       obj[prop].error = form[prop].$invalid;
     });
   },
   clearError: function(form){
     var obj = $scope.items.itemBox;
     obj.fieldsName.forEach(prop => {
       obj[prop].error = false;
     });
   },

   editItem: function(itemBox){
     var obj = itemSvc.getListItem()[itemBox.position];
     obj.name = itemBox.name.value;
     obj.desc = itemBox.desc.value;
     itemSvc.currentView('tile');
     $location.url('/items?view=tile');
   },
    sendData: function(form){
      var self = this;
      if(form.$valid){

        if(itemSvc.itemBox.mode){
          self.editItem(itemSvc.itemBox);
          return;
        }
        var dto = {
          id:itemSvc.getListItem().length,
          name:itemSvc.itemBox.name.value,
          desc:itemSvc.itemBox.desc.value,
        }
        itemSvc.addItem(dto);
        $rootScope.typeView = itemSvc.currentView('tile');
        $rootScope.activeClass = 'tile';
        $location.url('/items?view=tile');

      }
      else{
         this.validateFields(form);
      }
    },
    showCurrentItem: function(item, index){
      var self = this;
      itemSvc.itemBox.name.value = item.name;
      itemSvc.itemBox.desc.value = item.desc;
      itemSvc.itemBox.mode = true;
      itemSvc.itemBox.position = index;
      $location.url('/create');
      $rootScope.$broadcast('editMode', {});
    },

    removeCurrentItem: function(item, index){
      $rootScope.modal.visible = true;
      $rootScope.modal.title = item.name;
      itemSvc.itemBox.currentItem = {
        item:item,
        index:index
      };
    }
  };
  $rootScope.$on('successState', function(){
    if(typeof itemSvc.itemBox.currentItem.index !== 'undefined'){
      itemSvc.getListItem().splice(itemSvc.itemBox.currentItem.index, 1);
      itemSvc.itemBox.currentItem = {};
    }
  });

  $rootScope.$on('pageChanged', function(e, data){
    var begin = ((data.currentPage - 1) * $scope.perPage)
    , end = begin + $scope.perPage;
    $scope.itemsList = itemSvc.getListItem().slice(begin, end);
  });

}])
