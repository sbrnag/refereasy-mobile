app.factory("Auth", function(FURL, $firebaseAuth, $state, $firebaseObject) {

  //var ref = new Firebase(FURL);
  var ref = firebaseInst;
  var auth = $firebaseAuth(ref);
  var usersRef = ref.child('users');

  var Auth = {

    user: {},

    /*getUser: function(uid) {
      var userRef = usersRef.child(uid);
      return $firebaseObject(userRef);
    },*/

    /*updateUserWithChatId: function(uid, chatid) {
      var userChatRef = usersRef.child(uid + '/chats/' + chatid);
      userChatRef.set(true);
    },*/

    authWithOAuthPopup: function(provider) {
      return auth.$authWithOAuthPopup(provider, {remember: "sessionOnly", scope: "email"})
                    .then(function(authData) {
                        usersRef.child(authData.uid).set({
                          uid: authData.uid,
                          avatar: authData.facebook.profileImageURL,
                          name: authData.facebook.displayName
                          //add email and displayname
                        });  
              });
    },

    logout: function() {
      auth.$unauth();
    }  
    
  };

  auth.$onAuth(function(authData) {
	  if (authData === null) {
      angular.copy({}, Auth.user);
	    console.log("Not logged in yet");
      $state.go('home');
	  } else {
      angular.copy(authData, Auth.user);
	    console.log("Logged in as", authData.uid);
      $state.go('tab.post');
	  }
  });

  return Auth;	

});