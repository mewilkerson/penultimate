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

app.get("/lyrics/:genre/*", function(req, res) {

  var link = req.params["0"];
  var genre = req.params.genre;

  rg_api.searchLyricsAndExplanations(link, genre, function(err, resp){
    if (err) {
      res.status(500).json({error: err.toString()});
    } else {
      var lyrics = resp.lyrics;

      res.json(processLyrics(lyrics));

      // res.send( processLyrics(lyrics, true) );

      // res.send( lyrics.getFullLyrics(true) );

      // res.send("OK");
    }
  });

});

var port = process.env.PORT || 8025;
console.log("listening on port:", port);
app.listen(port);