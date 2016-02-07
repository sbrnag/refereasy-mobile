app.controller('PostCtrl', function($scope, Jobs, $cordovaToast) {

  $scope.job = {};

  $scope.postJob = function() {
    Jobs.saveJob($scope.job);
    $scope.job = {};
    $cordovaToast.showShortTop('Job Posted Successfully');
  }

});