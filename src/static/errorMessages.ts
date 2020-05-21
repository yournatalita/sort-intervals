export const getErrorMessage = {
  notArray: (): string => 'Intervals is not an array',
  arrayLength: (): string => 'Array must contain at least 1 interval',
  notString: (value: number): string => `Interval[${value}] is not a string`,
  invalidBoundaries: (value: string): string =>
    `Interval "${value}" is incorrect: boundaries are not valid integer numbers`,
  invalidBoundariesSizes: (value: string): string =>
    `Interval "${value}" is incorrect: start value cannot be larger than end value`,
};
