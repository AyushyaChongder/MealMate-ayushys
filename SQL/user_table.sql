use mealmate;

show tables;

create table user(
id  int auto_increment primary key, 
name varchar(50),
street varchar(50),
house int,
pincode bigint,
email varchar(50),
phone bigint,
password varchar(20));

ALTER TABLE user AUTO_INCREMENT=1000001;

select * from user;
 truncate table user;

create table master(
id int primary key,
name varchar(50),
email varchar(50),
password varchar(20),
user_type varchar(10));

select * from master;
truncate table master;

delimiter //

CREATE TRIGGER afins AFTER INSERT ON user
FOR EACH ROW
INSERT INTO master (id, name, email, password, user_type)
VALUES (NEW.id, NEW.name, NEW.email, NEW.password, 'User');
END //

create table orders(
order_id int primary key,
user_id int,
order_item varchar(50),
order_quantity int,
order_status varchar(50),
order_cost float,
 FOREIGN KEY(user_id) REFERENCES user(id));
 
insert into orders values(210000057,1000001,'non-veg meal',1,'In Progress',90,'2023/03/22');
insert into orders values(210000050,1000002,'veg meal',2,'Delivered',150,'2023/01/22');
insert into orders values(210000052,1000001,'veg meal',1,'Delivered',75,'2023/01/15');
truncate table orders;
select * from orders;
ALTER TABLE orders
ADD order_date date;

create table items(
item_id int auto_increment primary key, 
item_description varchar(255),
item_category varchar(50),
pg_id int,
quantity_available int,
FOREIGN KEY(pg_id) REFERENCES pg(pg_id));


create table pg(
pg_id int auto_increment primary key,
pg_name varchar(255),
pg_address varchar(255),
pg_phone bigint,
pg_email varchar(255),
pg_password varchar(50));
 

create table orders1(
order_id int primary key,
user_id int,
pg_id int,
order_item varchar(50),
order_quantity int,
order_status varchar(50),
order_cost float,
item_id int,
 FOREIGN KEY(user_id) REFERENCES user(id),
 FOREIGN KEY(pg_id) REFERENCES pg(pg_id),
 FOREIGN KEY(item_id) REFERENCES items(item_id));
 
 show tables;
 
