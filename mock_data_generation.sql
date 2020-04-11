--INSERT Customers
INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('undertaker','undertaker',0,'2020-04-07', '4258-1234-1010-0000');
INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
VALUES('Jay Park','jay',0,'2019-12-07', '4228-1144-1040-0000');

--INSERT USERS
INSERT INTO users(userid,user_password)
VALUES('undertaker','undertaker');
INSERT INTO users(userid,user_password)
VALUES('Bottleopener','Bottleopener');
INSERT INTO users(userid,user_password)
VALUES('waiter','waiter');
INSERT INTO users(userid,user_password)
VALUES('Manager','manager');
INSERT INTO users(userid,user_password)
VALUES('lewis hamilton','password');
INSERT INTO users(userid,user_password)
VALUES('Thomas Engine','password');
INSERT INTO users(userid,user_password)
VALUES('Jay Park','jay');

--INSERT Delivery_riders
INSERT INTO Delivery_riders(did,base_salary,commission)
VALUES('lewis hamilton',100,0);
INSERT INTO Delivery_riders(did,base_salary,commission)
VALUES('Thomas Engine',50,0);

--INSERT PART TIME Delivery_riders
INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
VALUES('Thomas Engine','2017-10-25',0,10,0,0,10,10,0);

--INSERT FULL TIME Delivery_riders
INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('lewis hamilton','2998-09-01','mon',1,1,1,1,1);
INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
VALUES('lewis hamilton','1998-09-01','mon',1,2,1,2,4);

--INSERT SALARY
INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('lewis hamilton','2000-10-10',100,10);

INSERT INTO salary(did,salary_date,base_salary,commission)
VALUES('Thomas Engine','2010-10-10',100,10);


--INSERT RESTAURANT_staff
INSERT INTO restaurant_staff(staff_id)
VALUES('waiter');
INSERT INTO restaurant_staff(staff_id)
VALUES('waiter');

--INSERT FDS manager
INSERT INTO fds_manager(manager_id)
VALUES('Manager');



--INSERT Addresses
INSERT INTO addresses(street_name,building_num,unit_num,postal_code)
VALUES('1 Jurong East','234','01-10','21221');
INSERT INTO addresses(street_name,building_num,unit_num,postal_code)
VALUES('2 Tampines East','24','10-02','123421');
--INSERT RESTAURANT
INSERT INTO restaurants(min_order_amt,located_at,restaurant_name)
VALUES(60,1,'Dian Xiao er');
INSERT INTO restaurants(min_order_amt,located_at,restaurant_name)
VALUES(20,2,'SubWay');

--INSERT INTO opening_hours_template
INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,0,'10:00:00',0,'00:00:00');

INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,1,'10:00:00',1,'20:00:00');

INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,2,'10:00:00',2,'20:00:00');
INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,3,'10:00:00',3,'20:00:00');
INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,4,'10:00:00',4,'20:00:00');
INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,5,'10:00:00',5,'20:00:00');

INSERT INTO opening_hours_template(restaurant_id,start_day,start_time,end_day,end_time)
VALUES(1,6,'10:00:00',6,'00:00:00');



--INSERT food_items
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Chicken Rice',2.50,'Chinese',50,0,1);
INSERT INTO food_items(food_item_name,price,category,daily_limit,num_orders_made,rid)
VALUES('Cold cut trio',5.50,'Sandwich',10,0,2);

--INSERT options
INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Style-Fried','Fried',0,1,'Chicken Rice');

INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Size-small','small',0,1,'Chicken Rice');

INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('Size-medium','medium',0.5,1,'Chicken Rice');

INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('topping-cheese','cheese',1,2,'Cold cut trio');

INSERT INTO Options(options_name,type_of_option,addon_price,rid,food_item_name)
VALUES('topping-ham','ham',1,2,'Cold cut trio');


-- INSERT SET MEAL
INSERT INTO Set_meals(set_meal_id, set_meal_description)
VALUES(1,'plus soft drink');

INSERT INTO Set_meals(set_meal_id, set_meal_description)
VALUES(2,'add cookie');


--INSERT Promotions
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('10%OFF','2020-04-07','2020-05-08','10%OFFEVERYTHING');
INSERT INTO promotions(promo_code,promo_start_date,promo_end_date, promo_detail)
VALUES('FFS','2020-04-07','2020-04-15','FireSale');

--INSERT Restaurant_promotion
INSERT INTO restaurant_promotion(restaurant_promo)
VALUES('10%OFF');

--INSERT FDS_promotion
INSERT INTO FDS_promotion(fds_promo)
VALUES('FFS');

--INSERT orders
INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(1,null,null,null);

INSERT INTO orders(order_id,restaurant_review, restaurant_rating, reward_points)
VALUES(2,'Good',4,10);

--INSERT places
INSERT INTO places(order_id,cid)
VALUES(1,'Jay Park');

INSERT INTO places(order_id,cid)
VALUES(2,'undertaker');




--INSERT uses
INSERT INTO uses(promo_code,order_id,useage)
VALUES('FFS',1,0);

INSERT INTO uses(promo_code,order_id,useage)
VALUES('10%OFF',2,0);



-- INSERT food_items_in_orders
INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(3,1,1,'Chicken Rice');
INSERT INTO food_items_in_orders(qty,order_id,rid,food_item_name)
VALUES(1,2,2,'Cold cut trio');

-- INSERT into deliveries;
INSERT INTO deliveries( order_id,deliverystatus,time_customer_placed_order,time_rider_departs_for_restaurant,time_rider_reach_restaurant,time_rider_departs_restaurant, time_rider_delivers_order, delivery_rating, comments_for_rider)
VALUES (1,'order_time','2020-04-08 19:00:00',null,null,null,null,5,'Good');
