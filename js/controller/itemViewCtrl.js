angular.module('App')
.controller('itemViewCtrl', ['$scope', 'itemSvc', '$location', '$timeout', function($scope, itemSvc, $location, $timeout){
  console.log('init count');
  function defineUrlState(){
    var loc = location;
    return loc.href.lastIndexOf('=') !== -1 ? loc.href.slice(loc.href.lastIndexOf('=') + 1, loc.href.length) : null;
  }
   $scope.activeClass = defineUrlState();
   $scope.typeView = itemSvc.currentView(defineUrlState());
   $scope.switchStateView = function(state){
      $scope.typeView = itemSvc.currentView(state);
      $scope.activeClass = state;
  }
  $scope.items = itemSvc;

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

   clearData: function(){
     var obj = $scope.items.itemBox;
     obj.fieldsName.forEach(prop => {
       obj[prop].value = '';
     });
     obj.mode = null;
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
        itemSvc.currentView('tile');
        $location.url('/items?view=tile')

      }
      else{
         this.validateFields(form);
      }
    },
    showCurrentItem: function(item){
      var self = this;
      itemSvc.itemBox.name.value = item.name;
      itemSvc.itemBox.desc.value = item.desc;
      itemSvc.itemBox.mode = true;
      $location.url('/create');
    },

    removeCurrentItem: function(item){
      if(confirm('Are you serious???')){
        itemSvc.getListItem().forEach((prop, index, arr) => {
          if(prop.id === item.id){
            arr.splice(index, 1);
          }
        });
      }

    }
  };
}])
