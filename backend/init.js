const client = require("./elephantsql");
const chalk = require("chalk"); //for coloring console output

const query = (q) =>
  client
    .query(q)
    .then((result) => console.log(result.command))
    .catch((e) => console.error(q + chalk.bgRed(e.stack)));

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
DROP TABLE IF EXISTS Users cascade;`);
query(`
DROP TABLE IF EXISTS shifts;`);
query(`SET timezone = 'Asia/Singapore'`);
// USERS
query(`
create table Users(
    userid varchar(30),
    user_password varchar(50) not null,
    primary key(userid),
    unique (userid)
);`);

query(`INSERT INTO users(userid,user_password)
VALUES('undertaker','undertaker');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('Bottleopener','Bottleopener');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('waiter','waiter');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('Manager','manager');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('lewis hamilton','password');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('Thomas Engine','password');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('Jay Park','jay');`);

query(`
INSERT INTO users(userid,user_password)
VALUES('Akon','convict');`);

query(`INSERT INTO users(userid,user_password)
VALUES('Rider1','Rider1');`);
query(`INSERT INTO users(userid,user_password)
VALUES('Rider2','Rider2');`);
query(`INSERT INTO users(userid,user_password)
VALUES('Rider3','Rider3');`);
query(`INSERT INTO users(userid,user_password)
VALUES('Rider4','Rider4');`);

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
VALUES('undertaker','undertaker',0,'2020-04-07', '4258-1234-1010-0000');`);

query(`
INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('Jay Park','jay',0,'2019-12-07', '4228-1144-1040-0000');`);
//DELIVERY_RIDERS
query(`
create table Delivery_Riders(
    did varchar(30),
    sum_all_ratings real,
    num_deliveries integer,
    primary key(did),

    foreign key(did) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('lewis hamilton',0,0);`);

query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('Thomas Engine',4.5,100);`);
query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('Rider3',4.5,100);`);
query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('Rider4',4.5,100);`);
query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('Rider2',4.5,100);`);
query(`
INSERT INTO Delivery_riders(did,sum_all_ratings,num_deliveries)
VALUES('Rider1',4.5,100);`);



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
VALUES('1 Jurong East','haven way','01-10','21221',0,0);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('2 Tampines East','24','10-02','123421',10,20);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('123 Outram park','serene','110-02','121121',-90,90);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('21 Toa payoh','214','01-02','124421',45,135);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('110 Marina South','2','02-02','122121',-60,60);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('50 Marina Bay','peace building','01-12','100321',-90,100);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('20 Shenton Way','102','05-12','102321',70,120);`);

query(`
INSERT INTO addresses(street_name,building,unit_num,postal_code,lon,lat)
VALUES('50 Beach rd','1','01-12','101221',-90,-180);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Jurong East','Park Royale','01-10','21221', 30, 60);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('01673 Prairie Rose Center','67','06-992','894194', 0, 0);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('51059 Donald Circle','65','04-311','518902', 60, 120);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('5 Ryan Junction','501','014-138','401187', 50, 10);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('65147 Glendale Road','World trade centre','06-547','812826', 70, 130);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('704 Butterfield Pass','301','05-273','323293', 10, 100);`);

