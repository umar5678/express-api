import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db/connectDB.js";
import productsRouter from "./routes/products.js";
import "express-async-errors";

// port
const PORT = process.env.PORT || 3000;

const app = express();

// middlewares

app.use(express.json());

// importing routes
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    // connect o db
    await connectDB();
    app.listen(PORT, () => console.log(`Sever is running on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
