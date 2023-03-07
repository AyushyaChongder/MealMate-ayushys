create database MealMate;
use MealMate;

create table users(
user_id varchar(255),
first_name varchar(255),
last_name varchar(255),
user_email varchar(255),
user_password varchar(255),
user_type varchar(255));

create table pg(
pg_id varchar(255),
pg_name varchar(255),
pg_address varchar(255),
pg_phone bigint,
pg_email varchar(255));

create table individuals(
individual_id varchar(255),
first_name varchar(255),
last_name varchar(255),
individual_phone bigint,
street_name varchar(255),
house_no int,
pincode bigint);

Alter table pg
add primary key pk_pg (pg_id);

Alter table pg 
add constraint unq_pg_phone unique(pg_phone); 

Alter table individuals
add primary key pk_individual(individual_id);

Alter table individuals
add constraint unq_individual_phone unique(individual_phone); 



