(function(views){

  var Todos = React.createBackboneClass({

    makeLI: function(model, index){
      return <li key={index}>{model.get("task")}</li>;
    },

    render: function(){
      if (this.props.collection) {
        return (
          <ul>
            {this.props.collection.map(this.makeLI)}
          </ul>  
          );
      } else {
        return (
          <ul>
            <li> No list currently loaded.</li>
          </ul>  
          );
      }
    }

  });

  views.Todos = Todos;

})(penultimate.views);