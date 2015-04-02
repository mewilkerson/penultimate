(function(views){

  views.LoggedOutView = React.createClass({displayName: "LoggedOutView",
    logIn: function(e){
      e.preventDefault;
      penultimate.twitterLogin();
    },
    render: function(){
      return (
        React.createElement("div", null, 
          React.createElement("h2", null, "YOU ARE LOGGED OUT"), 
          React.createElement("button", {onClick: this.logIn}, "Log in with Twitter")
        )
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
        React.createElement("div", {className: "twitter-info"}, 
          React.createElement("img", {src: this.props.model.get("profile_image_url")}), 
          React.createElement("div", null, this.props.model.get("name")), 
          React.createElement("button", {className: "logout-button", onClick: this.logOut}, "Log Out")
        )
        );
    }
  });


  views.LoggedInOrOut = React.createBackboneClass({
    getInfo: function(){
      if (this.props.model.id) {
        return React.createElement(views.LoggedInView, {model: this.props.model})
      } else {
        return React.createElement(views.LoggedOutView, null)
      }
    },

    render: function() {
      return (
        React.createElement("div", {className: "twitter-login"}, 
           this.getInfo() 
        )  
        );
    }
  });

  views.Header = React.createBackboneClass({
    render: function() {
      return (
      React.createElement("div", null, 
        React.createElement("div", {className: "logo"}, "PENULTIMATE"), 
        React.createElement(views.LoggedInOrOut, {model: this.props.model})
      )  
      );
    }
  });

})(penultimate.views);


(function(views){

  views.LyricWord = React.createBackboneClass({
    getChord: function() {
      if(this.props.editing) {
        return React.createElement("input", {name: "chord", size: "6"})
      }
      else {
        return React.createElement("div", {className: "chord"}, this.props.model.get("chord")) 
      }
    },

    render: function(){
      return (
        React.createElement("div", {className: "combo"}, 
          this.getChord(), 
          React.createElement("div", {className: "word"}, this.props.model.get("word"))
        )
      );
    }  

  });

  views.Lyrics = React.createBackboneClass({

    
    getDefaultProps: function() {
      return {
        editing: false
      }
    },

    buildLine: function(models, lineIndex) {
      var lyricWords = _.map(models, function(model){
        return React.createElement(views.LyricWord, {key: model.get("wordIndex"), model: model, editing: this.props.editing})
      }, this);

      return (
        React.createElement("div", {className: "lyric-line", key: lineIndex}, 
          lyricWords
        )
      );
    },

    buildLines: function() {
      var uniqLines = _.uniq(this.props.collection.pluck("lineIndex"));
      return _.map(uniqLines, function(lineNumber){
        var models = this.props.collection.where({lineIndex: lineNumber});
        models = _.sortBy(models, function(model) {
          return model.get("wordIndex");
        });
        return this.buildLine(models, lineNumber);
      }, this);
    },

    render : function() {
      return (
        React.createElement("div", null, 
          this.buildLines()
        )
      )
    }

  });


})(penultimate.views);



