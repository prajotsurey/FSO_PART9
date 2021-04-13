import React from 'react'
import { CoursePart } from '../type';

const PartTitle = ({coursePart}:{coursePart: CoursePart}) => {
  return(
    <div>
      <b><em>{coursePart.name} {coursePart.exerciseCount}</em></b>
    </div>
  )
}

const Part = ({coursePart}:{coursePart: CoursePart}) => {
  switch(coursePart.type) {
    case "normal":
      return(
        <div>
          <PartTitle coursePart={coursePart}/>
          <em>{coursePart.description}</em>
        </div>
      )
      break;
    case "groupProject":
      return(
        <div>
          <PartTitle coursePart={coursePart}/>
          project exercise count {coursePart.groupProjectCount}
        </div>
      )
      break;
    case "submission":
      return(
        <div>
          <PartTitle coursePart={coursePart}/>
          <em>{coursePart.description}</em>
          submit to <em>{coursePart.exerciseSubmissionLink}</em>
        </div>
      )
      break;
    case "special":
        return(
          <div>
            <PartTitle coursePart={coursePart}/>
            <em>{coursePart.description}</em>
            required skills: {coursePart.requirements.join()}
          </div>
        )
  }
}

export default Part