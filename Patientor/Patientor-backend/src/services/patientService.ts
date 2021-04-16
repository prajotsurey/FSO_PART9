/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { Patient,NewPatient, PublicPatient,Entry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = ():PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation })=>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (ID:string):Patient|undefined => {
  const patient:Patient|undefined = patients.find(p => p.id === ID);
  return patient;
};

const addPatient = (patient: NewPatient):Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry):Entry => {
  const patient:Patient|undefined = patients.find(p => p.id === id);
  const entryID: string = uuid();
  const newEntry: Entry = { ...entry,id:entryID };
  if(patient){
    patient.entries.push(newEntry);
  }
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry
};