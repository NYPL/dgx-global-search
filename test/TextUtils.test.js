import { expect } from 'chai';
import boldText from '../src/app/utils/TextUtils';

describe('bolding search keywords', () => {
  const keyword = 'camel';
  const upperCaseCamel = '<strong class="gs-results-bold">Camel</strong>';
  const lowerCaseCamel = '<strong class="gs-results-bold">camel</strong>';
  const pluralCamels = '<strong class="gs-results-bold">camels</strong>';
  const upperCaseJoe = '<strong class="gs-results-bold">Joe</strong>';

  it('should bold words at the beggining of text', () => {
    const text = 'Camel is a company';
    expect(boldText(text, keyword)).to.include(upperCaseCamel);
  });

  it('should bold words in the middle of text', () => {
    const text = 'The bactrian camel has two humps';
    expect(boldText(text, keyword)).to.include(lowerCaseCamel);
  });

  it('should bold words at the end of text', () => {
    const text = 'look at this cool camel';
    expect(boldText(text, keyword)).to.include(lowerCaseCamel);
  });

  it('should not bold subwords', () => {
    const text = 'camelcase';
    expect(boldText(text, keyword)).to.equal('camelcase');
  });

  it('should bold keywords separately', () => {
    const text = 'Joe Camel is my spirit animal';
    const bolded = boldText(text, 'Joe Camel');
    expect(bolded).to.include(upperCaseCamel);
    expect(bolded).to.include(upperCaseJoe);
  });

  it('should bold plural forms of words', () => {
    const text = 'Where are my camels';
    expect(boldText(text, keyword)).to.include(pluralCamels);
  });

  it('should bold plural forms of irregular words', () => {
    const text = 'Catch the mice';
    const strongMice = '<strong class="gs-results-bold">mice</strong>';
    expect(boldText(text, 'mouse')).to.include(strongMice);
  });

  it('should not include punctuation in bolding', () => {
    const text = 'Where are my camels?';
    expect(boldText(text, keyword)).to.include(pluralCamels);
  });
});
