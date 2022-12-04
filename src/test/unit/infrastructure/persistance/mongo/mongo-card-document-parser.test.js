const awilix = require('awilix');
const container = require('../../../../../container');

describe('mongo card document parser', () => {
  let muuidMock;
  beforeEach(() => {
    muuidMock = {
      from: jest.fn(),
    };
    container.register({
      muuid: awilix.asValue(muuidMock),
    });
    cardParser = container.resolve('cardDocumentParser');
  });

  it('Should parse document to domain', () => {
    const cardDocument = {
      _id: 'cardId',
      name: 'cardName',
      language: 'cardLanguage',
      releaseDate: 'cardReleaseDate',
      images: {small: 'small url', medium: 'medium url', large: 'large url'},
      set: 'cardSet',
      legalities: {legality1: 'legal'},
    };
    const expectedCardDomain = {
      id: 'cardId',
      name: 'cardName',
      language: 'cardLanguage',
      releaseDate: 'cardReleaseDate',
      images: {small: 'small url', medium: 'medium url', large: 'large url'},
      set: 'cardSet',
      legalities: {legality1: 'legal'},
    };
    muuidMock.from.mockReturnValue('cardId');
    const cardDomain = cardParser.toDomain(cardDocument);
    expect(JSON.stringify(cardDomain.toObject())).toEqual(JSON.stringify(expectedCardDomain));
    expect(muuidMock.from).toHaveBeenCalledTimes(1);
  });

  it('Should parse domain to document', () => {
    const cardDomain = {
      id: 'cardId',
      name: 'cardName',
      language: 'cardLanguage',
      releaseDate: 'cardReleaseDate',
      images: {small: 'small url', medium: 'medium url', large: 'large url'},
      set: 'cardSet',
      legalities: {legality1: 'legal'},
    };
    const expectedCardDocument = {
      _id: 'cardId',
      name: 'cardName',
      language: 'cardLanguage',
      releaseDate: 'cardReleaseDate',
      images: {small: 'small url', medium: 'medium url', large: 'large url'},
      set: 'cardSet',
      legalities: {legality1: 'legal'},
    };
    muuidMock.from.mockReturnValue('cardId');
    const cardDocument = cardParser.toDocument(cardDomain);
    expect(JSON.stringify(cardDocument)).toEqual(JSON.stringify(expectedCardDocument));
    expect(muuidMock.from).toHaveBeenCalledTimes(1);
  });
});
