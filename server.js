const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

const cors =require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

// app.use(express.urlencoded({ extended: true }));
// may have to do with open ai config....

// LOAD env Vars
dotenv.config({ path: "./config/config.env" });

// Route files
const stories = require("./routes/stories");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");

const app = express();

app.use(mongoSanitize())
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(helmet())

//Body parser
app.use(express.json());

//cookie Parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Mount routers
app.use("/api/v1/stories", stories);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => process.exit(1));
});


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
})

dotenv.config({path: './config/config.env'});

connectDB();
