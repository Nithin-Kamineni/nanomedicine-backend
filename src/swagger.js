const dbSchema = require("../src/schema/dbSchema");
const requestSchema = require("../src/schema/requestBodySchema");
const { convert } = require("joi-openapi");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Nanomedicine server side REST API's",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger"
      },
      servers: [
        {
            url: `${process.env.BASE_URL}/api/v1`,
            description: 'Development server'
        },
        {
            url: `${process.env.DNS_SWAGGER}/api/v1`,
            description: 'Production server'
        },
        {
            url: `${process.env.DNS_URL}/api/v1`,
            description: 'Production SSL server'
        }
      ],
      components: {
        schemas: {
            User: convert(dbSchema.userSchema),
            userDetailsUpdateRequest: convert(requestSchema.userDetailsUpdateRequest),
            userImageUpdateRequest: convert(requestSchema.userImageUpdateRequest),
            userSubscriptionUpdateRequest: convert(requestSchema.userSubscriptionUpdateRequest),
            nanoparticles: convert(dbSchema.nanoparticlesSchema),
            nanoparticles_filter: convert(requestSchema.filterNanoparticlesSchema),
            biodistribution_filter: convert(requestSchema.filterBioDistributionSchema),
            blooddata_filter: convert(requestSchema.filterBloodData),
            nanoparticles_biodistribution_filter: convert(requestSchema.filterNanoAndBioSchema),
            nano_tumor_id_list: convert(requestSchema.nano_tumor_id_list),
            // testSchema: convert(requestSchema.testSchema),
            nanoparticles_biodistributionTimelinesSchema: convert(dbSchema.nanoparticlesAndBiodistributionTimelinesSchema),
            TestObject: {
                type: 'object',
                required: ['title', 'author', 'price', 'year_published'],
                properties: {
                    author: {
                        type: 'string',
                        description: 'The author of the book'
                    },
                    price: {
                        type: 'integer',
                        description: 'The price of the book'
                    },
                    description: {
                        type: 'string',
                        description: 'The description of the book'
                    },
                    year_published: {
                        type: 'string',
                        description: 'The year the book was published'
                    }
                },
            },
        },
        responses : {
            400: {
                description: 'Missing API key - include it in the Authorization header',
                contents: 'application/json'
            },
            401: {
                description: 'Unauthorized - incorrect API key or incorrect format',
                contents: 'application/json'
            },
            404: {
                description: 'Not found - the book was not found',
                contents: 'application/json'
            }
        },
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
              }
        }

      },
      security: [{
        BearerAuth: []
      }]

    },
    apis: ["./src/routes/v1/dashboardRoute.js","./src/routes/v1/userRoute.js","./src/routes/v1/visualizationRoute.js"],
}

module.exports = options