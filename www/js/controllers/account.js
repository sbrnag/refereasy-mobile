app.controller('AccountCtrl', function($scope, Auth, $state) {

  $scope.currentUser = Auth.user;	
  
  $scope.settings = {
    enableFriends: true
  };

  $scope.logout = function() {
    Auth.logout();
    console.log('logged out successfully');
    $state.go('home');
  };

});