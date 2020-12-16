export const sortByPageviews = data => {
  const dataCopy = [...data];
  return dataCopy.sort((a, b) => (a.pageviews > b.pageviews ? -1 : a.pageviews < b.pageviews ? 1 : 0));
};

export const sortByName = data => {
  const dataCopy = [...data];
  return dataCopy.sort((a, b) =>
    a.name[0].toLowerCase().localeCompare(b.name[0].toLowerCase(), "ru-RU", { ignorePunctuation: true })
  );
};

const sortAuthors = authors => {
  const authorsCopy = [...authors];
  return authorsCopy.sort((a, b) => {
    if (a.pageviews === b.pageviews) return a.name > b.name ? 1 : -1;
    else return a.pageviews > b.pageviews ? -1 : 1;
  });
};

export default sortAuthors;
