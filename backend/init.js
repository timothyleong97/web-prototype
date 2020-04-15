const client = require('./elephantsql');
const chalk = require('chalk'); //for coloring console output

const query = q => client.query(q)
.then(result => console.log(result.command))
.catch(e => console.error(q + chalk.bgRed(e.stack)));

//To run this script, type 'node init.js'. This script rebuilds the whole database.

// DROP all existing tables
query(`DROP TABLE IF EXISTS addresses cascade;`);
query(`
DROP TABLE IF EXISTS customers cascade;`);
query(`
DROP TABLE IF EXISTS deliveries cascade;`);
query(`
DROP TABLE IF EXISTS delivery_riders cascade;`);
query(`
DROP TABLE IF EXISTS fds_manager cascade;`);
query(`
DROP TABLE IF EXISTS fds_promotion cascade;`);
query(`
DROP TABLE IF EXISTS food_items cascade;`);
query(`
DROP TABLE IF EXISTS food_items_in_orders cascade;`);
query(`
DROP TABLE IF EXISTS full_time_rider cascade;`);
query(`
DROP TABLE IF EXISTS opening_hours_template cascade;`);
query(`
DROP TABLE IF EXISTS options cascade;`);
query(`
DROP TABLE IF EXISTS orders cascade;`);
query(`
DROP TABLE IF EXISTS part_time_rider cascade;`);
query(`
DROP TABLE IF EXISTS places cascade;`);
query(`
DROP TABLE IF EXISTS promotions cascade;`);
query(`
DROP TABLE IF EXISTS restaurant_promotion cascade;`);
query(`
DROP TABLE IF EXISTS restaurant_staff cascade;`);
query(`
DROP TABLE IF EXISTS restaurants cascade;`);
query(`
DROP TABLE IF EXISTS salary cascade;`);
query(`
DROP TABLE IF EXISTS set_meals cascade;`);
query(`
DROP TABLE IF EXISTS time_entries cascade;`);
query(`
DROP TABLE IF EXISTS Users cascade;`);
query(`
DROP TABLE IF EXISTS uses cascade;`);
query(`
DROP TABLE IF EXISTS Salary_Paid_Out cascade;`);
query(`
DROP TABLE IF EXISTS shifts;`);

// USERS
query(`
create table Users(
    userid varchar(30),
    user_password varchar(50) not null,
    primary key(userid),
    unique (userid)
);`);


query(`INSERT INTO users(userid,user_password)
VALUES('undertaker','undertaker');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('Bottleopener','Bottleopener');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('waiter','waiter');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('Manager','manager');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('lewis hamilton','password');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('Thomas Engine','password');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('Jay Park','jay');`
);

query(`
INSERT INTO users(userid,user_password)
VALUES('Akon','convict');`
);


// CUSTOMERS
query(`
create table Customers(
    cid VARCHAR(30),
    customer_name VARCHAR(30) NOT NULL,
    reward_points INTEGER DEFAULT 0,
    join_date DATE,
    credit_card VARCHAR(255), -- only one credit_card
    primary key (cid),
    foreign key(cid) references Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('undertaker','undertaker',0,'2020-04-07', '4258-1234-1010-0000');`
);

query(`
INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('Jay Park','jay',0,'2019-12-07', '4228-1144-1040-0000');`
);
//DELIVERY_RIDERS
query(`
create table Delivery_Riders(
    did varchar(30),
    sum_all_ratings integer,
    num_deliveries integer,
    primary key(did),
    lon float NOT NULL check(-90.0 <= lon AND lon <= 90.0 ),
    lat float NOT NULL check(-180.0 <= lat AND lat <= 180.0),
    foreign key(did) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries,lon,lat)
VALUES('lewis hamilton',0,0,30,100);`
);

query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries,lon,lat)
VALUES('Thomas Engine',4.5,100,-80,120);`
);

// ORDERS
query(`
create table Orders(
    order_id CHAR(11) UNIQUE,
	  restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    did VARCHAR(30),
    primary key (order_id),
    foreign key(did) references Delivery_riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(1,null,null,'lewis hamilton');`
);

query(`

INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(2,'Good',4,'Thomas Engine');`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(3,'bad',1,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(4,'Great',5,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(5,'average',3,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(6,null,null,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(7,null,null,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(8,'poor',2,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(9,null,null,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(10,null,4,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review, restaurant_rating,did)
VALUES(11,'Good',4,null);`
);

query(`
INSERT INTO orders(order_id,restaurant_review,restaurant_rating,did)
VALUES(12,'Good',4,null);`
);

