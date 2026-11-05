import { isNotNumber } from './utils.ts';

interface exValues {
  input: Array<number>;
  target: number;
};

const parseArguments = (args: string[]): exValues => {
  let isAnyNotNumber = false;
  args.forEach((value, index) => {
    if (index >= 2) {
      if (isNotNumber(value)) {
        isAnyNotNumber = true;
      }
    }
  });

  const targetPart = Number(args[2]);
  const output : Array<number> = [];
  args.forEach((value, index) => {
    if (index > 2) {
      output.push(Number(value));
    }
  });

  if (!isAnyNotNumber) {
    return {
      input: output,
      target: targetPart
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (dailyHours: Array<number>, target: number) => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const average = (dailyHours.reduce((a, b) => a + b, 0) / periodLength);
  let success = false;
  let rating = 1;
  let ratingDescription: string;
  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'Target reached!';
  } else if (average >= target * 0.40) {
    rating = 2;
    ratingDescription = 'Almost had it!';
  } else {
    ratingDescription = 'Come on!';
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


try {
  const { input, target } = parseArguments(process.argv);
  console.log(calculateExercises(input, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};

export default calculateExercises;