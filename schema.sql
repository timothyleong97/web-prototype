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

DROP TABLE IF EXISTS shifts;
SET timezone = 'Asia/Singapore'
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
    sum_all_ratings real,
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
    sum_all_ratings real,
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
    staff_id varchar(30),
    restaurant_name VARCHAR(255),
    primary key(staff_id),
    foreign key(staff_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(restaurant_name) REFERENCES Restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
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
    --month_of_work DATE CHECK (month_of_work = '1970-01-01' OR month_of_work > CURRENT_DATE AND extract (day from month_of_work) = 1),
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
    --week_of_work DATE CHECK (week_of_work = '1970-01-01' OR week_of_work > CURRENT_DATE),
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


  create table shifts(
   shift_id SERIAL, -- 1,2,3,4
   shift_start_time timestamp,
   shift_end_time timestamp,
   shift2_start_time timestamp,
   shift2_end_time timestamp,
   primary key(shift_id)

);

-- Trigger for full-time riders to ensure month is right
CREATE OR REPLACE FUNCTION fullTimeRidersConvertMonth()
    RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
    NEW.month_of_work = cast(date_trunc('month', NEW.month_of_work) as date);
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`)

DROP TRIGGER IF EXISTS full_time_month_trigger ON Full_Time_Rider;`)
CREATE TRIGGER full_time_month_trigger
  BEFORE UPDATE OF month_of_work OR INSERT
ON Full_Time_Rider
FOR EACH ROW
EXECUTE FUNCTION fullTimeRidersConvertMonth();`)

-- Trigger for part-time riders to ensure month is right
CREATE OR REPLACE FUNCTION partTimeRidersConvertWeek()
    RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
    NEW.week_of_work = cast(date_trunc('week', NEW.week_of_work) as date);
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`)

DROP TRIGGER IF EXISTS part_time_week_trigger ON part_Time_Rider;`)
CREATE TRIGGER part_time_week_trigger
  BEFORE UPDATE OF week_of_work OR INSERT
ON part_Time_Rider
FOR EACH ROW
EXECUTE FUNCTION partTimeRidersConvertWeek();`)

