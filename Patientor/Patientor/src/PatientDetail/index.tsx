import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { EntryFormValues, Gender, Patient, Entry } from "../types";
import axios from "axios";
import { useStateValue, updatePatient, addEntry } from '../state';
import { Header, Icon, Button } from 'semantic-ui-react';
import PatientEntries from './PatientEntries';
import AddEntryModal from '../AddEntryModal';

const GenderIcon = ({gender}:{gender: Gender}) => {
  if(gender==='Male'){
    return(
      <Icon name='mars' />
    );
  } else if(gender==='Female'){
    return(
      <Icon name='venus' />
    );
  } else{
    return(
      <Icon name='genderless' />
    );
  }
};

const PatientDetail = () => {
  const [{patients}, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatientDetails = async (id:string) => {
      if(!(id in patients)){
        try{
          const { data: FetchedPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(FetchedPatient));
          setPatient(FetchedPatient);
        } catch(e) {
          console.log(e);
        }
      } else {
        setPatient(patients[id]);
      }

    };
    void fetchPatientDetails(id);
  },[]);
  
  const submitNewEntry = async (values:EntryFormValues) => {
    if(patient){
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(newEntry,patient.id));
        closeModal();
      } catch (e) {
        console.log(e.response.data);
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response.data || 'Unknown error');
      }
    } else {
      setError('Patient does not exist');
    }
  };

  if(patient){
    return(
      <div className="App">
        <Header as="h1">
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </Header>
        <div>SSN: {patient.ssn}</div>
        <div>Date of Birth: {patient.dateOfBirth}</div>
        <div>Occupation: {patient.occupation}</div>
        <PatientEntries entries={patient.entries} />
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
  } else {
    return(
      <div>
      </div>
    );
  }
};

export default PatientDetail;