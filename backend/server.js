// npm init
// npm install mongoose express cors
// npm install nodemon --save-dev

// Express:	Node.js web application framework that helps in creating REST APIs
// CORS: Node.js package that helps in enabling Access-Control-Allow-Origin CORS header
// Nodemon: automates the server restarting process

// command to start the Nodemon server: nodemon server.js

let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let dbConfig = require("./database/db");
const createError = require("http-errors");

// Express route
const bookRoute = require("../backend/routes/bookRoute");

// connecting to mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database: " + error);
    }
  );

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/books", bookRoute);

// port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) 
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
