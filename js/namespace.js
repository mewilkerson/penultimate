
var penultimate = {
  views: {},
  models: {},
  currentUser: null,
  fire: null,
  firebaseURL: "https://penultimate.firebaseio.com/",

  login: function(userData){
    penultimate.fire.authWithPassword(userData, function(err, authData){
      if (err) {
        conole.log("failed to log in.", userData.email, err);
        return;
      }
      console.log("logged", userData.email, "in successfully");
    });
  },

  logout: function() {
    penultimate.fire.unauth();
  },

  register: function(userData) {
    penultimate.fire.createUser(userData, function(err, udata){
      if(err) {
        console.log("registration error", userData.email, error);
        return;
      }
      console.log("Successfully registered", userData.email, "as", udata.uid)
    });
  },

  onAuthCallback: function(authData) {
    if(authData) {
      penultimate.currentUser = authData; 
      console.log("A user is logged in", authData);
    } else {
      penultimate.currentUser = null;
      console.log("No one is logged in.");
    }
  }  
  
};

_.extend(penultimate, Backbone.Events);