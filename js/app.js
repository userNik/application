angular.module('App', ['ngRoute'])
       .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
         $routeProvider
             .when('/', {
               templateUrl:'views/items.html',
               resolve:{
                 redirect:['$location', function($location){
                   $location.url('/items?view=table');
                 }]
               }
             })
             .when('/items', {
               templateUrl:'views/items.html',
               controller:'itemViewCtrl',
               resolve: {
                 top:['$routeParams', 'itemSvc', function($routeParams, itemSvc){
                   itemSvc.currentView($routeParams.view);
                 }]
               }
             })
             .when('/items/:id', {
              template:'views/items.html',
              controller:'itemViewCtrl',
              resolve: {
                defineRoute:['$routeParams', function($routeParams){
                  console.log($routeParams);
                }]
              }
            }).when('/create', {
              templateUrl:'views/createItem.html',
              controller:'itemViewCtrl',
            });
       }])
       .controller('MainCtrl', ['$rootScope', '$scope', 'itemSvc', function($rootScope, $scope, itemSvc){

       }])
       .controller('itemViewCtrl', ['$scope', 'itemSvc', '$location', '$timeout', function($scope, itemSvc, $location, $timeout){
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
           fieldsName:['name', 'desc'],
           name:{
             value:'',
             error:false
           },
           desc:{
             value:'',
             error:false
           },
          validateFields: function(form){
            var self = this;
            self.fieldsName.forEach(prop => {
              self[prop].error = form[prop].$invalid;
            });
          },
          clearError: function(form){
            var self = this;
            self.fieldsName.forEach(prop => {
              self[prop].error = false;
            });
          },
           sendData: function(form){
             var self = this;
             if(form.$valid){
               var dto = {
                 id:itemSvc.getListItem().length,
                 name:self.name.value,
                 desc:self.desc.value,
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
             $location.url('/create');
             $scope.itemBox.name = item.name;
             $scope.itemBox.desc = item.desc;
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
