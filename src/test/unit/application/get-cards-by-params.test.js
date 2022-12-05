const container = require('../../../container');
const awilix = require('awilix');
const Card = require('../../../domain/card/card');
const GetCardsByParamsCommandBuilder =
  require('../../../application/get_cards_by_params/get-cards-by-params-command-builder');
const GetCardsByParamsResponseBuilder =
  require('../../../application/get_cards_by_params/get-cards-by-params-response-builder');

describe('get cards by params', () => {
  const cardfound = new Card({
    id: 'd8a2e243-e446-46c6-8a37-e26620951c41',
    name: 'cardName',
    language: 'cardLanguage',
    releaseDate: 'cardReleaseDate',
    images: {small: 'small url', medium: 'medium url', large: 'large url'},
    set: 'cardSet',
    legalities: {legality1: 'legal'},
  });
  const cardfound2 = new Card({
    id: 't6a8e249-h4j6-4dc3-8ag0-f2662g951cg0',
    name: 'cardName2',
    language: 'cardLanguage2',
    releaseDate: 'cardReleaseDate2',
    images: {small: 'small url', medium: 'medium url', large: 'large url'},
    set: 'cardSet',
    legalities: {legality1: 'legal'},
  });
  const name = 'cardName';
  const set = 'cardSet';
  const legality = 'legality';
  const cardRepositoryMock = {
    findByParams: jest.fn(),
  };
  beforeEach(() => {
    container.register({
      cardRepository: awilix.asValue(cardRepositoryMock),
    });

    getCardsByParams = container.resolve('getCardsByParams');
  });

  afterEach(() => jest.clearAllMocks());

  it('Should throw an error if do not exist cards with that criteria', () => {
    cardRepositoryMock.findByParams.mockReturnValue([]);
    const getCardsByParamsCommand = new GetCardsByParamsCommandBuilder({name, set, legality});
    const expectedError = 'Card not found';

    expect(getCardsByParams.get(getCardsByParamsCommand)).rejects.toThrow(expectedError);
    expect(cardRepositoryMock.findByParams).toHaveBeenCalledTimes(1);
    expect(cardRepositoryMock.findByParams).toHaveBeenCalledWith({name, set, legality});
  });

  it('Should return found cards if everything goes well', async () => {
    cardRepositoryMock.findByParams.mockReturnValue([cardfound, cardfound2]);
    const getCardsByParamsCommand = new GetCardsByParamsCommandBuilder({name, set, legality});
    const expectedResponse = new GetCardsByParamsResponseBuilder({cards: [cardfound, cardfound2]});
    const response = await getCardsByParams.get(getCardsByParamsCommand);

    expect(response).toEqual(expectedResponse);
    expect(cardRepositoryMock.findByParams).toHaveBeenCalledTimes(1);
    expect(cardRepositoryMock.findByParams).toHaveBeenCalledWith({name, set, legality});
  });
});