query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('85 Stephen Terrace','454','The deck','533718', -52.460869, 57.623873);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('72345 Johnson Place','397','05-839','629738', -88.135875, 86.094160);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('88589 Lawn Park','293','23-621','614155', -21.250454, -55.584994);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('66264 Commercial Crossing','444','010-750','117504', -73.250550, -38.900869);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('0774 Vidon Road','352','43-831','982301', 74.803253, 138.544289);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('6569 Ruskin Avenue','231','05-404','204169', 86.223249, 121.320663);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('7 Dahle Drive','94','07-278','659131', -48.541549, 142.850636);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('09214 Susan Alley','506','04-646','350462', -29.355311, 4.295997);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('2 American Junction','5','10-131','444146', 88.727524, 50.959641);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('323 Boyd Park','343','13-282','665519', -38.384449, 21.538372);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Loftsgordon Lane','206','10-520','631539', -45.031137, 58.699953);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('9 Merry Junction','309','08-129','444350', 30.021383, -159.639914);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('88 Dahle Alley','230','04-226','168649', 48.547073, -42.561450);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('12 North Place','128','09-135','585548', 71.057150, 17.029164);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('55175 Kropf Street','85','12-336','813339', 14.235411, -124.157467);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('39785 Meadow Valley Point','449','08-923','491547', -82.263854, 43.505199);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('12722 Jay Parkway','85','011-403','660008', 29.867159, 65.122983);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('101 Lighthouse Bay Way','370','08-510','449106', 28.520224, -140.748376);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('969 Bunker Hill Alley','304','04-964','517031', 45.481907, -161.354697);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('40 Eagle Crest Place','316','010-535','186516', 58.026825, -103.533379);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('9541 Talisman Drive','297','04-492','561333', -18.641679, -91.098974);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('57512 Independence Crossing','396','06-115','324997', 5.991918, -97.299410);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('5 Mitchell Crossing','382','08-926','486416', -18.641679, -91.098974);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('7 Kings Trail','183','31-138','494340', 5.991918, -97.299410);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('681 Mayer Junction','581','014-143','401708', -13.123385, -97.772387);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('81947 Bartillon Pass','52','06-195','234466', 67.797856, -13.764454);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('475 Thompson Road','212','05-603','490613', -18.888002, -17.664477);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('20 Amoth Hill','378','07-952','921968', 1.911218, -107.209886);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('94211 Acker Way','168','05-420','135998', -52.575330, -175.343942);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('301 Fremont Lane','19','010-329','901441', -47.481769, 78.083661);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('231 Burning Wood Trail','287','07-607','213485', -39.917618, -58.241169);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('74809 Crowley Junction','200','012-394','294347', 47.493814, 4.544010);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('2296 Hansons Drive','87','010-212','851150', -49.300498, -53.534241);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('877 Bluestem Point','597','08-392','283444', 57.811491, 171.441510);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('11138 Arkansas Lane','505','011-347','109213', 59.372669, -1.953414);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1489 Green Ridge Crossing','62','011-558','792225', 18.675885, -138.578967);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('43 Carey Drive','133','05-702','473870', -22.733447, -116.570578);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('83 Everett Park','305','012-563','461896', 78.899237, 14.921618);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('303 Vernon Point','385','08-678','231258', 90.0, -41.850743);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('1 Bunting Lane','545','014-592','377730', -9.186743, -156.220088);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('57 Washington Court','479','06-534','607372', 76.099138, 7.341149);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('34 Crescent Oaks Trail','344','03-324','656163', 80.538588, -22.667186);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('6 Kenwood Drive','102','04-174','513062', 16.619701, -171.037516);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('72 Oxford Lane','35','012-23','559997', 41.736290, -83.774396);`);
query(`INSERT INTO addresses(street_name,building,unit_num,postal_code, lon, lat)
VALUES('16711 Carpenter Park','52','09-171','586172', 48.006667, -145.150314);`);

// RESTAURANTS
query(`
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
);`);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(60,4.4,'1 Jurong East','haven way','01-10','21221','Dian Xiao er');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(20,3.5,'2 Tampines East','24','10-02','123421','SubWay');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,2.2,'123 Outram park','serene','110-02','121121','Macdonald');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(20,4.3,'21 Toa payoh','214','01-02','124421','PokeBowl');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(50,3.9,'21 Toa payoh','214','01-02','124421','Crystal Jade');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,5.0,'20 Shenton Way','102','05-12','102321','Tian tian chicken rice');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(30,3.4,'50 Beach rd','1','01-12','101221','Soup spoon');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,4.0,'50 Beach rd','1','01-12','101221','Char grill bar');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,4.4,'57 Washington Court','479','06-534','607372','That Fantasy Bistro');`
);

query(`
INSERT INTO restaurants(min_order_amt,sum_all_ratings,street_name,building,unit_num,postal_code,restaurant_name)
VALUES(10,4.4,'2296 Hansons Drive','87','010-212','851150','Fairy Court');`
);