/**
 * Trigger 1
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
query("DROP FUNCTION IF EXISTS ampm;");

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
        --RAISE NOTICE 'consecutive ones seen: %', consecutiveOnes;
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
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.tue into schedule;
    day := 'tue';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.wed into schedule;
    day := 'wed';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.thu into schedule;
    day := 'thu';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.fri into schedule;
    day := 'fri';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.sat into schedule;
    day := 'sat';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    SELECT NEW.sun into schedule;
    day := 'sun';
    counter := counter + numZeroes(schedule);
    --RAISE NOTICE '% hours worked cumulatively', counter;
    IF counter < 10 THEN
      RAISE EXCEPTION 'Less than 10 hours worked';
    END IF;
    IF counter > 48 THEN
      RAISE EXCEPTION 'More than 48 hours worked';
    END IF;
    baseSalary := counter * 8;

    INSERT INTO Salary VALUES (NEW.did, CURRENT_TIMESTAMP, baseSalary, 0.0);   -- in front end we stop them from updating
    RETURN NULL;

  EXCEPTION
    WHEN SQLSTATE '23514' THEN
      GET STACKED DIAGNOSTICS errorMsg = MESSAGE_TEXT;
      RAISE EXCEPTION 'Detected % on %.', errorMsg, day;

  END;
   $$ LANGUAGE plpgsql;
 


 --Trigger 3, it updates the ratings for the restaurants and riders.  When a delivery is completed, the average ratings is calculated
 DROP TRIGGER IF EXISTS part_time_rider_trigger ON Part_time_rider CASCADE;

  CREATE CONSTRAINT TRIGGER part_time_rider_trigger
  AFTER INSERT
  ON Part_time_rider
  deferrable initially deferred
  FOR EACH ROW
  EXECUTE FUNCTION calculateTotalWorkingHours();



DROP FUNCTION IF EXISTS getrestaurantrating;

CREATE OR REPLACE FUNCTION getrestaurantrating(order_id character)
returns bigint as $$
select sum(o.restaurant_rating)

FROM orders o
WHERE o.order_id = order_id;



$$ language sql;

DROP FUNCTION IF EXISTS getrestaurantcount;
CREATE OR REPLACE FUNCTION getrestaurantcount(order_id character)
returns bigint as $$
select  count(o.restaurant_rating)
FROM orders o
WHERE o.order_id = order_id;


$$ language sql;

DROP FUNCTION IF EXISTS getdriverrating;
CREATE OR REPLACE FUNCTION getdriverrating(order_id char)
returns bigint as $$

select sum(d.delivery_rating)
FROM deliveries d
WHERE d.order_id = order_id;

$$ language sql;

DROP FUNCTION IF EXISTS getDriverCount;
CREATE OR REPLACE FUNCTION getDriverCount(order_id char)
returns bigint as $$
select  count(d.delivery_rating)
FROM deliveries d
WHERE d.order_id = order_id;
$$ language sql;


DROP FUNCTION IF EXISTS fn_updateEveryThing() CASCADE;

  create or replace function fn_updateEveryThing() returns trigger as
    $$
    DECLARE
    restaurant_ratingss bigint;
    driver_ratingss bigint;
    no_of_restaurantss bigint;
    no_of_driverss bigint;
    BEGIN



    -- update RESTAURANT Rating
    restaurant_ratingss =  getrestaurantrating(NEW.order_id);
    no_of_restaurantss =  getrestaurantcount(NEW.order_id);
    RAISE NOTICE '%', restaurant_ratingss;
    RAISE NOTICE '%', no_of_restaurantss;
    UPDATE restaurants r
    SET sum_all_ratings = (restaurant_ratingss / no_of_restaurantss)
    FROM orders o
    WHERE r.restaurant_name = o.restaurant_name;


    -- update rating for driver

    driver_ratingss =  getDriverRating(NEW.order_id);
    no_of_driverss =  getDriverCount(NEW.order_id);
    RAISE NOTICE '%', driver_ratingss;
    RAISE NOTICE '%', no_of_driverss;

   UPDATE Delivery_riders dr
   SET sum_all_ratings = driver_ratingss / no_of_driverss
   FROM orders o
   WHERE o.did = dr.did;






  return new;


    end;
  $$ language plpgsql;



drop trigger if exists tr_updateEveryThing on orders;
create trigger tr_updateEveryThing
  after INSERT
  on deliveries
  for each ROW
execute function fn_updateEveryThing();

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

-- Create the trigger

  CREATE OR REPLACE FUNCTION compute_total_cost_and_rewards () RETURNS TRIGGER
  AS $$
  DECLARE
    customer_id varchar(30);
    total real;
    rp_gained integer;
    delivery_cost real;
    BEGIN

    -- get the cid
    SELECT P.cid INTO customer_id
    FROM Places P
    WHERE P.order_id = NEW.order_id;

    -- get Total
    SELECT P.total_cost into total
    from Places P
    WHERE P.order_id = NEW.order_id;

    -- calculate reward points gained (round down the subtotal)
    rp_gained = FLOOR(total) - NEW.reward_points_used;

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



--set the trigger
 DROP TRIGGER IF EXISTS deliveries_trigger ON Deliveries CASCADE;

  CREATE TRIGGER deliveries_trigger
  AFTER INSERT
  ON Deliveries
  FOR EACH ROW
  EXECUTE FUNCTION compute_total_cost_and_rewards();



-- QUERY 1: MOST POPULAR FOOD ITEMS

-- with food_items_ordered as
-- (select O.food_item_name, sum(qty) as totalQty
-- from food_items_in_orders O join deliveries D
--   on (O.order_id = D.order_id)
-- where D.time_customer_placed_order > '2020-04-01 00:00:00'
--   and D.time_customer_placed_order < '2020-05-01 00:00:00'
--   and O.restaurant_name = $1
-- group by food_item_name)
-- select F.food_item_name,
-- CAST(totalQty AS float) /
--  DATE_PART('day', $3::timestamp - $2::timestamp)
--  as avg_Qty_Per_Day,
--  daily_limit,
--  CAST(totalQty AS float) /
--  DATE_PART('day', $3::timestamp - $2::timestamp) / daily_limit
--  as qty_to_limit_ratio
-- from food_items F join food_items_ordered O
--   on (F.food_item_name = O.food_item_name)
-- where F.restaurant_name = $1
-- order by qty_to_limit_ratio desc

-- $1: Restaurant Name
-- $2: Start Date
-- $3: End Date

/**
 * Query 2
 * Present a table of available riders sorted by most available to least available.
 * Select available full-timers based on whether they are currently on shift - how?
 * Select available part-timers based on whether they are currently on shift - how?
 * Calculate distance from each of these riders' last delivery locations to the current delivery's location
 * order by distance
 * limit 1
 *
 * shifts(
   shift_id SERIAL, -- 1,2,3,4
   shift_start_time timestamp,
   shift_end_time timestamp,
   shift2_start_time timestamp,
   shift2_end_time timestamp,
   primary key(shift_id)

)
 */

-- Helper functions
-- mod function x mod y returns a value between 0 inclusive and y exclusive. y must be positive.

