app.controller('JobsCtrl', function($scope, Jobs, Auth) {

  $scope.currentUser = Auth.user;

  $scope.jobs = Jobs.all();
  
  /*var filterBarInstance;

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
        items: $scope.jobs,
        update: function (filteredItems, filterText) {
          $scope.jobs = filteredItems;
          if (filterText) {
            console.log(filterText);
            $scope.search = filterText;
          }
        }
    });
  };*/

});