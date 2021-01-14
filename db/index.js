const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://btjjgaufdoghnw:e5cdfe71231ab7bc350a46106b1de991b12a3676cb77d0da8d802f142b48c92c@ec2-54-78-127-245.eu-west-1.compute.amazonaws.com:5432/d7o5kmr00s49tn',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return client.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: client
}
