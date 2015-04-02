$(function(){

  penultimate.init();

  React.render(
    React.createElement(
      penultimate.views.Header,
      {model: penultimate.currentUser}
    ),
    document.querySelector("header")
  );

  var song = "today is gonna be the day that their gonna bring back to you\nby now you shoulda some how realized what you gotta do";

  var lyrics = penultimate.models.SongChordsLyrics.fromSong(song);

  window.lyrics = lyrics;

  React.render(
    React.createElement(
      penultimate.views.Lyrics,
      {collection: lyrics, editing: false}
      ),

    document.querySelector(".song-display")
  );

});
