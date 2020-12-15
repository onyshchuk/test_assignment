const sortAuthors = authors =>
  authors.sort((a, b) => {
    if (a.pageviews === b.pageviews) return a.name > b.name ? 1 : -1;
    else return a.pageviews > b.pageviews ? -1 : 1;
  });

export default sortAuthors;
