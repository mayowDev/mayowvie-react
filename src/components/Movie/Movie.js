import React, { Component } from "react";
import { API_KEY, API_URL } from "../../config";

import Actor from "../elements/Actor/Actor";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import Navigation from "../elements/Navigation/Navigation";
import Spinner from "../elements/Spinner/Spinner";

import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    // fetch cliked movie data
    const endpoint = `${API_URL}/movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  // fetchItems method
  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        // condition to check if there is no movie or 404 status code
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            // fetch actors in the move calback
            const endpoint = `${API_URL}/movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                // get movie directors from the fetched credits
                const directors = result.crew.filter(
                  member => member.job === "Director"
                );
                this.setState({
                  actors: result.cast,
                  directors: directors,
                  loading: false
                });
              });
          });
        }
      })
      .catch(error => console.error("ERROR:", error));
  };
  render() {
    return (
      <div className='rmdb-movie'>
        {/* movie info */}
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.moviename} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.budget}
              revenue={this.state.revenue}
            />
          </div>
        ) : null}
        {/* actors */}
        {this.state.actors ? (
          <div className='rmdb-movie-grid'>
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => (
                <Actor key={i} actor={element} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
        {/* No movie 404 */}
        {!this.state.actors && !this.state.loading ? (
          <h3>OOPs No Movie Found</h3>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
