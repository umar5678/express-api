import express from "express"

import { getAllProducts, getAllProductsStaic } from "../controllers/products.js"

const router = express.Router()

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStaic);


export default router