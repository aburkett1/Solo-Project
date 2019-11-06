const { Pool } = require('pg');

const uri = process.env.PG_URI;

const pool = new Pool({
    connectionString: uri,
})

module.exports = {
    query: (text, value, callback) => {
        console.log('querying db: ', text);
        return pool.query(text, value, callback);
      }
}