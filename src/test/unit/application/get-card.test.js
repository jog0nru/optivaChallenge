const container = require('../../../container');
const awilix = require('awilix');
const GetCardCommandBuilder = require('../../../application/get_card/get-card-command-builder');
const Card = require('../../../domain/card/card');
const GetCardResponseBuilder = require('../../../application/get_card/get-card-response-builder');

describe('get card', () => {
  const cardRepositoryMock = {
    findById: jest.fn(),
  };
  const id = 'd8a2e243-e446-46c6-8a37-e26620951c41.jpg?1591230173';

  beforeEach(() => {
    container.register({
      cardRepository: awilix.asValue(cardRepositoryMock),
    });

    getCard = container.resolve('getCard');
  });

  afterEach(() => jest.clearAllMocks());

  it('Should throw an erro if the card does not exist', () => {
    cardRepositoryMock.findById.mockReturnValue(null);
    const getCardCommandBuilder = new GetCardCommandBuilder({cardId: id});
    const expectedError = 'Card not found';

    expect(getCard.get(getCardCommandBuilder)).rejects.toThrow(expectedError);
    expect(cardRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(cardRepositoryMock.findById).toHaveBeenCalledWith(id);
  });

  it('Should return founded card if everything goes well', async () => {
    const cardFounded = new Card({
      id,
      name: 'cardName',
      language: 'cardLanguage',
      releaseDate: 'cardReleaseDate',
      images: {small: 'small url', medium: 'medium url', large: 'large url'},
      set: 'cardSet',
      legalities: {legality1: 'legal'},
    });

    cardRepositoryMock.findById.mockReturnValue(cardFounded);
    const getCardCommandBuilder = new GetCardCommandBuilder({cardId: id});
    const expectedResponse = new GetCardResponseBuilder({card: cardFounded});
    const response = await getCard.get(getCardCommandBuilder);
    expect(response).toEqual(expectedResponse);
    expect(cardRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(cardRepositoryMock.findById).toHaveBeenCalledWith(id);
  });
});
