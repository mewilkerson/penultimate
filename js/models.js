(function(models){

  models.WordChord = Backbone.Model.extend({

  });

  models.SongChordsLyrics = Backbone.Collection.extend({
    model: models.WordChord
  });

  models.SongChordsLyrics.fromSong = function(song) {

    var data = _.flatten(_.map(song.split("\n"), function(line, lineIndex) {
      var words = line.split(" ");
      return _.map(words, function(word, wordIndex) {
        var chords = ["C#min", false, false, false, false, "E", "B", "A"];
        return {word: word, wordIndex: wordIndex, lineIndex: lineIndex, chord: _.sample(chords)};
      });
    }));

    return new models.SongChordsLyrics(data);

  };

})(penultimate.models);