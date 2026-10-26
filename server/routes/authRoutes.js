const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const ctrl = require('../controllers/authController');
const v = require('../validators/authValidators');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: process.env.NODE_ENV === 'test' ? 1000 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, try again later' },
});

router.post('/login', loginLimiter, v.login, validate, ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/me', authenticate, ctrl.me);
router.post('/change-password', authenticate, v.changePassword, validate, ctrl.changePassword);

module.exports = router;