CREATE OR REPLACE FUNCTION MY_MOD(X integer, Y integer)
returns integer as
$$
DECLARE
  final_val integer = MOD(X,Y);
BEGIN
  IF final_val < 0 THEN
    final_val = final_val + Y;
  END IF;
RETURN final_val;
END;
$$ language plpgsql;
  
--convert 3 letter weekday into a number

CREATE OR REPLACE FUNCTION MY_DAY(wd char(3))
returns integer as
$$
  select case
    when wd = 'sun' then 0
    when wd = 'mon' then 1
    when wd = 'tue' then 2
    when wd = 'wed' then 3
    when wd = 'thu' then 4
    when wd = 'fri' then 5
    when wd = 'sat' then 6
  end;
$$ language sql;


--function to find out if a full-time rider is working on the CURRENT_DATE

      CREATE OR REPLACE FUNCTION IS_FULL_TIMER_WORKING(driver varchar(30))
      returns integer as
      $$
        DECLARE
          start_day_of_week INTEGER;
          start_day char(3);
          shift_num INTEGER;
          difference INTEGER;
          one_start INTEGER;
          one_end INTEGER;
          two_start INTEGER;
          two_end INTEGER;
          current_day_of_week INTEGER := EXTRACT(DOW FROM CURRENT_TIMESTAMP);

        BEGIN
         --get first work day as a DOW
          SELECT wws_start_day into start_day
          FROM Full_time_rider F
          WHERE did = driver;
          start_day_of_week := MY_DAY(start_day);
          RAISE NOTICE 'start on %', start_day_of_week;
          RAISE NOTICE 'today is %', current_day_of_week;
          --calculate difference in days
          difference := MY_MOD(current_day_of_week - start_day_of_week, 7);
          IF difference > 5 THEN
            return 0;
          ELSE
            FOR i in 0..4 LOOP
              CONTINUE WHEN start_day_of_week + i <> current_day_of_week;
              RAISE NOTICE 'i is %' , i;
              IF i = 0 THEN
                SELECT day1_shift INTO shift_num
                from Full_Time_Rider
                WHERE did = driver;
              ELSIF i = 1 THEN
                SELECT day2_shift INTO shift_num
                from Full_Time_Rider
                WHERE did = driver;
              ELSIF i = 2 THEN
                SELECT day3_shift INTO shift_num
                from Full_Time_Rider
                WHERE did = driver;
              ELSIF i = 3 THEN
                SELECT day4_shift INTO shift_num
                from Full_Time_Rider
                WHERE did = driver;
              ELSIF i = 4 THEN
                SELECT day5_shift INTO shift_num
                from Full_Time_Rider
                WHERE did = driver;
              END IF;
            END LOOP;
            SELECT EXTRACT(hour FROM shift_start_time) INTO one_start
            from shifts
            where shift_id = shift_num;
            RAISE NOTICE 'one_start = %', one_start;
            SELECT EXTRACT(hour FROM shift_end_time) INTO one_end
            from shifts
            where shift_id = shift_num;
            RAISE NOTICE 'one_end = %', one_end;
            SELECT EXTRACT(hour FROM shift2_start_time) INTO two_start
            from shifts
            where shift_id = shift_num;
            RAISE NOTICE 'two_start = %', two_start;
            SELECT EXTRACT(hour FROM shift2_end_time) INTO two_end
            from shifts
            where shift_id = shift_num;
            RAISE NOTICE 'two_end = %', two_end;
            RAISE NOTICE 'current hour = %', EXTRACT(hour from CURRENT_TIMESTAMP);
            IF (EXTRACT(hour from CURRENT_TIMESTAMP) BETWEEN one_start and one_end ) OR
            (EXTRACT(hour from CURRENT_TIMESTAMP) BETWEEN two_start and two_end) THEN
              return 1;
            ELSE
              return 0;
            END IF;
          END IF;
        END;
      $$ language plpgsql;


--function to check if part_time rider is currently working

CREATE OR REPLACE FUNCTION IS_PART_TIMER_WORKING(driver varchar(30))
returns integer as
$$
  DECLARE
  sched bigint := 0;
  sched_temp bigint := 0;
  lastDigit integer;
  start_time INTEGER := 21;
  currHour integer := EXTRACT(HOUR FROM CURRENT_TIMESTAMP);
  dayofweek integer := EXTRACT(DOW FROM CURRENT_TIMESTAMP);
  BEGIN
    IF dayofweek = 0 THEN
      SELECT sun INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 1 THEN
      SELECT mon INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 2 THEN
      SELECT tue INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 3 THEN
      SELECT wed INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 4 THEN
      SELECT thu INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 5 THEN
      SELECT fri INTO sched
      FROM part_time_rider
      WHERE did = driver;
    ELSIF dayofweek = 6 THEN
      SELECT sat INTO sched
      FROM part_time_rider
      WHERE did = driver;
    END IF;
    sched_temp := sched;
    WHILE sched_temp > 0 LOOP
      lastDigit := MOD(sched_temp, 10);
      IF (lastDigit = 1) AND start_time = currHour THEN
        return 1;
      END IF;
      start_time := start_time - 1;
      sched_temp := sched_temp / 10;
    END LOOP;
    return 0;
  END;
