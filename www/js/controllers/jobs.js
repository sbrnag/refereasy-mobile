app.controller('JobsCtrl', function($scope, Jobs) {

  $scope.jobs = Jobs.all();

});