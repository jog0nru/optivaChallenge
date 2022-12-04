const axios = require('axios');
const RetrieveCardsService = require('../../../domain/card/service/retrieve-cardsService');
const {scryfall: {cardsFromSetUrl, waitTime}} = require('../../config');

const Card = require('../../../domain/card/card');

class ScryfallProvider extends RetrieveCardsService {
  constructor({cardRepository, logger}) {
    super();
    this.cardRepository = cardRepository;
    this.logger = logger;
  }
  async getCardsBySet({sets}) {
    for (const set of sets) {
      let response;
      let page = 1;

      do {
        // eslint-disable-next-line max-len
        const url=`${cardsFromSetUrl}?include_extras=true&include_variations=true&order=set&q=e%3A${set}&unique=prints&page=${page}`;
        const config = {
          headers: {
            'Accept-Encoding': 'application/json',
          },
        };
        try {
          this.logger.debug(`Request to ${set}`);
          response = await axios.get(url, config);
          this.logger.debug(`Response received to ${set}`);

          for (const retrievedCard of response.data.data) {
            const card = new Card({
              id: retrievedCard.id,
              name: retrievedCard.name,
              language: retrievedCard.lang,
              releaseDate: retrievedCard.released_at,
              images: {small: retrievedCard.image_uris ? retrievedCard.image_uris.small : null,
                normal: retrievedCard.image_uris ? retrievedCard.image_uris.normal : null,
                large: retrievedCard.image_uris ? retrievedCard.image_uris.large : null},
              set: retrievedCard.set,
              legalities: retrievedCard.legalities,
            });
            await this.cardRepository.saveOrUpdate(card);
          }
        } catch (err) {
          const msg = err.message ? err.message : err;
          this.logger.error(`Error getting cards from scryfall: ${msg}`);
          return;
        }
        if (response.data.has_more) {
          page+=1;
          await this._sleep(waitTime);
        }
      } while (response.data.has_more);
    };
  }

  _sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

module.exports = ScryfallProvider;
