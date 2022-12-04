const RetrieveCardsCommandBuilder = require('../../application/retrieve_cards/retrieve-cards-command-builder');
const {app: {data: {cardSets}}} = require('../config');
const container = require('../../container');

const updateDatabaseProcess = async () => {
  const logger = container.resolve('logger');
  try {
    const retrieveCards = container.resolve('retrieveCards');
    retrieveCardsCommand = new RetrieveCardsCommandBuilder({cardSets});
    await retrieveCards.retrieve(retrieveCardsCommand);
    logger.info('Update database process is done');
  } catch (err) {
    const msg = err.message ? err.message : err;
    logger.error(msg);
  }
};

module.exports = updateDatabaseProcess;
