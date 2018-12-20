import { filterNames } from './FilterNames.js'

const getNumberForFacet = facet => filterNames.map(name => name.value).indexOf(facet) + 1

export default getNumberForFacet;
