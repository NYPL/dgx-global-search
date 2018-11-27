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
          link: 'https://gethelp.nypl.org/customer/portal/articles/2214923',
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
      title: 'Get Started with SimplyE for Apple iOS',
      link: 'https://gethelp.nypl.org/customer/portal/articles/2214923',
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
          anchor: 'All Results',
          value: '',
          label: 'all_results',
        },
        {
          anchor: 'Articles',
          value: 'articles_databases',
          label: 'articles_databases',
        },
        {
          anchor: 'Research Guides',
          value: 'research_guides',
          label: 'research_guides',
        },
        {
          anchor: 'Events & Classes',
          value: 'events_classes',
          label: 'events_classes',
        },
        {
          anchor: 'Exhibitions',
          value: 'exhibitions',
          label: 'exhibitions',
        },
        {
          anchor: 'Blog Posts',
          value: 'blog_posts',
          label: 'blog_posts',
        },
        {
          anchor: 'Audio & Visual',
          value: 'audio_video',
          label: 'audio_video',
        },
        {
          anchor: 'Help Articles',
          value: 'help_articles',
          label: 'help_articles',
        },
        {
          anchor: 'Locations',
          value: 'locations',
          label: 'locations',
        }
        ]
export { testData, matchedResults, presetFacets };
