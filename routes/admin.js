const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const controllers = require('../controllers');

router.use(authMiddleware.authenticated);
/**
 * @swagger
 * definitions:
 *   Admin:
 *     properties:
 *       uid:
 *         type: string
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       username:
 *         type: string
 *       role:
 *         type: string
 *       email:
 *         type: string
 *       twitter_handle:
 *         type: string
 *       active:
 *         type: string
 *       profile_image:
 *         type: string
 *       country:
 *         type: string
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     tags:
 *       - Admins
 *     description: Creates new admin users
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', authMiddleware.isAdmin, controllers.admin.create);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     tags:
 *       - Admins
 *     description: Returns all admins.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of admins
 *         schema:
 *           $ref: '#/definitions/Admin'
 */
router.get('', controllers.admin.list);

/**
 * @swagger
 * /api/admins/profile:
 *   get:
 *     tags:
 *       - Admins
 *     description: Returns an admin's profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An Admin's profile
 *         schema:
 *           $ref: '#/definitions/Admin'
 */
router.get('/profile', controllers.admin.getProfile);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     tags:
 *       - Admins
 *     description: Returns an admin's profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An Admin's profile
 *         schema:
 *           $ref: '#/definitions/Admin'
 */
router.get('/:admin', controllers.admin.get);

/**
 * @swagger
 * /api/admins/profile:
 *   put:
 *     tags:
 *       - Admin
 *     description: Updates an admin's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/profile', controllers.admin.updateProfile);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Updates a admin's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:admin', controllers.admin.update);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     tags:
 *       - Admins
 *     description: Deletes a single admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Admin's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:admin', controllers.admin.delete);

module.exports = router;
