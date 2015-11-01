const React = require('react');
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');
const CardText = require('material-ui/lib/card/card-text');
const $ = require('jquery');

const FilmCard = React.createClass({
  getInitialState: function() {
    return {
      thumbnailURL: ""
    };
  },

  componentDidMount: function() {
    var searchUrl = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + this.props.film.Title.replace(/\s/g, '+');
    $.ajax({
      method: 'GET',
      dataType: 'jsonp',
      url: searchUrl,
      success: function(result) {
        console.log(result);
        if (this.isMounted()) {
          this.setState({
            thumbnailURL: result.responseData.results[0].url
          });
        }
      }.bind(this)
    });
  },
  render() {
    var cstyle = {
      width: 220,
      margin: "10px 10px 10px 10px",
      height: 500
    }
    var imgStyle = {
      height: 300
    }
    return(
      <Card style={cstyle}>
        <CardMedia>
          <img style={imgStyle} src={this.state.thumbnailURL}/>
        </CardMedia>
          <CardTitle title={this.props.film.Title}/>
        <CardText>
            <div>{this.props.film.Year}</div>
            <div>{this.props.film.Rated}</div>
            <div>{this.props.film.Director}</div>
        </CardText>
      </Card>
    );
  }
});

module.exports = FilmCard;
