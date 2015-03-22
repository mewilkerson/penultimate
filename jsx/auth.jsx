(function(views){

  var TextField = React.createClass({

    render: function(){
      var name = this.props.name;
      var htmlID = "react-textfield-" + name + "-" + Math.random();
      var label = this.props.label || name;
      var type = this.props.type || "text";
      return (
        <div className="textfield">
          <div>
            <label htmlFor={htmlID}>{label}</label>
          </div>
          <div>
            <input type={type} name={name} id={htmlID} />
          </div>
        </div>  
        );
    }

  });

// ---------

  var Login = React.createClass({

    onSubmit: function(e) {
      e.preventDefault();
      var loginData = $(e.target).serializeJSON();
      tiy.login(loginData);
    },

    render: function(){
      return (
        <form onSubmit={this.onSubmit}>
          <TextField name ="email" label="Email"/>
          <TextField name="password" label="Password" type="password"/>

          <button>Sign In</button>
        </form>  

        );
    }

  });

// ------------


  var LogoutButton = React.createClass({
    onClick: function(e) {
      e.preventDefault();
      penultimate.logout();
    },
    render: function(){
      return <button onClick={this.onClick}>Logout</button>
    }
  });

// -------------

views.Login = Login;
views.LogoutButton = LogoutButton;



})(penultimate.views);