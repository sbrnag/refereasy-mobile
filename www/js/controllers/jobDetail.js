app.controller('JobtDetailCtrl', function($scope, $stateParams, Auth, Jobs, Chats, $cordovaToast, $state) {

  $scope.currentUser = Auth.user;
  
  $scope.job = Jobs.get($stateParams.jobId);

  $scope.askReference = function() {
     Chats.createChat($scope.job).then(function(ref) {
       console.log('reference askked : ' +ref);
       //Auth.updateUserWithChatId($scope.currentUser.uid, ref.key());
       //Need to update the user object with jobs applied {uid: true} and in jobs too.
       $cordovaToast.showShortTop('Reference asked Successfully');
     });
  }
  
})