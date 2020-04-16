// This is our backend server. It listens to all GET/POST/DELETE requests and sends back a response.
const express = require("express");
const client = require("./elephantsql");

const app = express();
const port = 3500;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

//Don't modify above this comment (other than changing the port number if you need)

/** Steps to create an API endpoint
 *
 * 1. Decide if you want to listen for a POST/GET/DELETE/PATCH request
 * 2. Decide on a suitable and unused url path
 * 3. Put in the comments above the endpoint - what information do you want to receive in req.body?
 *    If the frontend sends in a js object, write down the name of each key and the data type of each
 *    value in the comments so that whoever looks at the frontend can figure out if a negative response from the db is
 *    simply due to wrong formatting of data
 * 4. Write down what you intend to do before you send something back to the frontend
 *    - e.g send a specific type of SQL query to the DB
 * 5. Write down what you want to send back - always send some feedback to the frontend that allows the frontend
 *    to tell the user that the action was completed successfully or that it failed.
 * 6. write app.< what you chose in step 1 >('your/path', (req, res) => {
 *        //note that req is an object containing meta info about the request, what you want is req.body
 *        //which contains the js object sent from frontend
 *        //res is an object that allows you to send things back to the user via res.send(text/json)
 *
 *        // what you wanted to read from user in step 3
 *
 *        // what you wanted to do in the db in step 4
 *
 *        // what you wanted to send back to the user in step 5
 *    })
 *
 * 7. As far as possible, group endpoints that are for the same React component together for easy debugging, e.g.
 *     //  -- Signup --
 *     app.post('/signup', ...)
 *     // -- Login --
 *     app.post('/login', ...)
 * 8. Don't forget step 3
 * API for client at https://node-postgres.com/api/client
 * API for pgadmin setup at https://www.elephantsql.com/docs/pgadmin.html
 */

//  --  Signup  --

/** req.body should be {
        firstName: String,
        lastName: String,
        username: String,
        credit_card: String,
        password: String     
     } 

     Frontend should make sure all fields are present before sending to backend.

     Concatenate firstName and lastName with a whitespace in between for the attribute customer_name in Customers
     Initialise reward points as 0, start date as CURRENT_DATE (a reserved keyword in PGSQL referring to current date)
     
     Send an insert statement to the database with the above variables

     What will be returned from the database is a Result object that looks like this (in the then function call of the Promise):  
            Result {
              command: 'INSERT',
              rowCount: 1,
              oid: 0,
              rows: [],
              fields: [],
              _parsers: undefined,
              _types: TypeOverrides {
                _types: {
                  getTypeParser: [Function: getTypeParser],
                  setTypeParser: [Function: setTypeParser],
                  arrayParser: [Object],
                  builtins: [Object]
                },
                text: {},
                binary: {}
              },
              RowCtor: null,
              rowAsArray: false
            }
      If there is an error (which will cause the catch function call to run instead), an error message is returned instead. So if in the then call,
      send a js object back to the frontend like: {
         status: 400
         message: error.detail
      } else send {
         status: 200
      }
      so that the frontend can then either prompt the user to check and resubmit, or redirect the user straight to the catalogue page.
      Note: use Postman to send in a post request during testing
      Note: only accepting signups for customers right now, other users must be added by FDS manager
 */
app.post("/signup", (req, res) => {
  let { firstName, lastName, username, credit_card, password } = req.body;
  let customername = firstName + " " + lastName;
  //First insert this person into Users
  client
    .query(
      `INSERT INTO users(userid,user_password)
     VALUES($1,$2);`,
      [username, password]
    )
    .then(
      //Next insert this person into Customers
      (_) =>
        client
          .query(
            `INSERT INTO customers(cid,customer_name,reward_points,join_date,credit_card)
           VALUES($1,$2, 0, CURRENT_DATE, $3);`,
            [username, customername, credit_card]
          )
          .then((_) => {
            res.send({ status: 200 }); //OK
          })
          .catch((error) => {
            console.log("app.js signup api error", error);
            res.send({
              status: 500,
              message: error.detail,
            }); //BAD REQUEST
          })
    )
    .catch((error) => {
      res.send({
        status: 400,
        message: error.detail, // "Key (userid)=(timothyleong) already exists."
      });
    });
});

// --LOGIN--

