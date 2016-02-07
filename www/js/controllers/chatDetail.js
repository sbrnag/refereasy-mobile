app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, Auth, $timeout, $ionicScrollDelegate) {

  $scope.currentUser = Auth.user;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.messages = Chats.getMessages($stateParams.chatId);

  $scope.messages.$loaded(function() {
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);
  });

  $scope.messages.$watch(function() { 
    $timeout(function() {
        viewScroll.scrollBottom();
    }, 0);
  });

  $scope.sendMessage = function() {
    //Chats.saveMessage($scope.text, $scope.chat);

    //to make the messaging fast adding the logic here itself
    var currTimeStamp = Firebase.ServerValue.TIMESTAMP;

    //saving chat details
    $scope.chat.datetime = currTimeStamp;
    $scope.chat.lastText = $scope.text;
    $scope.chat.$save();

    //saving message
    $scope.messages.$add({
          datetime : currTimeStamp,
          //gravatar : currentUser.facebook.profileImageURL,
          //name : currentUser.facebook.displayName,
          uid : $scope.currentUser.uid,
          text: $scope.text
    });

    $scope.text = '';
    viewScroll.scrollBottom(true);
  }

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      viewScroll.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    viewScroll.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };

})