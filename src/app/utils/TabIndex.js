import { filterNames } from './FilterNames';

const values = filterNames.map(filter => filter.value);

const incrementIndex = (arr, index, step) => {
  const newIndex = index + step;
  return newIndex > -1 && newIndex < arr.length ? newIndex : index;
};

const incrementTab = (name, step) => values[incrementIndex(values, values.indexOf(name), step)];

const getNameForFacet = facet => `${facet}`;

const displayNameForFacet = facet => (facet === '' ? 'all' : facet);

export {
  getNameForFacet, incrementTab, incrementIndex, values, displayNameForFacet,
};
