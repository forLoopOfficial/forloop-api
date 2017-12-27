const controllers = require('../controllers');
const router = require('express').Router();

router.get('/twitterprofile/:handle', controllers.misc.getTwitterHandleProfile);

router.post('/subscribe', controllers.misc.subscribeMailChimp);

module.exports = router;
