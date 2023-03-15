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

drop trigger afins;
drop trigger af_ins;
drop trigger insert_trigger;
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






