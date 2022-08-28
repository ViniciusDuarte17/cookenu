-- Active: 1659117235102@@35.226.146.116@3306@gebru-4212061-vinicius-passo

CREATE TABLE
    Cookenu_User (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Cookenu_Recipe (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date datetime,
        author_id varchar(255) NOT NULL,
        FOREIGN KEY (author_id) REFERENCES Cookenu_User(id)
    );

CREATE TABLE
    Cookenu_Follow (
    id VARCHAR(255) PRIMARY KEY,
    author_id VARCHAR(255) NOT NULL,
    user_follow_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Cookenu_User(id)
 );