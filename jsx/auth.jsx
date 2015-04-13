(function(views){

  views.LoggedOutView = React.createClass({
    logIn: function(e){
      e.preventDefault;
      penultimate.twitterLogin();
    },
    render: function(){
      return (
        <div>
          <p>No user currently logged in.</p>
          <a href="#" className="login-link" onClick={this.logIn}>Log in with <i className="fa fa-twitter-square"></i></a>
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
          <ul className="twitter-list">
            <li><img src={this.props.model.get("profile_image_url")}/></li>
            <li><div>{this.props.model.get("name")}</div></li>
            <li><button className="logout-button" onClick={this.logOut}>Log Out</button></li>
          </ul>
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
        <div className="header-left">
          <div className="logo">chord circle</div>
        </div>
        <div className="header-right">
          <views.LoggedInOrOut model={this.props.model}/>
        </div>
      </div>  
      );
    }
  });

})(penultimate.views);

