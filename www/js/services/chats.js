app.factory('Chats', function(FURL, $firebaseArray, $firebaseObject, Auth) {
  
  var currentUser = Auth.user;
  //var ref = new Firebase(FURL);
  var ref = firebaseInst;
  var chatsRef = $firebaseArray(ref.child('chats'));

  var Chats = {

    all: chatsRef,

    createChat: function(job) {

      var initialText = 'Hi i; am interested. If you like my profile please share the detals';

      var chat = {
        datetime : Firebase.ServerValue.TIMESTAMP,
        jobGravatar : job.gravatar,
        jobPoster : job.poster,
        jobUid : job.uid,
        jobSkills : job.skills,
        jobPostedOn : job.datetime,
        gravatar : currentUser.facebook.profileImageURL,
        name : currentUser.facebook.displayName,
        initialText : initialText,
        lastText : initialText,
        userUid : currentUser.uid
      };
      return chatsRef.$add(chat);
    },

    get: function(chatId) {
      return $firebaseObject(ref.child('chats').child(chatId));
    },

    getMessages: function(chatId) {
      return $firebaseArray(ref.child('chats').child(chatId)); 
    }

  };

  return Chats;
});