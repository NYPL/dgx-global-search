import { filterNames } from './FilterNames.js'

const values = filterNames.map(filter => filter.value);

const incrementIndex = (arr, index, step) => {
  let newIndex = index + step;
  return newIndex > -1 && newIndex < arr.length ? newIndex : index;
}

const incrementTab = (name, step) => values[incrementIndex(values, values.indexOf(name), step)]

const getNameForFacet = (facet) => `${facet}`

export { getNameForFacet, incrementTab, incrementIndex, values };
