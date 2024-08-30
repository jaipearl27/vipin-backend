//==============================================Imports===============================================
import jwt from "jsonwebtoken";
//***************************************************************************************************

export const verifyTokenMiddleware = async (req, res, next) => {
  try {

    const cookies = req?.cookies;
    const access_token = cookies?.VIPINBHAIIKA_ACCESS_TOKEN;

    // console.log('cookies',cookies)

    if (!access_token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Please Check Your Login Credentials",
      });
    }
    jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, user) => {
        if (error) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized token! Please Check Your Login Credentials",
          });
        }
        req.isAuth = true
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