// ORDERS
query(`
create table Orders(
    order_id CHAR(11) UNIQUE,
	  restaurant_review VARCHAR(255),
    restaurant_rating INTEGER,
    restaurant_name VARCHAR(255),
    did VARCHAR(30),
    primary key (order_id),
    foreign key(did) references Delivery_riders(did) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
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

/**
 * PROMOS MUST MATCH THESE 4 signatures
 *
 * X%OFF
 * -XDOLLARS
 * MINSPENDXDISCOUNTY
 * MINSPENDXPERCENTOFFY
 * where X and Y are positive integers
 */

query(`
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('10%OFF','2020-04-07','2020-05-08','10%OFFEVERYTHING');`
);

query(`
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('FFS','2020-04-07','2020-04-15','-2DOLLARS');`
);

// PLACES
query(`
create table Places(
    order_id CHAR(11),
  	cid varchar(30) NOT NULL,
    delivery_fee real default 0.00,
    total_cost real default 0.00,
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
VALUES('Chicken Rice',2.50,'Chinese',50,10,'Dian Xiao er');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Ee Fu Mee',2,'Chinese',50,20,'Dian Xiao er');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fried Rice',4,'Chinese',50,0,'Dian Xiao er');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Shark fin',30,'Chinese',50,0,'Dian Xiao er');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Bird nest',25,'Chinese',50,0,'Dian Xiao er');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cold cut trio',15.50,'Lifestyle',10,0,'SubWay');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tuna',25.50,'Lifestyle',10,0,'SubWay');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Turkey',12.50,'Lifestyle',10,0,'SubWay');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Subway club',13.50,'Lifestyle',10,0,'SubWay');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Big Mac',5.50,'Western',100,0,'Macdonald');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mc chicken',5.50,'Western',100,0,'Macdonald');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mc spicy',5.50,'Western',100,0,'Macdonald');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Samurai burger',5.50,'Western',100,0,'Macdonald');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mcnuggets',5.50,'Western',100,0,'Macdonald');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Healthy stuff',10.50,'Lifestyle',50,0,'PokeBowl');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Vegan meatball',12.50,'Lifestyle',50,0,'PokeBowl');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fruit shake',5.50,'Lifestyle',50,0,'PokeBowl');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Salad bowl',6.50,'Lifestyle',50,0,'PokeBowl');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Brown rice',10.50,'Lifestyle',50,0,'PokeBowl');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chicken Rice',4.50,'Chinese',50,0,'Tian tian chicken rice');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Duck Rice',5.00,'Chinese',50,0,'Tian tian chicken rice');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Roasted Pork',5.50,'Chinese',50,0,'Tian tian chicken rice');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('tao hau',1.50,'Chinese',50,0,'Tian tian chicken rice');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Egg',0.50,'Chinese',50,0,'Tian tian chicken rice');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fish and Chip',5.50,'Western',100,0,'Char grill bar');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pork chop',5.50,'Western',100,0,'Char grill bar');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('steak',5.50,'Western',100,0,'Char grill bar');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chicken chop',5.50,'Western',100,0,'Char grill bar');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('char grill',5.50,'Western',100,0,'Char grill bar');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tomato',10.50,'Soup',100,0,'Soup spoon');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Mushroom',12.50,'Soup',100,0,'Soup spoon');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Beef strew',15.50,'Soup',100,0,'Soup spoon');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('corn',17.50,'Soup',100,0,'Soup spoon');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('carrot',15.50,'Soup',100,0,'Soup spoon');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('ABC',5.50,'Soup',100,0,'Crystal Jade');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Salted vegetable',15.50,'Soup',100,0,'Crystal Jade');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pork ribs',15.50,'Soup',100,0,'Crystal Jade');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cure illness',15.50,'Soup',100,0,'Crystal Jade');`);

query(`
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('smooth plegm',15.50,'Soup',100,0,'Crystal Jade');`);

