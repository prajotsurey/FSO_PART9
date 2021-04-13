import React from 'react'

interface coursePart {
  name: string,
  exerciseCount: number
}

const Content = ({courseParts}:{courseParts: coursePart[]}) => {
  console.log(courseParts)
  return(
    <div>
      {
        courseParts.map(c=> (
          <p key={c.name}>
            {c.name} {c.exerciseCount}
          </p>
        ) )
      }
    </div>
  )
}

export default Content