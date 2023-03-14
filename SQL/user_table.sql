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


