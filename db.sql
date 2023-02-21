CREATE database test;

USE test;

CREATE TABLE user(
	id int unsigned not null primary key auto_increment,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) unique not null,
    password varchar(50),
    salt varchar(50),
    role enum('basico', 'medio', 'medioalto', 'altomedio', 'alto') default('basico')
);

CREATE TABLE publication(
	id int unsigned not null primary key auto_increment,
    title varchar(50) not null,
    description varchar(100) not null,
    createdDate timestamp,
    creatorName varchar(50),
    creatorRole varchar(50)
);