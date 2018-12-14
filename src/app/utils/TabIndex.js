const getNumberForFacet = (facet) => {
  const facets = [
    '',
    'articles_databases',
    'research_guides',
    'events_classes',
    'exhibitions',
    'blog_posts',
    'audio_video',
    'help_articles',
    'locations']
  return facets.indexOf(facet) + 1;
}

export default getNumberForFacet;
