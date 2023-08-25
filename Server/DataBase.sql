
CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;

ALTER TABLE public."user"
ADD COLUMN state boolean NOT NULL DEFAULT false;



CREATE TABLE ConfirmationPayment (
  ID SERIAL PRIMARY KEY,
  Username VARCHAR(255),
  Email VARCHAR(255),
  CardNumber VARCHAR(16),
  ExpDate VARCHAR(7),
  CVV VARCHAR(3),
  StreetName VARCHAR(255),
  ZipCode VARCHAR(10),
  Subtotal DECIMAL(10, 2),
  PhoneNumber VARCHAR(20),
  OrderNumber VARCHAR(10) UNIQUE,
  Date DATE,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES public.user(id)
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    product_data JSONB,
    user_id INT,
    OrderNumber VARCHAR(10) REFERENCES ConfirmationPayment(OrderNumber)
);
ALTER TABLE orders
ADD COLUMN state BOOLEAN DEFAULT FALSE;




CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  message TEXT,
  user_id INT REFERENCES "User" (id)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    image VARCHAR(255),
    Description TEXT,
    price DECIMAL(10, 2)
    is_deleted BOOLEAN DEFAULT false
);


CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  address TEXT,
  phone_number TEXT,
  email TEXT
);



CREATE TABLE AboutUs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
