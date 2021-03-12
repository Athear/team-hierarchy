CREATE DATABASE IF NOT EXISTS team_hierarchyDB;
USE team_hierarchyDB;


CREATE TABLE IF NOT EXISTS department(
    id int auto_increment not null,
    name varchar(30) not null,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS role(
    id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(8,2),
    department_id int not null,
    primary key(id),
    foreign key(department_id) references department(id)
    on delete cascade
);

CREATE TABLE IF NOT EXISTS employee(
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key (id),
    foreign key (role_id) references role(id) on delete cascade,
    foreign key (manager_id) references employee(id)
);
