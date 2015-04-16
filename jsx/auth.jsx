(function(views){

  views.LoggedOutView = React.createClass({
    logIn: function(e){
      e.preventDefault;
      penultimate.twitterLogin();
    },
    render: function(){
      return (
        <div className="logged-out-div">
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
            <li><img src={this.props.model.get("profile_image_url_https")}/></li>
            <li><div className="twitter-username">{this.props.model.get("name")}</div></li>
            <li><i className="fa fa-sign-out" onClick={this.logOut}></i></li>
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
          <div className="logo">chord<strong>circle</strong></div>
        </div>
        <div className="header-right">
          <views.LoggedInOrOut model={this.props.model}/>
        </div>
      </div>  
      );
    }
  });

})(penultimate.views);

