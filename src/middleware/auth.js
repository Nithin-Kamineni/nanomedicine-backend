"use strict";
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const dotenv = require("dotenv");
const _ = require("lodash");
const { StatusCodes } = require("http-status-codes");
const ErrorCode = require("../lib/error/errorCodes.json");
const UserDbAccessor = require("../dbAccessor/UserDbAccessor");
const BaseError = require("../lib/error/BaseError");
const { asyncLocalPut, asyncLocalGet } = require("./asyncLocalStorage");
dotenv.config();

const ManagementClient = require("auth0").ManagementClient;
const auth0MgmtClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "read:users"
});
// var auth0MgmtClient = new ManagementClient({
//   domain: process.env.AUTH0_DOMAIN,
//   token: 'https://nanomedicine.us.auth0.com/api/v2/'
// });

const userDbAccessor = new UserDbAccessor();

const checkJwt = jwt.expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_JWKS_URI,
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    algorithms: ["RS256"],
});

function checkScopes(scopesToOr)  {
  return (req, resp, next) => {
    const permissions = _.get(req, "auth.permissions");
    // remove this //
    console.log("=========================================");
    console.log(permissions);
    console.log("=========================================");
    const id = permissions.includes(scopesToOr[0]) ? 1 : -1;
    if (id === -1) {
      const err = new BaseError(ErrorCode.API.UNAUTHORIZED, null, "Required authorization scopes not found in JWT.");
      resp.status(StatusCodes.FORBIDDEN);
      resp.send(err.getErrorResponseObject());
      return;
    } 
    next();
  };
};

function getAllPermissions(req, resp)  {
  const permissions = _.get(req, "auth.permissions");
  console.log(permissions);
  return permissions;
  // const id = permissions.includes(scopesToOr[0]) ? 1 : -1;
  // if (id === -1) {
  //   const err = new BaseError(ErrorCode.API.UNAUTHORIZED, null, "Required authorization scopes not found in JWT.");
  //   resp.status(StatusCodes.FORBIDDEN);
  //   resp.send(err.getErrorResponseObject());
  //   return;
  // }
};

const getAuth0UserDetails = async (req, resp, next) => {
  const authSub = _.get(req, "auth.sub", "|");
  // console.log(authSub, username, picture, email);
  // console.log(auth0_app_metedata);
  try {
    const user = _.get(await userDbAccessor.filterUsers({ auth0_id: authSub }), "0");
    let authId = _.get(user,"auth0_id");
    let userId = _.get(user, "id");
    // const auth0User = await auth0MgmtClient.getUser({ id: authSub });
    
    //Not in database so insert the value
    if (_.isEmpty(authId)) {
      console.log(`calling auth0 : req_id ${asyncLocalGet("request_id")}`);
      // console.log("===============================================================================================================================")
      const username = _.get(req, "auth.name", "|");
      const picture = _.get(req, "auth.picture", "|");
      const email = _.get(req, "auth.email", "|");
      const auth0_app_metedata = _.get(req, "auth");
      console.log(auth0_app_metedata);
      const user = {
        auth0_id: authSub,
        username: username,
        email: email,
        auth0_app_metadata: JSON.stringify(auth0_app_metedata),
        picture: picture,
      };
      // asyncLocalPut("auth0_user", { userId: userId });
      const userInDb = await userDbAccessor.insert(user);
      userId = _.get(userInDb, "id");
      asyncLocalPut("auth0_user", { userId: userId });
      asyncLocalPut("user", { id: userId });
    } else {
      asyncLocalPut("auth0_user", { user_id: userId });
      asyncLocalPut("user", { id: userId });
      // next();
    }
  } catch (e) {
    //Should probably send a response and end the req here itself.
    console.log(e);
  }
  next();
};




module.exports = { checkJwt, getAuth0UserDetails, checkScopes, getAllPermissions };