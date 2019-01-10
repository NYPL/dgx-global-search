// If the URL of a result item is in one of these domains,
// it should not be converted to begin with "https"
const execptionalDomains = [
  '//digital.nypl.org',
  '//menus.nypl.org',
  '//exhibitions.nypl.org',
  '//static.nypl.org',
  '//static.nypl.org/exhibitions',
  '//web-static.nypl.org/exhibitions',
  '//web-static.nypl.org',
];

export default execptionalDomains;
