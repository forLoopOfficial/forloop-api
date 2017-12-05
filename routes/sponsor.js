const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Sponsor:
 *     properties:
 *       name:
 *         type: string
 *       image_url:
 *         type: string
 *       website:
 *         type: string
 *       front_page:
 *         type: boolean
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

/**
 * @swagger
 * /api/sponsors:
 *   post:
 *     tags:
 *       - Sponsors
 *     description: Creates sponsors
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of sponsor
 *         in: formData
 *         type: string
 *         required: true
 *       - name: image_url
 *         description: link to logo
 *         in: formData
 *         type: string
 *       - name: website
 *         description: sponsor website
 *         in: formData
 *         type: string
 *       - name: front_page
 *         description: link to logo
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controllers.sponsor.create);

/**
 * @swagger
 * /api/sponsors:
 *   get:
 *     tags:
 *       - Sponsors
 *     description: Returns all sponsors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of sponsors
 *         schema:
 *           $ref: '#/definitions/Sponsor'
 */
router.get('', controllers.sponsor.list);

/**
 * @swagger
 * /api/sponsors/{id}:
 *   get:
 *     tags:
 *       - Sponsors
 *     description: Returns a single sponsor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sponsors's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Sponsor
 *         schema:
 *           $ref: '#/definitions/Sponsor'
 */
router.get('/:sponsor', controllers.sponsor.get);

/**
 * @swagger
 * /api/sponsors/{id}:
 *   put:
 *     tags:
 *       - Sponsors
 *     description: Updates a single sponsor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sponsor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Sponsor'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:sponsor', controllers.sponsor.update);

/**
 * @swagger
 * /api/sponsors/{id}:
 *   put:
 *     tags:
 *       - Sponsors
 *     description: Updates a single sponsor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sponsor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Sponsor'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/', controllers.sponsor.bulkUpdate);

/**
 * @swagger
 * /api/sponsor/{id}:
 *   delete:
 *     tags:
 *       - Sponsors
 *     description: Deletes a single sponsor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sponsor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:sponsor', controllers.sponsor.delete);

/**
 * @swagger
 * /api/sponsor/{id}:
 *   delete:
 *     tags:
 *       - Sponsors
 *     description: Deletes a single sponsor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sponsor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/', controllers.sponsor.bulkDelete);

module.exports = router;
