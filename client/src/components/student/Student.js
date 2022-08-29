import React, {useState} from 'react'

function Student(props) {
  const [isShow, setShow] = useState(false);
  return (
    <>
        <h1>Student name: {props.name}</h1>
        
    </>
  )
}

export default Student