import Pluralize from 'pluralize';

/**
 * escape(string)
 * Escapes all the regex special characters in a string. The first argument to
 * replace looks like a complicated regex but is actually just a list of regex
 * symbols and will match any one of these symbols literally.
 * @param {string} string
 * @return {string}
 */

const escape = string => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');


const makePlural = string => `(^|[^a-zA-Z])(${string}|${Pluralize(string, 2)})($|[^a-zA-Z])`


/**
 * splitKeyword(keyword)
 * Splits the keyword into individual words, interpreting all whitespace as a
 * wordbreak. Then escapes the resulting words and joins them together with "|"
 * (regex OR) to give a regex that will match any of the individual words
 * @param {string} keyword
 * @return {string}
 */
const splitKeyword = keyword => keyword.split(/\s+/).map(escape).map(makePlural).join('|');

/**
 * boldText(text, keyword)
 * This function converts the input text to an output in which all the keywords
 * are bold
 * @param {string} text
 * @param {string} keyword
 * @return {string}
 */
const boldText = (text, keyword) => text.replace(
  new RegExp(splitKeyword(keyword), 'gi'),
  match => `<strong class="gs-results-bold">${match}</strong>`,
);

export default boldText;
