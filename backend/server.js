require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

/* =========================
   FILE UPLOAD CONFIG
========================= */

// Safe uploads folder (local + Render)
const uploadDir =
  process.env.NODE_ENV === "production"
    ? "/tmp/uploads"
    : "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   DATABASE CONNECTION
========================= */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect ONCE
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Database connected!");
});

/* =========================
   AUTH ROUTE
========================= */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }

  const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json("Server error");
    }

    if (data.length > 0) {
      res.json("Login Successfully");
    } else {
      res.json("Invalid username or password");
    }
  });
});

/* =========================
   PRODUCTS API (shop_products)
========================= */

// ADD product
app.post("/api/products", (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;

  const sql =
    "INSERT INTO shop_products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, description, price, stock, category, image_url], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding product" });
    }
    res.json({ id: result.insertId, message: "Product added successfully" });
  });
});

// GET all products
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM shop_products";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.json(data);
  });
});

// UPDATE product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, image_url } = req.body;

  const sql =
    "UPDATE shop_products SET name=?, description=?, price=?, stock=?, category=?, image_url=? WHERE id=?";

  db.query(sql, [name, description, price, stock, category, image_url, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating product" });
    }
    res.json({ message: "Product updated successfully" });
  });
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM shop_products WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting product" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

/* =========================
   CSV UPLOAD
========================= */

app.post("/api/upload-csv", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const promises = results.map((row) => {
        const { name, description, price, stock, category, image_url } = row;

        const checkQuery =
          "SELECT * FROM shop_products WHERE name=? AND description=?";

        return new Promise((resolve, reject) => {
          db.query(checkQuery, [name, description], (err, existing) => {
            if (err) return reject(err);

            if (existing.length === 0) {
              const insertQuery =
                "INSERT INTO shop_products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)";
              db.query(
                insertQuery,
                [name, description, price, stock, category, image_url],
                (err) => (err ? reject(err) : resolve())
              );
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(promises)
        .then(() => {
          fs.unlink(filePath, () => {});
          res.json({ message: "CSV uploaded successfully" });
        })
        .catch(() => res.status(500).json({ error: "CSV processing failed" }));
    });
});

/* =========================
   FRONTEND (SINGLE LINK)
========================= */

// Serve React/Vite build
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});