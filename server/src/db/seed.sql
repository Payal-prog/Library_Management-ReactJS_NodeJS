USE librarydb;

INSERT INTO user (email, password, user_type) 
VALUES ('admin@gmail.com', 'admin123', 'admin'),
       ('user@gmail.com', 'user123', 'user')
ON DUPLICATE KEY UPDATE email=email;

INSERT INTO books (name, author, publisher, quantity)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 5),
       ('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 3)
ON DUPLICATE KEY UPDATE name=name;
