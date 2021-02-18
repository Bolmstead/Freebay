DROP TABLE IF EXISTS products, users, products_won, highest_bids, notifications;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(1000) NOT NULL,
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  condition VARCHAR(50) NOT NULL,
  rating DECIMAL NOT NULL CHECK (rating <= 5.0),
  num_of_ratings INTEGER NOT NULL,
  image_url VARCHAR(2083) NOT NULL,
  market_price DECIMAL NOT NULL,
  auction_end_dt TIMESTAMP NOT NULL,
  bid_count INTEGER NOT NULL DEFAULT 0,
  is_sold BOOLEAN DEFAULT false
);

CREATE TABLE users (
  email varchar(100) PRIMARY KEY NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  balance DECIMAL NOT NULL
  );

CREATE TABLE products_won (
  product_id INTEGER
    REFERENCES products(id) ON DELETE CASCADE,
  user_email VARCHAR(100)
    REFERENCES users(email) ON DELETE CASCADE,
  bid_price DECIMAL NOT NULL,
  timestamp TIMESTAMP
);

CREATE TABLE highest_bids (
  product_id INTEGER
    REFERENCES products(id) ON DELETE CASCADE,
  user_email VARCHAR(100)
    REFERENCES users(email) ON DELETE CASCADE,
  bid_price DECIMAL NOT NULL,
  timestamp TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_email varchar(100)
    REFERENCES users(email) ON DELETE CASCADE,
  text TEXT,
  related_product_id INTEGER,
  was_viewed BOOLEAN DEFAULT false,
  timestamp TIMESTAMP
)