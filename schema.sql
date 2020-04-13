/**
    CS2102 Team 62 Project
**/
DROP TABLE IF EXISTS addresses cascade;
DROP TABLE IF EXISTS customers cascade;
DROP TABLE IF EXISTS deliveries cascade;
DROP TABLE IF EXISTS delivery_riders cascade;
DROP TABLE IF EXISTS fds_manager cascade;
DROP TABLE IF EXISTS fds_promotion cascade;
DROP TABLE IF EXISTS food_item cascade;
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


create table Customers(
    cid VARCHAR(30),
    customer_name VARCHAR(30) NOT NULL,
    reward_points INTEGER DEFAULT 0,
    join_date DATE,
    credit_card VARCHAR(255),
    primary key (cid),
    foreign key(cid) references Users(userid)
);


create table Orders(
    order_id CHAR(11) UNIQUE, /* order_id is recycled everyday */
	restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    reward_points INTEGER DEFAULT 0, /* triggers for rewards points to be added to customers */
    primary key (order_id)
);

create table Promotions (
    promo_code CHAR(10) UNIQUE,
	promo_start_date date NOT NULL,
    promo_end_date date NOT NULL,
    promo_detail VARCHAR(255),
    primary key (promo_code)
);

create table Places(
    order_id CHAR(11),
	cid varchar(30) NOT NULL,
    primary key(order_id, cid),
    foreign key(order_id) references orders(order_id),
    foreign key(cid) references Customers(cid)
);
/*
Customer uses orders
Restriction to make sure that customer only uses a promo code a certain number of times? (Potentially complex query/trigger)
Idea: Join uses with orders to find how many times a customer has used a promo code
*/
create table Uses(
    promo_code CHAR(10) NOT NULL,
    order_id CHAR(11) NOT NULL,
    usage integer NOT NULL AUTO_INCREMENT, /* vsc has brought this up as an error */
    primary key(promo_code, order_id),
    foreign key(promo_code) references promotions (promo_code),
    foreign key(order_id) references orders(order_id),
    check (usage <= 10)
);

create table Restaurants(
    rid VARCHAR(30),
    min_order_amt real,
    located_at VARCHAR(255),
    restaurant_name VARCHAR(255),
    primary key (rid),
    foreign key(located_at) references Addresses(street_name, building_num, unit_num, postal_code)
);

create table Food_items(
    food_item_name VARCHAR(30),
    price real,
    category VARCHAR(255),
    daily_limit integer,
    num_orders_made integer,
    rid VARCHAR(30) not null,
    primary key (rid,food_item_name),
    Foreign key(rid) references restaurants(rid) ON DELETE CASCADE
);

 create table Food_items_in_Orders(
    qty INTEGER,
    order_id VARCHAR(11),
    food_item_name VARCHAR(30),
    primary key(order_id,food_item_name),
    foreign key(order_id) references orders (order_id),
    foreign key(food_item_name) references food_items(food_item_name)
);

create table Set_meals(
    set_meal_id VARCHAR(30),
    primary key(set_meal_id)
);

create table Options(
    options_name varchar(30),
    type_of_option varchar(30),
    addon_price real,
    rid varchar(30) not null,
    food_item_name VARCHAR(30) not null,
    primary key(options_name),
    foreign key (rid,food_item_name) references food_items(rid,food_item_name) ON DELETE cascade
);

create table FDS_promotion(fds_promo int PRIMARY KEY references promotions(promo_code));

create table Restaurant_promotion(restaurant_promo int primary KEY references promotions(promo_code));

create table Users(
    userid varchar(30), /* store username as string */
    user_password varchar(50),
    user_type varchar(30),
    primary key(userid),
    unique (userid)
);

create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) on delete cascade
);

create table Restaurant_Staff(
    staff_id varchar(30) primary key,
    foreign key(staff_id) REFERENCES Users(userid) on delete cascade
);

/*
sum_all_ratings/num_deliveries = avg rating of driver
*/
create table Delivery_Riders(
    did varchar(30),
    start_work_date timestamp,
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),
    foreign key(did) REFERENCES Users(userid) on delete cascade
);

create table Salary(
    did varchar(30),
    salary_date timestamp, /* trigger to update this once a month/week depending on rider */
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) on delete cascade
);

create table Time_Entries(
    did varchar(30),
    clock_in TIMESTAMP default null,
    clock_out TIMESTAMP default null, /* use this as trigger to update salary */
    primary key(did, clock_in),
    foreign key(did) REFERENCES Delivery_Riders(did) on delete cascade
);

create table Full_Time_Rider(
    did varchar(30),
    month_of_work TIMESTAMP, /* use the month() call on for display */
    wws_start_day char(3), /* use Mon, Tue, Wed etc to represent the start date */
    day1_shift integer, /* contains one shift number from 1-4 */
    day2_shift integer,
    day3_shift integer,
    day4_shift integer,
    day5_shift integer
    primary key(did, month_of_work),
    foreign key(did) REFERENCES Deliver_Riders on delete cascade
);

/*
Need to check that they work between 10 and 48h a week
FDS operates from 10am - 10pm
*/
create table Part_Time_Rider (
    did varchar(30),
    week_of_work TIMESTAMP,
    mon bigint, /*12 bit binary to represent the hours that they are working, srl/sll to check*/
    tue bigint,
    wed bigint,
    thu bigint,
    fri bigint,
    sat bigint,
    sun bigint,
    primary key(did, week_of_work),
    foreign key(did) REFERENCES Deliver_Riders(did) on delete cascade
);

/*
raincheck on whether to coalesce for delivery status
*/
create table Deliveries (
    order_id char(11),
    driver varchar(30) not null,
    /*deliveryStatus ENUM(1, 2, 3, 4, 5),*/ /* enum is done at integration */
    time_customer_placed_order TIMESTAMP,
    time_rider_departs_for_restaurant TIMESTAMP,
    time_rider_reach_restaurant TIMESTAMP,
    time_rider_departs_restaurant TIMESTAMP,
    time_rider_delivers_order TIMESTAMP,
    delivery_rating integer, /* trigger to update the average rating for riders */
    comments_for_rider CHAR(100),
    delivers_to varchar(255),
    primary key(order_id),
    foreign key(order_id) references Orders(order_id) on delete cascade,
    foreign key(driver) references Delivery_Riders(did) on delete cascade,
    foreign key(delivers_to) references Addresses(address_id) on delete cascade
);

create table Addresses(
    address_id char(11),
    street_name char(30),
    building_num integer,
    unit_num char(10),
    postal_code integer,
    primary key (address_id),
    UNIQUE (address_id)
);

CREATE TABLE opening_hours_template (

  id SERIAL PRIMARY KEY,
  restaurant_id Integer NOT NULL REFERENCES restaurants(rid) ON DELETE CASCADE,
  start_day integer NOT NULL,
  start_time time NOT NULL,
  end_day integer NOT NULL,
  end_time time NOT NULL,
  CHECK (start_day >= 0 AND start_day < 7),
  CHECK (end_day >= 0 AND end_day < 7)
);



CREATE FUNCTION null_if_overlap_opening_hours_template()
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
LANGUAGE plpgsql;

CREATE TRIGGER no_overlaps_opening_hours_template BEFORE INSERT
ON opening_hours_template
FOR ROW
EXECUTE PROCEDURE null_if_overlap_opening_hours_template();
