import filterNames from './FilterNames';

const values = filterNames.map(filter => filter.value);

/**
 * incrementIndex(arr, index, step)
 * Adds the step to the index, unless this forces the index out of bounds
 *
 * @param {array} arr - An array
 * @param {int} index - The index of a position in the array
 * @param {int} step - The amount to increase/decrease the index
 */

const incrementIndex = (arr, index, step) => {
  const newIndex = index + step;
  return newIndex > -1 && newIndex < arr.length ? newIndex : index;
};

/**
 * incrementTab(name, step)
 * Returns the name of a tab which has distance equal to the given step distance
 * from the tab with the given name, as long as one exists. Otherwise, returns the original tab name
 *
 * @param {string} name - the name of the starting tab
 * @param {int} step - the distance of the return tab from the starting tab
 */

const incrementTab = (name, step) => values[incrementIndex(values, values.indexOf(name), step)];


/**
 * displayNameForFacet(facet)
 * Returns the display name for the facet.
 * This is the name that will be used in properties shown to the user
 * For example aria-labelledby uses the display name
 *
 * @param {string} facet - the value property of the facet
 */

const displayNameForFacet = facet => (facet === '' ? 'all' : facet);

export {
  incrementTab, incrementIndex, values, displayNameForFacet,
};
