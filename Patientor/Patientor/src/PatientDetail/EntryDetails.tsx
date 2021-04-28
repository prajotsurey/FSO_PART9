import React from 'react';
import { Entry } from '../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckUpEntry';
import OccupationalHealthCareEntry from './OccupationalHealthCareEntry';

const EntryDetails = ({entry}:{entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthCare":
      return <OccupationalHealthCareEntry entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;