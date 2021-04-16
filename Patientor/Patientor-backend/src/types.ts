export interface Diagnosis{
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: Type.Hospital;
  discharge: Discharge;
}

export type Entry = 
| HospitalEntry
| OccupationalHealthCareEntry
| HealthCheckEntry;


export interface Patient{
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export enum Gender{
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum Type{
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthCare",
  HealthCheck = "HealthCheck",
}


export type NewPatient = Omit<Patient, 'id'>;
export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewEntry = 
| Omit<HospitalEntry, 'id'>
| Omit<OccupationalHealthCareEntry, 'id'>
| Omit<HealthCheckEntry, 'id'>;