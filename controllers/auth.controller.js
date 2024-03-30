const User = require('../models/user.model');
const { creaPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: true, contenido: 'Usuario ya registrado' });
    }
    const passwordCrypt = creaPass(req.body.password);
    const result = await User.create({
      email: req.body.email,
      password: passwordCrypt,
      username: req.body.username,
      phone: req.body.phone,
      schedule: req.body.schedule,
      avatar: req.body.avatar || undefined,
    });
    res.json({ error: false, contenido: result });
  } catch (error) {
    next(error)
  }
};

const login = async (req, res) => {
  res.json({
    token: jwt.sign({ user: req.user._id, rol: 'admin' }, secret , { expiresIn: '1d' }),
  });
};

const verify = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  verify
};
