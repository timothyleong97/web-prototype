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

DROP TABLE IF EXISTS orders cascade;

DROP TABLE IF EXISTS part_time_rider cascade;

DROP TABLE IF EXISTS places cascade;

DROP TABLE IF EXISTS promotions cascade;

DROP TABLE IF EXISTS restaurant_promotion cascade;

DROP TABLE IF EXISTS restaurant_staff cascade;

DROP TABLE IF EXISTS restaurants cascade;

DROP TABLE IF EXISTS salary cascade;

DROP TABLE IF EXISTS Users cascade;

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

--DELIVERY_RIDERS

create table Delivery_Riders(
    did varchar(30),
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),

    foreign key(did) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
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

-- ORDERS

create table Orders(
    order_id CHAR(11) UNIQUE,
	  restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    restaurant_name VARCHAR(255),
    did VARCHAR(30),
    primary key (order_id),
    foreign key(did) references Delivery_riders(did) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
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

create table FDS_promotion(fds_promo char(10) PRIMARY KEY references promotions(promo_code));


--RESTAURANT_PROMOTION

create table Restaurant_promotion(restaurant_promo char(10) primary KEY references promotions(promo_code),
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

--SALARY

create table Salary(
    did varchar(30),
    salary_date timestamp, -- time that we calculated their salary
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);

--FULL_TIME_RIDER

create table Full_Time_Rider(
    did varchar(30),
    month_of_work DATE,
    wws_start_day char(3),
    day1_shift integer,
    day2_shift integer,
    day3_shift integer,
    day4_shift integer,
    day5_shift integer,
    primary key(did, month_of_work),
    foreign key(did) REFERENCES Delivery_Riders ON DELETE CASCADE ON UPDATE CASCADE
);

--PART_TIME_RIDER

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

--DELIVERIES

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
    reward_points_used integer,
    primary key(order_id),
    foreign key(order_id) references Orders(order_id) on update cascade on delete cascade,
    foreign key(driver) references Delivery_Riders(did) on UPDATE cascade on delete cascade,
    foreign key(street_name,building,unit_num,postal_code) references Addresses(street_name,building,unit_num,postal_code) on UPDATE cascade on delete cascade
);

/**
 * Trigger 1
 *  schemas :Part_Time_Rider (
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
)

create table Salary(
    did varchar(30),
    salary_date timestamp, -- date that we pay them
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);
 * Part timer schedule looks like this : 001001010... where 1 means working. Leading zeroes are dropped.
 * Before an insertion of a schedule into the part-time_riders table, check if
 * 1. there are more than 4 consecutive zeroes for mon to sun,
 * 2. the total number of zeroes from mon to sun is at least 10 and at most 48.
 *
 * To test:
 * --insert into users values ('Timothy', 'password');
 * --insert into delivery_riders values ('Timothy', 0 , 0 ,0, 0)
 * --insert into part_time_rider values ('Timothy', '2020-10-25', 110111011101,110111011101,110111011101,110111011101,110111011101,110111011101,110111011101)
 * --delete from part_time_rider where did = 'Timothy'
 * --insert into part_time_rider values ('Timothy', '2010-9-25', 011111010101, 010101010101,010101011111,010101010101,010101010101,010101010101,010101010101)

 *
*/

-- Helper functions

--Function to return 'am' or 'pm' in exception statement.
DROP FUNCTION IF EXISTS ampm;

  CREATE OR REPLACE FUNCTION ampm(t integer)
  returns char(2) as $$
    select case
      when t >= 12 then 'pm'
      else 'am'
    end;
  $$ language sql;


--Function to calculate number of zeroes in one day. Raises exception if more than 4
--consecutive ones are spotted.
DROP FUNCTION IF EXISTS numZeroes;

  CREATE OR REPLACE FUNCTION numZeroes(schedule bigint)
  returns integer as $$

  DECLARE
    counter INTEGER := 0;
    consecutiveOnes INTEGER := 0;
    lastDigit INTEGER := 0;
    startTime INTEGER := 21;
    schedule_temp bigint := schedule;
  BEGIN
    WHILE schedule_temp > 0 LOOP
      lastDigit := MOD(schedule_temp, 10);
      IF (lastDigit = 1) THEN
        RAISE NOTICE 'consecutive ones seen: %', consecutiveOnes;
        consecutiveOnes := consecutiveOnes + 1;
        IF (consecutiveOnes > 4) THEN
           RAISE EXCEPTION '>4hr shift starting from % %.', startTime, ampm(startTime)
           USING ERRCODE = '23514'; --check_violation
        END IF;
        counter := counter + 1;
      ELSE
        consecutiveOnes := 0; --reset count
      END IF;
      startTime := startTime - 1;
      schedule_temp := schedule_temp / 10;
    END LOOP;
    RETURN counter;
  END;
  $$ language plpgsql;

)


