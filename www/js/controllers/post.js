app.controller('PostCtrl', function($scope, Jobs, $cordovaToast, Auth) {

  $scope.currentUser = Auth.user;	

  $scope.job = {};
  
  $scope.postJob = function() {
    Jobs.saveJob($scope.job);
    $scope.job = {};
    $cordovaToast.showShortTop('Job Posted Successfully');
  }

});