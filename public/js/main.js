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
        // window.jd = lyrics;
        // window.other = new penultimate.models.Other();
        // window.other.add({"getting": "angry"});

        var lyrics = new penultimate.models.SongChordsLyrics(null, {songName: song.name});
        lyrics.once("sync", function(){

          // is this a not saved song?
          if (!lyrics.length) {
            console.log("---- SONG IS NEW ----");
            var lyricData = buildSongData(song);
            lyrics.add(lyricData);
          }
          else {
            console.log("---- SONG IS ALREADY SAVED ----");
          }

          view.setProps({collection: lyrics});
        });

        // console.log("lyrcis data", lyricData);
        // var lyrics = new penultimate.models.SongChordsLyrics(null, {songName: song.name});
        // lyrics.on("all", function(e){
        //   console.log("event:", e);
        // });
      }
    });
  }

  // var lyrics = new penultimate.models.SongChordsLyrics();

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

// var song = "";

//   var song = "Today is gonna be the day that they're gonna throw it back to you\nby now you shoulda some how realized what you gotta do\nI don't believe that anybody feels the way I do about you now";

//   var song = [{"title":"Break 1","content":"Today is gonna be the day\nThat they're gonna throw it back to you\nBy now you should have somehow\nRealised what you gotta do\nI don't believe that anybody\nFeels the way I do about you now\n\n\n"},{"title":"Verse 1","content":"Backbeat, the word is on the street\nThat the fire in your heart is out\nI'm sure you've heard it all before\nBut you never really had a doubt\nI don't believe that anybody\nFeels the way I do about you now\n\n\n"},{"title":"Hook","content":"And all the roads we have to walk are winding\nAnd all the lights that lead us there are blinding\nThere are many things that I\nWould like to say to you but I don't know how\nBecause maybe you're gonna be the one that saves me\nAnd after all, you're my wonderwall\n\n\n"},{"title":"Break 2","content":"Today was gonna be the day\nBut they'll never throw it back to you\nBy now you should've somehow\nRealized what you're not to do\nI don't believe that anybody\nFeels the way I do, about you now\n\n\n"},{"title":"Hook 2","content":"And all the roads that lead you there were winding\nAnd all the lights that light the way are blinding\nThere are many things that I\nWould like to say to you but I don't know how\nI said maybe, you're gonna be the one that saves me\nAnd after all, you're my wonderwall\n\nI said maybe, you're gonna be the one that saves me\nAnd after all, you're my wonderwall"}]

//   var song = 
// [{"title":"Refrain","content":"Do-do-do, do-do-do-doo\nDo-do-do, do-do-do-doo\nDo-do-do, do-do-do-doo\nDo-do-do\n\nI'm packed and I'm holding, I'm smiling\nShe's living, she's golden, she lives for me\nSays she lives for me\nOvation, her own motivation\n\nShe comes 'round andshe goes down on me\nAnd I make her smile like a drug for you\nDo ever what you want to do, coming over you\nKeep on smiling what we go through\nOne stop to the rhythm that divides you\n\nAnd I speak to you like the chorus to the verse\nChop another line like a coda with a curse\nCome on like a freak show, takes the stage\nWe give them the games we play, she said\n\n\n"},{"title":"Hook","content":"I want something else\nTo get me through this\nSemi-charmed kind of life, baby, baby\nI want something else\nI'm not listening when you say\nGoodbye\n\n\n\n"},{"title":"Refrain","content":"The sky was gold,it was rose\nI was taking sips of it through my nose\nAnd I wish it could get back there, some place back there\nSmiling in the pictures you would take\nDoing crystal meth will lift you up until you break\n\nIt won't stop, I won't come down\nI keep stock with a tick-tock rhythm,a bump for the drop\nAnd then I bumped up, I took the hit that I was given\nThen I bumped again, then I bumped again\n\nSaid how do I get back there\nTo the place where I fell asleep inside you?\nHow do I get myself back to the place\nWhere you said?\n\n\n\n"},{"title":"Hook &amp; Refrain","content":"I believe in the sand beneath my toes\nThe beach gives a feeling, an earthy feeling\nI believe in the faith that grows\nAnd the four right chords can make me cry\nWhen I'm with you I feel like I could die\nAnd that would be all right, all right\n\nAnd when the plane came in\nShe said she was crashing\nThe velvet it rips in the city\nWe tripped on the urge to feel alive\n\nBut now I'm struggling to survive\nThose days you were wearing that velvet dress\nYou're the priestess I must confess\nThose little red panties, they pass the test\n\nSlide up around the belly face\nDown on the mattress one\nAnd you hold me and we are broken\nStill it's all that I want to do, just a little now\n\nFeel myself head made of the ground\nI'm scared, I'm not coming down, no, no\nAnd I won't run for my life\nShe's got her jaws now locked down in a smile\nBut nothing is all right, all right\n\nThe sky was gold, it was rose\nI was taking sips of it through my nose\nAnd I wish it could get back there, some place back there\nIn the place we used to start"}]

//   var lyrics = penultimate.models.SongChordsLyrics.fromSong(song);

//   window.lyrics = lyrics;

//   window.lyricsEditor = React.render(
//     React.createElement(
//       penultimate.views.LyricsEditor,
//       {collection: lyrics}
//       ),

//     document.querySelector(".song-display")
//   );

});
