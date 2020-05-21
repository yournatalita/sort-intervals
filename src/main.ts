import { initProgram, getProcessArgs } from './helpers/getProcessArgs';
import { getErrorMessage } from './static/errorMessages';

import { TIntervals } from './main.d';

/**
 * Преобразует строку-интервал в массив из двух валидных целых значений
 * @param value - интервал
 * @return {number[] | null} - массив из валидных целых значений или null
 */
const parseStringValues = (value: string): number[] | null => {
  const splitValue = value.match(/^(([-]?\d+)-([-]?\d+))$/);

  return splitValue && splitValue[2] && splitValue[3]
    ? [Number(splitValue[2]), Number(splitValue[3])]
    : null;
};

/**
 * Проверяет валидность интервала
 * @param value - интервал
 * @param intervals - массив интервалов
 * @return {boolean} - статус валидности интервала
 */
const isValid = (
  value: string,
  intervals: TIntervals,
): { valid: boolean; error: string } => {
  if (typeof value !== 'string') {
    return {
      valid: false,
      error: getErrorMessage.notString(intervals.indexOf(value)),
    };
  }

  const pair = parseStringValues(value);

  if (!pair || (!pair[0] && pair[0] !== 0) || (!pair[1] && pair[1] !== 0)) {
    return {
      valid: false,
      error: getErrorMessage.invalidBoundaries(value),
    };
  }

  if (pair[0] > pair[1]) {
    return {
      valid: false,
      error: getErrorMessage.invalidBoundariesSizes(value),
    };
  }

  return {
    valid: true,
    error: '',
  };
};

/**
 * Соединяет пересекающиеся интервалы
 * @param sorted - сортированый массив
 * @return {TIntervals} - отсортированные и объединённые интервалы
 */
const mergeIntervals = (sorted: TIntervals): TIntervals => {
  // индекс последнего преобразованного значения
  let lastMergedIndex = 0;
  // по умолчанию первый элемент нового массива - первый сортированного
  const mergedArray = [sorted[lastMergedIndex]];

  sorted.forEach((interval) => {
    const [start, end] = parseStringValues(interval);
    const [mergedStart, mergedEnd] = parseStringValues(
      mergedArray[lastMergedIndex],
    );

    // если интервалы пересекаются, то соединяем их
    if (mergedEnd >= start) {
      mergedArray[lastMergedIndex] = `${Math.min(
        mergedStart,
        start,
      )}-${Math.max(mergedEnd, end)}`;
    } else {
      // иначе записываем новый интевал
      lastMergedIndex++;
      mergedArray[lastMergedIndex] = interval;
    }
  });

  return mergedArray;
};

/**
 * Сортирует интервалы по стартовому значению в порядке возрастания
 * @param intervals - массив интервалов
 * @return {TIntervals} - массив отсортированных интервалов
 */
const sortIntervals = (intervals: TIntervals): TIntervals => {
  // sort не вызывает коллбек-функцию для массивов с 1 элементом,
  // проверяем валидность тут
  // можно не сортировать
  if (intervals.length === 1) {
    const validated = isValid(intervals[0], intervals);

    if (validated.valid) {
      return intervals;
    } else {
      throw new TypeError(validated.error);
    }
  }

  return intervals.sort((first, second) => {
    const firstValidated = isValid(first, intervals);
    const secondValidated = isValid(second, intervals);

    if (firstValidated.valid && secondValidated.valid) {
      const [startFirst] = parseStringValues(first);
      const [startSecond] = parseStringValues(second);

      if (startFirst > startSecond) return 1;
      if (startFirst < startSecond) return -1;

      return 0;
    }

    throw new TypeError(firstValidated.error || secondValidated.error);
  });
};

/**
 * Сортирует и соединяет интервалы
 * @param intervals - массив интервалов
 * @return {TIntervals} - массив интервалов, соединённых и отсортированных
 * @throws TypeError
 */
const sortAndMergeIntervals = (intervals: TIntervals): TIntervals => {
  if (!intervals || !(intervals instanceof Array)) {
    throw new TypeError(getErrorMessage.notArray());
  } else if (intervals.length < 1) {
    throw new TypeError(getErrorMessage.arrayLength());
  }

  const sorted = sortIntervals(intervals);

  return mergeIntervals(sorted);
};

/**
 * Основная функция, получает на вход любое значение
 * @param inputValue - любое значение на вход
 * @return {string[]} - Массив интервалов
 */
const main = (inputValue: any): TIntervals => {
  const result = sortAndMergeIntervals(inputValue);

  console.log('RESULT =', result);
  return result;
};

initProgram();

const DEFAULT_ARR = ['1-3', '5-7', '2-4', '8-12', '5-11'];
main(getProcessArgs() || DEFAULT_ARR);

export { main };
