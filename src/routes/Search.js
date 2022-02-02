import React from "react";
import axios from "axios";
import SearchBook from "../components/SearchBook.js";
import "./Home.css";
import "./Search.css";

class Search extends React.Component {
  state = { isLoading: true, books: [], value: "" };

  getSearchMovie = async () => {
    const ID_KEY = "ID_KEY";
    const SECRET_KEY = "SECRET_KEY";
    const search = this.state.value;
    try {
      if (search === "") {
        this.setState({ books: [], isLoading: false });
      } else {
        const {
          data: { items },
        } = await axios.get("/v1/search/book.json", {
          params: { query: search, display: 20 },
          headers: {
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
          },
        });
        this.setState({ books: items, isLoading: false });
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
    const { books, isLoading } = this.state;
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
                <h1>도서 검색</h1>
                <input
                  className="input_search"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="도서를 검색해 보세요."
                />
              </div>
              <div className="books">
                {books.map((book) => (
                  <SearchBook
                    key={book.link}
                    id={book.link}
                    title={book.title}
                    year={book.pubdate}
                    poster={book.image}
                    discount={book.discount}
                    publisher={book.publisher}
                    author={book.author}
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
