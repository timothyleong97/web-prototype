const client = require('./elephantsql');
const chalk = require('chalk'); //for coloring console output

const query = q => client.query(q)
.then(result => console.log(result.command))
.catch(e => console.error(chalk.bgRed(e.stack)));

//To run this script, type 'node init.js'. This script rebuilds the whole database.

// DROP all existing tables
query('DROP TABLE IF EXISTS addresses cascade;')
query('DROP TABLE IF EXISTS customers cascade;')
query('DROP TABLE IF EXISTS deliveries cascade;')
query('DROP TABLE IF EXISTS delivery_riders cascade;')
query('DROP TABLE IF EXISTS fds_manager cascade;')
query('DROP TABLE IF EXISTS fds_promotion cascade;')
query('DROP TABLE IF EXISTS food_items cascade;')
query('DROP TABLE IF EXISTS food_items_in_orders cascade;')
query('DROP TABLE IF EXISTS full_time_rider cascade;')
query('DROP TABLE IF EXISTS opening_hours_template cascade;')
query('DROP TABLE IF EXISTS options cascade;')
query('DROP TABLE IF EXISTS orders cascade;')
query('DROP TABLE IF EXISTS part_time_rider cascade;')
query('DROP TABLE IF EXISTS places cascade;')
query('DROP TABLE IF EXISTS promotions cascade;')
query('DROP TABLE IF EXISTS restaurant_promotion cascade;')
query('DROP TABLE IF EXISTS restaurant_staff cascade;')
query('DROP TABLE IF EXISTS restaurants cascade;')
query('DROP TABLE IF EXISTS salary cascade;')
query('DROP TABLE IF EXISTS set_meals cascade;')
query('DROP TABLE IF EXISTS time_entries cascade;')
query('DROP TABLE IF EXISTS users cascade;')
query('DROP TABLE IF EXISTS uses cascade;')

//DROP FUNCTIONS
query('DROP FUNCTION IF EXISTS null_if_overlap_opening_hours_template cascade;')

//CREATE all tables
query(`create table Users(
    userid varchar(30),
    user_password varchar(50),
    primary key(userid),
    unique (userid)
);`)

query(`create table Customers(
    cid VARCHAR(30),
    customer_name VARCHAR(30) NOT NULL,
    reward_points INTEGER DEFAULT 0,
    join_date DATE,
    credit_card VARCHAR(255),
    primary key (cid),
    foreign key(cid) references Users(userid)
);`)

query(`create table Orders(
    order_id CHAR(11) UNIQUE,
	restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    reward_points INTEGER DEFAULT 0,
    primary key (order_id)
);`)

query(`create table Promotions (
    promo_code CHAR(10) UNIQUE,
	promo_start_date date NOT NULL,
    promo_end_date date NOT NULL,
    promo_detail VARCHAR(255),
    primary key (promo_code)
);`)

query(`create table Places(
    order_id CHAR(11),
  	cid varchar(30) NOT NULL,
    delivery_fee real default 0,
    totalCost real default 0,
    primary key(order_id, cid),
    foreign key(order_id) references orders(order_id),
    foreign key(cid) references Customers(cid)
);`)

query(`create table Uses(
    promo_code CHAR(10) NOT NULL,
    order_id CHAR(11) NOT NULL,
    usage serial NOT NULL,
    primary key(promo_code, order_id),
    foreign key(promo_code) references promotions (promo_code),
    foreign key(order_id) references orders(order_id),
    check (usage <= 10)
);`)

query(`create table Addresses(
    address_id char(11),
    street_name char(30),
    building_num integer,
    unit_num char(10),
    postal_code integer,
    primary key (address_id),
    UNIQUE (address_id)
);`)

query(`create table Restaurants(
    rid VARCHAR(30),
    min_order_amt real,
    located_at VARCHAR(255) UNIQUE,
    restaurant_name VARCHAR(255),
    primary key (rid),
    foreign key(located_at) references Addresses(address_id)
);`)

