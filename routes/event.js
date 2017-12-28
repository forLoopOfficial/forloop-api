const authMiddleware = require('../middlewares/auth');
const controllers = require('../controllers');
const router = require('express').Router();

/**
 * @swagger
 * definitions:
 *   Event:
 *     properties:
 *       title:
 *         type: string
 *       url_slug:
 *         type: string
 *       published:
 *         type: number
 *       background_image_url:
 *         type: string
 *       country:
 *         type: string
 *       when:
 *         type: integer
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags:
 *       - Events
 *     description: Creates a new event
 *     consumes:
 *       - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: title of event
 *         in: formData
 *         type: string
 *         required: true
 *       - name: published
 *         description: To publish or not to publish
 *         in: formData
 *         type: boolean
 *       - name: description
 *         description: Description of event
 *         in: formData
 *         type: string
 *         required: false
 *       - name: background_image_url
 *         description: Event background image url
 *         in: formData
 *         type: string
 *         required: false
 *       - name: when
 *         description: Time info about event
 *         in: formData
 *         type: object
 *         required: true
 *       - name: location
 *         description: Location info
 *         in: formData
 *         type: object
 *         required: true
 *       - name: hosts
 *         description: event hosts
 *         in: formData
 *         type: array
 *         required: true
 *       - name: speakers
 *         description: event speakers
 *         in: formData
 *         type: array
 *         required: true
 *       - name: sponsors
 *         description: event sponsors
 *         in: formData
 *         type: array
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post(
  '/',
  authMiddleware.authenticated,
  authMiddleware.isAdmin,
  controllers.event.create
);

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     description: Returns all events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: published
 *         description: filter by publish status
 *         in: query
 *         required: false
 *         type: string
 *       - name: country
 *         description: filter by country
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of events
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.get('', authMiddleware.checkAuth, controllers.event.list);

/**
 * @swagger
 * /api/events/slug/{slug}:
 *   get:
 *     tags:
 *       - Events
 *     description: Returns a single event using slug
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: event's slug
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Event
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.get('/slug/:slug', controllers.event.getBySlug);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     description: Returns a single event
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: event's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Event
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.get('/:event', controllers.event.get);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     description: Updates a single event
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Event object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Event'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(
  '/:event',
  authMiddleware.authenticated,
  authMiddleware.isAdmin,
  controllers.event.update
);

/**
 * @swagger
 * /api/events/{id}/attend:
 *   post:
 *     tags:
 *       - Events
 *     description: Attend an event
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Event's id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully attending
 */
router.post(
  '/:event/attend',
  authMiddleware.authenticated,
  controllers.event.attend
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     description: Deletes a single event
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Events's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(
  '/:event',
  authMiddleware.authenticated,
  authMiddleware.isAdmin,
  controllers.event.delete
);

module.exports = router;
