const container = require('../../../../../container');
const awilix = require('awilix');
const Card = require('../../../../../domain/card/card');

describe('Mongo card repository', () => {
  let repository;
  const id = '6745d86f-9f24-4c13-9a9c-7b8c76fbee51';
  const cardDomain = new Card({
    id,
    name: 'cardName',
    language: 'es',
    releaseDate: '2020/05/02',
    images: {small: 'smallUrl',
      normal: 'normalUrl',
      large: 'largeUrl'},
    set: 'set',
    legalities: {
      standard: 'not_legal',
      future: 'not_legal',
      historic: 'not_legal'},
  });
  const cardDocument = {
    _id: id,
    name: 'cardName',
    language: 'es',
    releaseDate: '2020/05/02',
    images: {small: 'smallUrl',
      normal: 'normalUrl',
      large: 'largeUrl'},
    set: 'set',
    legalities: {
      standard: 'not_legal',
      future: 'not_legal',
      historic: 'not_legal'},
  };
  const mongoDbHandlerMock = {
    getInstance: jest.fn(),
  };
  const cardDocumentParserMock = {
    toDocument: jest.fn(),
    toDomain: jest.fn(),
  };

  beforeEach(() => {
    container.register({
      mongoDbHandler: awilix.asValue(mongoDbHandlerMock),
      cardDocumentParser: awilix.asValue(cardDocumentParserMock),
    });

    repository = container.resolve('cardRepository');
  });

  afterEach(() => jest.clearAllMocks());

  it('Should return null when not find a document by cardId', async () => {
    const findOneMock = jest.fn().mockReturnValue(null);
    const dbMocked = {
      collection: () => {
        return {
          findOne: findOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    const result = await repository.findById(id);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(result).toBeNull;
  });

  it('Should return null when the card is not in the database', async () => {
    const findOneMock = jest.fn().mockReturnValue(null);
    const dbMocked = {
      collection: () => {
        return {
          findOne: findOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    const result = await repository.findById(id);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(result).toBeNull;
  });

  it('Should find a document by cardId', async () => {
    cardDocumentParserMock.toDomain.mockReturnValue(cardDomain);
    const findOneMock = jest.fn().mockReturnValue(cardDocument);
    const dbMocked = {
      collection: () => {
        return {
          findOne: findOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    const result = await repository.findById(id);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(cardDocumentParserMock.toDomain).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining(cardDomain));
  });

  it('Should return an error when it fails saving a card', async () => {
    cardDocumentParserMock.toDocument.mockReturnValue(cardDocument);
    const error = 'error saving document';
    const insertOneMock = jest.fn().mockImplementation(() => {
      throw new Error(error);
    });
    const dbMocked = {
      collection: () => {
        return {
          insertOne: insertOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    await expect(repository.save(cardDomain)).rejects.toThrow(error);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(insertOneMock).toHaveBeenCalledTimes(1);
    expect(cardDocumentParserMock.toDocument).toHaveBeenCalledTimes(1);
  });

  it('Should save a card properly', async () => {
    cardDocumentParserMock.toDocument.mockReturnValue(cardDocument);
    const insertOneMock = jest.fn();
    const dbMocked = {
      collection: () => {
        return {
          insertOne: insertOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    await expect(repository.save(cardDomain)).resolve;
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(insertOneMock).toHaveBeenCalledTimes(1);
    expect(cardDocumentParserMock.toDocument).toHaveBeenCalledTimes(1);
  });

  it('Should return an error when it fails updating a card', async () => {
    cardDocumentParserMock.toDocument.mockReturnValue(cardDocument);
    const error = 'error updating document';
    const replaceOneMock = jest.fn().mockImplementation(() => {
      throw new Error(error);
    });
    const dbMocked = {
      collection: () => {
        return {
          replaceOne: replaceOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    await expect(repository.update(cardDomain)).rejects.toThrow(error);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(replaceOneMock).toHaveBeenCalledTimes(1);
    expect(cardDocumentParserMock.toDocument).toHaveBeenCalledTimes(1);
  });

  it('Should update a card properly', async () => {
    cardDocumentParserMock.toDocument.mockReturnValue(cardDocument);
    const replaceOneMock = jest.fn();
    const dbMocked = {
      collection: () => {
        return {
          replaceOne: replaceOneMock,
        };
      },
    };
    mongoDbHandlerMock.getInstance.mockResolvedValue(Promise.resolve(dbMocked));
    await expect(repository.update(cardDomain)).resolve;
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(replaceOneMock).toHaveBeenCalledTimes(1);
    expect(cardDocumentParserMock.toDocument).toHaveBeenCalledTimes(1);
  });

  it('Should save a card if it does not exists when call saveOrUpdate', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById').mockReturnValue(null);
    const saveSpy = jest.spyOn(repository, 'save').mockReturnValue(null);

    await expect(repository.saveOrUpdate(cardDomain)).resolve;
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(cardDomain);
  });

  it('Should update a card if it already exists when call saveOrUpdate', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById').mockReturnValue(cardDomain);
    const updateSpy = jest.spyOn(repository, 'update').mockReturnValue(null);

    await expect(repository.saveOrUpdate(cardDomain)).resolve;
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(cardDomain);
  });
});
