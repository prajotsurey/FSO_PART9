import React from 'react';
import { ErrorMessage, FieldProps, Field, FormikProps } from 'formik';
import { Form, Dropdown, DropdownProps } from "semantic-ui-react";
import { Type, Diagnosis } from "../types";

export type TypeOption = {
  value: Type;
  label: string;
};

interface SelectFieldProps {
  name: string;
  label: string;
  options: TypeOption[];
  changeType: (type:Type)=>void
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
}

export const SelectField = ({
  name,
  label,
  options,
  changeType,
  setFieldValue,
}: SelectFieldProps) => {  

  const onChange = (
    event: React.FormEvent<HTMLInputElement>,
    data: Type
  ) => {
    if(event.currentTarget){
      changeType(event.currentTarget.value as Type);
      setFieldValue(name, data);
    }
  };

  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown" onChange={onChange} >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField= ({
  field,
  label,
  placeholder
}: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max } : NumberProps ) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);


export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

const SickLeaveFields = () => {
  return(
    <>
      <Field
      component={TextField}
      label="Sick Leave Start Date"
      name="sickLeave.StartDate"
      placeholder="YYYY-MM-DD"
      />
    <Field
      component={TextField}
      label="Sick Leave End Date"
      name="sickLeaveEndDate"
      placeholder="YYYY-MM-DD"
    />
    </>
  );
};

const DischargeFields = () => {
  return(
    <>
      <Field
        component={TextField}
        label="Discharge Date"
        name="dischargeDate"
        placeholder="YYYY-MM-DD"
      />
      <Field
        component={TextField}
        label="Discharge Criteria"
        name="dischargeCriteria"
        placeholder="Criteria"
      />
    </>
  );
};

export const TypeFields = ({type}:{type:Type}) => {
  if(type === Type.OccupationalHealthCare){
    return(
      <>
      <Field
      component={TextField}
      label="Employer"
      name="employer"
      placeholder="Employer"
      />
      <SickLeaveFields/>
      </>
    );
  } else if(type === Type.HealthCheck){
    return(
      <Field
        name="healthCheckRating"
        component={NumberField}
        label='Health Check Rating'
        min='0'
        max='3'
      />
    );
  } else{
    return(    
      <DischargeFields/>
    );
  }
};