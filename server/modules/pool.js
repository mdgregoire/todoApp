const pg = require('pg');
const Pool = pg.Pool;

const config = {
  database: 'todo',  //change this based on app
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 5000
};


//create a Pool
const pool = new Pool(config);

module.exports = pool;
