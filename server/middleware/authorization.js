const jwt = require('jsonwebtoken');

function authorize(roles) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET|| 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid authorization token' });
      }

      const { role } = decoded;

      if (roles && !roles.includes(role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = decoded;
      next();
    });
  };
}


module.exports = authorize;