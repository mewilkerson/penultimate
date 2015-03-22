$(function(){

  penultimate.on("sign:in:out", function(){
    var col;
    if (penultimate.currentUser) {
      col = new penultimate.models.UserTodoList();
    } else {
      col = null;
    }
    todos.setProps({collection: col});
  });

  var loginEl = $(".login-form").get(0);
  var logoutEl = $(".logout-button").get(0);
  var todosEl = $(".todos").get(0);

  React.render(
    React.createElement(penultimate.views.Login),
    loginEl
    );

  React.render(
    React.createElement(penultimate.views.LogoutButton),
    logoutEl
    );

  var todos = React.render(
    React.createElement(penultimate.views.Todos),
    todosEl
    );

  penultimate.fire = new Firebase(penultimate.firebaseURL);
  penultimate.onAuth(penultimate.onAuthCallback);

});

// Need to match these render functions to correct div's