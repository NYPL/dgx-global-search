/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import { generateSearchedFrom } from '../src/app/utils/GAUtils';

describe('GAUtils', () => {
  describe('generateSearchedFrom', () => {
    let spyGenerateSearchedFrom;

    before(() => {
      spyGenerateSearchedFrom = sinon.spy(generateSearchedFrom);
    });
    after(() => {
      // As we don't use the "spy(object, method name)"" constructor here, we can't use
      // spyGenerateSearchedFrom.restore()
      // We have to point the spy function back to the original function to restore it
      // See https://stackoverflow.com/questions/38033894/unable-to-spy-on-existing-function
      spyGenerateSearchedFrom = generateSearchedFrom;
    });

    describe('If any of the queries from the second parameter is missing', () => {
      it('should return "DirectLink" if no queries are passed to it.', () => {
        const searchedFromResult = spyGenerateSearchedFrom(
          '1511807083381',
          { timestamp: '', searchedFrom: '' },
        );

        expect(searchedFromResult).to.deep.equal('DirectLink');
      });
      it('should return "MissingTimestamp" if "timestamp" query is missing '
        + 'from the second parameter.', () => {
        const searchedFromResult = spyGenerateSearchedFrom(
          '1511807083381',
          { searchedFrom: 'betasearch' },
        );

        expect(searchedFromResult).to.deep.equal('MissingTimestamp');
      });
      it('should return "MissingSearchedFrom" if "searchedFrom" query is missing '
        + 'from the second parameter.', () => {
        const searchedFromResult = spyGenerateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807083381' },
        );

        expect(searchedFromResult).to.deep.equal('MissingSearchedFrom');
      });
    });

    describe('If all the parameters are valid, and "timeToLoadResults" minuses "querySentTime" '
      + 'is more than 60000', () => {
      it('should return "DirectLink".', () => {
        const searchedFrom = generateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807010000', searchedFrom: 'betasearch' },
        );

        expect(searchedFrom).to.deep.equal('DirectLink');
      });
    });

    describe('If all the parameters are valid, and "timeToLoadResults" minuses "querySentTime" '
      + 'is less than 60000', () => {
      it('should return "HeaderSearch" if "searchedFrom" query is "header_search".', () => {
        const searchedFrom = generateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807073381', searchedFrom: 'header_search' },
        );

        expect(searchedFrom).to.deep.equal('HeaderSearch');
      });

      it('should return "BetaSearchLink" if "searchedFrom" query is "betasearch_link".', () => {
        const searchedFrom = generateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807063381', searchedFrom: 'betasearch_link' },
        );

        expect(searchedFrom).to.deep.equal('BetaSearchLink');
      });

      it('should return "BetaSearchForm" if "searchedFrom" query is "betasearch".', () => {
        const searchedFrom = generateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807063381', searchedFrom: 'betasearch' },
        );

        expect(searchedFrom).to.deep.equal('BetaSearchForm');
      });

      it('should return "Unknown" if "searchedFrom" query does not match any as above.', () => {
        const searchedFrom = generateSearchedFrom(
          '1511807083381',
          { timestamp: '1511807063381', searchedFrom: 'my_dog\'s_laptop' },
        );

        expect(searchedFrom).to.deep.equal('Unknown');
      });
    });
  });
});