query(`create table Food_items(
    food_item_name VARCHAR(30) UNIQUE,
    price real,
    category VARCHAR(255),
    daily_limit integer,
    num_orders_made integer,
    rid VARCHAR(30) not null,
    primary key (rid,food_item_name),
    Foreign key(rid) references restaurants(rid) ON DELETE CASCADE
);`)

query(`create table Food_items_in_Orders(
    qty INTEGER,
    order_id VARCHAR(11),
    food_item_name VARCHAR(30),
    rid VARCHAR(30) not null,
    primary key(order_id,food_item_name),
    foreign key(order_id) references orders (order_id),
    foreign key(rid,food_item_name) references Food_items(rid,food_item_name)
);`)

query(`create table Set_meals(
    set_meal_id VARCHAR(30),
    primary key(set_meal_id)
);`)

query(`create table Options(
    options_name varchar(30),
    type_of_option varchar(30),
    addon_price real,
    rid varchar(30) not null,
    food_item_name VARCHAR(30) not null,
    primary key(options_name),
    foreign key (rid,food_item_name) references food_items(rid,food_item_name) ON DELETE cascade
);`)

query(`create table FDS_promotion(
    fds_promo char(10) PRIMARY KEY references promotions(promo_code));
`)

query(`create table Restaurant_promotion(
    restaurant_promo char(10) primary KEY references promotions(promo_code));
`)

query(`create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) on delete cascade
);`)

query(`create table Restaurant_Staff(
    staff_id varchar(30) primary key,
    foreign key(staff_id) REFERENCES Users(userid) on delete cascade
);`)

query(`create table Delivery_Riders(
    did varchar(30),
    start_work_date timestamp,
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),
    foreign key(did) REFERENCES Users(userid) on delete cascade
);`)

query(`create table Salary(
    did varchar(30),
    salary_date timestamp,
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) on delete cascade
);`)

query(`create table Time_Entries(
    did varchar(30),
    clock_in TIMESTAMP,
    clock_out TIMESTAMP,
    primary key(did, clock_in),
    foreign key(did) REFERENCES Delivery_Riders(did) on delete cascade
);`)

query(`create table Full_Time_Rider(
    did varchar(30),
    month_of_work TIMESTAMP,
    wws_start_day char(3),
    day1_shift integer,
    day2_shift integer,
    day3_shift integer,
    day4_shift integer,
    day5_shift integer,
    primary key(did, month_of_work),
    foreign key(did) REFERENCES Delivery_Riders on delete cascade
);`)

query(`create table Part_Time_Rider (
    did varchar(30),
    week_of_work TIMESTAMP,
    mon bigint,
    tue bigint,
    wed bigint,
    thu bigint,
    fri bigint,
    sat bigint,
    sun bigint,
    primary key(did, week_of_work),
    foreign key(did) REFERENCES Delivery_Riders(did) on delete cascade
);
`)

query(`create table Deliveries (
    order_id char(11),
    driver varchar(30) not null,

    time_customer_placed_order TIMESTAMP,
    time_rider_departs_for_restaurant TIMESTAMP,
    time_rider_reach_restaurant TIMESTAMP,
    time_rider_departs_restaurant TIMESTAMP,
    time_rider_delivers_order TIMESTAMP,
    delivery_rating integer,
    comments_for_rider CHAR(100),
    delivers_to varchar(255),
    primary key(order_id),
    foreign key(order_id) references Orders(order_id) on delete cascade,
    foreign key(driver) references Delivery_Riders(did) on delete cascade,
    foreign key(delivers_to) references Addresses(address_id) on delete cascade
);`)

query(`CREATE TABLE opening_hours_template (
    id SERIAL PRIMARY KEY,
    restaurant_id varchar(30) NOT NULL REFERENCES restaurants(rid) ON DELETE CASCADE,
    start_day integer NOT NULL,
    start_time time NOT NULL,
    end_day integer NOT NULL,
    end_time time NOT NULL,
    CHECK (start_day >= 0 AND start_day < 7),
    CHECK (end_day >= 0 AND end_day < 7)
  );`)