query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pressure-Cooked Pine Boar',3.8,'Wild',50,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Slow-Cooked Apples Bear',7.6,'Wild',46,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Smoked Honey & Almond Cod',6.6,'Wild',14,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Seared Tortilla',9.2,'Mexican',21,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cherry and Raspberry Toast',5.3,'Dessert',11,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chestnut and Honey Cake',9,'Dessert',21,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Date Tarte Tatin',7.5,'Dessert',35,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Vanilla Trifle',2.1,'Dessert',23,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cured Ginger Venison',4.2,'Wild',16,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Roast Sweet Chicken',7.8,'Western',24,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Breaded Pineapple Frog',0.6,'Wild',10,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Seared Mustard Fish',9.4,'Western',50,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Simmered Garlic Sandwich',5.1,'Western',34,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cooked Winter Greens',6.4,'Western',23,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('White Walnut Mooncake',3,'Dessert',24,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cinnamon & Walnut Cake',1.6,'Dessert',32,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Red Wine Sundae',4.7,'Dessert',21,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Walnut Strudel',3.6,'Dessert',43,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Simmered Honey Pigeon',2.2,'Wild',23,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Deep-Fried Pepper Boar',5.7,'Wild',50,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Infused Vinegar Cockles',2.8,'Western',33,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Broasted Juniper Snapper',10,'Western',31,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pressure-Pot Peanuts & Risotto',7.3,'Western',23,0,'That Fantasy Bistro');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Steamed Dark Beer Linguine',1.1,'Western',42,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Chocolate and Blueberry Roll',1.9,'Dessert',33,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Choco and Mandarin Jelly',7.5,'Dessert',20,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Kiwi Pie',6.8,'Dessert',26,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Plum Pavlova',0.9,'Dessert',33,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Oven Pheasant',1.7,'Wild',17,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Fried White Wine Mutton',5.2,'Western',24,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tea-Smoked Sweet & Fresh Tuna',1,'Western',36,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Barbecued Pineapple Lobster',9.4,'Western',45,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Lime Vegetables',2.6,'Western',38,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Tenderized Potatoes',3.3,'Western',21,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Cherry and Papaya Cone',0.5,'Dessert',35,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Almond and Plum Pudding',2.9,'Dessert',25,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Passionfruit Molten Cake',0.6,'Dessert',12,0,'Fairy Court');`)
query(`INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,restaurant_name)
VALUES('Pecan Genoise',5.6,'Dessert',47,0,'Fairy Court');`)

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
VALUES(3,1,'Chicken Rice','Dian Xiao er');`);

query(`
INSERT INTO food_items_in_orders(qty,order_id,food_item_name,restaurant_name)
VALUES(1,2,'Cold cut trio','SubWay');`);

//FDS_PROMOTION
query(`
create table FDS_promotion(fds_promo char(10) PRIMARY KEY references promotions(promo_code));`);

query(`
INSERT INTO FDS_promotion(fds_promo)
VALUES('FFS');`);

//RESTAURANT_PROMOTION
query(`
create table Restaurant_promotion(
  restaurant_promo char(10) primary KEY references promotions(promo_code),
  restaurant_name VARCHAR(255),
  foreign key(restaurant_name) references restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO restaurant_promotion(restaurant_promo,restaurant_name)
VALUES('10%OFF','Dian Xiao er');`);

//FDS_MANAGER
query(`
create table FDS_Manager(
    manager_id varchar(30) primary key,
    foreign key(manager_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE
);`);

query(`
INSERT INTO fds_manager(manager_id)
VALUES('Manager');`);

// RESTAURANT STAFF
query(`
create table Restaurant_Staff(
    staff_id varchar(30),
    restaurant_name VARCHAR(255),
    primary key(staff_id),
    foreign key(staff_id) REFERENCES Users(userid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(restaurant_name) REFERENCES Restaurants(restaurant_name) ON DELETE CASCADE ON UPDATE CASCADE
);`);
query(`
INSERT INTO restaurant_staff(staff_id, restaurant_name)
VALUES('waiter', 'Macdonald');`);
query(`
INSERT INTO restaurant_staff(staff_id, restaurant_name)
VALUES('Akon', 'SubWay');`);

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
VALUES('lewis hamilton','2000-10-10',100,10);`);

query(`
INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('Thomas Engine','2010-10-10',100,10);`);

//FULL_TIME_RIDER
query(`
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
);`);

query(`
INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('lewis hamilton','1970-01-01','mon',1,1,1,1,1);`
);
query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('Rider1','1998-09-01','thu',1,2,1,4,4);`);
query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('Rider3','1998-09-01','thu',4,2,2,3,4);`);
query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('Rider2','1998-09-01','thu',2,3,2,4,4);`);
query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('Rider4','1998-09-01','thu',3,1,1,2,4);`);



//PART_TIME_RIDER
query(`
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
);`);

query(`
INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','1970-01-01', null, null, null, null, null, null, null);`
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
    reward_points_used integer,
    primary key(order_id),
    foreign key(order_id) references Orders(order_id) on update cascade on delete cascade,
    foreign key(driver) references Delivery_Riders(did) on UPDATE cascade on delete cascade,
    foreign key(street_name,building,unit_num,postal_code) references Addresses(street_name,building,unit_num,postal_code) on UPDATE cascade on delete cascade
);`);

query(`
INSERT INTO deliveries(order_id, driver,time_customer_placed_order , time_rider_departs_for_restaurant , time_rider_reach_restaurant , time_rider_departs_restaurant , time_rider_delivers_order , delivery_rating ,comments_for_rider , street_name, building, unit_num, postal_code )
VALUES (1,'lewis hamilton','2020-04-08 19:00:00',null,null,null,null,5,'GOOD','1 Jurong East','haven way','01-10','21221');`);

query(`
  create table shifts(
   shift_id SERIAL, -- 1,2,3,4
   shift_start_time timestamp,
   shift_end_time timestamp,
   shift2_start_time timestamp,
   shift2_end_time timestamp,
   primary key(shift_id)

);`);

query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 10:00:00','2016-06-22 14:00:00','2016-06-22 15:00:00','2016-06-22 19:00:00');`);
query(`INSERT INTO shifts(shift_start_time,shift_end_time,shift2_start_time,shift2_end_time)
VALUES('2016-06-22 11:00:00','2016-06-22 15:00:00','2016-06-22 16:00:00','2016-06-22 20:00:00');`);
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

