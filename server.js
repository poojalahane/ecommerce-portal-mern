import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js"
import cors from "cors";
import bodyParser from 'body-parser'

//configure env
dotenv.config();

//database config
connectDB();

//! rest object
const app = express();

//! middlewares
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); 

//! routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//! rest api
app.get("/", (req, res) => {
  res.send("ecommerce portal");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE}: http://localhost:${process.env.PORT}`
      .bgCyan.white
  );
});
