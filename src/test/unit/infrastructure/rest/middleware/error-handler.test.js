const ApplicationError = require('../../../../../domain/application-error');
const errorHandler = require('../../../../../infrastructure/rest/middleware/error-handler');
const container = require('../../../../../container');
const awilix = require('awilix');
const httpMocks = require('node-mocks-http');
const {SERVER_ERROR, BAD_REQUEST} = require('../../../../../infrastructure/rest/http-status-code');

describe('Error handler', () => {
  let loggerMock;
  const nextMock = jest.fn();
  const req = {};

  beforeEach(() => {
    loggerMock = {
      error: jest.fn(),
    };

    container.register({
      logger: awilix.asValue(loggerMock),
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Should return 500 with original error message when error is Application Error', () => {
    const errorMessage = 'There was an error in domain layer';
    const res = httpMocks.createResponse();
    const error = new ApplicationError(errorMessage);

    const {statusCode, _getData, getHeader} = errorHandler(error, req, res, nextMock);
    const expectedError = {message: errorMessage,
      description: 'unknown'};
    expect(statusCode).toBe(SERVER_ERROR);
    expect(_getData()).toEqual(JSON.stringify(expectedError));
    expect(getHeader('content-type')).toContain('application/json');
    expect(nextMock).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(errorMessage);
  });

  it('Should return 400 when syntax error is raised', () => {
    const errorMessage = 'The request is malformed';
    const res = httpMocks.createResponse();
    const error = new SyntaxError(errorMessage);

    const {statusCode, _getData, getHeader} = errorHandler(error, req, res, nextMock);
    const expectedError = {message: 'Bad Request',
      description: 'unknown'};
    expect(statusCode).toBe(BAD_REQUEST);
    expect(_getData()).toEqual(JSON.stringify(expectedError));
    expect(getHeader('content-type')).toContain('application/json');
    expect(nextMock).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(errorMessage);
  });

  it('Should return 500 when unknown error is raised', () => {
    const errorMessage = 'unknown error';
    const res = httpMocks.createResponse();
    const error = new Error(errorMessage);

    const {statusCode, _getData, getHeader} = errorHandler(error, req, res, nextMock);
    const expectedError = {message: 'Internal Server Error',
      description: 'unknown'};
    expect(statusCode).toBe(SERVER_ERROR);
    expect(_getData()).toEqual(JSON.stringify(expectedError));
    expect(getHeader('content-type')).toContain('application/json');
    expect(nextMock).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(errorMessage);
  });
});
