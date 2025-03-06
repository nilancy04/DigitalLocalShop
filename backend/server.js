const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    // Ensure the database connection is successful
    host: 'localhost',
    user: 'root',
    password: 'root123@',
    database: 'dls_db'
})

app.post('/login', (req, res) => {
    // Validate request body
    if (!req.body.email || !req.body.password) {
        return res.status(400).json("Email and password are required");
    }
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err); // Log the actual error for debugging
            console.error("SQL Query Error: ", err); // Log the SQL error for debugging
            return res.status(500).json("Error occurred while processing your request.");
        }
        if(data.length > 0){
            return res.json("Login Successfully");
        } else {
            return res.json("Invalid username or password");
        }
    });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, function(){
    console.log('App Listening on port 3005');
    db.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    });
});