$$ language plpgsql;


--the query to pull all available riders
-- 
-- WITH AvailableRiders AS (SELECT did from Delivery_riders
--   WHERE did in (
--     select did from Full_time_rider F
--       where EXTRACT(MONTH from CURRENT_TIMESTAMP) = EXTRACT(MONTH FROM F.month_of_work)
--   )
--   AND IS_FULL_TIMER_WORKING(did) = 1
--   UNION
--   SELECT did from Delivery_riders
--   WHERE did in (select did from Part_time_rider P
--          where EXTRACT(WEEK from CURRENT_TIMESTAMP) = EXTRACT(WEEK FROM P.week_of_work))
--   AND IS_PART_TIMER_WORKING(did) = 1
-- )
-- ,
-- LastLocationOfRiders AS (
-- select *
-- from AvailableRiders R left join Deliveries D
-- on R.did = D.driver
-- left join Addresses A
-- on D.street_name = A.street_name
-- and D.building = A.building
-- and D.unit_num = A.unit_num
-- and D.postal_code = A.postal_code
-- and time_rider_delivers_order = (
-- SELECT MAX(time_rider_delivers_order)
-- from Deliveries D2
-- where D2.driver = D.driver)

-- )

-- select did, lat, lon, 3956 * 2 * ASIN(SQRT(  POWER(SIN((lat - $1) * pi()/180 / 2), 2) +  COS(lat * pi()/180) *  COS($1 * pi()/180) *  POWER(SIN((lon -$2) * pi()/180 / 2), 2)  )) as d
-- from LastLocationOfRiders
-- order by d asc nulls first
-- limit 1;

-- 

--NOTE THAT THIS ABOVE FUNCTION THROWS AN ERROR BECAUSE $1 and $2 are not defined.


insert into users values('full-time', 'p');`)

insert into delivery_riders values ('full-time', 20, 10); `)

insert into full_time_rider values ('full-time', '2020-04-01', 'thu',2,2,2,2,2);`)
insert into users values('part-time', 'p');`)
insert into delivery_riders values ('part-time', 20, 10);
`)
insert into part_time_rider values ('part-time', '2020-04-16', 0,0,0,011101110111,011101110111,011101110111,011101110111);
`)




-- query 3, get the most popular hour and name in the past month
select fio.food_item_name, EXTRACT (HOUR from d.time_customer_placed_order), count(*) as count
from Food_items_in_Orders fio, Deliveries d
where fio.order_id = d.order_id AND d.time_customer_placed_order >= date_trunc('month', current_date - interval '1' month)
  and d.time_customer_placed_order < date_trunc('month', current_date)
group by fio.food_item_name,d.time_customer_placed_order
order by count desc;


--FDS manager
--total no. of new customers
select count(c.cid), Extract( Month from c.join_date)
FROM Customers c
group by c.cid, c.join_date
order by c.join_date;


--total no. of orders

select count(o.order_id),  Extract(Month from d.time_customer_placed_order)
From Orders o,Deliveries d
WHERE o.order_id = d.order_id
group by o.order_id,d.time_customer_placed_order
order by d.time_customer_placed_order ASC;


--total cost of all orders
select sum(p.total_cost), Extract(Month from d.time_customer_placed_order)
FROM places p, deliveries d, Customers c
WHERE p.order_id = d.order_id AND p.cid = c.cid
group by p.total_cost, d.time_customer_placed_order
order by d.time_customer_placed_order ASC;



--2) for each customer in each month
--total number of orders placed
select count(p.cid), Extract (Month from d.time_rider_delivers_order), c.customer_name
from places p, deliveries d, customers c
where p.order_id = d.order_id AND p.cid = c.cid
group by p.cid, d.time_rider_delivers_order, c.customer_name
order by d.time_rider_delivers_order ASC;

--total cost of their orders

--3) for each rider in each month
--a) total no. of orders delivered
select count(d.order_id), Extract (Month from d.time_rider_delivers_order), d.driver
from Deliveries d
group by d.order_id, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;

