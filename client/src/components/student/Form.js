import React, {useState} from 'react'
import {addStudent} from '../../api/student'

function Form() {

    function insertStudent(e) {
        e.preventDefault()
        const student = {name: name}
        addStudent(student)
    }

    const [name, setName] = useState('')

  return (
    <form onSubmit={insertStudent}>
        <input type='text' value={name} onChange={(e) => {
            setName(e.target.value)
        }}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Form