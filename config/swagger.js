const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API Documentation for the E-Commerce Backend Service',
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'Development Server',
        variables: {
          port: {
            default: '3000',
          },
        },
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserInput: {
          type: 'object',
          required: [
            'name',
            'email',
            'password',
            'confirmPassword',
            'countryCode',
            'phoneNumber',
            'role',
            'status',
          ],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
              minLength: 3,
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              example: 'secret123',
            },
            confirmPassword: {
              type: 'string',
              format: 'password',
              minLength: 6,
              example: 'secret123',
            },
            countryCode: {
              type: 'string',
              example: '+1',
            },
            phoneNumber: {
              type: 'string',
              example: '1234567890',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              example: 'USER',
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE'],
              example: 'ACTIVE',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            statusCode: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              type: 'object',
              nullable: true,
            },
          },
        },
        ValidationErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            statusCode: {
              type: 'integer',
              example: 400,
            },
            message: {
              type: 'string',
              example: 'Validation failed',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email',
                  },
                  value: {
                    type: 'string',
                    example: 'invalid-email',
                  },
                  expected: {
                    type: 'string',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid email',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./app.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = setupSwagger;
