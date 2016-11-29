angular.module('App', ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ngMockE2E'])
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
       .run(function($httpBackend){
         var items = [];
          $httpBackend.whenGET(/views\/.*/).passThrough();
          $httpBackend.whenGET('/item/list').respond(200, items);
          $httpBackend.whenPOST('/item/list').respond(function(method, url, data){
            var obj = angular.fromJson(data);
            items.push(obj.data);
            return [200, obj.data];
          });
          $httpBackend.whenPUT('/item/list').respond(function(method, url, data){
            var obj = angular.fromJson(data);
            angular.forEach(obj.dto, (value, prop, objData) => {
              if(items[obj.index].hasOwnProperty(prop)){
                items[obj.index][prop] = value;
              }
            });
            return [200, obj];
          });

          $httpBackend.whenDELETE('/item/list').respond(function(method, url, data){
              var obj = angular.fromJson(data);
              items.splice(obj.index, 1);
              return [200, obj];
          });

       });
