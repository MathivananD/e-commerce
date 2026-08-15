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
        RegisterInput: {
          type: 'object',
          required: [
            'name',
            'email',
            'password',
            'confirmPassword',
            'countryCode',
            'phoneNumber',
            'role',
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
              example: 'US',
              minLength: 2,
              maxLength: 2,
            },
            phoneNumber: {
              type: 'string',
              example: '1234567890',
              minLength: 10,
              maxLength: 10,
            },
            role: {
              type: 'string',
              enum: ['admin', 'customer'],
              example: 'customer',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'secret123',
            },
          },
        },
        UserUpdateInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe Updated',
              minLength: 3,
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.updated@example.com',
            },
            countryCode: {
              type: 'string',
              example: 'US',
              minLength: 2,
              maxLength: 2,
            },
            phoneNumber: {
              type: 'string',
              example: '0987654321',
              minLength: 10,
              maxLength: 10,
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d0fe4f5311236168a109ca',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john.doe@example.com',
            },
            countryCode: {
              type: 'string',
              example: 'US',
            },
            phoneNumber: {
              type: 'string',
              example: '1234567890',
            },
            role: {
              type: 'string',
              example: 'customer',
            },
            status: {
              type: 'string',
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
        ErrorResponse: {
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
              example: 'Error description',
            },
            error: {
              type: 'object',
              nullable: true,
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
