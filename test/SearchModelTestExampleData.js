const testData = {
  noItem: {
    items: [
      {},
    ],
  },
  noItemAttributes: {
    items: [
      {
        attributes: undefined,
      },
    ],
  },
  noLabels: {
    items: [
      {
        attributes: {
          labels: undefined,
        },
      },
    ],
  },
  multipleLabels: {
    items: [
      {
        attributes: {
          labels: [
            {
              name: 'exhibitions',
              displayName: 'Exhibitions',
            },
            {
              name: 'digital_collections',
              displayName: 'Digital Collections',
            },
            {
              name: 'audio_video',
              displayName: 'Audio/Video',
            },
          ],
        },
      },
    ],
  },
};

const matchedResults = {
  presetItem: [
    {
      title: '',
      link: '',
      snippet: '',
      thumbnailSrc: '',
      label: '',
    },
  ],
  ItemWithExhibitionLabel: [
    {
      title: '',
      link: '',
      snippet: '',
      thumbnailSrc: '',
      label: 'Exhibitions',
    },
  ],
};

const presetFacets = [
  {
    anchor: 'All',
    label: '',
  },
  {
    anchor: 'Digital Collections',
    label: 'digital_collections',
  },
  {
    anchor: 'Exhibitions',
    label: 'exhibitions',
  },
  {
    anchor: 'Archives',
    label: 'archives',
  },
  {
    anchor: 'Audio / Visual',
    label: 'audio_video',
  },
  {
    anchor: 'Blog',
    label: 'blog',
  },
  {
    anchor: 'Projects',
    label: 'projects',
  },
  {
    anchor: 'Events / Classes',
    label: 'events_classes',
  },
  {
    anchor: 'Recommendations',
    label: 'recommendations',
  },
  {
    anchor: 'Locations',
    label: 'locations',
  },
];

export { testData, matchedResults, presetFacets };
