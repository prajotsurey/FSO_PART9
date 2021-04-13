import React from 'react'
import Part from './part'
import { CoursePart } from '../type';

const Content = ({courseParts}:{courseParts:CoursePart[]}) => {
  console.log(courseParts)
  return(
    <div>
      {
        courseParts.map(c=> (
          <div key={c.name}>
            <Part coursePart={c} />
            <br/>
          </div>
        ) )
      }
    </div>
  )
}

export default Content