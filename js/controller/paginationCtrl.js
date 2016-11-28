angular.module('App')
   .controller('PaginationCtrl', ['$scope', '$log', function($scope, $log){
       $scope.totalItems = 64;
       $scope.currentPage = 4;

       $scope.setPage = function (pageNo) {
         $scope.currentPage = pageNo;
       };

       $scope.pageChanged = function() {
         console.log($scope.currentPage, '$scope.currentPage');
         //$log.log('Page changed to: ' + $scope.currentPage);
       };

       $scope.maxSize = 5;
       $scope.bigTotalItems = 175;
       $scope.bigCurrentPage = 1;
   }]);
