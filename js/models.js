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


  // models.Song = Backbone.Model.extend({

  // });

  // models.Songs = Backbone.Firebase.Collection.extend({
  //   model: models.Song,

  //   url: function() {
  //     if (!penultimate.currentUser) {
  //       throw new Error("No one is logged in.");
  //     }
  //     var uid = encodeURIComponent(tiy.currentUser.uid);

  //     return tiy.firebaseURL + "/todos/" + uid;
  //   }
  // });

  // var songRef = ref.child("lyrics");
  //   songRef.set({
  //     songLyrics: {
  //       title: "Wonderwall",
  //       artist: "Oasis",
  //       words: "And all the roads that led to you were winding\nand all the lights that lead the way are blinding",
  //       chords: "C  D  Em\nC  D  Em"

  //     }
  //   });

})(penultimate.models);