// Trigger for part-time riders to ensure month is right
query(`CREATE OR REPLACE FUNCTION partTimeRidersConvertWeek()
    RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
    NEW.week_of_work = cast(date_trunc('week', NEW.week_of_work) as date);
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`)

query(`DROP TRIGGER IF EXISTS part_time_week_trigger ON part_Time_Rider;`)
query(`CREATE TRIGGER part_time_week_trigger
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

// Helper functions

//Function to return 'am' or 'pm' in exception statement.
query("DROP FUNCTION IF EXISTS ampm;");
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
`);

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
    IF NEW.mon = NULL AND NEW.tue= NULL AND NEW.wed = NULL AND NEW.thu = NULL AND NEW.fri = NULL AND NEW.sat = NULL AND NEW.sun = NULL THEN RETURN NULL;
    SELECT NEW.mon into schedule;
    End if;
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
 `);


 //Trigger 3, it updates the ratings for the restaurants and riders.  When a delivery is completed, the average ratings is calculated
query(` DROP TRIGGER IF EXISTS part_time_rider_trigger ON Part_time_rider CASCADE;`);
query(`
  CREATE CONSTRAINT TRIGGER part_time_rider_trigger
  AFTER INSERT
  ON Part_time_rider
  deferrable initially deferred
  FOR EACH ROW
  EXECUTE FUNCTION calculateTotalWorkingHours();
`);

query(`DROP FUNCTION IF EXISTS checkCredit CASCADE;`);
query(`CREATE OR REPLACE FUNCTION checkCredit()
RETURNS TRIGGER AS $$
  DECLARE
    my_sum BIGINT := 0;
    digit text;
    shouldDouble BOOLEAN := false;
    tmpnum BIGINT;
  BEGIN
    -- if no credit card, nothing to do
    IF NEW.credit_card = NULL THEN
      RETURN NEW;
    END IF;
    -- remove the hyphens
    NEW.credit_card = REPLACE(NEW.credit_card, '-', '');
    RAISE NOTICE '%', NEW.credit_card;
    FOR i in REVERSE LENGTH(NEW.credit_card)  .. 1 LOOP
      digit := SUBSTRING(NEW.credit_card, i);
      tmpnum := CAST(NEW.credit_card AS BIGINT);

      IF shouldDouble = TRUE THEN
        tmpnum := tmpnum * 2;
        IF tmpnum >= 10 THEN
          my_sum = my_sum + (MOD(tmpnum,10) + 1);
        ELSE
          my_sum = my_sum + tmpnum;
        END IF;
      ELSE
        my_sum = my_sum + tmpnum;
      END IF;
      shouldDouble = NOT shouldDouble;
    END LOOP;

    IF MOD(my_sum, 10) = 0 THEN
      return NEW;
    ELSE
      RAISE EXCEPTION 'Invalid credit card number';
    END IF;
  END;
