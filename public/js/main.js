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
          return {
            word: word, 
            wordIndex: wordIndex, 
            lineIndex: linesSeen,
            sectionIndex: sectionIndex,
            sectionName: sectionName,
            chord: null
          };
        });
      });

    }));

    return data;
  }

  window.destroy = function(model) {
    model.destroy();
  }

  window.setSong = function(song) {
    window.song = song;
    view.setProps({collection: song.getLyricsCollection()});
  }

  var performSearch = function(data) {    
    $.ajax({
      url: "/search",
      data: data,
      success: function(response) {

        console.log("api found: ", response);

        var song = penultimate.currentUser.songBook.findWhere({name: response.name});

        if (song) {
          console.log("song found!");
        }

        if (!song) {
          console.log("song not found!");
          var data = {
            lyrics: buildSongData(response),
              name: response.name,
               key: "C"
          }
          song = new penultimate.models.Song(data);
        }

        // window.temp = song;
        window.saveSong = function() {
          // console.log("add data", song.toJSON());
          var savedSong = penultimate.currentUser.songBook.add(song.toJSON());
          savedSong = penultimate.currentUser.songBook.last();
          // console.log("savedSong", savedSong);
          // window.ss = savedSong;
          view.setProps({collection: savedSong.getLyricsCollection()});
        }

        view.setProps({collection: song.getLyricsCollection()});


        // var lyrics = new penultimate.models.SongChordsLyrics(null, {songName: song.name});
        // window.temp = lyrics;
        // lyrics.once("sync", function(){

        //   // is this a not saved song?
        //   if (!lyrics.length) {
        //     console.log("---- SONG IS NEW ----");
        //     var lyricData = buildSongData(song);
        //     console.log("lyrics data", lyricData);
        //     // lyrics.add(lyricData);
        //     _.each(lyricData, function(d){
        //       lyrics.add(d);
        //     });
        //   }
        //   else {
        //     console.log("---- SONG IS ALREADY SAVED ----");
        //   }

        //   view.setProps({collection: lyrics});
        // });

        // lyrics.fetch();

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
