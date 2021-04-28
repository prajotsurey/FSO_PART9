import React from 'react';
import { OccupationalHealthCareEntry as OccupationalHealthcare } from "../types";
import { Card, Icon } from 'semantic-ui-react';
import DiagnosisCodes from './DiagnosisCodes';

const OccupationalHealthCareEntry = ({entry}:{entry: OccupationalHealthcare}) => {
  return(
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon size='large' name='user md'/>
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

export default OccupationalHealthCareEntry;