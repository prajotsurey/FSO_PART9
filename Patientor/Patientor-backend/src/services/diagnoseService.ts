import { Diagnose } from '../types';
import Diagnoses from '../../data/diagnoses';

const getDiagnoses =  ():Diagnose[] => {
  return Diagnoses;
};

export default {
  getDiagnoses
};