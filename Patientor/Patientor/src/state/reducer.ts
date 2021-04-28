import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: {entry: Entry, id: string};
  };

export const setPatientList = (patientListFromApi:Patient[]):Action => {
  return{
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (NewPatient:Patient):Action => {
  return{
    type: "ADD_PATIENT",
    payload: NewPatient
  };
};

export const updatePatient = (FetchedPatient:Patient):Action => {
  return{
    type: "UPDATE_PATIENT",
    payload: FetchedPatient
  };
};

export const setDiagnoses = (FetchedDiagnoses:Diagnosis[]):Action => {
  return{
    type: "SET_DIAGNOSES",
    payload: FetchedDiagnoses
  };
};

export const addEntry = (entry:Entry, id:string):Action => {
  return{
    type: "ADD_ENTRY",
    payload: {
      entry,
      id
    }
  };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const updatePatient = state.patients[action.payload.id];
      updatePatient.entries = [...updatePatient.entries, action.payload.entry];
      return {
        ...state,
        patients: {
          ...state.patients,
          [updatePatient.id]: updatePatient
        }
      };
    default:
      return state;
  }
};
