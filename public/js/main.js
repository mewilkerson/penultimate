$(function(){

// Renders the header view, gets data from currentUser model
  penultimate.init();

  React.render(
    React.createElement(
      penultimate.views.Header,
      {model: penultimate.currentUser}
    ),
    document.querySelector("header")
  );


  var song = "Today is gonna be the day that they're gonna throw it back to you\nby now you shoulda some how realized what you gotta do\nI don't believe that anybody feels the way I do about you now";

  var song = 
[{"title":"Break 1","content":"Today is gonna be the day\nThat they're gonna throw it back to you\nBy now you should have somehow\nRealised what you gotta do\nI don't believe that anybody\nFeels the way I do about you now\n\n\n"},{"title":"Verse 1","content":"Backbeat, the word is on the street\nThat the fire in your heart is out\nI'm sure you've heard it all before\nBut you never really had a doubt\nI don't believe that anybody\nFeels the way I do about you now\n\n\n"},{"title":"Hook","content":"And all the roads we have to walk are winding\nAnd all the lights that lead us there are blinding\nThere are many things that I\nWould like to say to you but I don't know how\nBecause maybe you're gonna be the one that saves me\nAnd after all, you're my wonderwall\n\n\n"},{"title":"Break 2","content":"Today was gonna be the day\nBut they'll never throw it back to you\nBy now you should've somehow\nRealized what you're not to do\nI don't believe that anybody\nFeels the way I do, about you now\n\n\n"},{"title":"Hook 2","content":"And all the roads that lead you there were winding\nAnd all the lights that light the way are blinding\nThere are many things that I\nWould like to say to you but I don't know how\nI said maybe, you're gonna be the one that saves me\nAnd after all, you're my wonderwall\n\nI said maybe, you're gonna be the one that saves me\nAnd after all, you're my wonderwall"}]

  var lyrics = penultimate.models.SongChordsLyrics.fromSong(song);

  window.lyrics = lyrics;

  React.render(
    React.createElement(
      penultimate.views.LyricsEditor,
      {collection: lyrics}
      ),

    document.querySelector(".song-display")
  );

});
