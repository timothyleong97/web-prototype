-- DROP all existing tables
DROP TABLE IF EXISTS addresses cascade;

DROP TABLE IF EXISTS customers cascade;

DROP TABLE IF EXISTS deliveries cascade;

DROP TABLE IF EXISTS delivery_riders cascade;

DROP TABLE IF EXISTS fds_manager cascade;

DROP TABLE IF EXISTS fds_promotion cascade;

DROP TABLE IF EXISTS food_items cascade;

DROP TABLE IF EXISTS food_items_in_orders cascade;

DROP TABLE IF EXISTS full_time_rider cascade;

DROP TABLE IF EXISTS opening_hours_template cascade;

DROP TABLE IF EXISTS options cascade;

DROP TABLE IF EXISTS orders cascade;

DROP TABLE IF EXISTS part_time_rider cascade;

DROP TABLE IF EXISTS places cascade;

DROP TABLE IF EXISTS promotions cascade;

DROP TABLE IF EXISTS restaurant_promotion cascade;

DROP TABLE IF EXISTS restaurant_staff cascade;

DROP TABLE IF EXISTS restaurants cascade;

DROP TABLE IF EXISTS salary cascade;

DROP TABLE IF EXISTS set_meals cascade;

DROP TABLE IF EXISTS time_entries cascade;

DROP TABLE IF EXISTS users cascade;

DROP TABLE IF EXISTS uses cascade;

DROP TABLE IF EXISTS Salary_Paid_Out cascade;

-- USERS

create table Users(
    userid varchar(30),
    user_password varchar(50) not null,
    primary key(userid),
    unique (userid)
);

-- CUSTOMERS

create table Customers(
    cid VARCHAR(30),
    customer_name VARCHAR(30) NOT NULL,
    reward_points INTEGER DEFAULT 0,
    join_date DATE,
    credit_card VARCHAR(255), -- only one credit_card
    primary key (cid),
    foreign key(cid) references Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ORDERS

create table Orders(
    order_id CHAR(11) UNIQUE,
	restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    did VARCHAR(30),
    primary key (order_id),
    foreign key(did) references Delivery_riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PROMOTIONS

create table Promotions (
    promo_code CHAR(10) UNIQUE,
	promo_start_date date NOT NULL,
    promo_end_date date NOT NULL,
    promo_detail VARCHAR(255),
    primary key (promo_code)
);

-- PLACES

create table Places(
    order_id CHAR(11),
  	cid varchar(30) NOT NULL,
    delivery_fee real default 0.00,
    total_cost real default 0.00,
    primary key(order_id, cid),
    foreign key(order_id) references orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(cid) references Customers(cid) ON DELETE CASCADE ON UPDATE CASCADE
);


--ADDRESSES

create table Addresses(
    street_name char(30),
    building varchar(30),
    unit_num char(10),
    postal_code integer,
    lon float NOT NULL check(-90.0 <= lon AND lon <= 90.0 ),
    lat float NOT NULL check(-180.0 <= lat AND lat <= 180.0),
    primary key (street_name,building,unit_num,postal_code)
);

-- RESTAURANTS

create table Restaurants(
    min_order_amt real,
    street_name char(30),
    building varchar(30),
    unit_num char(10),
    postal_code integer,
    restaurant_name VARCHAR(255),
    primary key (restaurant_name),
    foreign key(street_name,building,unit_num,postal_code) references Addresses(street_name,building,unit_num,postal_code) ON DELETE CASCADE ON UPDATE CASCADE
);

--FOOD_ITEMS

create table Food_items(
    food_item_name VARCHAR(30),
    price real,
    category VARCHAR(255),
    daily_limit integer,
    num_orders_made integer,
    restaurant_name VARCHAR(255) not null,
    primary key (restaurant_name,food_item_name),
    Foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
);

--FOOD_ITEMS_IN_ORDERS

create table Food_items_in_Orders(
    qty INTEGER,
    order_id VARCHAR(11),
    food_item_name VARCHAR(30),
    restaurant_name VARCHAR(255) not null,
    primary key(order_id,food_item_name),
    foreign key(order_id) references Orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(restaurant_name,food_item_name) references Food_items(restaurant_name,food_item_name) ON DELETE CASCADE ON UPDATE CASCADE
);

--FDS_PROMOTION

create table FDS_promotion(
    fds_promo char(10) PRIMARY KEY references promotions(promo_code)
);

--RESTAURANT_PROMOTION

create table Restaurant_promotion(
    restaurant_promo char(10) primary KEY references promotions(promo_code),
    restaurant_name VARCHAR(255),
    foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
);

--FDS_MANAGER

create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);

-- RESTAURANT STAFF
create table Restaurant_Staff(
    staff_id varchar(30) primary key,
    foreign key(staff_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);

-- DELIVERY_RIDERS
create table Delivery_Riders(
    did varchar(30),
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),
    lon float NOT NULL check(-90.0 <= lon AND lon <= 90.0 ),
    lat float NOT NULL check(-180.0 <= lat AND lat <= 180.0),
    foreign key(did) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);

-- SALARY
create table Salary(
    did varchar(30),
    salary_date timestamp, -- date that we pay them
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);

-- SALARY_PAID_OUT
create table Salary_Paid_Out(
    day_Paid_Out Date,
    total_amount_paid real default 0.00,
    did varchar(30),
    primary key (day_Paid_Out),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE

);

-- FULL_TIME_RIDER
create table Full_Time_Rider(
    did varchar(30),
    month_of_work DATE,
    wws_start_day char(3),
    day1_shift integer,
    day2_shift integer,
    day3_shift integer,
    day4_shift integer,
    day5_shift integer,
    primary key(did),
    foreign key(did) REFERENCES Delivery_Riders ON DELETE CASCADE ON UPDATE CASCADE
);

-- PART_TIME_RIDER
create table Part_Time_Rider (
    did varchar(30),
    week_of_work DATE,
    mon bigint,
    tue bigint,
    wed bigint,
    thu bigint,
    fri bigint,
    sat bigint,
    sun bigint,
    primary key(did, week_of_work),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);

-- DELIVERIES

create table Deliveries (
    order_id char(11),
    driver varchar(30) not null,
    time_customer_placed_order TIMESTAMP,
    time_rider_departs_for_restaurant TIMESTAMP,
    time_rider_reach_restaurant TIMESTAMP,
    time_rider_departs_restaurant TIMESTAMP,
    time_rider_delivers_order TIMESTAMP,
    delivery_rating integer,
    comments_for_rider CHAR(100),
    street_name char(30),
    building varchar(30),
    unit_num char(10),
    postal_code integer,
    primary key(order_id),
    foreign key(order_id) references Orders(order_id) on update cascade on delete cascade,
    foreign key(driver) references Delivery_Riders(did) on UPDATE cascade on delete cascade,
    foreign key(street_name,building,unit_num,postal_code) references Addresses(street_name,building,unit_num,postal_code) on UPDATE cascade on delete cascade
);

create table shifts(
    shift_id SERIAL,
    shift_start_time timestamp,
    shift_end_time timestamp,
    shift2_start_time timestamp,
    shift2_end_time timestamp,
    primary key(shift_id)
);