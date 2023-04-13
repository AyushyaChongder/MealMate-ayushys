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
delete from master where id=1;

delimiter //

CREATE TRIGGER afins AFTER INSERT ON user
FOR EACH ROW
INSERT INTO master (id, name, email, password, user_type)
VALUES (NEW.id, NEW.name, NEW.email, NEW.password, 'User');
END //

CREATE TRIGGER afupdt AFTER UPDATE ON user
FOR EACH ROW
UPDATE master SET id=NEW.id, name=NEW.name, email=NEW.email, password=NEW.password;
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
drop table orders;

create table items(
item_id int auto_increment primary key, 
item_description varchar(255),
item_category varchar(50),
pg_id int,
pg_name varchar(50),
quantity_available int,
FOREIGN KEY(pg_id) REFERENCES pg(pg_id));
drop table items;
ALTER TABLE items AUTO_INCREMENT=9000001;
select * from items;
drop table items;
insert into items values(9000001,'Jeera Rice, Chapati, Sambhar, Palak Paneer','Veg Meal',7000001,'SLV Pg',10);
insert into items values(9000002,'Jeera Rice, Chapati, Chicken Curry, Palak Paneer','Non-Veg Meal',7000002,'Serenity Hostels',10);
insert into items values(9000003,'Normal Rice, Chapati, Soyabean Curry, Daal fry','Veg Meal',7000003,'Pelagia Palace',10);
insert into items values(9000004,'Normal Rice, Chapati, Egg Curry, Daal fry','Non-Veg Meal',7000004,'Aira Pg',10);
insert into items values(9000005,'Normal Rice, Chapati, Kadai Paneer, Daal fry','Veg Meal',7000005,'SriNivasa Pg',10);

create table pg(
pg_id int auto_increment primary key,
pg_name varchar(255),
pg_address varchar(255),
pg_phone bigint,
pg_email varchar(255),
pg_password varchar(50));
ALTER TABLE pg AUTO_INCREMENT=7000001;
truncate table pg;
drop table pg;
select * from pg;
delimiter //
CREATE TRIGGER afinspg AFTER INSERT ON pg
FOR EACH ROW
INSERT INTO master (id, name, email, password, user_type)
VALUES (NEW.pg_id, NEW.pg_name, NEW.pg_email, NEW.pg_password, 'PG');
END //

create table orders1(
order_id int auto_increment key,
user_id int,
pg_id int,
pg_name varchar(50),
order_item varchar(50),
item_id int
);
 ALTER TABLE orders1 AUTO_INCREMENT=210000051;
 drop table orders1;
 select * from orders1;

delete from orders1 where order_id=210000051;

 show tables;
 delimiter //
CREATE TRIGGER afinsorders AFTER INSERT ON orders1
FOR EACH ROW
INSERT INTO master (id, name, email, password, user_type)
VALUES (NEW.pg_id, NEW.pg_name, NEW.pg_email, NEW.pg_password, 'PG');
END //

