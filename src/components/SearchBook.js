import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Book.css";

function SearchBook({ id, year, title, poster, discount, publisher, author }) {
  return (
    <div className="book">
      <a href={id} target="_blank">
        <img src={poster} alt={title} titlt={title}></img>
        <div className="book__data">
          <h3 className="book__title">
            {title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
          </h3>
          <p className="book__author">
            <span>저자</span> {author}/10
          </p>
          <p className="book__publisher">
            <span>출판사</span> {publisher}
          </p>
          <p className="book__discount">
            <span>가격</span> {discount}
          </p>
          <p className="book__publisher">
            <span>출간일</span> {year}
          </p>
        </div>
      </a>
    </div>
  );
}

SearchBook.propTypes = {
  id: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  discount: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default SearchBook;
