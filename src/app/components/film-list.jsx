const React = require('react');
const FilmCard = require('./film-card.jsx');
const $ = require('jquery');

const FilmList = React.createClass({
  getInitialState: function() {
    return {
      allFilms: [],
      selectedFilms: []
    };
  },

  componentDidMount: function() {
    $.get("http://localhost:8080/films", function(result) {
      if (this.isMounted()) {
        this.setState({
          allFilms: result,
          selectedFilms: result
        });
      }
    }.bind(this));
  },
  render() {
    var divStyle = {
      display: 'inline-flex',
      flexWrap: 'wrap'
    };
    var filmCards = [];
    var i = 0;
    this.state.selectedFilms.forEach(function(film) {
      filmCards.push(<FilmCard film={film} key={i++}/>)
    });
    return(
      <div style={divStyle}>
        {filmCards}
      </div>
    )
  }
});

module.exports = FilmList;
