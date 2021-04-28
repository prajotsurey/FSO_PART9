import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { Diagnosis, HealthCheckEntry, Type } from '../types';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { TypeOption, SelectField } from './FormField';
import * as Yup from 'yup';

const schema = Yup.object({
  type: Yup.string().required(),
  description: Yup.string().required(),
  specialist: Yup.string().required(),
  date: Yup.string().required(),
  diagnosisCodes: Yup.array(),
  healthCheckRating: Yup.number().min(0,'Too low').max(3,'Too high').required('Health Check Rating Required')
});

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label:"Hospital"},
  { value: Type.OccupationalHealthCare, label:"Occupational Health Care"},
  { value: Type.HealthCheck, label:"Health Check"},
];
interface Props {
  changeType: (type: Type) => void,
  onCancel : () => void,
  onSubmit : (values: Omit<HealthCheckEntry, 'id'>) => void,
  diagnoses: { 
    [code:string] : Diagnosis},
}

const HealthCheckEntryForm = ({changeType, diagnoses,onSubmit,onCancel}:Props) => {
  return(
    <Formik
      initialValues={{
        type:"HealthCheck",
        description:"",
        specialist:"",
        date:"",
        diagnosisCodes:[],
        healthCheckRating:0,
      }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return(
          <Form className="form ui">
            
            <SelectField
                name="type"
                label="Type"
                options={typeOptions}
                changeType={changeType}
                setFieldValue={setFieldValue}
            />

            <Field
              name='description'
              label="Description"
              placeholder="Description"
              component={TextField}
            />

            <Field
              name='specialist'
              label="Specialist"
              placeholder="Specialist"
              component={TextField}
            />

            <Field
              name='date'
              label="Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
          );
        }
      }
  </Formik>
  );
};

export default HealthCheckEntryForm;