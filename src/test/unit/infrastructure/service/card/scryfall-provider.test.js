const container = require('../../../../../container');
const awilix = require('awilix');
const axios = require('axios');
const Card = require('../../../../../domain/card/card');

jest.mock('axios');

const cardRepositoryMock = {
  saveOrUpdate: jest.fn(),
};
const loggerMock = {
  debug: jest.fn(),
  error: jest.fn(),
};
sets = ['set1', 'set2'];

beforeEach(() => {
  axios.get.mockRestore();
  cardRepositoryMock.saveOrUpdate.mockRestore();
  container.register({
    cardRepository: awilix.asValue(cardRepositoryMock),
    logger: awilix.asValue(loggerMock),
  });

  retrieveCardsService = container.resolve('retrieveCardsService');
});

const response2Cards1Page = {
  'object': 'list',
  'total_cards': 2,
  'has_more': false,
  'next_page': 'next-page-url',
  'data': [
    {
      'object': 'card',
      'id': 'bf87803b-e7c6-4122-add4-72e596167b7e',
      'name': 'Abbey Griffin',
      'lang': 'en',
      'released_at': '2011-09-30',
      'image_uris': {
        'small': 'small-url',
        'normal': 'normal-url',
        'large': 'large-url',
        'png': 'png-url',
        'art_crop': 'art_crop-url',
        'border_crop': 'border_crop-url',
      },
      'legalities': {
        'standard': 'not_legal',
        'future': 'not_legal',
        'historic': 'not_legal',
        'gladiator': 'not_legal',
        'oldschool': 'not_legal',
        'premodern': 'not_legal',
      },
      'set': 'isd',
    },
    {
      'object': 'card',
      'id': '8dfe629f-485c-4619-9713-32d2ae406e63',
      'name': 'Angel of Flight Alabaster',
      'lang': 'en',
      'released_at': '2011-09-30',
      'image_uris': {
        'small': 'small-url',
        'normal': 'normal-url',
        'large': 'large-url',
        'png': 'png-url',
        'art_crop': 'art_crop-url',
        'border_crop': 'border_crop-url',
      },
      'legalities': {
        'standard': 'not_legal',
        'future': 'not_legal',
        'historic': 'not_legal',
        'gladiator': 'not_legal',
        'pioneer': 'not_legal',
        'premodern': 'not_legal',
      },
      'set': 'isd',
    },
  ],
};
const response2Cards2Pages = {
  'object': 'list',
  'total_cards': 4,
  'has_more': true,
  'next_page': 'next-page-url',
  'data': [
    {
      'object': 'card',
      'id': 'bf87803b-e7c6-4122-add4-72e596167b7e',
      'name': 'Abbey Griffin',
      'lang': 'en',
      'released_at': '2011-09-30',
      'image_uris': {
        'small': 'small-url',
        'normal': 'normal-url',
        'large': 'large-url',
        'png': 'png-url',
        'art_crop': 'art_crop-url',
        'border_crop': 'border_crop-url',
      },
      'legalities': {
        'standard': 'not_legal',
        'future': 'not_legal',
        'historic': 'not_legal',
        'gladiator': 'not_legal',
        'oldschool': 'not_legal',
        'premodern': 'not_legal',
      },
      'set': 'isd',
    },
    {
      'object': 'card',
      'id': '8dfe629f-485c-4619-9713-32d2ae406e63',
      'name': 'Angel of Flight Alabaster',
      'lang': 'en',
      'released_at': '2011-09-30',
      'image_uris': {
        'small': 'small-url',
        'normal': 'normal-url',
        'large': 'large-url',
        'png': 'png-url',
        'art_crop': 'art_crop-url',
        'border_crop': 'border_crop-url',
      },
      'legalities': {
        'standard': 'not_legal',
        'future': 'not_legal',
        'historic': 'not_legal',
        'gladiator': 'not_legal',
        'pioneer': 'not_legal',
        'premodern': 'not_legal',
      },
      'set': 'isd',
    },
  ],
};
const card1 = new Card({
  id: 'bf87803b-e7c6-4122-add4-72e596167b7e',
  name: 'Abbey Griffin',
  language: 'en',
  releaseDate: '2011-09-30',
  images: {
    small: 'small-url',
    normal: 'normal-url',
    large: 'large-url',
  },
  legalities: {
    standard: 'not_legal',
    future: 'not_legal',
    historic: 'not_legal',
    gladiator: 'not_legal',
    oldschool: 'not_legal',
    premodern: 'not_legal',
  },
  set: 'isd',
});
const card2 = new Card({
  id: '8dfe629f-485c-4619-9713-32d2ae406e63',
  name: 'Angel of Flight Alabaster',
  language: 'en',
  releaseDate: '2011-09-30',
  images: {
    small: 'small-url',
    normal: 'normal-url',
    large: 'large-url',
  },
  legalities: {
    standard: 'not_legal',
    future: 'not_legal',
    historic: 'not_legal',
    gladiator: 'not_legal',
    pioneer: 'not_legal',
    premodern: 'not_legal',
  },
  set: 'isd',
});


describe('scryfall provider', () => {
  it('Should return error if axios fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Error from axios')),
    );
    await retrieveCardsService.getCardsBySet({sets});
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith('Error getting cards from scryfall: Error from axios');
  });

  it('Should update dataBase with one page response and 2 sets', async () => {
    axios.get
        .mockImplementationOnce(() => Promise.resolve({data: response2Cards1Page}))
        .mockImplementationOnce(() => Promise.resolve({data: response2Cards1Page}));
    await retrieveCardsService.getCardsBySet({sets});
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenCalledTimes(4);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenNthCalledWith(1, card1);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenNthCalledWith(2, card2);
  });

  it('Should update dataBase with a set with 2 pages and other set with one', async () => {
    axios.get
        .mockImplementationOnce(() => Promise.resolve({data: response2Cards2Pages}))
        .mockImplementationOnce(() => Promise.resolve({data: response2Cards1Page}))
        .mockImplementationOnce(() => Promise.resolve({data: response2Cards1Page}));
    await retrieveCardsService.getCardsBySet({sets});
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenCalledTimes(6);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenNthCalledWith(1, card1);
    expect(cardRepositoryMock.saveOrUpdate).toHaveBeenNthCalledWith(2, card2);
  });
});


