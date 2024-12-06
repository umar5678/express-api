import { Product } from "../models/product.modal.js";

const getAllProductsStaic = async (req, res) => {
  const products = await Product.find()
    .sort("name")
    .select("name rating -_id")
    .limit(10)
    .skip(3);

  res.status(200).json({ products: products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, rating, price, name, sort, field, numFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (rating) {
    queryObject.rating = { $gte: Number(rating) };
  }
  if (price) {
    queryObject.price = { $gte: Number(price) };
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numFilters) {
    const operatorsMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    
    const regEx = /\b(<|>|=|<=|>=)\b/g

    let filters = numFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`)
    
    const options = ['price', 'rating']

    filters = filters.split(',').forEach((item) => {
      const [key, operator, value] = item.split('-')
      if (options.includes(key)) {
        queryObject[key] = { [operator] : Number(value)}
      }
    })
  }


  let results = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  // fields

  if (field) {
    const fieldList = field.split(",").join(" ");
    results = results.select(fieldList);
  }

  // paginate

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  results = results.skip(skip).limit(limit);
  const products = await results;
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStaic };
