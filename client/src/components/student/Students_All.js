import React, {useState, useEffect, useCallback} from 'react'
import {fetchStudents} from '../../api/student'

import Student from './Student'
import StudentForm from './Form'


function Students_All() {
    const getStudents = useCallback(async() =>{
        setLoading(true)
        const students = await fetchStudents();
        console.log(students.data)
        setStudents(students.data)
        setLoading(false)
    }, [])

    const [isLoading, setLoading] = useState(true)
    const [students, setStudents] = useState([])
    
    useEffect(() =>{
        getStudents()
    }, [getStudents])

    if(isLoading) {
        return(
        <div>
            Pending...
        </div>)
    }

    return (
    <div>
        <StudentForm/>
        {students.map(student => <Student key={student._id} name={student.name}/>)}
    </div>
  )
}

export default Students_All