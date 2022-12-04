const morgan = require('morgan');
const container = require('../../../../container');

jest.mock('morgan');

describe('morgan logger', () => {
  it('should configure morgan as expected', () => {
    // eslint-disable-next-line no-unused-vars
    const metricsLogger = container.resolve('metricsLogger');
    expect(morgan).toHaveBeenCalledTimes(1);
  });
});
