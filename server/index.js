import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import pg from "pg";
import redis from "redis";

import keys from "./keys.js";

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const pgClient = new pg.Client({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
  ssl:
    process.env.NODE_ENV !== "production"
      ? false
      : { rejectUnauthorized: false },
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

// Redis Client Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, // if connection lost, try to reconnect every 1000ms
});
const redisPublisher = redisClient.duplicate();

// Express route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

// get all values from postgres
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

// get all values from redis
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

// post new value to redis
app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }
  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});
