export const createLocationWithQueryString = (query) => {
  return {
    search: query ? `?${query}` : ""
  };
};
