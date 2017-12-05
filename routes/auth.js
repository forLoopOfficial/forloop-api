const authMiddleware = require('../middlewares/auth');
const controllers = require('../controllers');
const router = require('express').Router();

router.post(
  '/admin/verify',
  authMiddleware.verifyIdToken,
  controllers.admin.authenticate
);

router.post(
  '/member/verify',
  authMiddleware.verifyIdToken,
  controllers.member.authenticate
);

module.exports = router;
