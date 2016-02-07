app.controller('HomeCtrl', function($scope, Auth, $state, $ionicLoading) {

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };   

  
  $scope.login = function() {
  	$scope.show($ionicLoading);
    Auth.authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
          $state.go('tab.post');
          $scope.hide($ionicLoading); 
    });
  };

})