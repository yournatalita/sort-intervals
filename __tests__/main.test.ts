import { main } from '../src/main';

describe('test main', () => {
  test('input error: not an array', () => {
    expect(() => {
      main(null);
    }).toThrow(TypeError('Intervals is not an array'));

    expect(() => {
      main('string');
    }).toThrow(TypeError('Intervals is not an array'));

    expect(() => {
      main(new Date());
    }).toThrow(TypeError('Intervals is not an array'));
  });

  test('input error: incorrect array', () => {
    expect(() => {
      main([]);
    }).toThrow(TypeError('Array must contain at least 1 interval'));

    expect(() => {
      main(['2-4', '2-5', '4-5', 2]);
    }).toThrow(TypeError('Interval[3] is not a string'));

    expect(() => {
      main(['2-4', {}, '4-5', 2]);
    }).toThrow(TypeError('Interval[1] is not a string'));
  });

  test('input error: wrong interval format', () => {
    expect(() => {
      main(['null']);
    }).toThrow(
      TypeError(
        `Interval "null" is incorrect: boundaries are not valid integer numbers`,
      ),
    );

    expect(() => {
      main(['']);
    }).toThrow( TypeError(
      `Interval "" is incorrect: boundaries are not valid integer numbers`,
    ),);


    const wrongBoundariesArr = [
      'null',
      '1.22-100',
      '502A-100',
      'undefined-12',
      'null-null',
      '10-1000,2',
      '12',
      '5----7',
    ];

    wrongBoundariesArr.forEach((wrongValue) => {
      expect(() => {
        main([wrongValue, '1-1', '2-4', '8-12', '5-11']);
      }).toThrow(
        TypeError(
          `Interval "${wrongValue}" is incorrect: boundaries are not valid integer numbers`,
        ),
      );
    });

    const wrongEndStartIntervals = ['100-1', '-100--200', '0--100', '1-0'];

    wrongEndStartIntervals.forEach((wrongValue) => {
      expect(() => {
        main([wrongValue, '1-1', '2-4', '8-12', '5-11']);
      }).toThrow(
        TypeError(
          `Interval "${wrongValue}" is incorrect: start value cannot be larger than end value`,
        ),
      );
    });
  });

  test('input success variants', () => {
    expect(main(['1-3', '5-7', '2-4', '8-12', '5-11'])).toStrictEqual([
      '1-4',
      '5-12',
    ]);
    expect(main(['1-3'])).toStrictEqual(['1-3']);
    expect(main(['1-3', '1-3', '1-3', '1-3'])).toStrictEqual(['1-3']);
    expect(main(['2-3', '-101-3', '12-16', '8-8'])).toStrictEqual([
      '-101-3',
      '8-8',
      '12-16',
    ]);
    const array = ['-200--30', '-101-3', '-500--12', '8-8'];

    expect(main(array)).toStrictEqual(['-500-3', '8-8']);
    expect(main([...array, ...array, ...array, ...array])).toStrictEqual([
      '-500-3',
      '8-8',
    ]);
  });
});
