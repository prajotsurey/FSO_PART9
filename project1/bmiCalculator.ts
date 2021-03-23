const parseArgs = (args: Array<string>): { height: number, weight: number} => {
  if(args.length < 4) throw Error('Not enough arguments');
  if(args.length > 4) throw Error('Too many arguments');
  if(!isNaN(Number(args[2]))  && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const BMI = (weight / ((height/100)^2))
  if(BMI < 15){
    return 'Very severely underweight'
  } else if (BMI < 16) {
    return 'Severely underweight'
  } else if (BMI < 18.5) {
    return 'Underweight'
  } else if (BMI < 25) {
    return 'Normal (healthy weight)'
  } else if (BMI < 30) {
    return 'Overweight'
  } else if (BMI < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (BMI < 40) {
    return 'Obese Class II (Severely obese)'
  } else {
    return 'Obese Class III (Very severely obese)'
  }
}

try{
  const {height, weight} = parseArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch(e) {
  console.log(e.message)
}