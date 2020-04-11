const client = require('./elephantsql');
const chalk = require('chalk'); //for coloring console output

//To run this script, type 'node init.js'

// DROP all existing tables
client.query('DROP TABLE IF EXISTS addresses cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS customers cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS deliveries cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS delivery_riders cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS fds_manager cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS fds_promotion cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS food_item cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS food_items_in_orders cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS full_time_rider cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS opening_hours_template cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS options cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS orders cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS part_time_rider cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS places cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS promotions cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS restaurant_promotion cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS restaurant_staff cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS restaurants cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS salary cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS set_meals cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS time_entries cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS users cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));
client.query('DROP TABLE IF EXISTS uses cascade;')
.then(result => console.log(result))
.catch(e => console.error(chalk.red(e.stack)));

//CREATE all tables
