app.factory('Chats', function(FURL, $firebaseArray, $firebaseObject, Auth) {
  
  var currentUser = Auth.user;
  //var ref = new Firebase(FURL);
  var ref = firebaseInst;
  var chatsRef = ref.child('chats');
  var chats = $firebaseArray(chatsRef);
  var chatMessagesRef = ref.child('chat_messages');

  var Chats = {

    all: chats,

    createChat: function(job) {

      var initialText = 'Hi i am interested. If you like my profile please send me your mail id to share my resume';

      var chat = {
        datetime : Firebase.ServerValue.TIMESTAMP,
        //jobGravatar : job.gravatar,
        //jobPoster : job.poster,
        jobUid : job.uid,
        //jobSkills : job.skills,
        //jobPostedOn : job.datetime,
        gravatar : currentUser.facebook.profileImageURL,
        name : currentUser.facebook.displayName,
        lastText : initialText,
        userUid : currentUser.uid,
        posterUnread : 1,
        seekerUnread : 0
      };
      return chats.$add(chat);
    },

    get: function(chatId) {
      return $firebaseObject(chatsRef.child(chatId));
    },

    updateChat: function(chatId, datetime, lastText, posterUnread, seekerUnread) {
      var chatRef = chatsRef.child(chatId);
      chatRef.update({ 'datetime': datetime, 'lastText': lastText, 'posterUnread' : posterUnread, 'seekerUnread' :  seekerUnread });
    },

    resetPosterUnreadCount: function(chatId) {
      var chatRef = chatsRef.child(chatId);
      chatRef.update({ 'posterUnread' : 0 });
    },

    resetSeekerUnreadCount: function(chatId) {
      var chatRef = chatsRef.child(chatId);
      chatRef.update({ 'seekerUnread' : 0 });
    },

    getMessages: function(chatId) {
      return $firebaseArray(chatMessagesRef.child(chatId)); 
    }

  };

  return Chats;
});