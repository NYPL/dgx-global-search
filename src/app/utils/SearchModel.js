// Import libraries
import { map as _map } from 'underscore';

const fetchResultLength = (data) => data.attributes.meta['total-results'];

const fetchSearchKeyword = (data) => data.attributes.q;

const fetchItemTitle = (item) => {
  if (!item.attributes.title) {
    return '';
  }

  return item.attributes.title;
};

const fetchItemLink = (item) => {
  if (!item.attributes.link) {
    return '';
  }

  return item.attributes.link;
};

const fetchItemSnippet = (item) => {
  if (!item.attributes.snippet) {
    return '';
  }

  return item.attributes.snippet;
};

const fetchItemThumbnailSrc = (item) => {
  if (!item.attributes.pagemap.cse_image[0].src) {
    return '';
  }

  return item.attributes.pagemap.cse_image[0].src;
};

const fetchItemFeature = (item) => {
  if (!item || !item.attributes) {
    return {
      title: '',
      link: '',
      snippet: '',
      thumbnailSrc: '',
    };
  }

  return {
    title: fetchItemTitle(item),
    link: fetchItemLink(item),
    snippet: fetchItemSnippet(item),
    thumbnailSrc: fetchItemThumbnailSrc(item),
  }
}

const fetchResultItems = (data) => {
  if (!data.items) {
    return [];
  }

  const resultItems = [];

  return _map(data.items, (item, index) => {
    return resultItems[index] = fetchItemFeature(item);
  });
};

export { fetchResultLength, fetchResultItems, fetchSearchKeyword };
