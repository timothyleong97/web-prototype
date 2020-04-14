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
    foreign key(cid) references Users(userid) ON UPDATE CASCADE ON DELETE CASCADE
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
    totalCost real default 1,
    primary key(order_id, cid),
    foreign key(order_id) references orders(order_id),
    foreign key(cid) references Customers(cid) ON UPDATE CASCADE
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
    building_num char(30),
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
    Foreign key(rid) references restaurants(rid) ON UPDATE CASCADE ON DELETE CASCADE
);`)

query(`create table Options(
    options_name varchar(30) UNIQUE,
    type_of_option varchar(30),
    addon_price real,
    rid varchar(30) not null,
    food_item_name VARCHAR(30) not null,
    primary key(options_name,type_of_option,rid),
    foreign key (rid,food_item_name) references food_items(rid,food_item_name) ON UPDATE cascade ON DELETE cascade
);`)

query(`create table Food_items_in_Orders(
    qty INTEGER,
    order_id VARCHAR(11),
    food_item_name VARCHAR(30),
    rid VARCHAR(30) not null,
    options_name varchar(30),
    primary key(order_id,food_item_name),
    foreign key(order_id) references Orders(order_id),
    foreign key(rid,food_item_name) references Food_items(rid,food_item_name),
    foreign key(options_name) references Options(options_name) ON UPDATE CASCADE ON DELETE CASCADE
);`)

query(`create table Set_meals(
    set_meal_id VARCHAR(30),
    primary key(set_meal_id)
);`)



query(`create table FDS_promotion(
    fds_promo char(10) PRIMARY KEY references promotions(promo_code));
`)

query(`create table Restaurant_promotion(
    restaurant_promo char(10) primary KEY references promotions(promo_code));
