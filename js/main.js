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
