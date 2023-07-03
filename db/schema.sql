DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;


USE company_db;



CREATE TABLE `department`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `dept_name` VARCHAR(30) NOT NULL
);
  


CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `department_id` int NOT NULL,
  FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE


);