query(`CREATE FUNCTION null_if_overlap_opening_hours_template()
RETURNS trigger AS
$$
BEGIN
IF EXISTS (SELECT * FROM opening_hours_template T WHERE
  T.restaurant_id = NEW.restaurant_id AND (
  (
    -- condition: range of given existing row does not have sat midnight in interior
    --            and range of new row does not have sat midnight in interior
    ((T.start_day < T.end_day) OR (T.start_day = T.end_day AND T.start_time <= T.end_time))
    AND
    ((NEW.start_day < NEW.end_day) OR (NEW.start_day = NEW.end_day AND NEW.start_time <= NEW.end_time))
    AND NOT
    (
      -- either existing row is before new row
      (T.end_day < NEW.start_day) OR (T.end_day = NEW.start_day AND T.end_time < NEW.start_time)
      -- or new row is before existing row
      OR
      (NEW.end_day < T.start_day) OR (NEW.end_day = T.start_day AND NEW.end_time < T.start_time)
    )
  )
  OR
  (
    -- condition: range of given existing row has sat midnight in interior
    --            and range of new row does not have sat midnight in interior
    ((T.end_day < T.start_day) OR (T.end_day = T.start_day AND T.end_time < T.start_time))
    AND
    ((NEW.start_day < NEW.end_day) OR (NEW.start_day = NEW.end_day AND NEW.start_time <= NEW.end_time))
    AND NOT (
    -- range of new row must be after the range of existing row ends...
    ((T.end_day < NEW.start_day) OR (T.end_day = NEW.start_day AND T.end_time < NEW.start_time))
    AND
    -- and before the range of existing row starts.
    ((NEW.end_day < T.start_day) OR (NEW.end_day = T.start_day AND NEW.end_time < T.start_time))
    )
  )
  OR
  (
    -- condition: range of given existing row does not have sat midnight in interior
    --            and range of new row has sat midnight in interior
    ((T.start_day < T.end_day) OR (T.start_day = T.end_day AND T.start_time <= T.end_time))
    AND
    ((NEW.end_day < NEW.start_day) OR (NEW.end_day = NEW.start_day AND NEW.end_time < NEW.start_time))
    -- same conditions as previous case
    AND NOT (
    ((NEW.end_day < T.start_day) OR (NEW.end_day = T.start_day AND NEW.end_time < T.start_time))
    AND
    ((T.end_day < NEW.start_day) OR (T.end_day = NEW.start_day AND T.end_time < NEW.start_time))
    )
  )
  -- if range of new row and given existing row both have sat midnight in interior, they certainly overlap
  OR
  (
    -- condition: range of new row has sat midnight in interior
    --            and range of given existing row has sat midnight in interior
    ((T.end_day < T.start_day) OR (T.end_day = T.start_day AND T.end_time < T.start_time))
    AND
    ((NEW.end_day < NEW.start_day) OR (NEW.end_day = NEW.start_day AND NEW.end_time < NEW.start_time))
  )
  )
)
THEN
  RETURN NULL;
ELSE
  RETURN NEW;
END IF;
END;
$$
LANGUAGE plpgsql;`)

query(`CREATE TRIGGER no_overlaps_opening_hours_template BEFORE INSERT
ON opening_hours_template
FOR ROW
EXECUTE PROCEDURE null_if_overlap_opening_hours_template();`)


//INSERT starting values into tables
query(`INSERT INTO users(userid,user_password)
VALUES('undertaker','undertaker');`)
query(`INSERT INTO users(userid,user_password)
VALUES('Bottleopener','Bottleopener');`)
query(`INSERT INTO users(userid,user_password)
VALUES('waiter','waiter');`)
query(`INSERT INTO users(userid,user_password)
VALUES('Manager','manager');`)
query(`INSERT INTO users(userid,user_password)
VALUES('lewis hamilton','password');`)
query(`INSERT INTO users(userid,user_password)
VALUES('Thomas Engine','password');`)
query(`INSERT INTO users(userid,user_password)
VALUES('Jay Park','jay');`)

query(`INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('undertaker','undertaker',0,'2020-04-07', '4258-1234-1010-0000');`)
query(`INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('Jay Park','jay',0,'2019-12-07', '4228-1144-1040-0000');`)