/** req.body should be {
        username: String,
        password: String     
     } 

     Frontend should make sure all fields are present before sending to backend.

     Send an insert statement to the database with the above variables

     If there is an error (which will cause the catch function call to run instead), an error message is returned instead. So if in the then call,
      send a js object back to the frontend: {
         status: 401
         message: error.detail
      } else send {
         status: 200,
         userid
      }
      so that the frontend can then either prompt the user to check and resubmit, or redirect the user straight to the catalogue page.
      Note: usertype should only be one of 'customers', 'fds_manager', 'restaurant_staff', 'delivery_riders'
 */

app.post("/login/:usertype", (req, res) => {
  let { username, password } = req.body;
  let usertype = req.params.usertype;
  let ids = {
    fds_manager: "manager_id",
    restaurant_staff: "staff_id",
    delivery_riders: "did",
    customers: "cid",
  };
  // console.log(username, password, usertype)
  client
    .query(
      `SELECT * 
                FROM users join ${usertype}
                ON users.userid = ${usertype}.${ids[usertype]}
                WHERE userid = '${username}'
                AND user_password = '${password}'`
    )
    .then((result) => {
      if (result.rowCount == 0) {
        //such a record does not exist
        res.send({ status: 401 }); //UNAUTHORISED
      } else {
        res.send({
          status: 200, //OK
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: 500, // INTERNAL SERVER ERROR
      });
    });
});

app.post("/riderinfo", (req, res) => {
  const { userid } = req.body;
  client
    .query(
      `SELECT 1 FROM part_time_rider
    WHERE did = '${userid}'`
    )
    .then((result) => {
      if (result.rowCount > 0) {
        res.send({ rider: "part_time" });
      } else {
        res.send({ rider: "full_time" });
      }
    })
    .catch((err) => console.log(err));
});

// -- EDIT PROFILE --

/**
 * What: A query to update username and cascade the updates.
 * Receives: Req body is {
 *    oldusername: String,
 *    newusername: String,
 *    password: String
 *     },
 * possible responses from database is ok or the username is already taken.
 * Returns: if the former, send back {status: 200} else send {status: 400}
 */

app.patch("/updateuserpwd", (req, res) => {
  let { oldusername, newusername, password } = req.body;
  client
    .query(
      `UPDATE users 
                 SET userid = '${newusername}',
                 user_password = '${password}'
                 where userid = '${oldusername}';
                `
    )
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      if (err.detail.endsWith("already exists.")) {
        //Duplicate username
        res.send({ status: 400 });
      }
    });
});

// --ADD NEW RIDER--

/**
 * What: A query to add a new rider. Adds into users and either full or part time rider.
 * req.body should be {
        firstName: String,
        lastName: String,
        username: String,
        type: String (either "ft" or "pt"),
        password: String     
     } 
 * possible responses from database is ok (part time, full time) or the username is already taken.
 * Returns: if part time, send back {status: 100},
 *          if full time, send back {status: 200},
 *          else send {status: 400}
 */

app.post("/addNewRider", (req, res) => {
  let { firstName, lastName, username, password, type } = req.body;
  let ridername = firstName + " " + lastName;
  //First insert this person into Users
  client
    .query(
      `INSERT INTO users(userid,user_password)
     VALUES($1,$2);`,
      [username, password]
    )
    .then(
      //Next insert this person into Rider
      // Change Current date to be filled in
      (_) =>
        client
          .query(
            `INSERT INTO delivery_riders(did,start_work_date,sum_all_ratings,num_deliveries)
           VALUES($1, CURRENT_DATE, 0, 0);`,
            [username]
          )
          .then(
            //Next insert this person into either Full Time or Part Time Rider
            // Change Current date to be filled in
            (_) => {
              if (type == "pt") {
                client
                  .query(
                    `INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
                    VALUES($1,null,null,null,null,null,null,null,null);`,
                    [username]
                  )
                  .then((_) => {
                    res.send({ status: 100 }); //OK, Part Time
                  });
              } else {
                client
                  .query(
                    `INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
                    VALUES($1,'1970-01-01',null,null,null,null,null,null);`,
                    [username]
                  )
                  .then((_) => {
                    res.send({ status: 200 }); //OK, Full Time
                  });
              }
            }
          )
          .catch((error) => {
            console.log("app.js signup api error", error);
            res.send({
              status: 500,
              message: error.detail,
            }); //BAD REQUEST
          })
    )
    .catch((error) => {
      res.send({
        status: 400,
        message: error.detail, // "Key (userid)=(timothyleong) already exists."
      });
    });
});

// --ADD NEW STAFF--

/**
 * What: A query to add a new restaurant staff.
 * req.body should be {
        firstName: String,
        lastName: String,
        username: String,
        password: String     
     } 
 * possible responses from database is ok or the username is already taken.
 * Returns: if success, send back {status: 200},
 *          else send {status: 400}
 */
