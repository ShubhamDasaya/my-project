const express = require('express');
const router = express.Router();
const Student = require('../modules/studentsData'); // Assuming you have a model for students

// Fetch and render student data
router.get('/', async (req, res) => {
    // res.send('<h1> this is student page </h1>')
    try{
        const students  = await Student.find() 
        res.render('student/student',{students }); 
    }catch(err){
        console.error('Error fetching student data:', err)
        res.status(500).send('Error fetching student data')
    }

});

module.exports = router;