// PROMOTIONS
query(`
create table Promotions (
    promo_code CHAR(10) UNIQUE,
	  promo_start_date date NOT NULL,
    promo_end_date date NOT NULL,
    promo_detail VARCHAR(255),
    primary key (promo_code)
);`);

query(`
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('10%OFF','2020-04-07','2020-05-08','10%OFFEVERYTHING');`
);

query(`
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('FFS','2020-04-07','2020-04-15','FireSale');`
);

// PLACES
query(`
create table Places(
    order_id CHAR(11),
  	cid varchar(30) NOT NULL,
    delivery_fee real default 0.00,
    totalCost real default 0.00,
    primary key(order_id, cid),
    foreign key(order_id) references orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(cid) references Customers(cid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO places(order_id,cid)
VALUES(1,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(2,'undertaker');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(3,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(4,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(5,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(6,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(7,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(8,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(9,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(10,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(11,'Jay Park');`
);

query(`
INSERT INTO places(order_id,cid)
VALUES(12,'Jay Park');`
);

//ADDRESSES
query(`
create table Addresses(
    street_name char(30),
    building varchar(30),
    unit_num char(10),
    postal_code integer,
    lon float NOT NULL check(-90.0 <= lon AND lon <= 90.0 ),
    lat float NOT NULL check(-180.0 <= lat AND lat <= 180.0),
    primary key (street_name,building,unit_num,postal_code)
);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('1 Jurong East','haven way','01-10','21221',0,0);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('2 Tampines East','24','10-02','123421',10,20);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('123 Outram park','serene','110-02','121121',-90,90);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('21 Toa payoh','214','01-02','124421',45,135);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('110 Marina South','2','02-02','122121',-60,60);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('50 Marina Bay','peace building','01-12','100321',-90,100);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('20 Shenton Way','102','05-12','102321',70,120);`
);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('50 Beach rd','1','01-12','101221',-90,-180);`
);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Jurong East','Park Royale','01-10','21221', 30, 60);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('01673 Prairie Rose Center','67','06-992','894194', 0, 0);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('51059 Donald Circle','65','04-311','518902', 60, 120);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('5 Ryan Junction','501','014-138','401187', 50, 10);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('65147 Glendale Road','World trade centre','06-547','812826', 70, 130);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('704 Butterfield Pass','301','05-273','323293', 10, 100);`)

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('85 Stephen Terrace','454','The deck','533718', -52.460869, 57.623873);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('72345 Johnson Place','397','05-839','629738', -88.135875, 86.094160);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('88589 Lawn Park','293','23-621','614155', -21.250454, -55.584994);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('66264 Commercial Crossing','444','010-750','117504', -73.250550, -38.900869);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('0774 Vidon Road','352','43-831','982301', 74.803253, 138.544289);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('6569 Ruskin Avenue','231','05-404','204169', 86.223249, 121.320663);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('7 Dahle Drive','94','07-278','659131', -48.541549, 142.850636);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('09214 Susan Alley','506','04-646','350462', -29.355311, 4.295997);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('2 American Junction','5','10-131','444146', 88.727524, 50.959641);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('323 Boyd Park','343','13-282','665519', -38.384449, 21.538372);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Loftsgordon Lane','206','10-520','631539', -45.031137, 58.699953);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('9 Merry Junction','309','08-129','444350', 30.021383, -159.639914);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('88 Dahle Alley','230','04-226','168649', 48.547073, -42.561450);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('12 North Place','128','09-135','585548', 71.057150, 17.029164);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('55175 Kropf Street','85','12-336','813339', 14.235411, -124.157467);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('39785 Meadow Valley Point','449','08-923','491547', -82.263854, 43.505199);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('12722 Jay Parkway','85','011-403','660008', 29.867159, 65.122983);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('101 Lighthouse Bay Way','370','08-510','449106', 28.520224, -140.748376);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('969 Bunker Hill Alley','304','04-964','517031', 45.481907, -161.354697);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('40 Eagle Crest Place','316','010-535','186516', 58.026825, -103.533379);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('9541 Talisman Drive','297','04-492','561333', -18.641679, -91.098974);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('57512 Independence Crossing','396','06-115','324997', 5.991918, -97.299410);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('5 Mitchell Crossing','382','08-926','486416', -18.641679, -91.098974);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('7 Kings Trail','183','31-138','494340', 5.991918, -97.299410);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('681 Mayer Junction','581','014-143','401708', -13.123385, -97.772387);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('81947 Bartillon Pass','52','06-195','234466', 67.797856, -13.764454);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('475 Thompson Road','212','05-603','490613', -18.888002, -17.664477);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('20 Amoth Hill','378','07-952','921968', 1.911218, -107.209886);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('94211 Acker Way','168','05-420','135998', -52.575330, -175.343942);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('301 Fremont Lane','19','010-329','901441', -47.481769, 78.083661);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('231 Burning Wood Trail','287','07-607','213485', -39.917618, -58.241169);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('74809 Crowley Junction','200','012-394','294347', 47.493814, 4.544010);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('2296 Hansons Drive','87','010-212','851150', -49.300498, -53.534241);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('877 Bluestem Point','597','08-392','283444', 57.811491, 171.441510);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('11138 Arkansas Lane','505','011-347','109213', 59.372669, -1.953414);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1489 Green Ridge Crossing','62','011-558','792225', 18.675885, -138.578967);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('43 Carey Drive','133','05-702','473870', -22.733447, -116.570578);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('83 Everett Park','305','012-563','461896', 78.899237, 14.921618);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('303 Vernon Point','385','08-678','231258', 90.0, -41.850743);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Bunting Lane','545','014-592','377730', -9.186743, -156.220088);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('57 Washington Court','479','06-534','607372', 76.099138, 7.341149);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('34 Crescent Oaks Trail','344','03-324','656163', 80.538588, -22.667186);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('6 Kenwood Drive','102','04-174','513062', 16.619701, -171.037516);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('72 Oxford Lane','35','012-23','559997', 41.736290, -83.774396);`)
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('16711 Carpenter Park','52','09-171','586172', 48.006667, -145.150314);`)


// RESTAURANTS
query(`
create table Restaurants(
    min_order_amt real,
    street_name char(30),
    building varchar(30),
    unit_num char(10),
    postal_code integer,
    restaurant_name VARCHAR(255),
    primary key (restaurant_name),
    foreign key(street_name,building,unit_num,postal_code) references Addresses(street_name,building,unit_num,postal_code) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(60,'1 Jurong East','haven way','01-10','21221','Dian Xiao er');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(20,'2 Tampines East','24','10-02','123421','SubWay');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,'123 Outram park','serene','110-02','121121','Macdonald');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(20,'21 Toa payoh','214','01-02','124421','PokeBowl');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(50,'21 Toa payoh','214','01-02','124421','Crystal Jade');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,'20 Shenton Way','102','05-12','102321','Tian tian chicken rice');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(30,'50 Beach rd','1','01-12','101221','Soup spoon');`
);

query(`
INSERT INTO restaurants(min_order_amt,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,'50 Beach rd','1','01-12','101221','Char grill bar');`
);

//FOOD_ITEMS
query(`
create table Food_items(
    food_item_name VARCHAR(30),
    price real,
    category VARCHAR(255),
    daily_limit integer,
    num_orders_made integer,
    restaurant_name VARCHAR(255) not null,
    primary key (restaurant_name,food_item_name),
    Foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chicken Rice',2.50,'Chinese',50,10,'Dian Xiao er');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Ee Fu Mee',2,'Chinese',50,20,'Dian Xiao er');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fried Rice',4,'Chinese',50,0,'Dian Xiao er');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Shark fin',30,'Chinese',50,0,'Dian Xiao er');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Bird nest',25,'Chinese',50,0,'Dian Xiao er');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cold cut trio',15.50,'Lifestyle',10,0,'SubWay');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tuna',25.50,'Lifestyle',10,0,'SubWay');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Turkey',12.50,'Lifestyle',10,0,'SubWay');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Subway club',13.50,'Lifestyle',10,0,'SubWay');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Big Mac',5.50,'Western',100,0,'Macdonald');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mc chicken',5.50,'Western',100,0,'Macdonald');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mc spicy',5.50,'Western',100,0,'Macdonald');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Samurai burger',5.50,'Western',100,0,'Macdonald');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mcnuggets',5.50,'Western',100,0,'Macdonald');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Healthy stuff',10.50,'Lifestyle',50,0,'PokeBowl');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Vegan meatball',12.50,'Lifestyle',50,0,'PokeBowl');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fruit shake',5.50,'Lifestyle',50,0,'PokeBowl');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Salad bowl',6.50,'Lifestyle',50,0,'PokeBowl');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Brown rice',10.50,'Lifestyle',50,0,'PokeBowl');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chicken Rice',4.50,'Chinese',50,0,'Tian tian chicken rice');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Duck Rice',5.00,'Chinese',50,0,'Tian tian chicken rice');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Roasted Pork',5.50,'Chinese',50,0,'Tian tian chicken rice');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('tao hau',1.50,'Chinese',50,0,'Tian tian chicken rice');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Egg',0.50,'Chinese',50,0,'Tian tian chicken rice');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fish and Chip',5.50,'Western',100,0,'Char grill bar');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pork chop',5.50,'Western',100,0,'Char grill bar');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('steak',5.50,'Western',100,0,'Char grill bar');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chicken chop',5.50,'Western',100,0,'Char grill bar');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('char grill',5.50,'Western',100,0,'Char grill bar');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tomato',10.50,'Soup',100,0,'Soup spoon');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mushroom',12.50,'Soup',100,0,'Soup spoon');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Beef strew',15.50,'Soup',100,0,'Soup spoon');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('corn',17.50,'Soup',100,0,'Soup spoon');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('carrot',15.50,'Soup',100,0,'Soup spoon');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('ABC',5.50,'Soup',100,0,'Crystal Jade');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Salted vegetable',15.50,'Soup',100,0,'Crystal Jade');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pork ribs',15.50,'Soup',100,0,'Crystal Jade');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cure illness',15.50,'Soup',100,0,'Crystal Jade');`
);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('smooth plegm',15.50,'Soup',100,0,'Crystal Jade');`
);

