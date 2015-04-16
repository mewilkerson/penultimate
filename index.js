var express = require("express");
var rg_api = require("rapgenius-js");

var app = express();

app.use(express.static("public"));

app.get("/songs", function(req, res){
  
  rg_api.searchSong(req.query.q, req.query.genre, function(err, songs){
    if (err) {
      res.status(500).json({error: err.toString()});
    } else {
      res.json(songs);
    }
  });
});



function processLyrics(lyrics){
  var retData = [];

  lyrics.sections.forEach(function(section){
    var title = section.name.match(/^\[(.+)\]$/)[1];

    text = section.verses.reduce(function(text, verse){
      return text + verse.content;
    }, "");

    retData.push({
      title: title,
      content: text
    });
  });

  return retData;
};

app.get("/search", function(req, res) {

  var query = req.query.query;
  var genre = req.query.genre;

  rg_api.searchSong(query, genre, function(err, songs){
    if (err) {
      console.log("error searching for ", query, genre);
      console.log(err);
      res.status(500).json({error: err.toString()});
    } else {
      var song = songs[0];
      var link = song.link;
      var name = song.name;
      rg_api.searchLyricsAndExplanations(link, genre, function(err, resp){
        if (err) {
          console.log("error getting lyrics from", link, genre);
          console.log(err);
          res.status(500).json({error: err.toString()});
        } else {
          var lyrics = resp.lyrics;
          res.json({
            name: name,
            lyrics: processLyrics(lyrics)
          });
        }
      });
    }
  });

});

app.get("/lyrics/:genre/*", function(req, res) {

  var link = req.params["0"];
  var genre = req.params.genre;

  rg_api.searchLyricsAndExplanations(link, genre, function(err, resp){
    if (err) {
      res.status(500).json({error: err.toString()});
    } else {
      var lyrics = resp.lyrics;
      res.json(processLyrics(lyrics));
    }
  });

});

var port = process.env.PORT || 8025;
console.log("listening on port:", port);
app.listen(port);