import { expect } from 'chai';
import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from './../src/app/utils/SearchModel.js';
import {
  testData,
  matchedResults,
  presetFacets,
} from './SearchModelTestExampleData.js';

describe('fetchResultLength', () => {
  it('should return 0 if data is undefined or null.', () => {
    expect(fetchResultLength()).to.deep.equal(0);
  });
});

describe('fetchResultItems', () => {
  it('should return an empty array if data is undefined or null.', () => {
    expect(fetchResultItems()).to.deep.equal([]);
  });

  it('should return an empty array if data is an empty object.', () => {
    expect(fetchResultItems({})).to.deep.equal([]);
  });

  it('should return an array with a default item if the item is undefined or null.', () => {
    expect(fetchResultItems(testData.noItem)).to.deep.equal(matchedResults.presetItem);
  });

  it('should return an item with preset label if labels is undefined or null.',
    () => {
      expect(fetchResultItems(testData.noLabels)).to.deep.equal(matchedResults.presetItem);
    }
  );

  it('should return an item with the first label.displayName as its label if searchRequest is ' +
    'undefined or null.',
    () => {
      expect(fetchResultItems(testData.contentWithHTMLTags)).to.deep.equal(
        matchedResults.ItemWithExhibitionLabel
      );
    }
  );

  it('should return an item with the matched label with search facet.',
    () => {
      expect(fetchResultItems(testData.contentWithHTMLTags, 'apple more:exhibitions')
      ).to.deep.equal(matchedResults.ItemWithExhibitionLabel);
    }
  );

  it('should return an item without HTML tags in its title and snippet.',
    () => {
      expect(fetchResultItems(testData.contentWithHTMLTags, 'apple more:exhibitions')
      ).to.deep.equal(matchedResults.ItemWithExhibitionLabel);
    }
  );

  it('should return an item with correct attributes.',
    () => {
      expect(fetchResultItems(testData.contentWithHTMLTags, 'apple more:exhibitions')
      ).to.deep.equal(matchedResults.ItemWithExhibitionLabel);
    }
  );
});
//
describe('fetchSearchFacetsList', () => {
  it('should return a preset facet array if data is undefined or null', () => {
    expect(fetchSearchFacetsList()).to.deep.equal(presetFacets);
  });
});
