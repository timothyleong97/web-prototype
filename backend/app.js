// This is our backend server. It listens to all GET/POST/DELETE requests and sends back a response.
const express = require('express')
const client = require('./elephantsql')

const app = express()
const port = 3500;

app.use(express.json())
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
 * 7. As far as possible, group endpoints that are for the same React component together for easy debugging
 *    e.g.
 *     // Signup
 *     app.post('/signup', ...)
 *     // Login
 *     app.post('/login', ...)
 * 8. Don't forget step 3
 * 
 * Also note that our db can only store up to 20mb of data
 */

app.post('/signup', (req, res) => {
  console.log(req.body);
  res.send({msg: 'Hello!'});
});




//Do not modify below
app.listen(port, () => {
    console.log('Backend server is up on port ' + port);
})