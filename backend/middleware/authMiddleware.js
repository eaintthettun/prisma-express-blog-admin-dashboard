import jwt from 'jsonwebtoken';

// Middleware to protect routes
export default function authMiddleware(req, res, next) {
  const SECRET=process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];
  //console.log('authHeader:',authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); //unauthorized


 //authorized but deny to access requested source
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}