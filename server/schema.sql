CREATE DATABASE cowlist;

USE cowlist;


/* Create other tables and define schemas for them here! */

CREATE TABLE  cows (
  /* Describe your table here.*/
  id INT(11) NOT NULL AUTO_INCREMENT,
  cows VARCHAR(20),
  descriptions VARCHAR(200),
  PRIMARY KEY (id)
  /*UNIQUE(users)*/

);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

