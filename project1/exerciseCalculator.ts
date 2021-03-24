interface resultObject{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgs2 = (args: Array<string>): { dailyHours: Array<number>, target: number} => {
  if(args.length < 4) throw Error('Not enough arguments');
  if(!isNaN(Number(args[2]))  && args.slice(3).filter(a => isNaN(Number(a))).length === 0) {
    return {
      dailyHours: args.slice(3).map(val=> Number(val)),
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const successCalc = (dailyHours: Array<number>, target: number): boolean => {
  const successfulDays = dailyHours.filter(a => a > target);
  return successfulDays.length === dailyHours.length ? true : false;
};

const ratingCalc = (dailyHours: Array<number>, target: number):number => {
  const totalHours = dailyHours.reduce((a,b) => a+b );
  const targetTotal = target * dailyHours.length;
  const rating =  (totalHours/targetTotal)*3;
  return rating<3 ? rating : 3;
};

const descriptionCalc  = (rating: number): string => {
  if( rating < 1 ) {
    return 'bad';
  } else if (rating < 2) {
    return 'not bad';
  } else if (rating < 3) {
    return 'good';
  } else if (rating == 3) {
    return 'great';
  } 
  return 'undefined';

};

export const calculateExercises = (dailyHours: Array<number>, target: number ):resultObject => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter( (a) => a !== 0 ).length;
  const success = successCalc(dailyHours,target);
  const rating = ratingCalc(dailyHours,target);
  const average = dailyHours.reduce((a,b) => a+b )/ periodLength;
  const ratingDescription = descriptionCalc(rating);

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

try{
  const {dailyHours, target} = parseArgs2(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch(e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);
}