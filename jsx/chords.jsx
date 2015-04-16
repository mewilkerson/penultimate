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

    showSong: function(model) {
      setSong(model);
    },

    blowUpSong: function(model, e) {
      e.stopPropagation();
      destroy(model);
    },

    getSong: function(model, index) {
      return <li key={index} className="songbook-entry" onClick={this.showSong.bind(this, model)}>{model.get("name")} <i className="fa fa-trash-o" onClick={this.blowUpSong.bind(this, model)}></i></li>
    },

    render: function() {
      if (penultimate.isLoggedIn()) {
        return (
          <div>
            <h2 className="songbook-title">My Songbook</h2>
            <ul className="songbook-list">
              {this.props.collection ? this.props.collection.map(this.getSong) : false}
            </ul>
          </div>
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

    saveToSongbook: function(e) {
      e.preventDefault();
      saveSong();
    },

    transpose: function(e) {
      e.preventDefault();
      var key = e.target.value;
      this.props.collection.transpose(key);
    },

    getKeyDropDown: function() {
      var getKeyOption = function(key, index) {
        if (key === this.props.collection.songKey) {
          return <option key={index} value={key} selected="selected">{key}</option>
        }
        else {
          return <option key={index} value={key}>{key}</option>
        }
      }.bind(this);

      var keys = "C C# D Eb E F F# G Ab A Bb B".split(" ");
      
      return (
        <select onChange={this.transpose}>
          {_.map(keys, getKeyOption)}
        </select>
      )
    },

    render: function() {
      if (!this.props.collection) {
        return false;
      }
      return (
        <div>
          <div className="lyrics-songbook-cntnr">
            <div className="lyrics-view">
              <div className='title-bar'>
                <div className="title-bar-left">
                  <span className="song-title">{this.props.collection.songName}</span>
                </div>
                <div className="title-bar-right">
                </div>
              </div>
              <div className="song-menu">
                <ul>
                  <li className="hov-sel">{this.getEditButton()}</li>
                  <li>Transpose Key To: {this.getKeyDropDown()}</li>
                  <li className="hov-sel" onClick={this.saveToSongbook}>Add to My Songbook</li>
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



