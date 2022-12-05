const container = require('../../../../container');
const awilix = require('awilix');
const {app: {data: {cardSets}}} = require('../../../../infrastructure/config');
const RetrieveCardsCommandBuilder = require('../../../../application/retrieve_cards/retrieve-cards-command-builder');

describe('Update database process', () => {
  let retrieveCardsMock;
  let loggerMock;
  const retrieveCardsCommand = new RetrieveCardsCommandBuilder({cardSets});
  beforeEach(() => {
    retrieveCardsMock = {
      retrieve: jest.fn(),
    };
    loggerMock = {
      error: jest.fn(),
    };
    container.register({
      retrieveCards: awilix.asValue(retrieveCardsMock),
      logger: awilix.asValue(loggerMock),
    });
  });

  it('Should return an error message when it is received', () => {
    retrieveCardsMock.retrieve.mockImplementation(() => {
      throw new Error('Unexpected error');
    });
    require('../../../../infrastructure/process/update-database-process')();
    expect(retrieveCardsMock.retrieve).toHaveBeenCalledTimes(1);
    expect(retrieveCardsMock.retrieve).toHaveBeenCalledWith(retrieveCardsCommand);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith('Unexpected error');
  });

  it('Should update databse properly', () => {
    require('../../../../infrastructure/process/update-database-process')();
    expect(retrieveCardsMock.retrieve).toHaveBeenCalledTimes(1);
    expect(retrieveCardsMock.retrieve).toHaveBeenCalledWith(retrieveCardsCommand);
    expect(loggerMock.error).not.toHaveBeenCalled();
  });
});
