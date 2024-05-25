import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

// ! Validierung Access-Token

export async function doJwtAuth(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ message: "unauthorized" });
  // * ⬇ deconstruction ⬇
  const [authType, tokenString] = bearerToken.split(" ");

  if (authType !== "Bearer" || !tokenString) return res.status(401).json({ message: "unauthorized" });

  try {
    const verifiedClaims = jwt.verify(tokenString, secret);
    // *  ⬇ access ⬇
    if (verifiedClaims.type !== "access") return res.status(401).json({ message: "unauthorized" });

    req.authenticatedUserId = verifiedClaims.sub;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
}

// ! Validierung Refresh-Token

export async function validateRefreshToken(req, res, next) {
  try {
    console.log(req.session); // undefined
    if (!req.session.refreshToken) return res.status(401).json({ message: "unauthorized" });

    const verifiedClaims = jwt.verify(req.session.refreshToken, secret);

    // *  ⬇ refresh ⬇
    if (verifiedClaims.type !== "refresh") return res.status(401).json({ message: "unauthorized" });
    req.authenticatedUserId = verifiedClaims.sub;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
}

//? console.log(verifiedClaims);
//   {
//     sub: '66430cd7212f413eb9449ccd',
//     type: 'access',
//     iat: 1715670776,
//     exp: 1715674376
//   }
