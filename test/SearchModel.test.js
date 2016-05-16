import Model from './../src/app/utils/Model.js';

describe('fetchResultLength', () => {
  const fetchResultLength = Model.fetchResultLength;

  it('should return 0 if data is undefined or null', () => {
    expect(fetchResultLength()).to.deep.equal(0);
  });

  it('should return 0 if data is undefined or null', () => {
    expect(fetchResultLength()).to.deep.equal(0);
  });
});