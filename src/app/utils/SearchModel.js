const fetchResultLength = (data) => {
  return data.attributes.meta['total-results'];
}

const fetchResultItem = (data) => {
  if (!data.item) {
    return [];
  }

  return data.item;
}

const fetchSearchKeyword = (data) => {
  return data.attributes.q;
}

export { fetchResultLength, fetchResultItem, fetchSearchKeyword};
