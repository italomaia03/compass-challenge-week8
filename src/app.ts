import express from "express";
import "express-async-errors";
import { petRouter, tutorRouter } from "./routes";
import { resourceNotFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";
import path from "path";
import dotenv from "dotenv";

const app = express();
dotenv.config({});
const filePath = path.resolve(__dirname, "../");
const file = fs.readFileSync(`${filePath}/swagger.yaml`, "utf-8");
const swaggerDocs = yaml.parse(file);

// middlewares
app.use(express.json());
app.use("/api/v1", tutorRouter);
app.use("/api/v1", petRouter);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(resourceNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
