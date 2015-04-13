(function(views){


  views.LyricWord = React.createBackboneClass({
    updateModel: function(e) {
      this.props.model.set("chord", e.target.value);
    },

    getChord: function() {
      if(this.props.editing) {
        return <input onChange={this.updateModel} name="chord" size="6" value={this.props.model.get("chord") || ""}/>
      }
      else {
        return <div className="chord">{this.props.model.get("chord")}</div> 
      }
    },

    render: function(){
      return (
        <div className="combo">
          {this.getChord()}
          <div className="word">{this.props.model.get("word")}</div>
        </div>
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
        return <views.LyricWord key={model.get("wordIndex")} model={model} editing={this.props.editing}/>
      }, this);

      return (
        <div className="lyric-line" key={lineIndex}>
          {lyricWords}
        </div>
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
        <div>
          {this.buildLines()}
        </div>
      )
    }

  });

  views.SongBook = React.createBackboneClass({

    // getSong: function(name, index) {
    //   console.log("rendering", name, index);
    //   return <li key={index}><strong>wha</strong></li>;
    // },

    getSong: function(name, index) {
      return <li key={index}>{name}</li>
    },

    render: function() {
      if (penultimate.isLoggedIn()) {
        return (
          <ul>
            {_.map(this.props.model.getNames(), this.getSong)}
          </ul>
        )
      }
      else {
        return <div>Sign in to view your song book</div>
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
        return <span onClick={this.saveChords}>Save Chords</span>
      }
      else {
        return <span onClick={this.editChords}>Edit Chords</span>
      }
    },

    render: function() {
      if (!this.props.collection) {
        return false;
      }
      return (
        <div>
          <div className="lyrics-songbook-cntnr">
            <div className='title-bar'>
              <div className="title-bar-left">
                <span className="song-title">{this.props.collection.songName}</span>
              </div>
              <div className="title-bar-right">
              </div>
            </div>
            <div className="lyrics-view">
              <div className="song-menu">
                <ul>
                  <li>{this.getEditButton()}</li>
                  <li>Transpose</li>
                  <li>Add to My Songbook</li>
                </ul>
              </div>
              <views.Lyrics collection={this.props.collection} editing={this.state.editing}/>
            </div>
          </div>
        </div>
      );
    }

  });


})(penultimate.views);



