(function(views){

  views.LyricWord = React.createBackboneClass({
    getChord: function() {
      if(this.props.editing) {
        return <input name="chord" size="6"/>
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


})(penultimate.views);



