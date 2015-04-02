(function(views){

  views.LoggedOutView = React.createClass({
    logIn: function(e){
      e.preventDefault;
      penultimate.twitterLogin();
    },
    render: function(){
      return (
        <div>
          <h2>YOU ARE LOGGED OUT</h2>
          <button onClick={this.logIn}>Log in with Twitter</button>
        </div>
      );
    }
  });


  views.LoggedInView = React.createBackboneClass({
    logOut: function(e){
      e.preventDefault();
      penultimate.logout();
    },


    render: function(){
      return (
        <div className="twitter-info">
          <img src={this.props.model.get("profile_image_url")}/>
          <div>{this.props.model.get("name")}</div>
          <button className="logout-button" onClick={this.logOut}>Log Out</button>
        </div>
        );
    }
  });


  views.LoggedInOrOut = React.createBackboneClass({
    getInfo: function(){
      if (this.props.model.id) {
        return <views.LoggedInView model={this.props.model}/>
      } else {
        return <views.LoggedOutView/>
      }
    },

    render: function() {
      return (
        <div className="twitter-login">
          { this.getInfo() }
        </div>  
        );
    }
  });

  views.Header = React.createBackboneClass({
    render: function() {
      return (
      <div>
        <div className="logo">PENULTIMATE</div>
        <views.LoggedInOrOut model={this.props.model}/>
      </div>  
      );
    }
  });

})(penultimate.views);

