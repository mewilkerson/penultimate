$(function(){

// Renders the header view, gets data from currentUser model
  penultimate.init();

  var buildSongData = function(song) {
    linesSeen = -1;

    var data = _.flatten(_.map(song.lyrics, function(section, sectionIndex){

      var sectionName = section.title;
      
      var lines = _.compact(section.content.trim().split("\n"));

      return _.map(lines, function(line, lineIndex) {
        linesSeen++;

        var words = _.reject(line.trim().split(" "), function(word){
          // reject whitespace words
          return word.match(/^\s*$/);
        });
        return _.map(words, function(word, wordIndex) {
          var chords = ["C#min", false, false, false, false, "E", "B", "A"];

          return {
            word: word, 
            wordIndex: wordIndex, 
            lineIndex: linesSeen,
            sectionIndex: sectionIndex,
            sectionName: sectionName,
            chord: _.sample(chords)
          };
        });
      });

    }));

    return data;
  }

  var performSearch = function(data) {    
    $.ajax({
      url: "/search",
      data: data,
      success: function(song) {

        console.log("api found: ", song);

        var lyrics = new penultimate.models.SongChordsLyrics(null, {songName: song.name});
        window.temp = lyrics;
        lyrics.once("sync", function(){

          // is this a not saved song?
          if (!lyrics.length) {
            console.log("---- SONG IS NEW ----");
            var lyricData = buildSongData(song);
            console.log("lyrics data", lyricData);
            // lyrics.add(lyricData);
            _.each(lyricData, function(d){
              lyrics.add(d);
            });
          }
          else {
            console.log("---- SONG IS ALREADY SAVED ----");
          }

          view.setProps({collection: lyrics});
        });

        lyrics.fetch();

      }
    });
  }

  var view = React.render(
    React.createElement(
      penultimate.views.Main,
      {
        model: penultimate.currentUser, 
        collection: null,
        onSearch: performSearch
      }
    ), 
    document.body
  )

});
