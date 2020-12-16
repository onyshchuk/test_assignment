import React, { useState, useEffect, useCallback } from "react";

import data from "./data/data.json";
import SearchField from "./components/serchField";
import AuthorCard from "./components/authorCard";

import left from "./images/chevron-thin-left.svg";
import right from "./images/chevron-thin-right.svg";

import sortAuthors, { sortByName, sortByPageviews } from "./utils/sort";

const App = () => {
  const [sortedData, setSortedData] = useState(sortAuthors(data));
  const [filteredData, setFilteredData] = useState(sortedData);
  const [firstAuthor, setFirstAuthor] = useState(0);
  const [lastAuthor, setLastAuthor] = useState(
    filteredData ? (filteredData.length < 10 ? filteredData.length : 10) : 1
  );
  const [dataToRender, setDataToRender] = useState(filteredData ? filteredData.slice(firstAuthor, lastAuthor) : []);
  const [medals, setMedals] = useState([sortedData[0], sortedData[1], sortedData[2]]);
  const [searchValue, setSearchValue] = useState("");

  const getMedals = data => {
    const sortedData = sortByPageviews(data);
    return [sortedData[0].pageviews, sortedData[1].pageviews, sortedData[2].pageviews];
  };

  useEffect(() => {
    setDataToRender(filteredData.slice(firstAuthor, lastAuthor));
  }, [firstAuthor, lastAuthor, filteredData]);

  useEffect(() => {
    setMedals(getMedals(data));
  }, [setMedals]);

  useEffect(() => {
    const filteredArray = sortedData.filter(author => {
      const name = author.name.split(" ");
      return (
        name[0].toLowerCase().startsWith(searchValue) ||
        name[1].toLowerCase().startsWith(searchValue) ||
        name[0].toLowerCase().includes(searchValue) ||
        name[1].toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filteredArray);
    setFirstAuthor(0);
    setLastAuthor(filteredArray.length < 10 ? filteredArray.length : 10);
  }, [searchValue, sortedData]);

  const handleSortByPageviews = useCallback(() => {
    setSortedData(sortByPageviews(data));
  }, [setSortedData]);

  const handleSortByName = useCallback(() => {
    setSortedData(sortByName(data));
  }, [setSortedData]);

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
              handleSortByName={handleSortByName}
              handleSortByPageviews={handleSortByPageviews}
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
