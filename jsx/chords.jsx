(function(views){

  // views.ChordsEnter = React.createBackboneClass({
  //   enterChords: function(e){
  //     e.preventDefault;
  //   },
  //   render: function(){
  //     return (
  //       <div>
  //         <button onClick={this.enterChords}>Click here to enter chords</button>
  //       </div>
  //     );
  //   }

  // });

  // views.ChordsSet = React.createBackboneClass({
  //   setChords: function(e){
  //     e.preventDefault;
  //   },
  //   render: function(){
  //     return (
  //       <div>
  //         <button onClick={this.setChords}>Set Chords</button>
  //       </div>  
  //     );
  //   }
  // });

  // // If this.props.editing = true...
  // views.EnterOrSet = React.createBackboneClass({
  //   findOut: function(){
  //     if ()
  //   }
  // })



// ----------------
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
        return <button onClick={this.saveChords}>Save Chords</button>
      }
      else {
        return <button onClick={this.editChords}>Edit Chords</button>
      }
    },

    render: function() {
      return (
        <div>
          <div>
            {this.getEditButton()}
          </div>
          <div>
            <views.Lyrics collection={this.props.collection} editing={this.state.editing}/>
          </div>
        </div>
      );
    }

  })


})(penultimate.views);



