-- Create the `user` table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE
);


-- Create the `home` table
CREATE TABLE home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) DEFAULT NULL,
    state VARCHAR(255) DEFAULT NULL,
    zip VARCHAR(10) DEFAULT NULL,    
    sqft DECIMAL(10, 2) DEFAULT NULL,           
    beds TINYINT DEFAULT NULL,       
    baths TINYINT DEFAULT NULL,
    list_price DECIMAL(10, 2) DEFAULT NULL
);

-- Create the `user_home` junction table
CREATE TABLE user_home_relation (
    user_id INT,
    home_id INT,
    PRIMARY KEY (user_id, home_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (home_id) REFERENCES home(home_id)
);

-- Insert data into the `user` table by selecting unique username and email from `user_home`
INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;


-- Insert data into the `home` table by selecting unique street_address, state, zip, sqft, beds, baths, and list_price from `user_home`
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;


-- Insert data into the `user_home_relation` table by selecting user_id and home_id from `user_home`
INSERT INTO user_home_relation (user_id, home_id)
SELECT u.user_id, h.home_id
FROM user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address;

