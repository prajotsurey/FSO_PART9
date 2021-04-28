import React from 'react';
import { 
  HealthCheckRating as Rating,
  HealthCheckEntry as HealthCheck,
 } from '../types';
import { Icon,Card } from 'semantic-ui-react';
import DiagnosisCodes from './DiagnosisCodes';
const HealthRatingIcon = ({rating}:{rating:Rating}) => {
  switch (rating){
    case 0:
      return(
        <div>
          <Icon name='heart' color='red'/>
        </div>
      );
    case 1:
      return(
        <div>
          <Icon name='heart' color='orange' />
        </div>
      );
    case 2:
      return(
        <div>
          <Icon name='heart' color='yellow' />
        </div>
      );
    case 3:
      return(
        <div>
          <Icon name='heart' color='green' />
        </div>
      );
    default:
      return(
        <div>
        </div>
      );
  }
};

const HealthCheckEntry = ({entry}:{entry: HealthCheck}) => {
  return(
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon size='large' name='stethoscope'/>
        </Card.Header>
        <Card.Meta>
          <em>{entry.description}</em>
        </Card.Meta>
        <Card.Description>
          <DiagnosisCodes codes={entry.diagnosisCodes}/>
        </Card.Description>
        <Card.Description>
          <HealthRatingIcon rating={entry.healthCheckRating} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;