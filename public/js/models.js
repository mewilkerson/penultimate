(function(models){

  models.WordChord = Backbone.Model.extend({

  });

  models.SongChordsLyrics = Backbone.Collection.extend({
    model: models.WordChord
  });

  models.SongChordsLyrics.fromSong = function(song) {

    linesSeen = [];
    lastLine = -1;

    var data = _.flatten(_.map(song, function(section, sectionIndex){

      var sectionName = section.title;
      
      return _.map(section.content.trim().split("\n"), function(line, lineIndex) {
        var words = _.reject(line.trim().split(" "), function(word){
          // reject whitespace words
          return word.match(/^\s*$/);
        });
        return _.map(words, function(word, wordIndex) {
          var chords = ["C#min", false, false, false, false, "E", "B", "A"];
          
          if (_.contains(linesSeen, lineIndex)) {
            if (lineIndex !== lastLine) {
              lineIndex = lastLine+1;
            }
          }

          linesSeen.push(lineIndex);
          lastLine = lineIndex;

          return {
            word: word, 
            wordIndex: wordIndex, 
            lineIndex: lineIndex,
            sectionIndex: sectionIndex,
            sectionName: sectionName,
            chord: _.sample(chords)
          };
        });
      });

    }));

    console.log("data", data);

    return new models.SongChordsLyrics(data);

  };


})(penultimate.models);