--Create the trigger

  CREATE OR REPLACE FUNCTION calculateTotalWorkingHours()
  RETURNS TRIGGER AS $$
  DECLARE
    counter INTEGER := 0;
    schedule BIGINT := 0;
    day char(3);
    errorMsg text;
    baseSalary integer := 0;
  BEGIN
    SELECT NEW.mon into schedule;
    day := 'mon';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.tue into schedule;
    day := 'tue';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.wed into schedule;
    day := 'wed';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.thu into schedule;
    day := 'thu';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.fri into schedule;
    day := 'fri';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.sat into schedule;
    day := 'sat';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.sun into schedule;
    day := 'sun';
    counter := counter + numZeroes(schedule);
    RAISE NOTICE '% hours worked cumulatively', counter;
    IF counter < 10 THEN
      RAISE NOTICE 'Less than 10 hours worked';
    END IF;
    IF counter > 48 THEN
      RAISE NOTICE 'More than 48 hours worked';
    END IF;
  EXCEPTION
    WHEN SQLSTATE '23514' THEN
      GET STACKED DIAGNOSTICS errorMsg = MESSAGE_TEXT;
      RAISE EXCEPTION 'Detected % on %.', errorMsg, day;

  baseSalary := counter * 8;

  INSERT INTO Salary VALUES (NEW.did, CURRENT_TIMESTAMP, baseSalary, 0.0);   -- in front end we stop them from updating
  RETURN NULL;
  END;
   $$ LANGUAGE plpgsql;
 

 --set the trigger
 DROP TRIGGER IF EXISTS part_time_rider_trigger ON Part_time_rider CASCADE;

  CREATE CONSTRAINT TRIGGER part_time_rider_trigger
  AFTER INSERT
  ON Part_time_rider
  deferrable initially deferred
  FOR EACH ROW
  EXECUTE FUNCTION calculateTotalWorkingHours();
)

/**
 * Trigger 2
 * Before an insertion of a finalised order into the delivery table, the total cost for that delivery (taken from the Places table) and the number of reward points (subtotal floored) earned are calculated.
 * The reward points are then added to the customer in the Customers table, and the total cost is recorded in the Places table.
 * The delivery fee is inserted into the commission field of the Salary table
 * The num_deliveries is inserted into the Delivery_riders table
 *
 * --create a bogus customer
--insert into users values ('test_customer', 'password');
--insert into customers values ('test_customer', 'customer 1', 100, '2020-02-10', '1234-5642-2332-2353');

--create a bogus driver
--insert into users values ('test_rider', 'password');
--insert into delivery_riders values ('test_rider', 200, 40, 0, 0);
--insert into salary values ('test_rider', '2010-10-10 00:00:00', 100, 10);

--create an order
--insert into orders values (5000, null, null, 'test_rider');
--insert into food_items_in_orders values (3, 5000, 'Chicken Rice', 'Dian Xiao er');
--insert into Places values (5000, 'test_customer', 3, 0);

-- select * from deliveries
-- create a delivery
--insert into deliveries values (5000, 'test_rider', '2020-04-08 19:00:00',null,null,null,null,5,'GOOD','1 Jurong East','haven way','01-10','21221', 20)

*/

-- Helper functions

-- Function 1:  Get subtotal in an order
DROP FUNCTION IF EXISTS getSubtotal;

  CREATE OR REPLACE FUNCTION getSubtotal(oid VARCHAR(11))
  returns real as $$
    WITH current_orders AS
    (
      SELECT FIO.qty, FIO.food_item_name, FIO.restaurant_name, F.price
      FROM food_items_in_orders FIO natural join Food_items F
      WHERE FIO.order_id = oid
    )

    SELECT SUM(price * CAST(qty as real)) FROM current_orders;
  $$ language sql;
)

-- Function 2: Get qty of an order
DROP FUNCTION IF EXISTS getQty;

  CREATE OR REPLACE FUNCTION getQty(oid VARCHAR(11))
  returns integer as $$
    WITH current_orders AS
    (
      SELECT FIO.qty, FIO.food_item_name, FIO.restaurant_name, F.price
      FROM food_items_in_orders FIO natural join Food_items F
      WHERE FIO.order_id = oid
    )

    SELECT cast(SUM(qty) as integer) FROM current_orders;
  $$ language sql;
)

-- Create the trigger

  CREATE OR REPLACE FUNCTION compute_total_cost_and_rewards () RETURNS TRIGGER
  AS $$
  DECLARE
    customer_id varchar(30);
    subtotal real;
    qty integer;
    rp_gained integer;
    delivery_cost real;
    BEGIN
    -- get the cid
    SELECT P.cid INTO customer_id
    FROM Places P
    WHERE P.order_id = NEW.order_id;
    -- get subtotal
    subtotal = getSubtotal(NEW.order_id);
    -- get qty
    qty = getQty(NEW.order_id);
    -- calculate reward points gained (round down the subtotal)
    rp_gained = FLOOR(subtotal) - NEW.reward_points_used;
    -- update Places.totalCost to be Places.delivery_fee + subtotal
    UPDATE Places
      SET totalCost = delivery_fee + subtotal
      WHERE Places.order_id = NEW.order_id;
    -- update customer's reward points
    UPDATE Customers
      SET reward_points = reward_points + rp_gained
      WHERE Customers.cid = customer_id;
    -- update salary
    SELECT P.delivery_fee into delivery_cost
    From Places P
    WHERE P.order_id = NEW.order_id;

    UPDATE Salary
      SET commission = commission + delivery_cost
      WHERE NEW.driver = did;
    -- update Delivery_riders
    UPDATE Delivery_riders
      SET num_deliveries = num_deliveries + 1
      WHERE NEW.driver = did;
    --return
    return NULL;
  END
  $$ LANGUAGE plpgsql;

)
/***/
--set the trigger
 DROP TRIGGER IF EXISTS deliveries_trigger ON Deliveries CASCADE;

  CREATE TRIGGER deliveries_trigger
  AFTER INSERT
  ON Deliveries
  FOR EACH ROW
  EXECUTE FUNCTION compute_total_cost_and_rewards();
)