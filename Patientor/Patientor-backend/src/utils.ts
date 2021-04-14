import { NewPatient, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing Occupation');
  }
  return occupation;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing Gender');
  }

  return gender;
};

const isEntry = (entry:unknown): entry is Entry[] => {
  return Array.isArray(entry);
};

const parseEntries = (entry: unknown): Entry[] => {
  if(!entry || !isEntry(entry)){
    throw new Error('Incorrect or missing Entry');
  }
  return entry;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entry: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entry }:Fields):NewPatient => {  
  const newPatient: NewPatient ={
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entry),
  };

  return newPatient;
};

export default toNewPatient;