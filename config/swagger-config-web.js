import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "iNotebook Api's Documentation",
            version: "1.0",
            description: "All api end points",
            servers: ["http://localhost:8000"]
        },
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "authorization",
                scheme: "bearer",
                in: "header"
            }
        },
        produces: ["application/json"]
    },
    apis: ["./api/*/*.js"]
}

export default swaggerJSDoc(swaggerOptions)