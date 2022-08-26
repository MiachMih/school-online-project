const Student = require('../models/student')

exports.getStudents = (req,res, next) => {
        Student.find({})
        .then( (students) => {
            res.json(students)
        })
        .catch( (err) => {
            console.log(err)
        })
}

exports.postStudent = (req, res, next) => {
    console.log(req.body)
    const student = new Student({name: req.body.name});
    student.save()
    .then( () => {
        console.log('Student added to database');
    })
    .catch( (err) => {
        console.log(err);
    })
}