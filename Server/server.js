const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Add the cors module

const app = express();
const port = 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Farmy",
    password: "Abd2001@",
    port: 5432,
});

const secretKey = 'a24f41837ef05ad9e52a3794dab8c0055cc7baf383db5d19534454768751a344';

// Test the database connection
pool
    .connect()
    .then(() => {
        console.log("Connected to PostgreSQL database");

    })
    .catch((err) => {
        console.error("Error connecting to PostgreSQL database:", err);
    });

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Define your routes and middleware here

app.post('/Register', (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO "user" (username, email, password, role) VALUES ($1, $2, $3, $4)';
    const values = [username, email, hashedPassword, 'user'];
  
    const checkEmailSql = 'SELECT * FROM "user" WHERE email = $1';
    const checkEmailValues = [email];
  
    pool.query(checkEmailSql, checkEmailValues, (err, checkEmailResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while checking email availability' });
      }
  
      if (checkEmailResult.rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      pool.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while registering the user' });
        }
  
        const token = jwt.sign({ email, password }, secretKey);
        res.json({ token, message: 'User registered successfully' });
      });
    });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
