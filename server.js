import express from "express";
import cors from "cors";
import routes from "./routes/api";

const app = express();

const port = 4000;

// Middleware to parse JSON bodies. 
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Success", status: 200 });
});

app.use(cors());

app.use("/api", routes);

// Catch-all route for undefined routes
app.all("/*", (req, res) => {
    res.status(404).send("404 Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});