const express = require('express')
const app = express()
const PORT = 8008

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware to count the number of incoming requests and their type
let getCount = 0
let postCount = 0
let putCount = 0
let deleteCount = 0
app.use((req, res, next) => {
  if (req.method === 'GET') {
    console.log(`Request count: ${++getCount} and Method type: ${req.method}`)
  }
  if (req.method === 'POST') {
    console.log(`Request count: ${++postCount} and Method type: ${req.method}`)
  }
  if (req.method === 'PUT') {
    console.log(`Request count: ${++putCount} and Method type: ${req.method}`)
  }
  if (req.method === 'DELETE') {
    console.log(`Request count: ${++deleteCount} and Method type: ${req.method}`)
  }
  next()
})

// Creating a students array to hold all of the student objects
const students = [
  {
    id: 1,
    name: 'Moneer',
    section: 'RGFSBC2023',
    gpa: 2.5,
    nationality: 'Yemeni / Canadian'
  }
]

// retrieving (getting --GET method) all the students
app.get('/students', (req, res) => {
  if (students.length === 0) {
    res.status(404).send('No students on the API')
  } else {
    res.status(200).send(students)
  }
})

// Adding (creating --POST method) a student to the array
app.post('/students/add_student', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    section: req.body.section,
    gpa: parseFloat(req.body.gpa),
    nationality: req.body.nationality
  }

  students.push(newStudent)
  res.status(200).send(newStudent)
})

// retrieving (getting --GET method) a specific student using their ID
app.get('/students/:student_id', (req, res) => {
  const student = students.find(person => {
    if (person.id === parseInt(req.params.student_id)) {
      return true
    }
  })
  if (!student) {
    return res.status(404).send('No student found, please enter a valid ID')
  } else {
    return res.status(200).send(student)
  }
})

// Updating (updating --PUT method) an existing student on the array
app.put('/students/update_student/:student_id', (req, res) => {
  const student = students.find(person => {
    if (person.id === parseInt(req.params.student_id)) {
      return true
    }
  })
  if (!student) {
    return res.status(404).send('No student found, please enter a valid ID')
  } else {
    const updatedStudent = {
      id: student.id,
      name: req.body.name,
      section: req.body.section,
      gpa: parseFloat(req.body.gpa),
      nationality: req.body.nationality
    }
    const index = students.indexOf(student)
    students[index] = updatedStudent
    return res.status(200).send(updatedStudent)
  }
})

// Deleting (deleting / destroying --DELETE method) an existing student on the array
app.delete('/students/delete_student/:student_id', (req, res) => {
  const student = students.find(person => {
    if (person.id === parseInt(req.params.student_id)) {
      return true
    }
  })
  if (!student) {
    return res.status(404).send('No student found, please enter a valid ID')
  } else {
    const index = students.indexOf(student)
    students.splice(index, 1)
    return res.status(200).send(student)
  }
})

app.listen(PORT, console.log(`server is running on port ${PORT}`))
