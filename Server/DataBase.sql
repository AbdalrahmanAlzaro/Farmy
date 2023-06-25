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
  FOREIGN KEY (ID) REFERENCES User(id)
);

