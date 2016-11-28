angular.module('App')
.factory('itemSvc', [function(){
  var obj = {},
     currentView,
     items = [{
       id:0,
       name:'Angular',
       desc:'MVC framework'
     },{
       id:1,
       name:'React',
       desc:'View libary'
     }],
   srcView = {
    table:'views/items-table.html',
    tile:'views/items-tile.html'
  };

  obj.itemBox = {
    fieldsName:['name', 'desc'],
    name:{
      value:'',
      error:false,
    },

    desc: {
      value:'',
      error:false
    },
    mode:null
  };

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
    return items;
  };
  obj.addItem = function(item){
    items.push(item);
  };
  return obj;
}]);
