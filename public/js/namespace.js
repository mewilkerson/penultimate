
var penultimate = {
  views: {},
  models: {},
  currentUser: null,
  fire: null,
  firebaseURL: "https://penultimate.firebaseio.com/",


  logout: function() {
    penultimate.fire.unauth();
  },



  init: function(){
    _.extend(this, Backbone.Events);
    this.currentUser = new Backbone.Model();
    this.fire = new Firebase(this.firebaseURL);
    this.fire.onAuth(this.onAuthCallback);
  },

  isLoggedIn: function() {
    return !!(this.currentUser && this.currentUser.id);
  },

  twitterLogin: function(){
      this.fire.authWithOAuthPopup("twitter", function(error) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          // We'll never get here, as the page will redirect on success.
        }
      });
  },

  onAuthCallback: function(authData) {
    if(authData) {
      penultimate.authData = authData;
      penultimate.currentUser.set(authData.twitter.cachedUserProfile);
      console.log("A user is drowning in the river. Go help them.", authData);
    } else {
      penultimate.authData = null;
      penultimate.currentUser.clear();
      console.log("No one is logged in.");
    }
    penultimate.trigger("sign:in:out");
  }  
  
};

_.extend(penultimate, Backbone.Events);