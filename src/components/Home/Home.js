import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";

import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

import "./Home.css";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ laoding: true });
    // grap popular movies
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-Us&page=1`;
    this.fetchItems(endpoint);
  }

  //fetch movies
  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[5],
          loading: false,
          currentPage: result.page,
          totalPages: result.totoal_pages
        });
      })
      .catch(error => console.error("Error:", error));
  };

  // serachMovies/items action
  searchItems = searchTerm => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  // loadmore method
  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&lnaguage=en-US&query=${
        this.state.searchTerm
      }&page=${this.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  render() {
    const { movies, heroImage, loading, searchTerm } = this.state;
    return (
      <div className='rmdb-home'>
        {heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className='rmdb-home-grid '>
          <FourColGrid
            header={searchTerm ? "Search Result" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage < this.state.totalPages &&
          !this.state.laoding ? (
            <LoadMoreBtn onClick={this.loadMoreItems} />
          ) : null}
        </div>
        <LoadMoreBtn onClick={this.loadMoreItems} />
      </div>
    );
  }
}
export default Home;
