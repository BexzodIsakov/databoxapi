const express = require("express");
const { Product } = require("../models");

const router = new express.Router();

router.get("/", async (req, res, next) => {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    inStock,
    minDiscount,
    minRating,
    tags,
    sortBy,
    order = "asc",
    page,
    limit
  } = req.query;

  const filter = {};

  if (category) filter.category = category;
  if (brand) filter.brand = { $regex: brand, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice && { $gte: minPrice }),
      ...(maxPrice && { $lte: maxPrice }),
    };
  }
  if (inStock) filter.stock = { $gt: 0 };
  if (minDiscount) filter.discount = { $gte: minDiscount };
  if (minRating) filter.ratings = { $gte: minRating };
  if (tags) filter.tags = { $in: tags.split(",") };

  const sort = {};
  if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;

  try {
    const products = await Product.find(filter).sort(sort).limit(limit).skip((page - 1) * limit);

    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({id});

    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Post request doesn't in fact create anything, it just an immmitation
router.post("/", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.validate();
    // await product.save();

    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    product.set(req.body); // Merge the new data into the product instance
    await product.validate(); // Validate the merged data without saving

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    product.set(req.body); // Merge the new data into the product instance
    await product.validate(); // Validate the merged data without saving

    res.send({...req.body, _id: product._id, id: product.id});
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({id});

    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    res.send({ message: "Deleted successfully!", product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
