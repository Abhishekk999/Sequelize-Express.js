import express from "express";
import cors from "cors";
import routes from "./routes/api.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const port = 4000;

// Middleware to parse JSON bodies. 
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Success", status: 200 });
});

app.use(cors());

app.use("/api", routes);

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Sequelize',
            version: '1.0.0',
            description: '',
            contact: {
                name: 'Abhishek Kushwaha',
            },
            servers: [{
                url: 'http://localhost:4000'
            }]
        }
    },
    apis: ['./routes/api.js'],
};

const swaggerDocs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

// Catch-all route for undefined routes
app.all("/*", (req, res) => {
    res.status(404).send("404 Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});