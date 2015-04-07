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
    updateModel: function(e) {
      this.props.model.set("chord", e.target.value);
    },

    getChord: function() {
      if(this.props.editing) {
        return React.createElement("input", {onChange: this.updateModel, name: "chord", size: "6", value: this.props.model.get("chord") || ""})
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

  views.LyricsEditor = React.createBackboneClass({

    getInitialState: function() {
      return {
        editing: false
      }
    },

    saveChords: function() {
      this.setState({editing: false});
    },

    editChords: function() {
      this.setState({editing: true});
    },

    getEditButton: function() {
      if (this.state.editing) {
        return React.createElement("button", {onClick: this.saveChords}, "Save Chords")
      }
      else {
        return React.createElement("button", {onClick: this.editChords}, "Edit Chords")
      }
    },

    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("div", null, 
            this.getEditButton()
          ), 
          React.createElement("div", null, 
            React.createElement(views.Lyrics, {collection: this.props.collection, editing: this.state.editing})
          )
        )
      );
    }

  })


})(penultimate.views);




(function(views){

  views.Search = React.createClass({displayName: "Search",
    onSubmit: function(e) {
      e.preventDefault();

      var query = this.refs.query.getDOMNode().value;
      var genre = this.refs.genre.getDOMNode().value;

      this.props.onSearch({
        query: query,
        genre: genre
      });
    },

    render: function(){
      return (
      React.createElement("div", null, 
        React.createElement("div", null, 
          React.createElement("form", {onSubmit: this.onSubmit}, 
            React.createElement("input", {ref: "query", type: "text", className: "search-bar", size: "50"}), 
            React.createElement("select", {ref: "genre"}, 
              React.createElement("option", {value: "rock"}, "Rock"), 
              React.createElement("option", {value: "rap"}, "Rap"), 
              React.createElement("option", {value: "country"}, "Country"), 
              React.createElement("option", {value: "pop"}, "Pop")
            ), 
            React.createElement("button", {className: "search-button"}, "Search")
          )
        )
        /*<div className="search-auto-complete">
          <views.SearchAutoCompleteDropDown/>
        </div>*/
      )
      );
    }
  });

  views.SearchAutoCompleteDropDown = React.createClass({displayName: "SearchAutoCompleteDropDown",
    render: function() {
      return (
        React.createElement("ul", {className: "drop-down"}, 
          React.createElement("li", null, "Wonderwall by Oasis"), 
          React.createElement("li", null, "Wonderwall by Mike Posner (Ft. Big KRIT)"), 
          React.createElement("li", null, "Wonderwall by One Direction"), 
          React.createElement("li", null, "Wonderwall by Illy")
        )
      );
    }
  });

})(penultimate.views);
