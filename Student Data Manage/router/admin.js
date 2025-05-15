const express = require('express');
const Faculty = require('../modules/facultyData.js');
const Student = require('../modules/studentsData.js');
const router = express.Router();

// Render the admin page
router.get('/', (req, res) => {
    res.render('admin/admin');
});

// Render the student list page
router.get('/student', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        res.render('admin/student', { students });
    } catch (err) {
        console.error('Error fetching student data:', err);
        res.status(500).send('Error fetching student data');
    }
});


// Render the form to add a new student
router.get('/student/add', (req, res) => {
    res.render('admin/add');
});

// Handle POST request to add a new student
router.post('/student/add', async (req, res) => {
    try {
        const newStudent = new Student({
            name: req.body.name,
            age: req.body.age,
            stream: req.body.stream,
            sem: req.body.sem,
            codingLevel: req.body.codingLevel,
        });
        await newStudent.save();
        res.redirect('/admin/student');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).json({ message: 'Error adding student', error: err.message });
    }
});

router.get('/student/update/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('admin/update', { student });
    } catch (err) {
        console.error('Error fetching student for update:', err);
        res.status(500).send('Error fetching student for update');
    }
});

// Handle POST request to update a student
router.post('/student/update/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(
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

        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }

        res.redirect('/admin/student');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Error updating student');
    }
});

// Handle POST request to delete a student
router.post('/student/delete/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await Student.findByIdAndDelete(studentId);
        res.redirect('/admin/student');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student');
    }
});




// Render the faculty list page
router.get('/faculty', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.render('admin/faculty', { faculties });
    } catch (err) {
        console.error('Error fetching faculty data:', err);
        res.status(500).send('Error fetching faculty data');
    }
});

router.post('/faculty/add', async (req, res) => {
    try {
        const newFaculty = new Faculty({
            name: req.body.name,          
            designation: req.body.designation, 
            department: req.body.department,   
            contact: req.body.contact,      
        });

        await newFaculty.save(); 
        res.redirect('/admin/faculty');
    } catch (err) {
        console.error('Error adding Faculty:', err); 
        res.status(500).json({ message: 'Error adding Faculty', error: err.message }); 
    }
});


router.get('/faculty/add',(req,res)=>{
    res.render('admin/newFaculty');
    // res.send('<h1> this is add page</h1>')
})



router.post('/faculty/update/:id', async (req, res) => {
    try {
        const facultyId = req.params.id;
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            facultyId,
            {
                name: req.body.name,          
                designation: req.body.designation, 
                department: req.body.department,   
                contact: req.body.contact,      
            },
            { new: true }
        );

        if (!updatedFaculty) {
            return res.status(404).send('Faculty not found');
        }
        res.redirect('/admin/faculty');
    } catch (err) {
        console.error('Error adding Faculty:', err); 
        res.status(500).json({ message: 'Error adding Faculty', error: err.message }); 
    }
});

router.get("/faculty/update/:id", async (req, res) => {
    try {
        const facultyId = req.params.id;
        const updateFaculty = await Faculty.findById(facultyId);
        
        if (!updateFaculty) {
            return res.status(404).send("Faculty not found");
        }
        
        res.render('admin/updateFaculty', { faculty: updateFaculty });
    } catch (err) {
        console.error('Error fetching faculty for update:', err);
        res.status(500).send('Error fetching faculty for update');
    }
});


router.post('/faculty/delete/:id', async (req,res)=>{
    try{

       await Faculty.findByIdAndDelete(req.params.id);

        res.redirect('/admin/faculty')
    }catch(err){
        console.error('Error fetching student for update:', err);
        res.status(500).send('Error fetching student for update');
    }
})

module.exports = router;
