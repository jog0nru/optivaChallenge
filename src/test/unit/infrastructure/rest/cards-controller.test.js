const container = require('../../../../container');
const awilix = require('awilix');
const {app, server} = require('../../../../index');
const supertest = require('supertest');
const request = supertest(app);
const {NOT_FOUND, SERVER_ERROR, OK} = require('../../../../infrastructure/rest/http-status-code');
const CardNotFoundError = require('../../../../domain/card/card-not-found-error');
jest.mock('../../../../infrastructure/process/update-database-process');

describe('cards controller', () => {
  const card = {
    id: 'cardId',
    name: 'cardName',
    language: 'en',
    releaseDate: '2018-10-05',
    set: 'cardSet',
    images: ['imageUrl'],
    legalities: ['legality'],
  };

  afterEach(async () => {
    await server.close();
    jest.clearAllMocks();
  });

  describe('GET card by id', () => {
    const id = '9531a677-68f1-45e1-b730-ac29ddee9153';
    const getCardMock = {
      get: jest.fn(),
    };
    container.register({
      getCard: awilix.asValue(getCardMock),
    });

    it('shouĺd return 404 if this card does not exist', async () => {
      const expectedGetCardResponse = {message: 'Card not found', description: 'not_found'};
      getCardMock.get.mockRejectedValue(new CardNotFoundError('Card not found'));
      const res = await request.get(`/api/v1/cards/${id}`);
      const {status, body, headers} = res;
      expect(status).toBe(NOT_FOUND);
      expect(body).toEqual(expectedGetCardResponse);
      expect(headers['content-type']).toContain('application/json');
    });

    it('shouĺd return 500 when an unexpected error is raised', async () => {
      const expectedGetCardResponse = {message: 'Internal Server Error', description: 'unknown'};
      getCardMock.get.mockRejectedValue(new Error('Unexpected Error'));
      const res = await request.get(`/api/v1/cards/${id}`);
      const {status, body, headers} = res;
      expect(status).toBe(SERVER_ERROR);
      expect(body).toEqual(expectedGetCardResponse);
      expect(headers['content-type']).toContain('application/json');
    });

    it('Should return 200 with card if it works fine', async () => {
      const expectedGetCardResponse = card;
      getCardMock.get.mockResolvedValue(card);
      const res = await request.get(`/api/v1/cards/${id}`);
      const {status, body, headers} = res;
      expect(status).toBe(OK);
      expect(body).toEqual(expectedGetCardResponse);
      expect(headers['content-type']).toContain('application/json');
    });
  });

  describe('GET cards by query', () => {
    const getCardsByParamsMock = {
      get: jest.fn(),
    };
    container.register({
      getCardsByParams: awilix.asValue(getCardsByParamsMock),
    });

    it('Should return 404  when no query string is provided', async () => {
      const expectedResponse = {message: 'Card not found', description: 'not_found'};
      const res = await request.get(`/api/v1/cards`);
      const {status, body, headers} = res;
      expect(status).toBe(NOT_FOUND);
      expect(body).toEqual(expectedResponse);
      expect(headers['content-type']).toContain('application/json');
    });

    it('shouĺd return 500 when an unexpected error is raised', async () => {
      const expectedResponse = {message: 'Internal Server Error', description: 'unknown'};
      getCardsByParamsMock.get.mockRejectedValue(new Error('Unexpected Error'));
      const res = await request.get(`/api/v1/cards?collection=iko`);
      const {status, body, headers} = res;
      expect(status).toBe(SERVER_ERROR);
      expect(body).toEqual(expectedResponse);
      expect(headers['content-type']).toContain('application/json');
    });

    it('Should return 200 with cards if it works fine', async () => {
      const expectedResponse = [card];
      getCardsByParamsMock.get.mockResolvedValue([card]);
      const res = await request.get(`/api/v1/cards?collection=iko`);
      const {status, body, headers} = res;
      expect(status).toBe(OK);
      expect(body).toEqual(expectedResponse);
      expect(headers['content-type']).toContain('application/json');
    });

    it('should return 404 when no card is found', async () => {
      const expectedResponse = {message: 'Card not found', description: 'not_found'};
      getCardsByParamsMock.get.mockRejectedValue(new CardNotFoundError('Card not found'));
      const res = await request.get(`/api/v1/cards?collection=iko`);
      const {status, body, headers} = res;
      expect(status).toBe(NOT_FOUND);
      expect(body).toEqual(expectedResponse);
      expect(headers['content-type']).toContain('application/json');
    });
  });
});
