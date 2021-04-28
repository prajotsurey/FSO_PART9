import React, { useState } from 'react';
import { EntryFormValues, Type } from '../types';
import { useStateValue } from '../state';
import HospitalEntryForm from './HospitalEntryform';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthCareEntryForm from './OccupationalHealthCareEntryForm';

interface Props {
  onCancel : () => void,
  onSubmit : (values: EntryFormValues) => void
}

const AddEntryForm = ({onSubmit, onCancel}:Props) => {
  const [{diagnoses}] = useStateValue();
  const [type, setType] = useState<Type>(Type.Hospital);

  const changeType = (type:Type) => {
    setType(type);
  };

  switch(type){
    case Type.Hospital:
      return(
        <HospitalEntryForm changeType={changeType} diagnoses={diagnoses} onCancel={onCancel} onSubmit={onSubmit}/>
      );
    case Type.HealthCheck:
      return(
        <HealthCheckEntryForm changeType={changeType} diagnoses={diagnoses} onCancel={onCancel} onSubmit={onSubmit}/>
      );
    case Type.OccupationalHealthCare:
      return(
        <OccupationalHealthCareEntryForm changeType={changeType} diagnoses={diagnoses} onCancel={onCancel} onSubmit={onSubmit}/>
      );
    default:
      return(
        <div>

        </div>
      );
  }
};

export default AddEntryForm;