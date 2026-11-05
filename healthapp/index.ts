import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryParams = req.query;

  if (isNotNumber(queryParams.height) || isNotNumber(queryParams.weight) || !queryParams.height || !queryParams.weight) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  const result = calculateBmi(Number(queryParams.height), Number(queryParams.weight));

  res.send({
    weight: Number(queryParams.weight),
    height: Number(queryParams.height),
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters missing"
    });
  }

  if (!Array.isArray(daily_exercises) || isNotNumber(target) || daily_exercises.some((value: number) => isNotNumber(value))) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});