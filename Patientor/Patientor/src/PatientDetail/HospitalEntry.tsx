import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import DiagnosisCodes from './DiagnosisCodes';
import { HospitalEntry as Hospital} from '../types';

const HospitalEntry = ({entry}:{entry: Hospital}) => {
  return(
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon size='large' name='hospital'/>
        </Card.Header>
        <Card.Meta>
          <em>{entry.description}</em>
        </Card.Meta>
        <Card.Description>
          <DiagnosisCodes codes={entry.diagnosisCodes}/>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;