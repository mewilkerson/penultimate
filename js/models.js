(function(models){

  var UserTodoList = Backbone.Firebase.Collection.extend({

    url: function() {
      if (!penultimate.currentUser) {
        throw new Error("You are not currently logged in.");
      }
      var uid = encodeURIComponent(penultimate.currentUser.uid);

      return penultimate.firebaseURL +  "/todos/" + uid;
    }

  });

  models.UserTodoList = UserTodoList;

})(penultimate.models);