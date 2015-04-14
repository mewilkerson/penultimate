(function(views){

  views.LoggedOutView = React.createClass({displayName: "LoggedOutView",
    logIn: function(e){
      e.preventDefault;
      penultimate.twitterLogin();
    },
    render: function(){
      return (
        React.createElement("div", null, 
          React.createElement("p", null, "No user currently logged in."), 
          React.createElement("a", {href: "#", className: "login-link", onClick: this.logIn}, "Log in with ", React.createElement("i", {className: "fa fa-twitter-square"}))
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
          React.createElement("ul", {className: "twitter-list"}, 
            React.createElement("li", null, React.createElement("img", {src: this.props.model.get("profile_image_url")})), 
            React.createElement("li", null, React.createElement("div", null, this.props.model.get("name"))), 
            React.createElement("li", null, React.createElement("button", {className: "logout-button", onClick: this.logOut}, "Log Out"))
          )
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
        React.createElement("div", {className: "header-left"}, 
          React.createElement("div", {className: "logo"}, "chord circle")
        ), 
        React.createElement("div", {className: "header-right"}, 
          React.createElement(views.LoggedInOrOut, {model: this.props.model})
        )
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

  views.SongBook = React.createBackboneClass({

    // getSong: function(name, index) {
    //   console.log("rendering", name, index);
    //   return <li key={index}><strong>wha</strong></li>;
    // },

    getSong: function(name, index) {
      return React.createElement("li", {key: index}, React.createElement("i", {className: "fa fa-star"}), " ", name)
    },

    render: function() {
      if (penultimate.isLoggedIn()) {
        return (
          React.createElement("div", null, 
            React.createElement("h2", null, "My Songbook"), 
            React.createElement("ul", {className: "songbook-list"}, 
              _.map(this.props.model.getNames(), this.getSong)
            )
          )
        )
      }
      else {
        return React.createElement("div", null, "Sign in to view your song book")
      }
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
        return React.createElement("span", {onClick: this.saveChords}, "Save Chords")
      }
      else {
        return React.createElement("span", {onClick: this.editChords}, "Edit Chords")
      }
    },

    render: function() {
      if (!this.props.collection) {
        return false;
      }
      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "lyrics-songbook-cntnr"}, 
            React.createElement("div", {className: "title-bar"}, 
              React.createElement("div", {className: "title-bar-left"}, 
                React.createElement("span", {className: "song-title"}, this.props.collection.songName)
              ), 
              React.createElement("div", {className: "title-bar-right"}
              )
            ), 
            React.createElement("div", {className: "lyrics-view"}, 
              React.createElement("div", {className: "song-menu"}, 
                React.createElement("ul", null, 
                  React.createElement("li", null, this.getEditButton()), 
                  React.createElement("li", null, "Transpose"), 
                  React.createElement("li", null, "Add to My Songbook")
                )
              ), 
              React.createElement(views.Lyrics, {collection: this.props.collection, editing: this.state.editing})
            )
          )
        )
      );
    }

  });


})(penultimate.views);




(function(views){

  views.Main = React.createBackboneClass({

    renderApp: function() {
      return (
        React.createElement("div", {className: "page-container"}, 
          React.createElement("header", null, 
            React.createElement(views.Header, {model: this.props.model})
          ), 
          React.createElement("div", {className: "search"}, 
            React.createElement(views.Search, {onSearch: this.props.onSearch})
          ), 
          React.createElement("div", {className: "song-display"}, 
            React.createElement(views.LyricsEditor, {collection: this.props.collection})
          ), 
          React.createElement("div", {className: "songbook"}, 
            React.createElement(views.SongBook, {model: this.props.model.songBook})
          )
        )
      );
    },

    renderLogin: function() {
      return React.createElement(views.Header, {model: this.props.model})
    },

    render: function() {
      if (penultimate.isLoggedIn()) {
        return this.renderApp();
      }
      else {
        return this.renderLogin();
      }
    }

  });

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
