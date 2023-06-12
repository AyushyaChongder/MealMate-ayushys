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
delete from master where id=3;

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


create table items(
item_id int auto_increment primary key, 
item_description varchar(255),
item_category varchar(50),
pg_id int,
pg_name varchar(50),
quantity_available int);
drop table items;
ALTER TABLE items AUTO_INCREMENT=9000001;
select * from items;
truncate table items;
delete from items where item_id=9000002;

insert into items values("9000001","Butter Chicken,Rice","Non-Veg meal","7000002","SLV Pg",10);
insert into items values("9000002","Palak Paneer,Rice","Veg meal","7000002","SLV Pg",6);
insert into items values("9000003","Chicken Biryani,Raita","Non-Veg meal","7000001","Serenity Hostels",12);
insert into items values("9000004","Kadai Paneer,Jeera Rice","Veg meal","7000001","Serenity Hostels",4);
insert into items values("9000006","Chilli Chicken,Fried Rice","Non-Veg meal","7000003","Pelagia Palace",7);
insert into items values("9000005","Chilli Paneer,Fried Rice","Veg meal","7000003","Pelagaia Palace",9);


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
delete from pg where pg_id=7000001;
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
item_id int,
delivery_status varchar(50),
order_quantity int);
 ALTER TABLE orders1 AUTO_INCREMENT=210000051;
 drop table orders1;
 select * from orders1;

delete from orders1 where order_id=210000053;

 show tables;
 
 create table delivery_agents(
agent_id int auto_increment primary key,
agent_name varchar(255),
agent_phoneno bigint, 
availability_status varchar(255));
ALTER TABLE delivery_agents AUTO_INCREMENT=410000051;
truncate table delivery_agents;



create table delivery(
delivery_id int auto_increment primary key,
user_id int,
agent_id int,
delivery_date date,
delivery_time time,
delivery_location varchar(255));
ALTER TABLE delivery AUTO_INCREMENT=58000001;
 drop table delivery;
 truncate table delivery;
 select * from delivery;

insert into delivery_agents values(58000001, "Raj",8867904510,"Available");
insert into delivery_agents values(58000002, "Rohit",9866701110,"Available");
insert into delivery_agents values(58000003, "Sonu",6731881391,"Available");
insert into delivery_agents values(58000004, "Mukesh",674513091,"Available");
insert into delivery_agents values(58000005, "Rahul",6731981391,"Available");
insert into delivery_agents values(58000006, "Shivam",6737810391,"Available");


drop table delivery_agents;
delete from delivery 
create table reviews(
review_id int auto_increment primary key,
user_id int,
user_name varchar(50) not null,
pg_name varchar(50),
review_descp varchar(255) not null,
no_of_hearts int not null);


select * from reviews;
drop table reviews;


drop table orders;