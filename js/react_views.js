(function(views){

  var TextField = React.createClass({displayName: "TextField",

    render: function(){
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.type || "text";
      return (
        React.createElement("div", {className: "textfield"}, 
          React.createElement("div", null, 
            React.createElement("label", {htmlFor: htmlID}, label)
          ), 
          React.createElement("div", null, 
            React.createElement("input", {type: type, name: name, id: htmlID})
          )
        )  
        );
    }

  });

// ---------

  var Login = React.createClass({displayName: "Login",

    onSubmit: function(e) {
      e.preventDefault();
      var loginData = $(e.target).serializeJSON();
      penultimate.login(loginData);
    },

    render: function(){
      return (
        React.createElement("form", {onSubmit: this.onSubmit}, 
          React.createElement(TextField, {name: "email", label: "Email"}), 
          React.createElement(TextField, {name: "password", label: "Password", type: "password"}), 

          React.createElement("button", null, "Sign In")
        )  

        );
    }

  });

// ------------


  var LogooutButton = React.createClass({displayName: "LogooutButton",
    onClick: function(e) {
      e.preventDefault();
      penultimate.logout();
    },
    render: function(){
      return React.createElement("button", {onClick: this.onClick}, "Logout")
    }
  });

// -------------

views.Login = Login;
views.LogooutButton = LogooutButton;



})(penultimate.views);
(function(views){

  var Todos = React.createBackboneClass({

    makeLI: function(model, index){
      return React.createElement("li", {key: index}, model.get("task"));
    },

    render: function(){
      if (this.props.collection) {
        return (
          React.createElement("ul", null, 
            this.props.collection.map(this.makeLI)
          )  
          );
      } else {
        return (
          React.createElement("ul", null, 
            React.createElement("li", null, " No list currently loaded.")
          )  
          );
      }
    }

  });

  views.Todos = Todos;

})(penultimate.views);