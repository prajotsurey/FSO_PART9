import React from 'react';
import { Entry } from '../types';
import { Header } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

const PatientEntries = ({entries}:{entries:Entry[] }) => {
  return(
    <div>
      <Header as='h3'>
        entries
      </Header>
        {entries.map((entry:Entry) => {
          return(
            <div key={entry.id}>
              <EntryDetails entry={entry}/> 
              <br/>
            </div>
            );
          }
        )}
    </div>
  );
};

export default PatientEntries;