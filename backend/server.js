const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(express.json());

app.use(cors());

// Ensure uploads directory exists
const uploadDir = "./uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

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

// Add new product
app.post('/api/products', (req, res) => {
    const { name, description, price, stock, category, image_url } = req.body;
    const sql = "INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [name, description, price, stock, category, image_url], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error adding product" });
        }
        res.json({ id: result.insertId, message: "Product added successfully" });
    });
});

// Get all products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error fetching products" });
        }
        res.json(data);
    });
});

// Update product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category, image_url } = req.body;
    const sql = "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?";
    
    db.query(sql, [name, description, price, stock, category, image_url, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error updating product" });
        }
        res.json({ message: "Product updated successfully" });
    });
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM products WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error deleting product" });
        }
        res.json({ message: "Product deleted successfully" });
    });
});

// CSV Upload endpoint
app.post("/api/upload-csv", upload.single("file"), (req, res) => {
    const filePath = req.file.path;

    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            const insertPromises = results.map((row) => {
                const { name, description, price, stock, category, image_url } = row;
                const checkQuery = "SELECT * FROM products WHERE name = ? AND description = ?";
                return new Promise((resolve, reject) => {
                    db.query(checkQuery, [name, description], (checkErr, checkResults) => {
                        if (checkErr) {
                            console.error("Error checking for existing data: ", checkErr);
                            return reject(checkErr);
                        }
                        if (checkResults.length === 0) {
                            const query = "INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)";
                            db.query(query, [name, description, price, stock, category, image_url], (err) => {
                                if (err) {
                                    console.error("Error inserting data: ", err);
                                    return reject(err);
                                }
                                resolve();
                            });
                        } else {
                            resolve(); // Skip insertion if data exists
                        }
                    });
                });
            });

            Promise.all(insertPromises)
                .then(() => {
                    // Clean up the uploaded file
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file:", err);
                    });
                    res.json({ message: "CSV Uploaded and Data Processed Successfully" });
                })
                .catch((err) => res.status(500).json({ error: "Failed to process data" }));
        })
        .on("error", (err) => {
            console.error("Error reading CSV file: ", err);
            res.status(500).json({ error: "Failed to read CSV file" });
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
