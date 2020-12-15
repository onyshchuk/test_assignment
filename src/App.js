import React, { useState, useEffect, useCallback } from "react";

import data from "./data/data.json";
import SearchField from "./components/serchField";
import AuthorCard from "./components/authorCard";

import left from "./images/chevron-thin-left.svg";
import right from "./images/chevron-thin-right.svg";

import sortAuthors from "./utils/sortAuthors";

const App = () => {
  const [sortedData] = useState(sortAuthors(data));
  const [filteredData, setFilteredData] = useState(sortedData);
  const [firstAuthor, setFirstAuthor] = useState(0);
  const [lastAuthor, setLastAuthor] = useState(filteredData ? (filteredData.length < 10 ? data.length : 10) : 10);
  const [dataToRender, setDataToRender] = useState(filteredData ? filteredData.slice(firstAuthor, lastAuthor) : []);
  const [medals, setMedals] = useState([sortedData[0], sortedData[1], sortedData[2]]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setDataToRender(filteredData.slice(firstAuthor, lastAuthor));
  }, [firstAuthor, lastAuthor, filteredData]);

  useEffect(() => {
    setMedals([sortedData[0], sortedData[1], sortedData[2]]);
  }, [sortedData]);

  useEffect(() => {
    setFilteredData(
      sortedData.filter(author => {
        const name = author.name.split(" ");
        return name[0].toLowerCase().startsWith(searchValue) || name[1].toLowerCase().startsWith(searchValue);
      })
    );
  }, [searchValue, sortedData]);

  const nextPage = () => {
    if (lastAuthor < filteredData.length) {
      setFirstAuthor(lastAuthor);
      setLastAuthor(filteredData.length < lastAuthor + 10 ? filteredData.length : lastAuthor + 10);
    }
  };

  const prevPage = () => {
    if (firstAuthor > 0) {
      const authorsOnPage = lastAuthor % 10;
      const step = authorsOnPage === 0 ? 10 : authorsOnPage;
      setFirstAuthor(firstAuthor - 10);
      setLastAuthor(lastAuthor - step);
    }
  };
  console.log(firstAuthor);
  const searchValueCallback = useCallback(value => setSearchValue(value), [setSearchValue]);

  return (
    <div className="App">
      <div className="container">
        <SearchField name="name" searchValueCallback={searchValueCallback} />
        {dataToRender.length > 0 ? (
          dataToRender.map((author, idx) => (
            <AuthorCard
              key={author.name + author.pageviews + author.count_pub}
              index={idx + firstAuthor}
              name={author.name}
              count_pub={author.count_pub}
              pageviews={author.pageviews}
              medals={medals}
            />
          ))
        ) : (
          <div className="message">По данному запросу авторов не найдено</div>
        )}
      </div>
      <div className="page-count">
        <img
          onClick={prevPage}
          className={`page-count__prev ${firstAuthor === 0 ? "page-count__prev--disabled" : ""}`}
          src={left}
          alt="prev"
        />

        <span>
          {firstAuthor + 1} - {lastAuthor}
        </span>

        <img
          onClick={nextPage}
          className={`page-count__next ${lastAuthor === filteredData.length ? "page-count__next--disabled" : ""}`}
          src={right}
          alt="next"
        />
      </div>
    </div>
  );
};

export default App;
