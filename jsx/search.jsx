(function(views){

  views.Search = React.createClass({
    onSubmit: function(e) {
      e.preventDefault();

      var query = this.refs.query.getDOMNode().value;
      var genre = this.refs.genre.getDOMNode().value;

      this.props.onSearch({
        query: query,
        genre: genre
      });
    },

    render: function(){
      return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input ref="query" type="text" placeholder="Search for lyrics..." className="search-bar" size="120" />
            <select ref="genre">
              <option value="rock">Rock</option>
              <option value="rap">Rap</option>
              <option value="country">Country</option>
              <option value="pop">Pop</option>
            </select>
            <button className="search-button">Search</button>
          </form>
        </div>
        {/*<div className="search-auto-complete">
          <views.SearchAutoCompleteDropDown/>
        </div>*/}
      </div>
      );
    }
  });

  views.SearchAutoCompleteDropDown = React.createClass({
    render: function() {
      return (
        <ul className="drop-down">
          <li>Wonderwall by Oasis</li>
          <li>Wonderwall by Mike Posner (Ft. Big KRIT)</li>
          <li>Wonderwall by One Direction</li>
          <li>Wonderwall by Illy</li>
        </ul>
      );
    }
  });

})(penultimate.views);
