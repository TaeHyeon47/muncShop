import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form className="search" onSubmit={submitHandler} action="">
      <input
        className="search-input"
        placeholder="블러셔맛집 UPTO 30%"
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="search-button">
        <svg className="search-icon">
          <use xlinkHref="/images/sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </form>
  );
};

export default SearchBox;
