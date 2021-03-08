INSERT INTO department (name) VALUES 
("Administration")
,("Finance")
,("Sales")
,("Development")
,("Operations")
,("Human Resources");


INSERT INTO role (title,salary,department_id) VALUES
--Admin
("Administrative Assistant",38880,1),
("Receptionist",28392,1),
("Secretary",38880,1),
--Finance
("Financial Analyst", 81590,2),
("Financial Accountant",71000,2),
("Attorney",122960,2),
--Sales
("Sales Manager",53000,3)
("Sales Representative",45000,3)
--Devlopment
("Development Manager", 90000,4)
("Senior Developer",80000,4),
("Junior Developer",40000,4);

INSERT INTO employee (first_name,last_name,role_id) VALUES

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES