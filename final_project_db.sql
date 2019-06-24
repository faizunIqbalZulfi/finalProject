CREATE DATABASE final_project;
USE final_project;
DROP TABLE orderdetails;
DESC shipers;
DESC users;
SELECT * FROM wishcart;
SELECT * FROM size;
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM stock WHERE qty <= 2;
SELECT * FROM images;
SELECT * FROM addresses;
SELECT * FROM shipers;
SELECT * FROM paymentmethod;
SELECT * FROM orders;
SELECT * FROM orderdetails;
DESC addresses;
SELECT * FROM addresses WHERE user_id IN (SELECT user_id FROM users where email = "faizun@gmail.com");

SELECT * FROM products p 
JOIN images i ON p.product_id = i.product_id
WHERE i.name_image LIKE '%default%'
ORDER BY p.product_id DESC
LIMIT 6;

SELECT * FROM stock WHERE product_id = 31 AND size_id = 3;

INSERT INTO stock 
    (stock_id, product_id, size_id, qty)
    VALUES 
        (47, 11, 10, 8),
        (52, 12, 10, 7)
    ON DUPLICATE KEY UPDATE 
    qty = VALUES(qty);

SELECT * FROM images 
WHERE product_id = 10
LIMIT 1;

ALTER TABLE users ADD COLUMN status BOOLEAN DEFAULT TRUE AFTER role;

ALTER TABLE users DROP COLUMN status;

SELECT p.category1, p.category2, p.created_at, i.name_image, p.price,
    p.product_id, p.product_name, s.size FROM products p
    JOIN images i ON p.product_id = i.product_id
    JOIN stock st ON p.product_id = st.product_id
    JOIN size s ON st.size_id = s.size_id
    WHERE i.name_image LIKE '%default%'
    AND p.category1 = 'women'
    AND p.category2 = 'running';
    

INSERT INTO users (email, password, first_name, last_name, gender) 
VALUES ('zulfi@gmail.com', 'qwertyui', 'zulfi', 'faizun', 'm');
INSERT INTO addresses (user_id, address1, address2)
VALUE (1, 'jakarta', 'selatan');

INSERT INTO products (product_name, description, price, category1, category2) 
VALUES ('sepatu', 'sepatu mahal', 230000, 'men', 'running');
SET @last_ID = LAST_INSERT_ID();
INSERT INTO stock (product_id, qty) VALUES (@last_ID, 25);

DELETE FROM users WHERE user_id = 24;

CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(25),
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    gender ENUM('M','F'),
    role ENUM('admin','user') DEFAULT 'user',
    avatar VARCHAR(40),
    verified BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()

);

CREATE TABLE addresses(
	address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_name VARCHAR(25) NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    city VARCHAR(30) NOT NULL,
    pos_code VARCHAR(10) NOT NULL,
    address1 VARCHAR(200) NOT NULL,
    CONSTRAINT fk_user_id_address
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE products(
	product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    description VARCHAR(400),
    price INT,
    category1 VARCHAR(20),
    category2 VARCHAR(20),
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE size (
	size_id INT AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(10) UNIQUE
);

CREATE TABLE stock(
	stock_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    qty INT,
    CONSTRAINT fk_product_id_stock
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_size_id_stock
    FOREIGN KEY (size_id) REFERENCES size(size_id)
);

CREATE TABLE images(
	image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name_image VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_product_id_images
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE wishcart(
	wishcart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    qty INT DEFAULT 1,
    status ENUM('w','c'),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user_id_wishcart
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_id_wishcart
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_size_id_wishcart
    FOREIGN KEY (size_id) REFERENCES size(size_id)
    ON DELETE CASCADE ON UPDATE CASCADE
    
);

CREATE TABLE paymentmethod(
	paymentmethod_id INT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(15),
    no_rek VARCHAR(20),
    an_bank VARCHAR(30)
);

CREATE TABLE shipers(
	shipper_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(15),
    category VARCHAR(20),
    price INT,
    estimasi VARCHAR(25),
    phone VARCHAR(14)
);

CREATE TABLE orders(
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    paymentmethod_id INT NOT NULL,
    shipper_id INT NOT NULL,
    status VARCHAR (50) DEFAULT 'waiting payment',
    pricetotal INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT fk_user_id_orders
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_address_id_orders
    FOREIGN KEY (address_id) REFERENCES addresses(address_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_paymentmethod_id_orders
    FOREIGN KEY (paymentmethod_id) REFERENCES paymentmethod(paymentmethod_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_shipper_id_orders
    FOREIGN KEY (shipper_id) REFERENCES shipers(shipper_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orderdetails(
	orderdetail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    price INT,
    qty INT,
    CONSTRAINT fk_order_id_orderdetails
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product_id_orderdetails
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_size_id_orderdetails
    FOREIGN KEY (size_id) REFERENCES size(size_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
