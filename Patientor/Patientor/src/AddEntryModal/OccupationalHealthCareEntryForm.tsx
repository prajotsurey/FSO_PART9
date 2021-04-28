import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { Diagnosis,OccupationalHealthCareEntry, Type } from '../types';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { TypeOption, SelectField } from './FormField';
import * as Yup from 'yup';

const schema = Yup.object({
  type: Yup.string().required(),
  description: Yup.string().required(),
  specialist: Yup.string().required(),
  date: Yup.string().required(),
  diagnosisCodes: Yup.array(),
  employerName: Yup.string().required('Employer Name Required'),
  sickLeave: Yup.object().required().shape({
    startDate: Yup.string().required(),
    endDate: Yup.string().required()
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
  onSubmit : (values: Omit<OccupationalHealthCareEntry, 'id'>) => void,
  diagnoses: { 
    [code:string] : Diagnosis},
}

const OccupationalHealthCareEntryForm = ({changeType, diagnoses,onSubmit,onCancel}:Props) => {
  return(
    <Formik
      initialValues={{
        type:"OccupationalHealthCare",
        description:"",
        specialist:"",
        date:"",
        diagnosisCodes:[],
        employerName:"",
        sickLeave:{
          startDate: "",
          endDate: ""
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
              name='employerName'
              label="Employer Name"
              placeholder=""
              component={TextField}
            />

            <Field
              name='sickLeave.startDate'
              label="Start Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />

            <Field
              name="['sickLeave.endDate']"
              label="End Date"
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

export default OccupationalHealthCareEntryForm;