--b) total hours worked


--c) total salary earned

--d) avg delivery time
select avg(d.time_rider_delivers_order - d.time_customer_placed_order::timestamptz), d.time_rider_delivers_order
FROM Deliveries d
group by d.time_rider_delivers_order - d.time_customer_placed_order::timestamptz,d.time_rider_delivers_order
order by d.time_rider_delivers_order ASC;

--e) no of ratings received
select sum(d.delivery_rating), Extract(Month from d.time_rider_delivers_order), d.driver
from deliveries d
group by d.delivery_rating, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;

--f) avg. ratings received
select avg(d.delivery_rating), Extract(Month from d.time_rider_delivers_order), d.driver
from deliveries d

group by d.delivery_rating, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;


--Restaurant staff

--1) in each month:
--a) total no. of completed orders
select count(d.time_rider_delivers_order),Extract(Month from d.time_rider_delivers_order), fio.restaurant_name
from Food_items_in_orders fio,deliveries d
where fio.order_id = d.order_id
group by d.time_rider_delivers_order, fio.restaurant_name
order by d.time_rider_delivers_order ASC;


--b) total cost of all completed order
select sum(p.total_cost), Extract(Month from d.time_rider_delivers_order)
FROM Places p, Deliveries d
WHERE p.order_id = d.order_id AND d.time_rider_delivers_order <> NULL
group by p.total_cost,d.time_rider_delivers_order
order by d.time_rider_delivers_order ASC;

--c) top 5 favourite food items
select max(fio.food_item_name), Extract(Month from d.time_rider_delivers_order)
FROM Food_items_in_orders fio, Deliveries d
WHERE fio.order_id = d.order_id
group by fio.food_item_name, d.time_rider_delivers_order
order by fio.food_item_name
limit 5;


--2) rider
--total orders delivered
select count(d.order_id), Extract(Month from d.time_rider_delivers_order),d.driver
FROM Deliveries d
GROUP BY d.order_id,d.time_rider_delivers_order,d.driver
ORDER BY d.driver;


--Riders

  -- total no of hours worked
  -- total salary earned


/*
create or replace function fn_setPartTimeRider() returns trigger as
  $$
declare
   working_hours integer;
begin
   if(not exists (select 1 from Part_Time_Rider where part_time_rider.did = coalesce(new.did, old.did))) then return null;
   end if;

   select sum(mon::bit(4)::integer + tue::bit(4)::integer + wed::bit(4)::integer + thu::bit(4)::integer + fri::bit(4)::integer + sat::bit(4)::integer + sun::bit(4)::integer )
   into working_hours
   from part_time_rider
   where part_time_rider.did = coalesce(new.did, old.did)
   and part_time_rider.week_of_work = coalesce(new.week_of_work,old.week_of_work);

   if (working_hours <10 or working_hours is null)
   then
       raise exception 'Work hours are less than the required of 10 hours';
   elseif(working_hours > 48)
   then
       raise exception 'Work hours exceed 48 hours';
   end if;

  if (exists(select 1
              from Salary
              where salary.did = coalesce(new.did,old.did)

              ))
  then
      update salary
      set base = working_hours * 8,
          bonus = 0
      where salary.did = coalesce(new.did,old.did)

      ;
      return null;
  end if;

  insert into salary
    values (new.did, CURRENT_DATE, working_hours * 8, 0);
  return null;
end;
$$  language plpgsql;`)

drop trigger if exists tr_setPartTimeSchedule on part_time_rider cascade;
create constraint trigger tr_setPartTimeSchedule
  after update or insert or delete
  on part_time_rider
  deferrable initially deferred
  for each row
execute function fn_setPartTimeRider();`)


create or replace function fn_updateTotalPrice() returns trigger as
  $$
  begin
    update places
    set totalcost = totalcost + (select fi.price
                                 from food_items fi, food_items_in_orders fio
                                 where fi.food_item_name = fio.food_item_name AND
                                 fi.rid = fio.rid
                               ) + 1
    where places.order_id = new.order_id;
    return null;
end;
$$ language plpgsql;`)

drop trigger if exists tr_totalPrice on Places cascade;
create trigger tr_totalPrice
  after insert
  on places
  for each ROW
execute function fn_updateTotalPrice();`)

create or replace function fn_resetNumOrders() returns trigger as
  $$
  BEGIN
  update food_items
  set num_orders_made = 0;

  return new;

  end;
$$ language plpgsql;`)
drop trigger if exists tr_resetNumOrders on food_items;
create trigger tr_resetNumOrders
  after insert
  on food_items
  for each ROW
execute function fn_resetNumOrders();`)
*/
