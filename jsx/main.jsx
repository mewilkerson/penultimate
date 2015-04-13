(function(views){

  views.Main = React.createBackboneClass({

    renderApp: function() {
      return (
        <div className="page-container">
          <header>
            <views.Header model={this.props.model}/>
          </header>
          <div className="search">
            <views.Search onSearch={this.props.onSearch}/>
          </div>
          <div className="song-display">
            <views.LyricsEditor collection={this.props.collection}/>
          </div>
          <div className="songbook">
            <views.SongBook model={this.props.model.songBook}/>
          </div>
        </div>
      );
    },

    renderLogin: function() {
      return <views.Header model={this.props.model}/>
    },

    render: function() {
      if (penultimate.isLoggedIn()) {
        return this.renderApp();
      }
      else {
        return this.renderLogin();
      }
    }

  });

})(penultimate.views);

