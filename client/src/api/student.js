import axios from 'axios';

const url = 'http://localhost:5000/';

export async function fetchStudents() {
    return axios.get(url);
}

export async function addStudent(newStudent) {
    axios.post(url, newStudent)
    .then(response => {console.log(response)})
    .catch((error) => {console.log(error)});
}