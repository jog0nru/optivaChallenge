jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    label: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  createLogger: jest.fn(),
  transports: {
    Console: jest.fn(),
  },
}));

winston = require('winston');

describe('Logger service', () => {
  test('testing create logger has been called', () => {
    const mockCreateLogger = jest.spyOn(winston, 'createLogger');
    require('../../../../infrastructure/logging/winston-logger');
    expect(mockCreateLogger).toHaveBeenCalledTimes(1);
  });
});
