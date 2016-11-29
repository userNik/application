angular.module('App')
   .controller('PaginationCtrl', ['$rootScope', '$scope', 'itemSvc', function($rootScope, $scope, itemSvc){
       $scope.totalItems = itemSvc.itemBox.itemSize;
       $scope.currentPage = 1;
       $scope.setPage = function (pageNo) {
         $scope.currentPage = pageNo;
       };
       $scope.pageChanged = function() {
         $rootScope.$broadcast('pageChanged', {
           currentPage:$scope.currentPage
         });
       };

       $scope.maxSize = 5;
       $scope.bigTotalItems = 175;
       $scope.bigCurrentPage = 1;

   }]);
