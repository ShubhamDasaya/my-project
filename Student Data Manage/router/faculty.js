const ex = require('express');
const Faculty = require('../modules/facultyData');
const Student = require('../modules/studentsData')
const router = ex.Router();

// Route to get Faculty page
router.get('/',async (req, res) => {
  try{
    const faculties = await Faculty.find()
    // res.send('<h1> This is Admin faculty data page </h1>')
      res.render('faculty/faculty',{faculties});
  }catch(err){
    console.error('Error fetching student data:', err)
        res.status(500).send('Error fetching student data')
  }
   
});
router.post("/student/add",async (req,res)=>{
  try{
    const newStudent = new Student({
        name: req.body.name,
            age: req.body.age,
            stream: req.body.stream,
            sem: req.body.sem,
            codingLevel: req.body.codingLevel,
    })
    res.redirect('/faculty/student')
     await newStudent.save();
  }catch(err){
    console.error('Error adding student:', err);
    res.status(500).json({ message: 'Error adding student', error: err.message });
  } 
})
router.get('/student/add', (req, res) => {
    res.render('faculty/add');
});
router.get('/student', async (req,res)=>{
    try{
        const students = await Student.find();
        res.render("faculty/student",{students})

    }catch(err){
        console.error("Student not Found",err);
        res.status(500).send('Studnet not found ')
    }
})
router.get('/student/update/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('faculty/update', { student });
    } catch (err) {
        console.error('Error fetching student for update:', err);
        res.status(500).send('Error fetching student for update');
    }
});
router.post('/student/update/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const students = await Student.findByIdAndUpdate(
            studentId,
            {
                name: req.body.name,
                age: req.body.age,
                stream: req.body.stream,
                sem: req.body.sem,
                codingLevel: req.body.codingLevel,
            },
            { new: true }
        );

        if (!students) {
            return res.status(404).send('Student not found');
        }

      res.redirect('/faculty/student')
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Error updating student');
    }
});

router.post("/student/delete/:id",async(req,res)=>{
    try {
            const studentId = req.params.id;
            await Student.findByIdAndDelete(studentId);
            res.redirect('/faculty/student');
        } catch (err) {
            console.error('Error deleting student:', err);
            res.status(500).send('Error deleting student');
        }
})

module.exports = router;