//FOOD_ITEMS_IN_ORDERS
query(`
 create table Food_items_in_Orders(
   qty INTEGER,
   order_id VARCHAR(11),
   food_item_name VARCHAR(30),
   restaurant_name VARCHAR(255) not null,
   primary key(order_id,food_item_name),
   foreign key(order_id) references Orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
   foreign key(restaurant_name,food_item_name) references Food_items(restaurant_name,food_item_name) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO food_items_in_orders(qty,order_id,food_item_name,restaurant_name)
VALUES(3,1,'Chicken Rice','Dian Xiao er');`
);

query(`
INSERT INTO food_items_in_orders(qty,order_id,food_item_name,restaurant_name)
VALUES(1,2,'Cold cut trio','SubWay');`
);

//FDS_PROMOTION
query(`
create table FDS_promotion(fds_promo char(10) PRIMARY KEY references promotions(promo_code));`);

query(`
INSERT INTO FDS_promotion(fds_promo)
VALUES('FFS');`
);

//RESTAURANT_PROMOTION
query(`
create table Restaurant_promotion(restaurant_promo char(10) primary KEY references promotions(promo_code),
                                  restaurant_name VARCHAR(255),
                                  foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
                                );`);

query(`
INSERT INTO restaurant_promotion(restaurant_promo,restaurant_name)
VALUES('10%OFF','Dian Xiao er');`
);

