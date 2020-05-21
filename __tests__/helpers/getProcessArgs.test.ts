import { commaSeparatedList } from '../../src/helpers/getProcessArgs';

describe('test getProcessArgs', () => {
  test('input commaSeparatedList', () => {
    expect(commaSeparatedList('12,12,12')).toStrictEqual(['12', '12', '12']);
    expect(commaSeparatedList('12')).toStrictEqual(['12']);
    expect(commaSeparatedList('aas-a,,')).toStrictEqual(['aas-a', '', '']);
  });
});
