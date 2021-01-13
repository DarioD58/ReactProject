/* const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kampAdmin',
    password: 'bazepodataka', //svatko svoju sifru za sada
    port: 5432,
}); */

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://btjjgaufdoghnw:e5cdfe71231ab7bc350a46106b1de991b12a3676cb77d0da8d802f142b48c92c@ec2-54-78-127-245.eu-west-1.compute.amazonaws.com:5432/d7o5kmr00s49tn',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

/* client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
}); */

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return client.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //yconsole.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: client
}
