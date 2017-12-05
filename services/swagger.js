const swaggerJSDoc = require('swagger-jsdoc');
const config = require('config');

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Forloop Swagger API',
    version: '1.0.0',
    description: 'Forloop API'
  },
  tags: [
    {
      name: 'Events',
      description: 'Everything about events'
    },
    {
      name: 'Members',
      description: 'Everything about members'
    },
    {
      name: 'Admins',
      description: 'Everything about admins'
    },
    {
      name: 'Teams',
      description: 'Everything about teams'
    },
    {
      name: 'Countries',
      description: 'Everything about forloop countries'
    }
  ],
  basePath: '/',
  securityDefinitions: {
    internal_auth: {
      type: 'oauth2',
      tokenUrl: `${config.get('baseUrl')}api/oauth/token`,
      flow: 'application',
      scopes: 'read:all'
    }
  },
  security: [{ internal_auth: ['read:all'] }]
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