query(`INSERT INTO restaurant_staff(staff_id)
VALUES('waiter');`)


query(`INSERT INTO fds_manager(manager_id)
VALUES('Manager');`)


query(`INSERT INTO Delivery_riders(did,start_work_date,sum_all_ratings,num_deliveries)
VALUES('lewis hamilton','2020-04-11',0,0);`)
query(`INSERT INTO Delivery_riders(did,start_work_date,sum_all_ratings,num_deliveries)
VALUES('Thomas Engine','2019-11-04',4.5,100);`)

query(`INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','2017-10-25',0,10,0,0,10,10,0);`)

query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('lewis hamilton','1998-09-01','mon',1,2,1,2,4);`)

query(`INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('lewis hamilton','2000-10-10',100,10);`)
query(`INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('Thomas Engine','2010-10-10',100,10);`)

query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(1,'1 Jurong East','234','01-10','21221');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(2,'2 Tampines East','24','10-02','123421');`)


query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(1,60,1,'Dian Xiao er');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(2,20,2,'Subway');`)

query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(0,1,0,'10:00:00',0,'00:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,1,1,'10:00:00',1,'20:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(2,1,2,'10:00:00',2,'20:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(3,1,3,'10:00:00',3,'20:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(4,1,4,'10:00:00',4,'20:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(5,1,5,'10:00:00',5,'20:00:00');`)
query(`INSERT INTO opening_hours_template(id,restaurant_id,start_day,start_time,end_day,end_time)
VALUES(6,1,6,'10:00:00',6,'00:00:00');`)

query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Chicken Rice',2.50,'Chinese',50,0,1);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cold cut trio',5.50,'Sandwich',10,0,2);`)

query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Style-Fried','Fried',0,1,'Chicken Rice');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Size-small','small',0,1,'Chicken Rice');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Size-medium','medium',0.5,1,'Chicken Rice');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('topping-cheese','cheese',1,2,'Cold cut trio');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('topping-ham','ham',1,2,'Cold cut trio');`)

query(`INSERT INTO Set_meals(set_meal_id)
VALUES(1);`)
query(`INSERT INTO Set_meals(set_meal_id)
VALUES(2);`)

query(`INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('10%OFF','2020-04-07','2020-05-08','10%OFFEVERYTHING');`)
query(`INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('FFS','2020-04-07','2020-04-15','FireSale');`)

query(`INSERT INTO restaurant_promotion(restaurant_promo)
VALUES('10%OFF');`)

query(`INSERT INTO FDS_promotion(fds_promo)
VALUES('FFS');`)

query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(1,null,null,null);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(2,'Good',4,10);`)

query(`INSERT INTO places(order_id,cid)
VALUES(1,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(2,'undertaker');`)

query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('FFS',1,0);`)
query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('10%OFF',2,0);`)

query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(3,1,1,'Chicken Rice');`)
query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(1,2,2,'Cold cut trio');`)

// Queries for FDS Manager
query('select userid as UserID, user_type as UserType from Users;') //see all users
query('select unique fds_promo as FDS Promotion from FDS_Promotion;') //see fds promotions
query ('select unique restaurant_promo as Restaurant Promotions from Restaurant_promotion;') //see rest promotions
query('select unique fds_promo as FDS Promotion from FDS_Promotion union select unique restaurant_promo as Restaurant Promotions from Restaurant_promotion;') //see all promotions
query('select count(cid), count(order_id), sum() from ?? group by Month(join_date)') // undone


// See available riders
query(`select did as Name from Time_Entries where (clock_in != null and clock_out = null);`)

// Restaurant related queries
query('select unique category as FoodCategory from Food_items;')
query('select food_item_name as Item, category as FoodCategory from Food_items group by category;')
query('select unique food_item_name as Item from Food_items from Food_items order by category limit(5);')

// Customer's 5 most recent addresses
query('select cid as CustomerName, address as Address from Customers group by cid limit (5);')

// Queries for customers

// Queries for restaurant staff

// Queries for delivery riders
