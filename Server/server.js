const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const {
  notFoundHandler,
  defaultErrorHandler,
} = require("./middleware/common/defaultErrorHandaler");
const { connection } = require("./connection");
const cors = require("cors");
const { routes } = require("./routes/routes");

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
// app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// set template emgine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads")));

// Connected to DB
connection();

//All route
app.use(routes);

// Not Found Handler
app.use(notFoundHandler);
// Error Handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT: http://localhost/${process.env.PORT}`)
);
