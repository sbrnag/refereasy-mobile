app.controller('JobtDetailCtrl', function($scope, $stateParams, Auth, Jobs, Chats, $cordovaToast, $state) {

  $scope.currentUser = Auth.user;
  
  $scope.job = Jobs.get($stateParams.jobId);

  $scope.askReference = function() {
     Chats.createChat($scope.job).then(function(ref) {
        console.log('reference askked : ' +ref);
        //saving the first intial request message
        Chats.getMessages(ref.key()).$add({
          datetime : Firebase.ServerValue.TIMESTAMP,
          //gravatar : currentUser.facebook.profileImageURL,
          //name : currentUser.facebook.displayName,
          uid : $scope.currentUser.uid,
          text: 'Hi i am interested. If you like my profile please send me your mail id to share my resume'
        });
       //Auth.updateUserWithChatId($scope.currentUser.uid, ref.key());
       //Need to update the user object with jobs applied {uid: true} and in jobs too.
       Jobs.addUser($scope.job.$id, $scope.currentUser.uid);
       $cordovaToast.showShortTop('Reference asked Successfully');
     });
  }
  
})