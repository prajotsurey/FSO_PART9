import { Discharge, Diagnosis, NewEntry, Type, HealthCheckRating, SickLeave, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDescription = (description: unknown): string =>{
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) ||!isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const isType = (type: any): type is Type => {
  return Object.values(Type).includes(type);
};

const parseType = (type: unknown):Type  => {
  if(!type || !isType(type)){
    throw new Error('Incorrect or missing Type');
  }
  return type;
};

const isCodes = (codes: any[] ): codes is Array<Diagnosis['code']> => {
  return typeof codes[0] === 'string';
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']>=> {
  if(!Array.isArray(codes)|| !isCodes(codes)){
    throw new Error('Incorrect Diagnosis Codes');
  }
  return codes;
};

const isRating = (rating: any):rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown):HealthCheckRating => {
  if(!rating || !isRating(rating)){
    throw new Error("Incorrect or missing health check rating");
  }
  
  return rating;
};

const parseEmployerName = (name: unknown):string => {
  if(!name || !isString(name)){
    throw new Error("Incorrect or missing employer name");
  }

  return name;
};

const isSickLeave = (leave: any):leave is SickLeave => {
  if('startDate' in leave && 'endDate' in leave){
    if(leave.startDate&&leave.endDate&&isString(leave.startDate)&&isString(leave.endDate)){
      return true;
    }
  }

  return false;
};

const parseSickLeave = (leave: unknown):SickLeave => {
  if(!leave || !isSickLeave(leave)){
  throw new Error("Incorrect or missing sickleave");
 }

 return leave;
};

const isDischarge = (discharge:any):discharge is Discharge => {
  if('date' in discharge && 'criteria' in discharge && isString(discharge.date) && isString(discharge.criteria)){
    return true;
  }

  return false;
};

const parseDischarge = (discharge: unknown):Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error("Incorrect or missing discharge");
  }
  
  return discharge; 
};

type ToHealthCheckEntryFields = {
  entryType:Type.HealthCheck,
  entryDescription:string,
  entryDate:string,
  entrySpecialist:string,
  diagnosisCodes?:unknown,
  healthCheckRating:unknown,
};

const toHealthCheckEntry = ({
  entryType,
  entryDescription,
  entryDate,
  entrySpecialist,
  diagnosisCodes,
  healthCheckRating
}:ToHealthCheckEntryFields):Omit<HealthCheckEntry, 'id'> => {

  const entryObject: Omit<HealthCheckEntry, 'id'> = {
    type:entryType,
    description:entryDescription,
    date:entryDate,
    specialist:entrySpecialist,
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };

  if(!diagnosisCodes) {
    return entryObject;
  } else {
    const codes = parseDiagnosisCodes(diagnosisCodes);
    entryObject.diagnosisCodes = codes;
    return entryObject;
  }

};

type ToOccupationalHealthCareEntryFields = {
  entryType:Type.OccupationalHealthcare,
  entryDescription:string,
  entryDate:string,
  entrySpecialist:string,
  diagnosisCodes?:unknown,
  employerName: unknown,
  sickLeave?: unknown,
};

const toOccupationalHealthCareEntry = ({
  entryType,
  entryDescription,
  entryDate,
  entrySpecialist,
  diagnosisCodes,
  employerName,
  sickLeave,
}:ToOccupationalHealthCareEntryFields) => {
  const entryObject: Omit<OccupationalHealthCareEntry, 'id'> = {
    type: entryType,
    description: entryDescription,
    date: entryDate,
    specialist: entrySpecialist,
    employerName: parseEmployerName(employerName)
  };
    if(sickLeave){
      entryObject.sickLeave = parseSickLeave(sickLeave);
    }
    if(diagnosisCodes){
      entryObject.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
    }

  return entryObject;
};

type ToHospitalEntryFields = {
  entryType:Type.Hospital,
  entryDescription:string,
  entryDate:string,
  entrySpecialist:string,
  diagnosisCodes?:unknown,
  discharge: unknown,
};

const toHospitalEntry = ({
  entryType,
  entryDescription,
  entryDate,
  entrySpecialist,
  diagnosisCodes,
  discharge,
}:ToHospitalEntryFields) => {
  const entryObject: Omit<HospitalEntry, 'id'> = {
    type: entryType,
    description: entryDescription,
    date: entryDate,
    specialist: entrySpecialist,
    discharge: parseDischarge(discharge)
  };

  if(diagnosisCodes){
      entryObject.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
    }
  
  return entryObject;
};

type Fields = {
  type: unknown, 
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes? : unknown,
  healthCheckRating? :unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  discharge?:unknown
 };

const toNewEntry = ({
  type, 
  description, 
  date, 
  specialist,
  healthCheckRating,
  diagnosisCodes,
  employerName,
  sickLeave,
  discharge,
}:Fields):NewEntry => {
  const entryType = parseType(type);
  const entryDescription = parseDescription(description);
  const entryDate = parseDate(date);
  const entrySpecialist = parseSpecialist(specialist);

  switch(entryType){
    case Type.HealthCheck:
      return toHealthCheckEntry({ entryType, entryDescription, entryDate, entrySpecialist, diagnosisCodes, healthCheckRating });
    case Type.OccupationalHealthcare:
      return toOccupationalHealthCareEntry({ entryType, entryDescription, entryDate, entrySpecialist, employerName, diagnosisCodes, sickLeave });
    case Type.Hospital:
      return toHospitalEntry({ entryType, entryDescription, entryDate, entrySpecialist, diagnosisCodes, discharge});
  }
};

export default toNewEntry;