$$ LANGUAGE plpgsql;`);

query(`DROP TRIGGER IF EXISTS credit_card_trigger ON Customers CASCADE;`);
query(`CREATE TRIGGER credit_card_trigger
  BEFORE UPDATE OR INSERT ON Customers
  FOR EACH ROW
  EXECUTE FUNCTION checkCredit();`);

query(`DROP FUNCTION IF EXISTS getrestaurantrating;`);

query(`CREATE OR REPLACE FUNCTION getrestaurantrating(order_id character)
returns bigint as $$
select sum(o.restaurant_rating)

FROM orders o
WHERE o.order_id = order_id;



$$ language sql;`);

query(`DROP FUNCTION IF EXISTS getrestaurantcount;`);
query(`CREATE OR REPLACE FUNCTION getrestaurantcount(order_id character)
returns bigint as $$
select  count(o.restaurant_rating)
FROM orders o
WHERE o.order_id = order_id;


$$ language sql;`);

query(`DROP FUNCTION IF EXISTS getdriverrating;`);
query(`CREATE OR REPLACE FUNCTION getdriverrating(order_id char)
returns bigint as $$

select sum(d.delivery_rating)
FROM deliveries d
WHERE d.order_id = order_id;

$$ language sql;`);

query(`DROP FUNCTION IF EXISTS getDriverCount;`);
query(`CREATE OR REPLACE FUNCTION getDriverCount(order_id char)
returns bigint as $$
select  count(d.delivery_rating)
FROM deliveries d
WHERE d.order_id = order_id;
$$ language sql;`);


query(`DROP FUNCTION IF EXISTS fn_updateEveryThing() CASCADE;`);
query(`
  create or replace function fn_updateEveryThing() returns trigger as
    $$
    DECLARE
    restaurant_ratingss bigint;
    driver_ratingss bigint;
    no_of_restaurantss bigint;
    no_of_driverss bigint;
    sum_all_ratings bigint;
    BEGIN
    IF (NEW.delivery_rating < 0) THEN
    RAISE EXCEPTION '%invalid delivery_rating', new.delivery_rating;
    ELSIF(NEW.delivery_rating > 5) THEN
    RAISE EXCEPTION '%invalid delivery_rating', new.delivery_rating;
    ELSE

    -- update RESTAURANT Rating
    restaurant_ratingss =  getrestaurantrating(NEW.order_id);
    no_of_restaurantss =  getrestaurantcount(NEW.order_id);
    RAISE NOTICE '%', restaurant_ratingss;
    RAISE NOTICE '%', no_of_restaurantss;

    sum_all_ratings = restaurant_ratingss/no_of_restaurantss;
    IF (sum_all_ratings < 0) THEN
    RAISE NOTICE '% It is not a valid rating', sum_all_ratings;
    ELSE
    UPDATE restaurants r
    SET sum_all_ratings = (restaurant_ratingss / no_of_restaurantss)
    FROM orders o
    WHERE r.restaurant_name = o.restaurant_name;
    END IF;

    -- update rating for driver

    driver_ratingss =  getDriverRating(NEW.order_id);
    no_of_driverss =  getDriverCount(NEW.order_id);
    RAISE NOTICE '%', driver_ratingss;
    RAISE NOTICE '%', no_of_driverss;

    sum_all_ratings = driver_ratingss/no_of_driverss;
    IF(sum_all_ratings < 0) THEN
    RAISE NOTICE '% It is not a valid rating', sum_all_ratings;
    ELSE
   UPDATE Delivery_riders dr
   SET sum_all_ratings = driver_ratingss / no_of_driverss
   FROM orders o
   WHERE o.did = dr.did;
   END IF;
   END IF;





  return new;


    end;
  $$ language plpgsql;
`);

query(`
drop trigger if exists tr_updateEveryThing on orders;`);
query(`create trigger tr_updateEveryThing
  before UPDATE OR INSERT
  on deliveries
  for each ROW
execute function fn_updateEveryThing();`);

query(`DROP FUNCTION IF EXISTS fn_updateOrders() CASCADE;`);
query(`
  create or replace function fn_updateOrders() returns trigger as
    $$

    BEGIN
    IF (NEW.restaurant_rating < 0) THEN
    RAISE EXCEPTION '%invalid restaurant_rating', new.restaurant_rating;
    ELSIF(NEW.restaurant_rating > 5) THEN
    RAISE EXCEPTION '%invalid restaurant_rating', new.restaurant_rating;
    ELSIF(NEW.restaurant_review = 'null') THEN
    RAISE EXCEPTION '%invalid restaurant_review', new.restaurant_review;

   END IF;



  return new;


    end;
  $$ language plpgsql;
