// we can populate json data to our db
// we can use this file to populate our db
//  the data is in the form of json in products.json file

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connectDB.js";
import { Product } from "./models/product.modal.js";
import fs from "fs";

// const RawProductsData = fs.readFileSync("./products.json", "utf-8")
// const products = JSON.parse(RawProductsData)

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

const start = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.create(products);
    console.log("db connected in populate.js");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
