import dotenv from 'dotenv'; // Import dotenv
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import routes from './routes/rotues.js'

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT;

// Database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log('Database connection error:', error));
db.once('open', () => console.log('Connected to the database!'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret : 'my secret Key',
    saveUninitialized : true,
    resave : false
}))


app.use((req ,res, next)=>{
res.locals.message = req.session.message;
delete req.session.message;
next()
})
// for images 
app.use(express.static('uploads'))

// set templet engain
app.set('view engine','ejs')

// router prefix 
app.use("", routes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
