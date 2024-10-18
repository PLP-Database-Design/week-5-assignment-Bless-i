
 const express =require('express');
 const app = express();
 const mysql = require('mysql2');
 const cors = require('cors');
 const dotenv = require('dotenv');

 app.use(express.json());
 app.use(cors());
 dotenv.config();

 
 const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
 })

 
 db.connect((err) =>{
    
    if(err) return console.log("error connecting to MYSQL");
    console.log("Connected to MYSQL as id: ", db.threadId);

 })


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
 


app.get('/data', (req,res) => {
    

    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else{
            //Display the patients records to the browser
            res.render('data', {results:results});
        }
    })
})


 app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
    console.log('sending message to the browser...')
    app.get('/', (req,resizeBy) => {
        res.send('yey!! wedding can proceed, the server started successfully!!');
    });

 });