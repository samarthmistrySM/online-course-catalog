import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express"
import { errorHandler } from "./middlewares/errorMiddleware.js";
import swaggerDocument from "./swagger-output.json" with {type: 'json'};

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routes());
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error(err));
