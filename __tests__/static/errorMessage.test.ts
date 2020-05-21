import { getErrorMessage } from '../../src/static/errorMessages';

describe('test getErrorMessage', () => {
  test('input value correct', () => {
    const value = '1-1';
    expect(getErrorMessage.notArray()).toStrictEqual(
      'Intervals is not an array',
    );
    expect(getErrorMessage.arrayLength()).toStrictEqual(
      'Array must contain at least 1 interval',
    );
    expect(getErrorMessage.notString(1)).toStrictEqual(
      `Interval[1] is not a string`,
    );
    expect(getErrorMessage.invalidBoundaries(value)).toStrictEqual(
      `Interval "${value}" is incorrect: boundaries are not valid integer numbers`,
    );
    expect(getErrorMessage.invalidBoundariesSizes(value)).toStrictEqual(
      `Interval "${value}" is incorrect: start value cannot be larger than end value`,
    );
  });
});
