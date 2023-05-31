const jwt = require("jsonwebtoken");
const config = require("./config.json");

/*The id_token and access_token are signed with the secret located at the config.json file. The id_token will contain the username and the extra information sent, while the access_token will contain the audience, jti, issuer and scope.*/
/* function to generate signed jwt Access Token based on secret defined in config.js file. Access token will be sent on every request for authentication purpose */
/**
 * @author "Khushbu Shah"
 */
const createAccessToken = (uinfo = {}) => {
  const key = uinfo.isPublicAPI ? config.jwt.publicAPIKey : genJti();
//167589
  try {
      if (uinfo.currentDate) delete uinfo.currentDate;
    
    const token = jwt.sign(
      {
        iss: config.jwt.issuer,
        aud: config.jwt.audience,
        scope: "full_access",
        jti: key, // unique identifier for the token
        alg: "HS256",
        ...uinfo
      },
      key,
      {
        expiresIn: uinfo.isPublicAPI
          ? `${config.jwt.publicAPITokenExpiretime}d`
          : config.jwt.expiretime * 60
      }
    );
    return { key, token };
    
  } catch (error) {
    
    return {key,uinfo};
  }
  
};

/**
 * @author "Khushbu Shah"
 */
// Generate Unique Identifier for the access token
const genJti = (length = 16, isOnlyNumber = false) => {
  let jti = "",
    possible;
  if (isOnlyNumber) possible = "0123456789";
  else
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return jti;
};

/**
 * @author "Khushbu Shah"
 */
const verifyToken = (token, Key) => {
  return jwt.verify(token, Key);
};

/**
 * @author "Aadilkhan"
 */
const destroyToken = (token) => {
  return;
  return jwt.destroy(token);
};

module.exports = {
  createAccessToken,
  verifyToken,
  genJti,
  destroyToken
};