`);



query(`
drop trigger if exists tr_updateOrders on orders;`);
query(`create trigger tr_updateOrders
  before INSERT
  on orders
  for each ROW
execute function fn_updateOrders();`);

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
// Helper functions

// Function 1:  Get subtotal in an order
query(`DROP FUNCTION IF EXISTS getSubtotal;`);

// Create the trigger
query(`
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

`);

//set the trigger
query(` DROP TRIGGER IF EXISTS deliveries_trigger ON Deliveries CASCADE;`);
query(`
  CREATE TRIGGER deliveries_trigger
  AFTER INSERT
  ON Deliveries
  FOR EACH ROW
  EXECUTE FUNCTION compute_total_cost_and_rewards();
`);


// QUERY 1: MOST POPULAR FOOD ITEMS

// with food_items_ordered as
// (select O.food_item_name, sum(qty) as totalQty
// from food_items_in_orders O join deliveries D
//   on (O.order_id = D.order_id)
// where D.time_customer_placed_order > '2020-04-01 00:00:00'
//   and D.time_customer_placed_order < '2020-05-01 00:00:00'
//   and O.restaurant_name = $1
// group by food_item_name)
// select F.food_item_name,
// CAST(totalQty AS float) /
//  DATE_PART('day', $3::timestamp - $2::timestamp)
//  as avg_Qty_Per_Day,
//  daily_limit,
//  CAST(totalQty AS float) /
//  DATE_PART('day', $3::timestamp - $2::timestamp) / daily_limit
//  as qty_to_limit_ratio
// from food_items F join food_items_ordered O
//   on (F.food_item_name = O.food_item_name)
// where F.restaurant_name = $1
// order by qty_to_limit_ratio desc

// $1: Restaurant Name
// $2: Start Date
// $3: End Date

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

// Helper functions
// mod function x mod y returns a value between 0 inclusive and y exclusive. y must be positive.
query(`
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
  `);
//convert 3 letter weekday into a number
query(`
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
`);

//function to find out if a full-time rider is working on the CURRENT_DATE
query(`
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
`);

//function to check if part_time rider is currently working
query(`
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
`);

//the query to pull all available riders
// query(`
// WITH AvailableRiders AS (SELECT did from Delivery_riders
//   WHERE did in (
//     select did from Full_time_rider F
//       where EXTRACT(MONTH from CURRENT_TIMESTAMP) = EXTRACT(MONTH FROM F.month_of_work)
//   )
//   AND IS_FULL_TIMER_WORKING(did) = 1
//   UNION
//   SELECT did from Delivery_riders
//   WHERE did in (select did from Part_time_rider P
//          where EXTRACT(WEEK from CURRENT_TIMESTAMP) = EXTRACT(WEEK FROM P.week_of_work))
//   AND IS_PART_TIMER_WORKING(did) = 1
// )
// ,
// LastLocationOfRiders AS (
// select *
// from AvailableRiders R left join Deliveries D
// on R.did = D.driver
// left join Addresses A
// on D.street_name = A.street_name
// and D.building = A.building
// and D.unit_num = A.unit_num
// and D.postal_code = A.postal_code
// and time_rider_delivers_order = (
// SELECT MAX(time_rider_delivers_order)
// from Deliveries D2
// where D2.driver = D.driver)

// )

// select did, lat, lon, 3956 * 2 * ASIN(SQRT(  POWER(SIN((lat - $1) * pi()/180 / 2), 2) +  COS(lat * pi()/180) *  COS($1 * pi()/180) *  POWER(SIN((lon -$2) * pi()/180 / 2), 2)  )) as d
// from LastLocationOfRiders
// order by d asc nulls first
// limit 1;

// `);

//NOTE THAT THIS ABOVE FUNCTION THROWS AN ERROR BECAUSE $1 and $2 are not defined.


query(`insert into users values('full-time', 'p');`)
query(`
insert into delivery_riders values ('full-time', 20, 10); `)
query(`
insert into full_time_rider values ('full-time', '2020-04-01', 'thu',2,2,2,2,2);`)
query(`insert into users values('part-time', 'p');`)
query(`insert into delivery_riders values ('part-time', 20, 10);
`)
query(`insert into part_time_rider values ('part-time', '2020-04-16', 0,0,0,011101110111,011101110111,011101110111,011101110111);
`)




