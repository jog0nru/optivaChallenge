const container = require('../../../container');
const awilix = require('awilix');
const RetrieveCardsCommandBuilder = require('../../../application/retrieve_cards/retrieve-cards-command-builder');

describe('retrieve cards', () => {
  it('should fire the service', () => {
    retrieveCardsServiceMock ={
      getCardsBySet: jest.fn(),
    };
    container.register({
      retrieveCardsService: awilix.asValue(retrieveCardsServiceMock),
    });
    retrieveCards = container.resolve('retrieveCards');

    retrieveCardsCommand = new RetrieveCardsCommandBuilder({cardSets: ['cardSet']});
    retrieveCards.retrieve(retrieveCardsCommand);
    expect(retrieveCardsServiceMock.getCardsBySet).toHaveBeenCalledTimes(1);
    expect(retrieveCardsServiceMock.getCardsBySet).toHaveBeenCalledWith({sets: ['cardSet']});
  });
});
