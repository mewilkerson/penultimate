(function(views){

  views.Main = React.createBackboneClass({

    renderApp: function() {
      return (
        <div className="everything">
          <header>
            <div className="header-container">
              <views.Header model={this.props.model}/>
            </div>
          </header>
          <div className="page-container">
            <div className="search">
              <views.Search onSearch={this.props.onSearch}/>
            </div>
            <div className="song-display">
              <views.LyricsEditor collection={this.props.collection}/>
            </div>
            <div className="songbook">
              <views.SongBook collection={this.props.model.songBook}/>
            </div>
          </div>
          <div className="clear"></div>

        </div>
      );
    },

    renderLogin: function() {
      return (
        <div className="everything">
          <header>
            <div className="header-container">
              <views.Header model={this.props.model}/>
            </div>
          </header>
          <div className="clear"></div>
        </div>
      );
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