// query 3, get the most popular hour and name in the past month
query(`select fio.food_item_name, EXTRACT (HOUR from d.time_customer_placed_order), count(*) as count
from Food_items_in_Orders fio, Deliveries d
where fio.order_id = d.order_id AND d.time_customer_placed_order >= date_trunc('month', current_date - interval '1' month)
  and d.time_customer_placed_order < date_trunc('month', current_date)
group by fio.food_item_name,d.time_customer_placed_order
order by count desc;`);


//FDS manager
//total no. of new customers
query(`select count(c.cid), Extract( Month from c.join_date)
FROM Customers c
group by c.cid, c.join_date
order by c.join_date;`);


//total no. of orders

query(`select count(o.order_id),  Extract(Month from d.time_customer_placed_order)
From Orders o,Deliveries d
WHERE o.order_id = d.order_id
group by o.order_id,d.time_customer_placed_order
order by d.time_customer_placed_order ASC;`);


//total cost of all orders
query(`select sum(p.total_cost), Extract(Month from d.time_customer_placed_order)
FROM places p, deliveries d, Customers c
WHERE p.order_id = d.order_id AND p.cid = c.cid
group by p.total_cost, d.time_customer_placed_order
order by d.time_customer_placed_order ASC;`);



//2) for each customer in each month
//total number of orders placed
query(`select count(p.cid), Extract (Month from d.time_rider_delivers_order), c.customer_name
from places p, deliveries d, customers c
where p.order_id = d.order_id AND p.cid = c.cid
group by p.cid, d.time_rider_delivers_order, c.customer_name
order by d.time_rider_delivers_order ASC;`);

//total cost of their orders

//3) for each rider in each month
//a) total no. of orders delivered
query(`select count(d.order_id), Extract (Month from d.time_rider_delivers_order), d.driver
from Deliveries d
group by d.order_id, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;`);

//b) total hours worked


//c) total salary earned

//d) avg delivery time
query(`select avg(d.time_rider_delivers_order - d.time_customer_placed_order::timestamptz), d.time_rider_delivers_order
FROM Deliveries d
group by d.time_rider_delivers_order - d.time_customer_placed_order::timestamptz,d.time_rider_delivers_order
order by d.time_rider_delivers_order ASC;`);

//e) no of ratings received
query(`select sum(d.delivery_rating), Extract(Month from d.time_rider_delivers_order), d.driver
from deliveries d
group by d.delivery_rating, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;`);

//f) avg. ratings received
query(`select avg(d.delivery_rating), Extract(Month from d.time_rider_delivers_order), d.driver
from deliveries d

group by d.delivery_rating, d.time_rider_delivers_order,d.driver
order by d.time_rider_delivers_order ASC;`);


//Restaurant staff

//1) in each month:
//a) total no. of completed orders
query(`select count(d.time_rider_delivers_order),Extract(Month from d.time_rider_delivers_order), fio.restaurant_name
from Food_items_in_orders fio,deliveries d
where fio.order_id = d.order_id
group by d.time_rider_delivers_order, fio.restaurant_name
order by d.time_rider_delivers_order ASC;`);


//b) total cost of all completed order
query(`select sum(p.total_cost), Extract(Month from d.time_rider_delivers_order)
FROM Places p, Deliveries d
WHERE p.order_id = d.order_id AND d.time_rider_delivers_order <> NULL
group by p.total_cost,d.time_rider_delivers_order
order by d.time_rider_delivers_order ASC;`);

//c) top 5 favourite food items
query(`select max(fio.food_item_name), Extract(Month from d.time_rider_delivers_order)
FROM Food_items_in_orders fio, Deliveries d
WHERE fio.order_id = d.order_id
group by fio.food_item_name, d.time_rider_delivers_order
order by fio.food_item_name
limit 5;`);


//2) rider
//total orders delivered
query(`select count(d.order_id), Extract(Month from d.time_rider_delivers_order),d.driver
FROM Deliveries d
GROUP BY d.order_id,d.time_rider_delivers_order,d.driver
ORDER BY d.driver;`);


//Riders

  // total no of hours worked
  // total salary earned


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
*/
