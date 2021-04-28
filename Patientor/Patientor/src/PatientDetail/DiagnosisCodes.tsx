import React from 'react';
import { Diagnosis } from '../types';
import { useStateValue } from '../state';
interface codeProps {
  codes: Array<Diagnosis['code']> | undefined;
}


const DiagnosisCodes = ({codes}: codeProps) => {
  const [{diagnoses}] = useStateValue();
  return(
    <ul>
      {
      Object.keys(diagnoses).length != 0
      ?<> 
        {
          codes?.map((code:Diagnosis['code'])=>{
            return(
              <li key={code}>
                {code} {diagnoses[code].name}
              </li>
            );
          })
        }
      </>
      :<> s</>
      }
    </ul>
  );
};


export default DiagnosisCodes;