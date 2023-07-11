CREATE TABLE ConfirmationPayment (
  ID INT,
  Username VARCHAR(255),
  Email VARCHAR(255),
  CardNumber VARCHAR(16),
  ExpDate VARCHAR(7),
  CVV VARCHAR(3),
  StreetName VARCHAR(255),
  ZipCode VARCHAR(10),
  Subtotal DECIMAL(10, 2),
  PhoneNumber VARCHAR(20),
  OrderNumber VARCHAR(10),
  Date DATE,
  FOREIGN KEY (ID) REFERENCES public.user(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    product_data JSONB,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User (id)
);


CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  message TEXT,
  user_id INT REFERENCES "User" (id)
);
