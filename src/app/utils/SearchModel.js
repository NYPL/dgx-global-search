const fetchResultLength = (data) => {
  return data.attributes.meta['total-results'];
}

const fetchResultItem = (data) => {
  return data.items;
}

const fetchSearchKeyword = (data) => {
  return data.attributes.q;
}

export { fetchResultLength, fetchResultItem, fetchSearchKeyword};
