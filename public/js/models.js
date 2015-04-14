(function(models){

  models.WordChord = Backbone.Model.extend({

  });

  models.Other = Backbone.Firebase.Collection.extend({

    url: penultimate.firebaseURL + "other2"
  });

  models.SongChordsLyrics = Backbone.Firebase.Collection.extend({
    model: models.WordChord,

    autoSync: false,

    save: function() {
      var timer;
      var promise = $.Deferred();
      var models = this.models;
      timer = setInterval(function(){
        if (models.length) {
          var model = models.shift();
          model.save();
        }
        else {
          clearInterval(timer);
          promise.resolve();
        }
      },0);
      return promise;
    },

    url: function() {
      var root = penultimate.firebaseURL;
      var uid = penultimate.currentUser.id;
      return root + "songs/" + uid + "/" + encodeURIComponent(this.songName);
    },

    initialize: function(data, opts) {
      this.songName = opts.songName;
    }
  });

  //  models.SongBook = Backbone.Firebase.Model.extend({

  //   url: function() {
  //     var root = penultimate.firebaseURL;
  //     var uid = penultimate.currentUser.id;
  //     return root + "songs/" + uid;
  //   },

  //   getNames: function() {
  //     return _.filter(this.keys(), function(key){
  //       return key !== "id";
  //     }, this);
  //   }

  // });

  models.SongChordsLyrics.fromSong = function(song) {

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

    return new models.SongChordsLyrics(_.first(data,5), {songName: song.name});

  };


  models.Song = Backbone.Model.extend({
    initialize: function() {
      this.lyricsCollection = new Backbone.Collection(this.get("lyrics"));
      this.lyricsCollection.songName = this.get("name");

      this.on("sync", function(){
        console.log("model changed, updating collection");
        this.lyricsCollection.reset(this.get("lyrics"), {silent: true});
        this.lyricsCollection.songName = this.get("name");
      });

      this.listenTo(this.lyricsCollection, "change", function() {
        console.log("collection changed, updating model");
        this.set("lyrics", this.lyricsCollection.toJSON());
      });
    },

    getLyricsCollection: function() {
      return this.lyricsCollection;
    }
  });

  models.SongBook = Backbone.Firebase.Collection.extend({

    model: models.Song,

    url: function() {
      var root = penultimate.firebaseURL;
      var uid = penultimate.currentUser.id;
      return root + uid + "/songs";
    }

  });


})(penultimate.models);