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
                  .query(`INSERT INTO part_time_rider(did,week_of_work,mon,tue,wed,thu,fri,sat,sun)
                    VALUES($1,CURRENT_DATE,0,10,0,0,10,10,0);`,
                    [username]
                  ).then((_) => {
                      res.send({ status: 100 }); //OK, Part Time
                    }
                  )
              } else {
                client
                  .query(`INSERT INTO FULL_TIME_RIDER(did, month_of_work, wws_start_day,day1_shift,day2_shift,day3_shift,day4_shift,day5_shift)
                    VALUES($1,CURRENT_DATE,'sun',1,1,1,1,1);`,
                    [username]
                  ).then((_) => {
                      res.send({ status: 200 }); //OK, Full Time
                    }
                  )
              }
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
  let { firstName, lastName, username, password } = req.body;
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
            `INSERT INTO restaurant_staff(staff_id)
            VALUES($1);`,
            [username]
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
      `SELECT DISTINCT restaurant_name
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
      F.rid
      FROM food_items F, restaurants R
      where F.rid = R.rid
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
  let { name } = req.body;
  client
    .query(
      `SELECT food_item_name, price, daily_limit, num_orders_made, restaurant_name
     FROM food_items natural join restaurants
     where category = '${name}'
    `
    )
    .then((result) => res.send(result.rows))
    .catch((err) => console.log(err));
});

/**
 * What: A query to return all the options for a food item.
 * Receives: Req.body = {rid: String, food_item_name: String}
 * Returns: An array of jsons. e.g  {
      options_name: 'Size-small',
      type_of_option: 'small',
      addon_price: 0,
      rid: '1',
      food_item_name: 'Chicken Rice'
    },
 */

app.post("/option", (req, res) => {
  let { rid, food_item_name } = req.body;

  client
    .query(
      `SELECT *
       FROM options
       WHERE rid = '${rid}'
       AND food_item_name = '${food_item_name}';
      `
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.log(err));
});


//Don't modify below this comment
app.listen(port, () => {
  console.log("Backend server is up on port " + port);
});
