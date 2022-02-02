import React from "react";
import axios from "axios";
import SearchMovie from "../components/SearchMovie.js";
import "./Home.css";
import "./Search.css";

class Search extends React.Component {
  state = { isLoading: true, movies: [], value: "" };

  getSearchMovie = async () => {
    const ID_KEY = "3PwFt0WElopLhKb3Nwyn";
    const SECRET_KEY = "KQUTVrOflL";
    const search = this.state.value;
    try {
      if (search === "") {
        this.setState({ movies: [], isLoading: false });
      } else {
        const {
          data: { items },
        } = await axios.get("https://openapi.naver.com/v1/search/movie.json", {
          params: { query: search, display: 20 },
          headers: {
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
          },
        });
        this.setState({ movies: items, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSearchMovie();
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.getSearchMovie();
  };

  render() {
    const { movies, isLoading } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading..</span>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className="input_div">
                <h1>영화 검색</h1>
                <input
                  className="input_search"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="영화를 검색해 보세요."
                />
              </div>
              <div className="movies">
                {movies.map((movie) => (
                  <SearchMovie
                    key={movie.link}
                    id={movie.link}
                    year={movie.pubDate}
                    title={movie.title}
                    poster={movie.image}
                    rating={movie.userRating}
                    director={movie.director}
                    actor={movie.actor}
                  />
                ))}
              </div>
            </div>
          </form>
        )}
      </section>
    );
  }
}

export default Search;
