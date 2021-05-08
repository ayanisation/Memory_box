const jwt = require("jsonwebtoken");

const authtoken = async (req, res, next) => {
  try {
    token = req.headers.Authorization.split(" ")[0];
    let data;
    if (token) {
      data = jwt.verify(token, "mymammadontlikeyouandshelikeseveryone");
      req.userId = data?._id;
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = authtoken;
