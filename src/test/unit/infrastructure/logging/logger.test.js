const container = require('../../../../container');
const awilix = require('awilix');

describe('logger', () => {
  beforeEach(() => {
    loggerServiceMock = {
      error: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
    };
    container.register({
      loggerService: awilix.asValue(loggerServiceMock),
    });
    logger = container.resolve('logger');
  });

  it('logger error', () => {
    logger.error('Test error');
    expect(loggerServiceMock.error).toHaveBeenCalledTimes(1);
    expect(loggerServiceMock.error).toHaveBeenCalledWith('Test error');
  });

  it('logger info', () => {
    logger.info('Test info');
    expect(loggerServiceMock.info).toHaveBeenCalledTimes(1);
    expect(loggerServiceMock.info).toHaveBeenCalledWith('Test info');
  });

  it('logger debug', () => {
    logger.debug('Test debug');
    expect(loggerServiceMock.debug).toHaveBeenCalledTimes(1);
    expect(loggerServiceMock.debug).toHaveBeenCalledWith('Test debug');
  });
});
