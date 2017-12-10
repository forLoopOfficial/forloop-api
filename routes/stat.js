const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     tags:
 *       - Sponsors
 *     description: Get stat for admin dashboard
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retreived
 */
router.get('/', controllers.stat.getDashboardStat);

module.exports = router;
