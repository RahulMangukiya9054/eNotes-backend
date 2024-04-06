import jwt from "jsonwebtoken";

const jwtAlgo = process.env.JWT_ALGO
const jwtKey = process.env.JWT_KEY

//=============== Generate JWT Token =================//
export const generateJwtToken = async (userIdObj) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        userIdObj,
        jwtKey,
        { algorithm: jwtAlgo, expiresIn: "90d" },
        function (err, token) {
            if (err) {
                reject({ status: false, err })
            } else {
              resolve({ status: true, token });
            }
          }
      );
    });
}

//=============== Decode JWT Token =================//
export const decodeJwtToken = (req, res, next) => {
    const authToken = req.headers.Authorization || req.headers.authorization

    jwt.verify(authToken, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Authorization not found!" })
      }
      else{
        req.user = {
          userId: decoded.userId,
          _id: decoded.userId
        }
        next();
      }
    });
}