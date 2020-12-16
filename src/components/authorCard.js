import React from "react";
import medal1 from "../images/medals/1st.svg";
import medal2 from "../images/medals/2nd.svg";
import medal3 from "../images/medals/3rd.svg";

import stringToColor from "../utils/stringToColor";
import numberWithSpaces from "../utils/numberWithSpaces";

const AuthorCard = ({ index, name, count_pub, pageviews, medals, handleSortByName, handleSortByPageviews }) => {
  const medal = medals.findIndex(medalPageviews => medalPageviews === pageviews);

  return (
    <div className="author-card">
      <div className="author-card__index">{index + 1}</div>
      <div style={{ backgroundColor: `#${stringToColor(name)}` }} className="author-card__logo">
        <span>{name[0]}</span>
      </div>
      <div className="author-card__author">
        <div onClick={handleSortByName} className="author-card__name">
          {name}
        </div>
        <div className="author-card__count-pub">{`${count_pub} публ.`}</div>
      </div>
      {medal >= 0 && (
        <div className="author-card__medal">
          <img
            src={medal === 0 ? medal1 : medal === 1 ? medal2 : medal3}
            alt={medal === 0 ? "gold" : medal === 1 ? "silver" : "bronze"}
          />
        </div>
      )}
      <div
        onClick={handleSortByPageviews}
        className={`author-card__pageviews${pageviews === 0 ? " author-card__pageviews--disabled" : ""}`}>
        {numberWithSpaces(pageviews)}
      </div>
    </div>
  );
};

export default AuthorCard;