`)

query(`create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) on delete cascade ON UPDATE CASCADE
);`)

query(`create table Restaurant_Staff(
    staff_id varchar(30) primary key,
    foreign key(staff_id) REFERENCES Users(userid) on delete cascade ON UPDATE CASCADE
);`)

query(`create table Delivery_Riders(
    did varchar(30),
    start_work_date timestamp,
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),
    foreign key(did) REFERENCES Users(userid) on delete cascade ON UPDATE CASCADE
);`)

query(`create table Salary(
    did varchar(30),
    salary_date timestamp,
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) ON UPDATE CASCADE ON DELETE cascade
);`)

query(`create table Time_Entries(
    did varchar(30),
    clock_in TIMESTAMP,
    clock_out TIMESTAMP,
    primary key(did, clock_in),
    foreign key(did) REFERENCES Delivery_Riders(did) ON UPDATE CASCADE ON DELETE cascade
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
    foreign key(did) REFERENCES Delivery_Riders ON UPDATE CASCADE ON DELETE cascade
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
    foreign key(did) REFERENCES Delivery_Riders(did) ON UPDATE CASCADE ON DELETE cascade
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
    foreign key(order_id) references Orders(order_id) ON UPDATE CASCADE ON DELETE cascade,
    foreign key(driver) references Delivery_Riders(did) ON UPDATE CASCADE ON DELETE cascade,
    foreign key(delivers_to) references Addresses(address_id) ON UPDATE CASCADE ON DELETE cascade
);`)

query(`CREATE TABLE opening_hours_template (
    id SERIAL PRIMARY KEY,
    restaurant_id varchar(30) NOT NULL REFERENCES restaurants(rid) ON UPDATE CASCADE ON DELETE CASCADE,
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

query(`create or replace function fn_setPartTimeRider() returns trigger as
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

query(`drop trigger if exists tr_setPartTimeSchedule on part_time_rider cascade;
create constraint trigger tr_setPartTimeSchedule
  after update or insert or delete
  on part_time_rider
  deferrable initially deferred
  for each row
execute function fn_setPartTimeRider();`)

query(`create or replace function fn_setFullTimeSchedule() returns trigger as
  $$
begin
  if(exists(select 1
            from Salary
            where Salary.did = new.did
          ))
  then
     update Salary
       set base_salary = 4 * 5 * 10,
           commission = 0
       where salary.did = new.did;

        return null;
     end if;

     insert into Salary
      values (new.did, CURRENT_DATE, 160 * 10,0);
      return null;
end;
$$ language plpgsql;`)

query(`drop trigger if exists tr_setFullTimeSchedule on Full_Time_Rider cascade;
create trigger tr_setFullTimeSchedule
  after update or insert
  on Full_Time_Rider
  for each row
execute function fn_setFullTimeSchedule();`)

query(`create or replace function fn_calculateFee() returns trigger as
  $$
declare
  num_orders_made float;
  fee float :=1;
begin
  select count(order_id)
  into num_orders_made
  FROM places
  WHERE cid = new.cid;


  if (num_orders_made < 10) then
     fee = fee + 5;
  else if (num_orders_made>= 10 and num_orders_made < 20) then
     fee = fee + 4.5;
  else if (num_orders_made >= 20 and num_orders_made < 30) then
     fee = fee + 4;
  else if (num_orders_made >= 30 and num_orders_made < 40) then
     fee = fee + 3.5;
  else if (num_orders_made >=40) then
     fee = fee + 3;

      end if;
    end if;
  end if;
 end if;
 end if;
 new.delivery_fee = fee;
return new;

end;
$$ language plpgsql;`)

query(`drop trigger if exists tr_calculateFee on Places cascade;
create trigger tr_calculateFee
  before insert
  on Places
  for each row
execute function fn_calculateFee();`)

query(`create or replace function fn_updateTotalPrice() returns trigger as
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

query(`drop trigger if exists tr_totalPrice on Places cascade;
create trigger tr_totalPrice
  after insert
  on places
  for each ROW
execute function fn_updateTotalPrice();`)

query(`create or replace function fn_resetNumOrders() returns trigger as
  $$
  BEGIN
  update food_items
  set num_orders_made = 0;

  return new;

  end;
$$ language plpgsql;`)
query(`drop trigger if exists tr_resetNumOrders on food_items;
create trigger tr_resetNumOrders
  after insert
  on food_items
  for each ROW
execute function fn_resetNumOrders();`)


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
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(3,'01673 Prairie Rose Center','67','06-992','894194');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(4,'51059 Donald Circle','65','04-311','518902');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(5,'5 Ryan Junction','501','014-138','401187');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(6,'65147 Glendale Road','545','06-547','812826');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(7,'704 Butterfield Pass','301','05-273','323293');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(8,'85 Stephen Terrace','454','014-762','533718');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(9,'72345 Johnson Place','397','05-839','629738');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(10,'88589 Lawn Park','293','23-621','614155');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(11,'66264 Commercial Crossing','444','010-750','117504');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(12,'0774 Vidon Road','352','43-831','982301');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(13,'6569 Ruskin Avenue','231','05-404','204169');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(14,'7 Dahle Drive','94','07-278','659131');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(15,'09214 Susan Alley','506','04-646','350462');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(16,'2 American Junction','5','10-131','444146');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(17,'323 Boyd Park','343','13-282','665519');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(18,'1 Loftsgordon Lane','206','10-520','631539');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(19,'9 Merry Junction','309','08-129','444350');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(20,'88 Dahle Alley','230','04-226','168649');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(21,'12 North Place','128','09-135','585548');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(22,'55175 Kropf Street','85','12-336','813339');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(23,'39785 Meadow Valley Point','449','08-923','491547');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(24,'12722 Jay Parkway','85','011-403','660008');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(25,'101 Lighthouse Bay Way','370','08-510','449106');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(26,'969 Bunker Hill Alley','304','04-964','517031');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(27,'40 Eagle Crest Place','316','010-535','186516');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(28,'9541 Talisman Drive','297','04-492','561333');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(29,'57512 Independence Crossing','396','06-115','324997');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(30,'5 Mitchell Crossing','382','08-926','486416');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(31,'7 Kings Trail','183','31-138','494340');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(32,'681 Mayer Junction','581','014-143','401708');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(33,'81947 Bartillon Pass','52','06-195','234466');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(34,'475 Thompson Road','212','05-603','490613');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(35,'20 Amoth Hill','378','07-952','921968');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(36,'94211 Acker Way','168','05-420','135998');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(37,'301 Fremont Lane','19','010-329','901441');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(38,'231 Burning Wood Trail','287','07-607','213485');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(39,'74809 Crowley Junction','200','012-394','294347');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(40,'2296 Hansons Drive','87','010-212','851150');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(41,'877 Bluestem Point','597','08-392','283444');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(42,'11138 Arkansas Lane','505','011-347','109213');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(43,'1489 Green Ridge Crossing','62','011-558','792225');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(44,'43 Carey Drive','133','05-702','473870');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(45,'83 Everett Park','305','012-563','461896');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(46,'303 Vernon Point','385','08-678','231258');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(47,'1 Bunting Lane','545','014-592','377730');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(48,'57 Washington Court','479','06-534','607372');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(49,'34 Crescent Oaks Trail','344','03-324','656163');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(50,'6 Kenwood Drive','102','04-174','513062');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(51,'72 Oxford Lane','35','012-23','559997');`)
query(`INSERT INTO addresses(address_id,street_name,building_num,unit_num,postal_code)
VALUES(52,'16711 Carpenter Park','52','09-171','586172');`)

query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(1,60,1,'Dian Xiao er');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(2,20,2,'Subway');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(3,32,3,'The Deconstructed Grocery Store');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(4,43,4,'The Cool Panda');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(5,43,5,'The Clear Well');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(6,47,6,'Robot');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(7,21,7,'Purity');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(8,42,8,'The Cellar');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(9,42,9,'The Tulip');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(10,39,10,'Forester');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(11,30,11,'The Private Monkey');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(12,25,12,'The Chocolate Lane');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(13,38,13,'The Square Mission');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(14,33,14,'The Copper Parlour');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(15,46,15,'The Holy Elephant');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(16,45,16,'The Tower');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(17,43,17,'The Hog');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(18,36,18,'Happening');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(19,40,19,'Retro');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(20,50,20,'Jewel');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(21,35,21,'The Big Brewery');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(22,27,22,'The Cool Cat Vine');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(23,28,23,'The Greek Vine');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(24,38,24,'The Beach Dome');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(25,21,25,'The Fable Elephant');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(26,44,26,'The Crown');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(27,26,27,'Unwind');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(28,32,28,'Blossoms');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(29,32,29,'Paramount');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(30,21,30,'Burger Place');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(31,20,31,'The Savory Well');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(32,41,32,'The Big Harvest');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(33,23,33,'The Savory Fence');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(34,22,34,'The Jazz Empress');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(35,44,35,'The Royal Parlour');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(36,31,36,'Gem');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(37,39,37,'Intermezzo');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(38,40,38,'Little Persia');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(39,23,39,'The Vineyard');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(40,31,40,'Friends');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(41,41,41,'The Friendly Ship');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(42,48,42,'The Salty Road');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(43,22,43,'The Bright Road');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(44,24,44,'The Pink Barbecue');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(45,23,45,'The Chocolate Shack');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(46,48,46,'Laguna');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(47,22,47,'Aqua');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(48,29,48,'The Mockingbird');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(49,40,49,'Embers');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(50,39,50,'Big Burger Bar');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(51,31,51,'The Mellow Well');`)
query(`INSERT INTO restaurants(rid,min_order_amt,located_at,restaurant_name)
VALUES(52,24,52,'The Japanese Window');`)


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
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Sesame Seed Black',4.8,'Grocery',39,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cookies - Assorted',5.5,'Grocery',25,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cookie Double Choco',6.3,'Grocery',10,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Bread Ww Cluster',5.4,'Grocery',47,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Potato - Sweet',9,'Grocery',17,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Bag - Regular Kraft 20 Lb',8.4,'Grocery',15,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Soup - Cream Of Broccoli',5.8,'Grocery',43,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Tea - Apple Green Tea',3.4,'Grocery',39,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Tia Maria',4.4,'Grocery',26,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Wine - Rubyport',2.8,'Grocery',34,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Mayonnaise',8.6,'Grocery',37,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Soup - Campbells Beef Stew',8.8,'Grocery',18,0,3);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Wine - George Duboeuf Rose',1.1,'Grocery',46,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Irish Cream - Butterscotch',5.9,'Grocery',41,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cheese - Mozzarella',2.4,'Grocery',14,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Beer - Corona',7.5,'Grocery',15,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Fruit Mix - Light',6.1,'Grocery',21,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Piping Jelly - All Colours',5.4,'Grocery',17,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Spice - Pepper Portions',1.5,'Grocery',27,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Potatoes - Peeled',4.8,'Grocery',22,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Pepper - Yellow Bell',5.1,'Grocery',12,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Beef - Bresaola',5.9,'Grocery',27,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Beer - Heinekin',10,'Grocery',14,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Banana',8.8,'Grocery',20,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cheese - Brie,danish',0.5,'Grocery',29,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cranberries - Frozen',5.2,'Grocery',48,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Bread - 10 Grain Parisian',5.8,'Grocery',49,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Ecolab Crystal Fusion',2.9,'Grocery',41,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Chicken Giblets',6.9,'Grocery',25,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Yucca',8.8,'Grocery',47,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Olives - Kalamata',4.4,'Grocery',49,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Zucchini - Green',6.4,'Grocery',42,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cookies Almond Hazelnut',5.7,'Grocery',26,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cookies - Englishbay Oatmeal',4,'Grocery',16,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Flour - Whole Wheat',4.5,'Grocery',40,0,4);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Pressure-Cooked Pine Boar',3.8,'Wild',50,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Slow-Cooked Apples Bear',7.6,'Wild',46,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Smoked Honey & Almond Cod',6.6,'Wild',14,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Seared Tortilla',9.2,'Mexican',21,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cherry and Raspberry Toast',5.3,'Dessert',11,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Chestnut and Honey Cake',9,'Dessert',21,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Date Tarte Tatin',7.5,'Dessert',35,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Vanilla Trifle',2.1,'Dessert',23,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cured Ginger Venison',4.2,'Wild',16,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Roast Sweet Chicken',7.8,'Western',24,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Breaded Pineapple Frog',0.6,'Wild',10,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Seared Mustard Fish',9.4,'Western',50,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Simmered Garlic Sandwich',5.1,'Western',34,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cooked Winter Greens',6.4,'Western',23,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('White Walnut Mooncake',3,'Dessert',24,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cinnamon & Walnut Cake',1.6,'Dessert',32,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Red Wine Sundae',4.7,'Dessert',21,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Walnut Strudel',3.6,'Dessert',43,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Simmered Honey Pigeon',2.2,'Wild',23,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Deep-Fried Pepper Boar',5.7,'Wild',50,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Infused Vinegar Cockles',2.8,'Western',33,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Broasted Juniper Snapper',10,'Western',31,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Pressure-Pot Peanuts & Risotto',7.3,'Western',23,0,5);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Steamed Dark Beer Linguine',1.1,'Western',42,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Chocolate and Blueberry Roll',1.9,'Dessert',33,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Choco and Mandarin Jelly',7.5,'Dessert',20,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Kiwi Pie',6.8,'Dessert',26,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Plum Pavlova',0.9,'Dessert',33,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Oven Pheasant',1.7,'Wild',17,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Fried White Wine Mutton',5.2,'Western',24,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Tea-Smoked Sweet & Fresh Tuna',1,'Western',36,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Barbecued Pineapple Lobster',9.4,'Western',45,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Lime Vegetables',2.6,'Western',38,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Tenderized Potatoes',3.3,'Western',21,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cherry and Papaya Cone',0.5,'Dessert',35,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Almond and Plum Pudding',2.9,'Dessert',25,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Passionfruit Molten Cake',0.6,'Dessert',12,0,6);`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Pecan Genoise',5.6,'Dessert',47,0,6);`)

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
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('small','Size',0,5,'Pressure-Cooked Pine Boar');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('medium','Size',2,5,'Pressure-Cooked Pine Boar');`)
query(`INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('large','Size',4,5,'Pressure-Cooked Pine Boar');`)

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
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(3,'bad',1,5);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(4,'Great',5,15);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(5,'average',3,5);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(6,null,null,null);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(7,null,null,null);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(8,'poor',2,10);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(9,null,null,null);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(10,null,4,10);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(11,'Good',4,null);`)
query(`INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(12,'Good',4,null);`)



query(`INSERT INTO places(order_id,cid)
VALUES(1,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(2,'undertaker');`)
query(`INSERT INTO places(order_id,cid)
VALUES(3,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(4,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(5,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(6,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(7,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(8,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(9,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(10,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(11,'Jay Park');`)
query(`INSERT INTO places(order_id,cid)
VALUES(12,'Jay Park');`)





query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('FFS',1,0);`)
query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('10%OFF',2,0);`)

query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(3,1,1,'Chicken Rice');`)
query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(1,2,2,'Cold cut trio');`)

// Queries for FDS Manager
query('select unique fds_promo as FDS Promotion from FDS_Promotion;') //see fds promotions
query ('select unique restaurant_promo as Restaurant Promotions from Restaurant_promotion;') //see rest promotions
query('select unique fds_promo as FDS Promotion from FDS_Promotion union select unique restaurant_promo as Restaurant Promotions from Restaurant_promotion;') //see all promotions
query('select count(cid), count(order_id), sum(costs) from ?? group by Month(join_date)') // undone
// each month, total number of new customers, total orders, total cost of all orders
// each month and each customer who placed some order for that month, total number of orders placed by the customer for that month and the total cost of all these orders
// for each hour and each delivery location area, total number of orders placed at that hour for that location area
// each rider and each month, total number of orders delivered by the rider for that motnh, total hours worked, total salary earned, average delivery time, number of ratings, average ratings for that month


// See available riders
query(`select did as Name from Time_Entries where (clock_in != null and clock_out = null);`)

// Restaurant related queries
query('select unique category as FoodCategory from Food_items;')
query('select food_item_name as Item, category as FoodCategory from Food_items group by category;')
query('select unique food_item_name as Item from Food_items from Food_items order by category limit(5);')

// Customer's 5 most recent addresses
query('select cid as CustomerName, address as Address from Customers group by cid limit (5);')

// Queries for customers
// let customers view their reviews forthe restaurant

// Queries for restaurant staff

// Queries for delivery riders
