CREATE TABLE ConfirmationPayment (
  ID INT,
  Username VARCHAR(255),
  Email VARCHAR(255),
  CardNumber VARCHAR(16),
  ExpDate VARCHAR(7),
  CVV VARCHAR(3),
  Subtotal DECIMAL(10, 2),
  OrderNumber VARCHAR(10),
  Date DATE,
  PhoneNumber VARCHAR(20),
  Address VARCHAR(255),
  FOREIGN KEY (ID) REFERENCES User(id)
);
