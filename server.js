const express = require("express");
const app = express();

const jsonDataRoute = require("./routes/jsonData-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//below code will avoid CORS(Cross-Origin Resource Sharing) error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH");
    return res.status(200).json({});
  }
  next();
});

// below code will use the route defined in jsonData-routes.js
app.use(jsonDataRoute);

//handling error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    //If the response has been sent already below code forwards the error.
    return next(error);
  }
  res.status(400).json({
    error: "Could not decode request: JSON parsing failed",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