app.post("/addNewStaff", (req, res) => {
  let { firstName, lastName, username, password, restaurant_name } = req.body;
  let staffName = firstName + " " + lastName;
  //First insert this person into Users
  client
    .query(
      `INSERT INTO users(userid,user_password)
     VALUES($1,$2);`,
      [username, password]
    )
    .then(
      //Next insert this person into Staff
      (_) =>
        client
          .query(
            `INSERT INTO restaurant_staff(staff_id, restaurant_name)
            VALUES($1, $2);`,
            [username, restaurant_name]
          )
          .then((_) => {
            res.send({ status: 200 }); //OK
          })
          .catch((error) => {
            console.log("app.js signup api error", error);
            res.send({
              status: 500,
              message: error.detail,
            }); //BAD REQUEST
          })
    )
    .catch((error) => {
      res.send({
        status: 400,
        message: error.detail, // "Key (userid)=(timothyleong) already exists."
      });
    });
});

// --MODIFY FULL TIME RIDER--

/**
 * What: A query to modify work schedule of Full Time Rider.
 * req.body should be { 
        userid: String,
        startDay: String, ("mon", "tue", etc.)
        day1: String, ("1", "2", "3", "4")
        day2: String, ("1", "2", "3", "4")
        day3: String, ("1", "2", "3", "4")
        day4: String, ("1", "2", "3", "4")
        day5: String, ("1", "2", "3", "4")
     } 
 * possible responses from database is ok or unknown error
 * Returns: if success, send back {status: 200},
 *          else send {status: 500}
 */
app.post("/modifyFullTimeRiderSchedule", (req, res) => {
  let { userid, startDay, day1, day2, day3, day4, day5, month } = req.body;
  //First insert this person into Users
  client
    .query(
      `INSERT INTO full_time_rider(did, month_of_work, wws_start_day, day1_shift,
        day2_shift, day3_shift, day4_shift, day5_shift)
      VALUES($1, $8, $2, $3, $4, $5, $6, $7)`,
      [userid, startDay, day1, day2, day3, day4, day5, month]
    )
    .then((_) => {
      res.send({ status: 200 }); //OK
    })
    .catch((error) => {
      console.log("app.js signup api error", error);
      res.send({
        status: 500,
        message: error.detail,
      }); //BAD REQUEST
    });
});

// --MODIFY PART TIME RIDER--

/**
 * What: A query to modify work schedule of Part Time Rider.
 * req.body should be { 
        userid: String,
        userid: this.props.username,
        week_of_work: 
        mon: 
        tue: 
        wed: 
        thu: 
        fri: 
        sat: 
        sun:
     } 
 * possible responses from database is ok or unknown error
 * Returns: if success, send back {status: 200},
 *          else send {status: 500}
 */
