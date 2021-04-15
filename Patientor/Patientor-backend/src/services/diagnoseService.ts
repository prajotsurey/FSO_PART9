import { Diagnosis } from '../types';
import Diagnoses from '../../data/diagnoses';

const getDiagnoses =  ():Diagnosis[] => {
  return Diagnoses;
};

export default {
  getDiagnoses
};