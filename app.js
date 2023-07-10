"use strict";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { auth } = require("express-openid-connect");
const cors = require('cors');
const { initLocalStore } = require("./src/middleware/asyncLocalStorage");  //storage
const { checkJwt, getAuth0UserDetails } = require("./src/middleware/auth"); //prior1
const { logger } = require("./src/middleware/logEvents");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

//CORS allowed url's
const whiteList = [process.env.UI_URL,process.env.BASE_URL, process.env.UI_URL_PROXY, process.env.DNS_URL, process.env.DNS_URL_2, process.env.DNS_URL_3]
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin)!==-1 || !origin){   //after development remove || !origin
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
  };

  

app.use(logger)
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(initLocalStore);


// app.use(checkJwt);


// Middleware to allow specific URLs(SwaggerUI) without authentication
const allowUnauthenticatedUrls = (req, res, next) => {
  const { originalUrl } = req;
  
  // Check if the URL includes "/api-docs"
  if (originalUrl.includes("/api-docs")) {
    // Skip authentication and move to the next middleware
    next();
  } else {
    // Continue with the authentication process
    // app.use(checkJwt);
    // checkJwt(req, res, next);
    next();
    
  }
};
app.use(allowUnauthenticatedUrls);

// app.use(getAuth0UserDetails);

const dashboardRoutes = require('./src/routes/v1/dashboardRoute');
const userRoutes = require('./src/routes/v1/userRoute');
const visualizationRoutes = require('./src/routes/v1/visualizationRoute');
const errorHandler = require("./src/middleware/errorHandler");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const options = require("./src/swagger");



app.use("/api/test/", require("./src/routes/testRoute"));
app.use('/api/v1/dashboard',dashboardRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/visualization', visualizationRoutes);

app.use('/Assets', express.static('Assets'));

const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

//error handeling for logging routes that are not present
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND);
  if(req.accepts('json')) {
    res.json({error: "404 Not Found"})
  }
  else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler);

module.exports = app;