app.post("/modifyPartTimeRiderSchedule", (req, res) => {
  let { userid, week_of_work, mon, tue, wed, thu, fri, sat, sun } = req.body;
  //First insert this person into Users
  client
    .query(
      `INSERT INTO part_time_rider(did, week_of_work, mon, tue, wed, thu, fri, sat, sun)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [userid, week_of_work, mon, tue, wed, thu, fri, sat, sun]
    )
    .then((_) => {
      res.send({ status: 200 }); //OK
    })
    .catch((error) => {
      console.log("app.js signup api error", error);
      res.send({
        status: 500,
        message: error.detail,
      }); //BAD REQUEST
    });
});

// --CATALOGUE--
/*
  What: A query to return a DISTINCT list of categories in the Food_items table.
  Receives: No req body.
  Returns: an array of categories.
*/
app.get("/categories", (req, res) => {
  client
    .query(
      `SELECT DISTINCT category
                FROM food_items`
    )
    .then(
      (result) => {
        res.send(result.rows.map((json) => json.category));
      } //Array of categories e.g. ['Sandwich', 'Chinese']
    )
    .catch((_) => {
      res.send({ status: 500 }); //INTERNAL SERVER ERROR
    });
});

/*
  What: A query to return a DISTINCT list of restaurants in the Restaurants table.
  Receives: No req body.
  Returns: an array of restaurants.
*/
app.get("/restaurants", (req, res) => {
  client
    .query(
      `SELECT restaurant_name
                FROM restaurants`
    )
    .then((result) => {
      res.send(result.rows.map((json) => json.restaurant_name)); // e,g ['Dian Xiao Er', 'Subway']
    })
    .catch((_) => {
      res.send({ status: 500 }); //INTERNAL SERVER ERROR
    });
});

/** What: A query to return all the entries in the Food_items table corresponding to the restaurant name
 *  Receives: Req.body = {name : String}
 *  Returns: An array of jsons. e.g rows: [
    {
      food_item_name: 'Cold cut trio',
      price: 5.5,
      category: 'Sandwich',
      daily_limit: 10,
      num_orders_made: 0,
      min_order_amt: 20,
      rid: 2
    }
  ]
 */
app.post("/fooditems", (req, res) => {
  //FRONTEND NEEDS TO CHANGE
  let { name } = req.body;
  client
    .query(
      `SELECT 
      food_item_name, 
      price, 
      category, 
      daily_limit, 
      num_orders_made, 
      min_order_amt, 
      F.restaurant_name
      FROM food_items F, restaurants R
      where F.restaurant_name = R.restaurant_name
      and R.restaurant_name = '${name}'
     `
    )
    .then((result) => res.send(result.rows))
    .catch((err) => console.log(err));
});

/** What: A query to return all the entries in the Food_items table corresponding to the category name
 *  Receives: Req.body = {name : String}
 *  Returns: An array of jsons. e.g rows: [
    {
      food_item_name: 'Cold cut trio',
      price: 5.5,
      daily_limit: 10,
      num_orders_made: 0,
      restaurant_name: 'Subway'
    }
  ]
 */
app.post("/cuisineitems", (req, res) => {
  //FRONTEND NEEDS TO CHANGE
  let { name } = req.body;
  client
    .query(
      `SELECT food_item_name, price, daily_limit, num_orders_made, F.restaurant_name
     FROM food_items F natural join restaurants R
     where category = '${name}'
    `
    )
    .then((result) => res.send(result.rows))
    .catch((err) => console.log(err));
});

// --CHECKOUT--
/**
 * What: get existing reward points for customer
 * Receives: the cid as a url param
 * Returns: {
 *  "reward_points": Integer
 * }
 *
 */
app.get("/rewards/:cid", (req, res) => {
  const cid = req.params.cid;
  client
    .query(
      `SELECT reward_points 
                FROM customers 
                WHERE cid = '${cid}';
                `
    )
    .then((result) => res.send(result.rows[0]))
    .catch((err) => res.send({ status: 500 }));
});
/**
 * What: get existing reward points for customer
 * Receives: the cid as a url param
 * Returns: {
 *  "credit_card": String
 * }
 *
 */
app.get("/payment/:cid", (req, res) => {
  const cid = req.params.cid;
  client
    .query(
      `SELECT credit_card
                FROM customers 
                WHERE cid = '${cid}';
                `
    )
    .then((result) => res.send(result.rows[0]))
    .catch((err) => res.send({ status: 500 }));
});

/**
 * What: get existing reward points for customer
 * Receives: the {code : String} in req.body
 * Returns: {
 *  "promo_detail": "" | "10%OFFEVERYTHING"
 * }
 *
 */
app.post("/promo", (req, res) => {
  const { code } = req.body;
  client
    .query(
      `SELECT promo_detail
                FROM promotions P
                WHERE promo_code in (
                  SELECT fds_promo from 
                  FDS_promotion F join Promotions P2
                  on P2.promo_code = F.fds_promo
                  where F.fds_promo = '${code}'
                  and P2.promo_start_date < CURRENT_DATE
                  and P2.promo_end_date > CURRENT_DATE
                  union
                  SELECT restaurant_promo from 
                  Restaurant_promotion R join Promotions P3
                  on P3.promo_code = R.restaurant_promo
                  where restaurant_promo = '${code}'
                  and P3.promo_start_date < CURRENT_DATE
                  and P3.promo_end_date > CURRENT_DATE)
              `
    )
    .then((result) =>
      res.send(result.rowCount == 1 ? result.rows[0] : { promo_detail: "" })
    )
    .catch((err) => console.log(err));
});

/**
 * Returns something like [
    {
        "street_name": "1 Jurong East                 ",
        "building": "haven way",
        "unit_num": "01-10     ",
        "postal_code": 21221,
        "time_customer_placed_order": "2020-04-08T11:00:00.000Z"
    } or []
]
 */
app.post("/lastfive", (req, res) => {
  let { cid } = req.body;

  client
    .query(
      `SELECT distinct D.street_name, D.building, D.unit_num, D.postal_code , D.time_customer_placed_order
                FROM Deliveries D join Places
                ON D.order_id = Places.order_id
                where Places.cid = '${cid}'
                order by D.time_customer_placed_order desc
                limit 5;
  `
    )
    .then((result) => res.send(result.rows))
    .catch((err) => console.log(err));
});

/**
 * What: creates an order, dispatches a driver, returns the order id to   
 * the front
 * Receives: {
 *  restaurant_name: String,
 *  food_items: array of jsons that look like {
      food_item_name: 'Cold cut trio',
      price: 5.5,
      daily_limit: 10,
      num_orders_made: 0,
      restaurant_name: 'Subway'
    },
    qty: array of integers denoting how many of the respective food items were bought
    cid : String
 * }
    This handler will create an Orders entry, a Places Entry,
    find a driver, then create the Deliveries Entry, then return the Order id to the front end

 */
app.post("/order", (req, res) => {
  const {
    restaurant_name,
    food_items,
    qty,
    cid,
    lon,
    lat,
    delivery_fee,
    subtotal,
    street_name,
    building,
    unit_num,
    postal_code,
    reward_points_used,
  } = req.body;
  console.log(lon, lat);
  let order_id = 0;
  let did = "";
  let str = "";
  client
    .query(
      `
  set timezone = 'Asia/Singapore';
  WITH AvailableRiders as (

	  SELECT did from Delivery_riders
	  WHERE did in (
		  select did from Full_time_rider F
	  	  where EXTRACT(MONTH from CURRENT_TIMESTAMP) = EXTRACT(MONTH FROM F.month_of_work)
	  )
	  AND IS_FULL_TIMER_WORKING(did) = 1
	  UNION
	  SELECT did from Delivery_riders
	  WHERE did in (select did from Part_time_rider P 
				   where EXTRACT(WEEK from CURRENT_TIMESTAMP) = EXTRACT(WEEK FROM P.week_of_work))
	  AND IS_PART_TIMER_WORKING(did) = 1
),
	
LastLocationOfRiders as (
	select *
	from AvailableRiders R left join Deliveries D
	on R.did = D.driver
	left join Addresses A
	on D.street_name = A.street_name
	and D.building = A.building
	and D.unit_num = A.unit_num
	and D.postal_code = A.postal_code
	and time_rider_delivers_order = (
	SELECT MAX(time_rider_delivers_order) 
	from Deliveries D2 
	where D2.driver = D.driver) 
)

select did, lat, lon, 3956 * 2 * ASIN(SQRT(  POWER(SIN((lat - ${lat}) * pi()/180 / 2), 2) +  COS(lat * pi()/180) *  COS(${lat} * pi()/180) *  POWER(SIN((lon -${lon}) * pi()/180 / 2), 2)  )) as d
  from LastLocationOfRiders
  order by d asc nulls first
  limit 1;
  `
    )
    .then((result) => {
      if (result[1].rowCount == 0) {
        //no driver
        res.send({ err: "No rider" });
      } else {
        //result[1].rows looks like [ { did: 'full-time', lat: null, lon: null, d: null } ]
        did = result[1].rows[0].did;
        return client.query(
          `SELECT COUNT(time_customer_placed_order) + 1 as num
             FROM Deliveries
             WHERE EXTRACT(DAY from time_customer_placed_order)
             = EXTRACT(DAY from CURRENT_TIMESTAMP)`
        );
      }
    })
    .then((result) => {
      console.log(result)
      const now = new Date();
      const front =
        now.getFullYear().toString() +
        now.getMonth().toString().padStart(2, 0) +
        now.getDay().toString().padStart(2, 0);
      order_id = front + result.rows[0].num.padStart(3, 0);

      for (let i = 0; i < food_items.length; i++) {
        const name = food_items[i].food_item_name;
        str =
          str +
          `INSERT INTO FOOD_ITEMS_IN_ORDERS values (${qty[i]},${order_id},'${name}','${restaurant_name}');\n`;
      }

      const query = `
        INSERT INTO ORDERS(order_id) VALUES ('${order_id}');
        INSERT INTO PLACES(order_id, cid, delivery_fee, total_cost) VALUES ('${order_id}','${cid}', ${delivery_fee}, ${
        subtotal + delivery_fee
      });
        ${str}
        INSERT INTO DELIVERIES values ('${order_id}','${did}',CURRENT_TIMESTAMP, null, null, null, null, 0, '', '${street_name}', '${building}', '${unit_num}', '${postal_code}', ${reward_points_used});
      `;

      return client.query(query);
    }).then(result => {
      console.log(result);
      //insert the user's address
    }).catch (err=> console.log(err))
    ;
});

//Don't modify below this comment
app.listen(port, () => {
  console.log("Backend server is up on port " + port);
});
