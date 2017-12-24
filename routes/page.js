const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Page:
 *     properties:
 *       name:
 *         type: string
 *       metadata:
 *         type: object
 *       created_at:
 *         type: date-time
 *       updated_at:
 *         type: date-time
 */

/**
 * @swagger
 * /api/pages:
 *   post:
 *     tags:
 *       - Pages
 *     description: Creates a new page metadata
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of page
 *         in: formData
 *         type: string
 *         required: true
 *       - name: metadata
 *         description: Metadata info
 *         in: formData
 *         type: object
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', controllers.page.create);

/**
 * @swagger
 * /api/pages:
 *   get:
 *     tags:
 *       - Pages
 *     description: Returns all pages
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of pages
 *         schema:
 *           $ref: '#/definitions/Page'
 */
router.get('', controllers.page.list);

/**
 * @swagger
 * /api/pages/{id}:
 *   get:
 *     tags:
 *       - Pages
 *     description: Returns a single page metadata
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Pages's id or name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Page
 *         schema:
 *           $ref: '#/definitions/Page'
 */
router.get('/:page', controllers.page.get);

/**
 * @swagger
 * /api/page/{id}:
 *   put:
 *     tags:
 *       - Pages
 *     description: Updates a single page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Page object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Page'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:page', controllers.page.update);

/**
 * @swagger
 * /api/page/{id}:
 *   delete:
 *     tags:
 *       - Pages
 *     description: Deletes a single page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Page's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:page', controllers.page.delete);

module.exports = router;
