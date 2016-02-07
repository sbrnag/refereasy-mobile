app.factory("Jobs", function(FURL, $firebaseArray, $firebaseObject, Auth) {

  var currentUser = Auth.user;
  //var ref = new Firebase(FURL);
  var ref = firebaseInst;
  var jobs = $firebaseArray(ref.child('jobs'));

  var Job = {
    all: function() {
      return jobs;
    },

    get: function(jobId) {
      return $firebaseObject(ref.child('jobs').child(jobId));
    },
    
    saveJob: function(job) {
      job.datetime = Firebase.ServerValue.TIMESTAMP;
      job.gravatar = currentUser.facebook.profileImageURL;
      job.poster = currentUser.facebook.displayName;
      job.uid = currentUser.uid;
      return jobs.$add(job);
    },

    editJob: function(jobId) {
      //edit job
    },

    deleteJob: function(jobId) {
      //delete job
    }

  };

  return Job;

});