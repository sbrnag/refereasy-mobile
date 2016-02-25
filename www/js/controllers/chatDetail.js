app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, Auth, $timeout, 
                                            $ionicScrollDelegate, $rootScope, $ionicPlatform) {

  $scope.currentUser = Auth.user;
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.messages = Chats.getMessages($stateParams.chatId);

  
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  //var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  
  

  $scope.messages.$loaded(function() {
    $ionicScrollDelegate.scrollBottom();
  });

  $scope.messages.$watch(function() { 
    $timeout(function() {
        $ionicScrollDelegate.scrollBottom();
    }, 300);
  });

  $scope.sendMessage = function() {
    //Chats.saveMessage($scope.text, $scope.chat);

    //to make the messaging fast adding the logic here itself
    var currTimeStamp = Firebase.ServerValue.TIMESTAMP;

    //saving message
    $scope.messages.$add({
          datetime : currTimeStamp,
          //gravatar : currentUser.facebook.profileImageURL,
          //name : currentUser.facebook.displayName,
          uid : $scope.currentUser.uid,
          text: $scope.text
    });
    
    var posterUnread = $scope.chat.posterUnread;
    var seekerUnread = $scope.chat.seekerUnread;
    if($scope.currentUser.uid === $scope.chat.userUid) {
        posterUnread = posterUnread + 1;
    } else if($scope.currentUser.uid === $scope.chat.jobUid) {
        seekerUnread = seekerUnread + 1;
    }

    //updating chat details
    Chats.updateChat($scope.chat.$id, currTimeStamp, $scope.text, posterUnread, seekerUnread);
    /*$scope.chat.datetime = currTimeStamp;
    $scope.chat.lastText = $scope.text;
    $scope.chat.$save();*/

    $scope.text = '';
    $timeout(function() {
        $ionicScrollDelegate.scrollBottom();
    }, 300);
  }

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };



  // override soft back
  // framework calls $rootScope.$ionicGoBack when soft back button is pressed
  var oldSoftBack = $rootScope.$ionicGoBack;

  var clearCounts  = function() {
    if($scope.currentUser.uid === $scope.chat.userUid) {
      if($scope.chat.seekerUnread !== 0) {
        Chats.resetSeekerUnreadCount($scope.chat.$id);
      }
    } else if($scope.currentUser.uid === $scope.chat.jobUid) {
      if($scope.chat.posterUnread !== 0) {
        Chats.resetPosterUnreadCount($scope.chat.$id);
      }
    }
    oldSoftBack();
  };

  $rootScope.$ionicGoBack = function() {
      clearCounts();

  };
  var deregisterSoftBack = function() {
      $rootScope.$ionicGoBack = oldSoftBack;
  };

  // override hard back
  // registerBackButtonAction() returns a function which can be used to deregister it
  var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
      clearCounts, 101
  );

  // cancel custom back behaviour
  $scope.$on('$destroy', function() {
      deregisterHardBack();
      deregisterSoftBack();
  });

  

})