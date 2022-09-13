const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  Port: "5432",
  password: "7497",
  database: "students",
});

module.exports = client;
