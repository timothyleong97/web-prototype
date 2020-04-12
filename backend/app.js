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
            res.send({
              status: 400,
              message: error.detail,
            }); //BAD REQUEST
          })
    )
    .catch((error) => {
      console.log(error);
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

// --CATALOGUE--
/*
  A query to return a DISTINCT list of categories in the Food_items table.
  No req body.
  Will return an array of categories.
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
  A query to return a DISTINCT list of restaurants in the Restaurants table.
  No req body.
  Will return an array of restaurants.
*/
app.get("/restaurants", (req, res) => {
  client
    .query(
      `SELECT DISTINCT restaurant_name
                FROM restaurants`
    )
    .then((result) => {
      res.send(result.rows.map(json => json.restaurant_name)); // e,g ['Dian Xiao Er', 'Subway']
    })
    .catch((_) => {
      res.send({ status: 500 }); //INTERNAL SERVER ERROR
    });
});

//Don't modify below this comment
app.listen(port, () => {
  console.log("Backend server is up on port " + port);
});
