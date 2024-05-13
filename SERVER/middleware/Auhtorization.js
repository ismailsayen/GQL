const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token =  req.cookies.token;
  
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }
  
  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    req.role = verify.role; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
