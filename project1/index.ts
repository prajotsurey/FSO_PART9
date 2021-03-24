/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());
app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(isNaN(height)||isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters'});
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi
  });
});

app.get('/calculator', (req,res) => {
  const body = req.body;
  const daily_exercises: Array<number|string> = body.daily_exercises;
  const target: number | string = body.target;
  if(!target || !daily_exercises) {
    res.status(400).json({error: 'parameters missing'});
  } 
  if(isNaN(Number(body.target)) || daily_exercises.filter( (a: number | string) => {
    return isNaN(Number(a));
  }).length != 0 ) {
    res.status(400).json({error: 'malformatted parameters'});
  }
  const result = calculateExercises(body.daily_exercises, body.target);
  res.send(result);
});

const PORT = 3003;
app.listen(PORT, ()=> {
  console.log(`Server running on Port ${PORT}`);
});