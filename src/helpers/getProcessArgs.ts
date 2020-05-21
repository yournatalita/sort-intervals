import { program } from 'commander';

const commaSeparatedList = (value: string): string[] => {
  return value.toString().split(',');
};

const initProgram = (): void => {
  program
    .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
    .allowUnknownOption();

  program.parse(process.argv);
};

const getProcessArgs = (): string => {
  return program.list !== undefined ? program.list : '';
};

export { initProgram, getProcessArgs, commaSeparatedList };
