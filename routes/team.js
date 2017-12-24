const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Page:
 *     properties:
 *       name:
 *         type: string
 *       profile_image:
 *         type: string
 *       twitter_handle:
 *         type: string
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

/**
 * @swagger
 * /api/team:
 *   post:
 *     tags:
 *       - Team
 *     description: Creates new team member(s)
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of team member
 *         in: formData
 *         type: string
 *         required: true
 *       - name: profile_image
 *         description: Member profile image link
 *         in: formData
 *         type: object
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controllers.team.create);

/**
 * @swagger
 * /api/team:
 *   get:
 *     tags:
 *       - Team
 *     description: Returns all team members
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of members
 *         schema:
 *           $ref: '#/definitions/Team'
 */
router.get('', controllers.team.list);

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     tags:
 *       - Team
 *     description: Returns a single team member detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Members's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Team Member
 *         schema:
 *           $ref: '#/definitions/Team'
 */
router.get('/:member', controllers.team.get);

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     tags:
 *       - Team
 *     description: Deletes a single team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Team member's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:member', controllers.team.delete);

module.exports = router;
