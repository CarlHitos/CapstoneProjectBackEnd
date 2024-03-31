
const isAdminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401)
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized Access' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

const isUserMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role !== 'user') {
      return res.sendStatus(403);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  isAdminMiddleware,
  isUserMiddleware
};