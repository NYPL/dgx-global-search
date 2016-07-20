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
  contentWithHTMLTags: {
    items: [
      {
        attributes: {
          title: 'Get Started with SimplyE for Apple &lt;span&gt;iOS&lt;/span&gt;',
          link: 'http://gethelp.nypl.org/customer/portal/articles/2214923',
          snippet: 'Jun 23, 2016 ... &lt;i&gt;SimplyE requires an Apple ID&lt;/i&gt; and a device with iOS8 or' +
            'higher in order to download &lt;br&gt;the SimplyE app. iPad, iPad 2, iPad Air, iPad mini' +
            'iOS 8+ ...&lt;/div',
          'thumbnail-url': 'https://encrypted-tbn3.gstatic.com/images?q=tbn:' +
            'ANd9GcScCym1VJKFD1kWJG7Pl4hwD0PaKv2iLi8FfV4g2z4J7fg0EN_MnqPaXqJM',
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
  }
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
      title: 'Get Started with SimplyE for Apple iOS',
      link: 'http://gethelp.nypl.org/customer/portal/articles/2214923',
      snippet: 'Jun 23, 2016 ... SimplyE requires an Apple ID and a device with iOS8 or' +
        'higher in order to download the SimplyE app. iPad, iPad 2, iPad Air, iPad mini' +
        'iOS 8+ ...',
      thumbnailSrc: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:' +
        'ANd9GcScCym1VJKFD1kWJG7Pl4hwD0PaKv2iLi8FfV4g2z4J7fg0EN_MnqPaXqJM',
      label: 'Exhibitions',
    },
  ],
};

const presetFacets = [
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
  {
    anchor: 'Help',
    label: 'help',
  },
];

export { testData, matchedResults, presetFacets };
