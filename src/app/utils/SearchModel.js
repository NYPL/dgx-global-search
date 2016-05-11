const fetchResultLength = (data) => data.attributes.meta['total-results'];

const fetchResultItem = (data) => {
  if (!data.items) {
    return [];
  }

  return data.items;
};

const fetchSearchKeyword = (data) => data.attributes.q;

export { fetchResultLength, fetchResultItem, fetchSearchKeyword };
