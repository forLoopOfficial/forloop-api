const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Country:
 *     properties:
 *       name:
 *         type: string
 *       active:
 *         type: string
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

/**
 * @swagger
 * /api/countries:
 *   post:
 *     tags:
 *       - Countries
 *     description: Creates new forloop countries
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of country
 *         in: formData
 *         type: string
 *         required: true
 *       - name: active
 *         description: Whether a country should show up on the site or not
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controllers.country.create);

/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags:
 *       - Countries
 *     description: Returns all active countries by default.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: filter
 *         description: filter based on active status
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of countries
 *         schema:
 *           $ref: '#/definitions/Country'
 */
router.get('', controllers.country.list);

/**
 * @swagger
 * /api/countries/{id}:
 *   get:
 *     tags:
 *       - Countries
 *     description: Returns a single country
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Country's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Country
 *         schema:
 *           $ref: '#/definitions/Country'
 */
router.get('/:country', controllers.country.get);

/**
 * @swagger
 * /api/countries/{id}:
 *   put:
 *     tags:
 *       - Country
 *     description: Updates a single country
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Country object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Country'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:country', controllers.country.update);

/**
 * @swagger
 * /api/countries:
 *   put:
 *     tags:
 *       - Country
 *     description: Updates an array of countries
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/', controllers.country.bulkUpdate);

/**
 * @swagger
 * /api/countries/{id}:
 *   delete:
 *     tags:
 *       - Countries
 *     description: Deletes a single country
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Country's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:country', controllers.country.delete);

/**
 * @swagger
 * /api/countries:
 *   delete:
 *     tags:
 *       - Countries
 *     description: Deletes an array of countries
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/', controllers.country.bulkDelete);

module.exports = router;
