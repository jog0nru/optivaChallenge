const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const CardNotFoundError = require('../../domain/card/card-not-found-error');
const GetCardCommandBuilder = require('../../application/get_card/get-card-command-builder');
const GetCardsByParamsCommandBuilder =
  require('../../application/get_cards_by_params/get-cards-by-params-command-builder');
const {OK, NOT_FOUND} = require('../../infrastructure/rest/http-status-code');
const container = require('../../container');

router.get('/:cardId', async (req, res, next) => {
  try {
    const {cardId} = req.params;
    const getCard = container.resolve('getCard');
    const getCardCommand = new GetCardCommandBuilder({cardId});
    const getCardResponse = await getCard.get(getCardCommand);
    return res.status(OK).json(getCardResponse);
  } catch (err) {
    if (err instanceof CardNotFoundError) {
      return res.status(NOT_FOUND).json({message: 'Card not found', description: 'not_found'});
    }
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const {name, collection, legality} = req.query;
    if (!name && !collection && !legality) {
      return res.status(NOT_FOUND).json({message: 'Card not found', description: 'not_found'});
    }
    const getCardsByParams = container.resolve('getCardsByParams');
    const getCardsByParamsCommand = new GetCardsByParamsCommandBuilder({name, set: collection, legality});
    const getCardsByParamsResponse = await getCardsByParams.get(getCardsByParamsCommand);
    return res.status(OK).json(getCardsByParamsResponse);
  } catch (err) {
    if (err instanceof CardNotFoundError) {
      return res.status(NOT_FOUND).json({message: 'Card not found', description: 'not_found'});
    }
    next(err);
  }
});

module.exports = router;
