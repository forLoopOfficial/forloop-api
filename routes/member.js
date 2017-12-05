const controllers = require('../controllers');
const auth = require('../middlewares/auth');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Member:
 *     properties:
 *       uid:
 *         type: string
 *       name:
 *         type: string
 *       display_name:
 *         type: string
 *       email:
 *         type: string
 *       github:
 *         type: string
 *       twitter:
 *         type: string
 *       job_role:
 *         type: string
 *       skills:
 *         type: array
 *       active:
 *         type: string
 *       profile_image:
 *         type: string
 *       location:
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
 *     description: Creates new member
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controllers.member.create);

/**
 * @swagger
 * /api/members:
 *   get:
 *     tags:
 *       - Members
 *     description: Returns all members.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of members
 *         schema:
 *           $ref: '#/definitions/Member'
 */
router.get('', controllers.member.list);

/**
 * @swagger
 * /api/members/profile:
 *   get:
 *     tags:
 *       - Members
 *     description: Returns a member's profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Member's profile
 *         schema:
 *           $ref: '#/definitions/Member'
 */
router.get('/profile', auth.authenticated, controllers.member.getProfile);

/**
 * @swagger
 * /api/members/profile:
 *   put:
 *     tags:
 *       - Member
 *     description: Updates a member's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: Member object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Member'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/profile', auth.authenticated, controllers.member.updateProfile);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     tags:
 *       - Members
 *     description: Deletes a single member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Member's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:member', controllers.member.delete);

module.exports = router;
