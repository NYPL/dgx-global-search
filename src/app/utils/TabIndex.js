import { filterNames } from './FilterNames.js'

// const getNumberForFacet = facet => filterNames.map(name => name.value).indexOf(facet) + 1

const getNumberForFacet = facet => `_${facet}`

export default getNumberForFacet;
