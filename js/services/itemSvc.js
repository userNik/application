angular.module('App')
.factory('itemSvc', ['$http', function($http){
  var obj = {},
     currentView,
     srcView = {
      table:'views/items-table.html',
      tile:'views/items-tile.html'
    };

  function defineUrlState(){
    var loc = location;
    return loc.href.lastIndexOf('=') !== -1 ? loc.href.slice(loc.href.lastIndexOf('=') + 1, loc.href.length) : 'create';
  }

  currentView = defineUrlState();

  obj.itemBox = {
    fieldsName:['name', 'desc', 'image'],
    name:{
      value:'',
      error:false,
    },
    desc: {
      value:'',
      error:false
    },
    image:{
      value:''
    },
    mode:null,
    itemSize: null,
  };
  obj.activeClass = currentView;

  obj.currentView = function(state){
    if(state){
      currentView = state;
      return srcView[state];
    }
    else{
      return srcView[currentView];
    }
  };
  obj.getListItem = function(){
    return $http({
      method:'GET',
      url:'/item/list'
    });
  };

  obj.editItem = function(dto, index){
    return $http({
      method:'PUT',
      url:'/item/list',
      data: {
        dto:dto,
        index:index
      }
    });
  };

  obj.removeItem = function(index){
    return $http({
      method:'DELETE',
      url:'/item/list',
      data: {
        index:index
      }
    });
  };

  obj.makeRequest = function(dto){
    return $http({
      method:'POST',
      url:'/item/list',
      data:{
        data: dto
      }
    })
  }
  return obj;
}]);