//FDS_MANAGER
query(`
create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO fds_manager(manager_id)
VALUES('Manager');`
);

// RESTAURANT STAFF
query(`
create table Restaurant_Staff(
    staff_id varchar(30) primary key,
    foreign key(staff_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);
query(`
INSERT INTO restaurant_staff(staff_id)
VALUES('waiter');`
);
query(`
INSERT INTO restaurant_staff(staff_id)
VALUES('Akon');`
);

//SALARY
query(`
create table Salary(
    did varchar(30),
    salary_date timestamp, -- time that we calculated their salary
    base_salary real default 0.00,
    commission real default 0.00,
    primary key (did, salary_date),
    foreign key(did) REFERENCES Delivery_Riders(did) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('lewis hamilton','2000-10-10',100,10);`
);

query(`
INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('Thomas Engine','2010-10-10',100,10);`
);

//FULL_TIME_RIDER
query(`
create table Full_Time_Rider(
    did varchar(30),
    month_of_work DATE  CHECK (month_of_work = '1970-01-01' OR month_of_work > CURRENT_DATE AND extract (day from month_of_work) = 1),
    wws_start_day char(3),
    day1_shift integer,
    day2_shift integer,
    day3_shift integer,
    day4_shift integer,
    day5_shift integer,
    primary key(did, month_of_work),
    foreign key(did) REFERENCES Delivery_Riders ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('lewis hamilton', '2020-05-01', 'mon',1,1,1,1,1);`
);


//PART_TIME_RIDER
query(`
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
);`);

query(`
INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','2017-10-25',0,10,0,0,10,10,0);`
);

query(`
INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','2020-10-25',0000100,10,0,0,10,10,0);`
);

query(`
INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','2018-10-25',0000000,10,0,0,10,10,0);`
);


//DELIVERIES
query(`
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
);`);

query(`
INSERT INTO deliveries(order_id, driver ,time_customer_placed_order , time_rider_departs_for_restaurant , time_rider_reach_restaurant , time_rider_departs_restaurant , time_rider_delivers_order , delivery_rating ,comments_for_rider , street_name, building, unit_num, postal_code )
VALUES (1,'lewis hamilton','2020-04-08 19:00:00',null,null,null,null,5,'GOOD','1 Jurong East','haven way','01-10','21221');`
);

query(`
  create table shifts(
   shift_id SERIAL,
   shift_start_time timestamp,
   shift_end_time timestamp,
   shift2_start_time timestamp,
   shift2_end_time timestamp,
   primary key(shift_id)

);`);

query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 10:00:00','2016-06-22 12:00:00','2016-06-22 15:00:00','2016-06-22 17:00:00');`);
query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 11:00:00','2016-06-22 15:00:00','2016-06-22 16:00:00','2016-06-22 18:00:00');`);
query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 12:00:00','2016-06-22 16:00:00','2016-06-22 17:00:00','2016-06-22 21:00:00');`);
query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 13:00:00','2016-06-22 17:00:00','2016-06-22 18:00:00','2016-06-22 20:00:00');`);

// Trigger for full-time riders to ensure month is right
query(`CREATE OR REPLACE FUNCTION fullTimeRidersConvertMonth() 
    RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
    NEW.month_of_work = cast(date_trunc('month', NEW.month_of_work) as date);
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`)

query(`DROP TRIGGER IF EXISTS full_time_month_trigger ON Full_Time_Rider;`)
query(`CREATE TRIGGER full_time_month_trigger
  BEFORE UPDATE OF month_of_work OR INSERT
ON Full_Time_Rider
FOR EACH ROW
EXECUTE FUNCTION fullTimeRidersConvertMonth();`)  

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

// Helper functions

//Function to return 'am' or 'pm' in exception statement.
query('DROP FUNCTION IF EXISTS ampm;');
query(`
  CREATE OR REPLACE FUNCTION ampm(t integer) 
  returns char(2) as $$
    select case
      when t >= 12 then 'pm'
      else 'am'
    end;
  $$ language sql;
`);

//Function to calculate number of zeroes in one day. Raises exception if more than 4 
//consecutive ones are spotted.
query(`DROP FUNCTION IF EXISTS numZeroes;`);
query(`
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

`)


//Create the trigger
query(`
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
 `);

 //set the trigger
query(` DROP TRIGGER IF EXISTS part_time_rider_trigger ON Part_time_rider CASCADE;`);
query(`
  CREATE CONSTRAINT TRIGGER part_time_rider_trigger
  AFTER INSERT
  ON Part_time_rider
  deferrable initially deferred
  FOR EACH ROW
  EXECUTE FUNCTION calculateTotalWorkingHours();
`)

/**
 * Trigger 2
 * Before an insertion of a finalised order into the delivery table, the total cost for that delivery (taken from the Places table) and the number of reward points (subtotal floored) earned are calculated.
 * The reward points are then added to the customer in the Customers table, and the total cost is recorded in the Places table.
 *
*/

// Helper functions

// Function 1:  Get subtotal in an order
query(`DROP FUNCTION IF EXISTS getSubtotal;`);
query(`
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
`)

// Function 2: Get qty of an order
query(`DROP FUNCTION IF EXISTS getQty;`);
query(`
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
`)

// Create the trigger
query(`
  CREATE OR REPLACE FUNCTION compute_total_cost_and_rewards () RETURNS TRIGGER 
  AS $$ 
  DECLARE
    customer_id varchar(30);
    subtotal real;
    qty integer;
    rp_gained integer;
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
    --return the row
    return NULL;
  END 
  $$ LANGUAGE plpgsql;

`)

//set the trigger
query(` DROP TRIGGER IF EXISTS deliveries_trigger ON Deliveries CASCADE;`);
query(`
  CREATE TRIGGER deliveries_trigger
  BEFORE INSERT
  ON Deliveries
  FOR EACH ROW
  EXECUTE FUNCTION compute_total_cost_and_rewards();
`)


/*
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


query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('FFS',1,0);`)
query(`INSERT INTO uses(promo_code,order_id,usage)
VALUES('10%OFF',2,0);`)

query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(3,1,1,'Chicken Rice');`)
query(`INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(1,2,2,'Cold cut trio');`)
*/
