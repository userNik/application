angular.module('App')
.controller('itemViewCtrl', ['$rootScope', '$scope', 'itemSvc', '$location', '$timeout', 'Upload', function($rootScope, $scope, itemSvc, $location, $timeout, Upload){
  function getListItem(){
    return itemSvc.getListItem()
      .then(response => {
          $scope.itemsList = response.data;
      });
  }

  $scope.items = itemSvc;
  $scope.itemsList = [];
  getListItem();
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
    var dto = {
      name: itemBox.name.value,
      desc: itemBox.desc.value,
      src: itemBox.image.value,
    };
    itemSvc.editItem(dto, itemBox.position)
      .then(response => {
         itemSvc.currentView('tile');
         $location.url('/items?view=tile');
      })
   },
    sendData: function(form){
      var self = this;
      if(form.$valid){

        if(Upload.blobUrls &&  Upload.blobUrls.length){
          itemSvc.itemBox.image.value = Upload.blobUrls[0].url;
        }

        if(itemSvc.itemBox.mode){
          self.editItem(itemSvc.itemBox);
          return;
        }

        var dto = {
          id:itemSvc.getListItem().length,
          name:itemSvc.itemBox.name.value,
          desc:itemSvc.itemBox.desc.value,
          src: itemSvc.itemBox.image.value
        };
        Upload.blobUrls = [];
        itemSvc.makeRequest(dto)
           .then(response => {
             $rootScope.typeView = itemSvc.currentView('tile');
             $rootScope.activeClass = 'tile';
             $location.url('/items?view=tile');
           });

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
      $rootScope.activeClass = 'create';
    },

    removeCurrentItem: function(item, index){
      $rootScope.modal.visible = true;
      $rootScope.modal.title = item.name;
      itemSvc.removeItem(index)
         .then(response => {});

    }
  };
  $rootScope.$on('successState', function(){
    getListItem();
  });

  $rootScope.$on('pageChanged', function(e, data){
    var begin = ((data.currentPage - 1) * $scope.perPage)
    , end = begin + $scope.perPage;
    $scope.itemsList = itemSvc.getListItem().slice(begin, end);
  });

}])
