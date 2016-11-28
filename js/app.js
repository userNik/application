angular.module('App', ['ngRoute', 'ui.bootstrap'])
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
       }]);
