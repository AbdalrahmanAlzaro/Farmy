const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Add the cors module
const multer = require('multer')
const path = require('path')

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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Specify the destination folder for saving the images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); // Generate a unique filename
  },
});

const upload = multer({
  storage: storage,
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


app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes


app.post('/Register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    
    const checkEmailSql = 'SELECT * FROM "user" WHERE email = $1';
    const checkEmailValues = [email];
    const checkEmailResult = await pool.query(checkEmailSql, checkEmailValues);

    if (checkEmailResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const sql = 'INSERT INTO "user" (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, email, hashedPassword, 'user'];
    const insertResult = await pool.query(sql, values);

    const insertedUserId = insertResult.rows[0].id; // Assuming the 'id' is generated by the database during insertion
    const token = jwt.sign({ id: insertedUserId, username, email }, secretKey);
    res.json({ token, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});


app.post('/LogIn', (req, res) => {
  const { email, password } = req.body; 
  // console.log(email, password)
  // Assuming the email and password are provided in the request body

  const sql = 'SELECT * FROM public."user" WHERE email = $1 AND state = false;';

  pool.query(
    sql, [email],
    async (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }

      const user = results.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {

        return res.status(401).send("incorrect email or password");
      }
      else {
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey);
        res.json({ token: token, message: 'User registered successfully' });
      }
    }
  );

});

//profile
app.put("/user/:id", async (req, res) => {

  try {

    const { id } = req.params;
    const { username, email } = req.body;
    console.log(username, email, id)
    const sql = `UPDATE public."user" SET  username= $1, email= $2 WHERE id= $3`;
    const editValues = [username, email, id];
    const updateService = await pool.query(sql, editValues);
    console.log(editValues)

    res.json(updateService.rows);
  } catch (error) {
    res.status(500).json({ error: "can't edit data" })
  }
});


app.post('/orders/:user_id', (req, res) => {
  const { user_id } = req.params; // Retrieve the user_id from the request URL parameter
  const { product_data } = req.body;
  const { OrderNumber } = req.body;

  try {
    // Assuming you have a database connection and a query execution function
    // Insert the data into the orders table
    const query = 'INSERT INTO orders (product_data, user_id, OrderNumber) VALUES ($1, $2, $3)';
    const values = [product_data, user_id, OrderNumber];

    // Execute the query and handle any errors
    // Replace `executeQuery` with your actual function to execute the query
    pool.query(query, values)
      .then(() => {
        res.status(200).json({ message: 'Data stored successfully.' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while storing data.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});


app.post('/confirmationPayment/:id', async (req, res) => {
  const id = req.params.id; // Get the value of the id parameter from the request

  // Retrieve other data from the request body
  const {
    Username,
    Email,
    CardNumber,
    ExpDate,
    CVV,
    StreetName,
    ZipCode,
    Subtotal,
    PhoneNumber,
    OrderNumber,
    Date,
  } = req.body;

  try {
    // Hash the CardNumber using bcrypt
    const hashedCardNumber = await bcrypt.hash(CardNumber, 10);

    // Insert the data into the ConfirmationPayment table
    const query = `
      INSERT INTO ConfirmationPayment ( Username, Email, CardNumber, ExpDate, CVV, StreetName, ZipCode, Subtotal, PhoneNumber, OrderNumber, Date, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    const values = [
      
      Username,
      Email,
      hashedCardNumber,
      ExpDate,
      CVV,
      StreetName,
      ZipCode,
      Subtotal,
      PhoneNumber,
      OrderNumber,
      Date,
      id, // Use the same value for user_id as the id parameter
    ];

    await pool.query(query, values);

    // Return a response indicating successful insertion
    res.status(200).json({ message: 'ConfirmationPayment record created successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    // Return an error response if there's an issue with the insertion
    res.status(500).json({ message: 'Error creating ConfirmationPayment record' });
  }
});

// the order for the user 
app.get('/join-data/:user_id', (req, res) => {
  const userId = req.params.user_id;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID. Please provide a valid user ID.' });
  }

  const query = `
  SELECT
  cp.Subtotal,
  o.OrderNumber,
  cp.Date,
  o.product_data,
  o.user_id
FROM
  ConfirmationPayment cp
INNER JOIN
  orders o ON cp.OrderNumber = o.OrderNumber
WHERE
  o.user_id = $1;

  `;

  pool.query(query, [userId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No orders found for the specified user ID.' });
      }
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    });
});


app.get('/join-data-for-all-order', (req, res) => {
  const query = `
    SELECT
      cp.Subtotal,
      cp.Username,
      cp.Email,
      cp.PhoneNumber,
      o.OrderNumber,
      cp.Date,
      o.product_data,
      o.user_id
    FROM
      ConfirmationPayment cp
    INNER JOIN
      orders o ON cp.OrderNumber = o.OrderNumber;
  `;

  pool.query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No orders found.' });
      }
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    });
});



app.get('/allUsers', (req, res) => {
  pool.query('SELECT * FROM public."user"', (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});


app.get('/allOrders', (req, res) => {
  pool.query('SELECT * FROM public."orders"', (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});


app.post('/messages/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email, message } = req.body;

    const query = `
      INSERT INTO messages (name, email, message, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, message, user_id;
    `;

    const values = [name, email, message, user_id];
    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data.' });
  }
});


//Allproduct
app.get('/allproducts', (req, res) => {
  const query = 'SELECT * FROM products where deleted = false';
  
  pool
  .query(query)
  .then((result) => {
    const products = result.rows;
    res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    });
  });
  
  //AgriculturalNursery
  app.get('/allproductsAgriculturalNursery', (req, res) => {
    const query = 'SELECT * FROM products WHERE category = \'AgriculturalNursery\' and deleted = false';
    
    pool
    .query(query)
    .then((result) => {
      const products = result.rows;
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    });
  });
  
  
  //AgriculturalNurseryTool
  app.get('/allproductsAgriculturalTool', (req, res) => {
    const query = 'SELECT * FROM products WHERE category = \'AgriculturalTool\' and deleted = false';
    
    pool
    .query(query)
    .then((result) => {
      const products = result.rows;
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    });
  });
  
  
  //AnimalFarm
  app.get('/allproductsAimalFarm', (req, res) => {
    const query = 'SELECT * FROM products WHERE category = \'AnimalFarm\' and deleted = false';
    
    pool
    .query(query)
    .then((result) => {
      const products = result.rows;
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    });
  });
  
  
  //AnimalFarmTool
  app.get('/allproductsAimalFarmTool', (req, res) => {
    const query = 'SELECT * FROM products WHERE category = \'AnimalFarmTool\' and deleted = false';
    
    pool
    .query(query)
    .then((result) => {
      const products = result.rows;
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    });
});


//Offer
app.get('/allproductsOffer', (req, res) => {
  const query = 'SELECT * FROM products WHERE category = \'Offer\' and deleted = false';
  
  pool
  .query(query)
  .then((result) => {
    const products = result.rows;
    res.json(products);
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'An error occurred while fetching products.' });
  });
});


app.get('/contact-info', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM contact_info');
    const contactInfo = result.rows;
    client.release();
    
    res.status(200).json(contactInfo);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put("/contact-infoo", async (req, res) => {
  const { address, phone_number, email } = req.body;
  
  try {
    const client = await pool.connect();
    
    // Update the contact_info with the new data
    await client.query(
      "UPDATE contact_info SET address = $1, phone_number = $2, email = $3 WHERE id = 1",
      [address, phone_number, email]
      );
      
      client.release();
      res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
      console.error("Error updating contact info:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  app.put("/editeProducts/:id", upload.single('image'), async function (req, res) {
    try {
      const productId = req.params.id;
      const { category, description, price } = req.body;
      const file = req.file;
  
      // Build the array for the SQL query parameters
      const values = [productId];
      const columns = [];
        
      // Check and add fields to the query only if they are provided
      if (category) {
        columns.push(`category = $${values.push(category)}`);
      }
      if (description) {
        columns.push(`description = $${values.push(description)}`);
      }
      if (price) {
        columns.push(`price = $${values.push(price)}`);
      }
  
      // Handle the image separately if it's provided
      if (file) {
        const imagePath = file.path;
        const imageUrl = `http://localhost:3000/${imagePath}`;
        columns.push(`image = $${values.push(imageUrl)}`);
      }
  
      // Construct the SET clause for the SQL query
      const setClause = columns.length > 0 ? `SET ${columns.join(", ")}` : "";
  
      const query = `UPDATE products ${setClause} WHERE id = $1 RETURNING *`;
  
      const all_records = await pool.query(query, values);
      res.json(all_records.rows);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "An error occurred while updating the product." });
    }
  });
  

  app.post('/products', upload.single('image'), (req, res) => {
    const { category, description, price } = req.body;
    const file = req.file.path; // Multer adds 'file' object to the request
    const image = `http://localhost:3000/${file}`
    // Perform input validation (e.g., check if required fields are present)
    if (!category || !image || !description || !price) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Insert the new product into the 'products' table
    const query = 'INSERT INTO products (category, image, description, price) VALUES ($1, $2, $3, $4)';
  
    pool
      .query(query, [category, image, description, price])
      .then(() => {
        console.log('Product added successfully.');
        res.status(201).json({ message: 'Product added successfully.' });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'An error occurred while adding the product.' });
      });
  });
  
  
  app.put("/deleteProduct/:id", async function (req, res) {
    try {
      const productId = req.params.id;
      
      // Update the "is_deleted" column to true for the specified product
      const query = "UPDATE products SET deleted = true WHERE id = $1 RETURNING *";
      const values = [productId];
  
      const deletedProduct = await pool.query(query, values);
  
      if (deletedProduct.rows.length === 0) {
        return res.status(404).json({ error: "Product not found." });
      }
  
      res.json({ message: "Product deleted successfully." });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "An error occurred while deleting the product." });
    }
  });


  app.get("/messages", async (req, res) => {
    try {
      const query = "SELECT * FROM messages";
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "An error occurred while fetching messages" });
    }
  });



  app.get('/user-count', async (req, res) => {
    try {
      const result = await pool.query('SELECT COUNT(*) AS user_count FROM public."user"');
      const userCount = result.rows[0].user_count;
  
      res.status(200).json({ userCount });
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/user-orders', async (req, res) => {
    try {
      const result = await pool.query('SELECT COUNT(*) AS user_count FROM public."orders"');
      const userOrder = result.rows[0].user_count;
  
      res.status(200).json({ userOrder });
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/calculate-subtotal', async (req, res) => {
    try {
      const result = await pool.query('SELECT SUM(Subtotal) AS totalSubtotal FROM ConfirmationPayment');
      const totalSubtotal = result.rows[0].totalsubtotal;
  
      res.status(200).json({ totalSubtotal });
    } catch (error) {
      console.error('Error calculating total subtotal:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/aboutus', async (req, res) => {
    try {
      const query = 'SELECT * FROM AboutUs';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  app.put('/aboutus/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
  
    try {
      const query = 'UPDATE AboutUs SET title = $1, description = $2 WHERE id = $3';
      await pool.query(query, [title, description, id]);
      
      res.json({ message: 'AboutUs record updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //not test yet
  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Soft delete the user by updating the state column
      const query = 'UPDATE public."user" SET state = true WHERE id = $1 RETURNING *';
      const values = [userId];
  
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.json({ message: 'User soft deleted.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });






  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  