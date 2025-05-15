const ex = require('express');
const mongoose = require('mongoose');
const app = ex();
require('dotenv').config();
const adminRouter = require('./router/admin.js');
const facultRouter = require('./router/faculty.js');
const studentRouter = require('./router/student.js');




mongoose.connect(process.env. mongo_db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connected to mongodb'))
.catch(err=> console.log('Error Connection to Mongodb ', err))

app.use(ex.urlencoded({extended:true}))
app.use(ex.json())
app.set('view engine',"ejs");
app.set('views', 'views');
app.get('/',(req,res)=>{
   
    res.render('index');
})
app.use('/admin',adminRouter);
app.use('/faculty',facultRouter);
app.use('/student',studentRouter);

app.listen(3000,()=>console.log("app is statred"));
