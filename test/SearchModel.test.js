import { expect } from 'chai';
import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from './../src/app/utils/SearchModel.js';

const testFiles = {
  noItem: {
    items: [
      {},
    ],
  },
  noItemAttributes: {
    items: [
      {
        attributes: {},
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

describe('fetchResultLength', () => {
  it('should return 0 if data is undefined or null.', () => {
    expect(fetchResultLength()).to.deep.equal(0);
  });
});

describe('fetchResultItems', () => {
  it('should return an empty array if data is undefined or null.', () => {
    expect(fetchResultItems()).to.deep.equal([]);
  });

  it('should return an empty array if data is an empty array.', () => {
    expect(fetchResultItems([])).to.deep.equal([]);
  });

  it('should return an empty array if data is an array with an empty object.', () => {
    expect(fetchResultItems([{}])).to.deep.equal([]);
  });

  it('should return an array with a default item if the item is undefined or null.', () => {
    expect(fetchResultItems(testFiles.noItem)).to.deep.equal(matchedResults.presetItem);
  });

  it('should return an array with a default item if the attributes of the item are undefined or '+
    'null.',
    () => {
      expect(fetchResultItems(testFiles.noItemAttributes)).to.deep.equal(matchedResults.presetItem);
  });

  it('should return an item with preset label if attributes.labels is undefined or null.',
    () => {
      expect(fetchResultItems(testFiles.noLabels)).to.deep.equal(matchedResults.presetItem);
    }
  );

  it('should return an item with the first label.displayName if searchRequest is ' +
    'undefined or null.',
    () => {
      expect(fetchResultItems(testFiles.multipleLabels)).to.deep.equal(
        matchedResults.ItemWithExhibitionLabel
      );
    }
  );

  it('should return an item with the matched label.displayName with search facet.',
    () => {
      expect(fetchResultItems(testFiles.multipleLabels, 'apple more:exhibitions')
      ).to.deep.equal(matchedResults.ItemWithExhibitionLabel);
    }
  );
});

describe('fetchSearchFacetsList', () => {
  it('should return a preset array if data is undefined or null', () => {
    expect(fetchSearchFacetsList()).to.deep.equal(presetFacets);
  });
});
