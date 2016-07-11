import { expect } from 'chai';
import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from './../src/app/utils/SearchModel.js';


describe('fetchResultLength', () => {
  it('should return 0 if data is undefined or null', () => {
    expect(fetchResultLength()).to.deep.equal(0);
  });
});

describe('fetchResultItems', () => {
  it('should return an empty array if data is undefined or null', () => {
    expect(fetchResultItems()).to.deep.equal([]);
  });
  it('should return an empty array if data is an empty array', () => {
    expect(fetchResultItems([])).to.deep.equal([]);
  });
  it('should return an empty array if data is an array with an empty object', () => {
    expect(fetchResultItems([{}])).to.deep.equal([]);
  });
  it('should return an array with a default item if the item is undefined or null', () => {
    expect(fetchResultItems(
      {
        items: [
          {},
        ],
      }
    )).to.deep.equal(
      [
        {
          title: '',
          link: '',
          snippet: '',
          thumbnailSrc: '',
          label: '',
        }
      ]
    );
  });
  it('should return an array with a default item if the attributes of the item are undefined or null',
    () => {
      expect(fetchResultItems(
        {
          items: [
            {
              attributes: {
              },
            },
          ],
        }
      )).to.deep.equal(
        [
          {
            title: '',
            link: '',
            snippet: '',
            thumbnailSrc: '',
            label: '',
          }
        ]
      );
    }
  );
});


// {
//   items:[
//     {
//       attributes: {
//         title: '',
//         link: '',
//         snippet: '',
//         'thumbnail-url': '',
//         labels: [
//           {
//             name: '', 
//             displayName: '', 
//             label_with_op: ''
//           }
//         ],
//       },
//     },
//   ],
// }

describe('fetchSearchFacetsList', () => {
  it('should return a preset array if data is undefined or null', () => {
    expect(fetchSearchFacetsList()).to.deep.equal(
      [
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
      ]
    );
  });
});

// fetchSearchFacetsList()