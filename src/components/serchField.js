import React from "react";
import search from "../images/search.png";

const SerchField = ({ searchValueCallback }) => {
  return (
    <div className="search-field">
      <img src={search} alt="search" />
      <input onChange={e => searchValueCallback(e.target.value)} placeholder="Поиск авторов по имени" type="text" />
    </div>
  );
};

export default SerchField;
