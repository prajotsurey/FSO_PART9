import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { Diagnosis,  HospitalEntry, Type } from '../types';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';

import { TypeOption, SelectField } from './FormField';
import * as Yup from 'yup';

const schema = Yup.object({
  type: Yup.string().required(),
  description: Yup.string().required(),
  specialist: Yup.string().required(),
  date: Yup.string().required(),
  diagnosisCodes: Yup.array(),
  discharge: Yup.object().shape({
    date: Yup.string().required('Discharge date is required'),
    criteria: Yup.string().required('Discharge criteria is required')
  })
});


const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label:"Hospital"},
  { value: Type.OccupationalHealthCare, label:"Occupational Health Care"},
  { value: Type.HealthCheck, label:"Health Check"},
];

interface Props {
  changeType: (type: Type) => void,
  onCancel : () => void,
  onSubmit : (values: Omit<HospitalEntry, 'id'>) => void,
  diagnoses: { 
    [code:string] : Diagnosis},
}




const HospitalEntryForm = ({changeType, diagnoses,onSubmit,onCancel}:Props) => {
  return(
    <Formik
      initialValues={{
        type:"Hospital",
        description:"",
        specialist:"",
        date:"",
        diagnosisCodes:[],
        discharge:{
          date:"",
          criteria:""
        }
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
              name='discharge.date'
              label="Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />
            
            <Field
              name='discharge.criteria'
              label="Criteria"
              placeholder="YYYY-MM-DD"
              component={TextField}
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

export default HospitalEntryForm;