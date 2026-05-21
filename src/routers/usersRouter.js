const express = require("express");
const { User } = require("../models");

const router = new express.Router();

router.get("/", async (req, res, next) => {
  const { role, city, country, sortBy, order = "asc", page, limit } = req.query;

  const filter = {};

  if (role) filter.role = role;
  if (city) filter["address.city"] = { $regex: city, $options: "i" };
  if (country) filter["address.country"] = { $regex: country, $options: "i" };

  const sort = {};
  if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;

  try {
    const users = await User.find(filter).sort(sort).limit(limit).skip((page - 1) * limit);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.validate();
    // Simulated: validates and returns the object without saving

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    user.set(req.body);
    await user.validate();
    // Simulated: validates the merged data without saving

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    user.set(req.body);
    await user.validate();
    // Simulated: validates and returns the replaced object without saving

    res.send({ ...req.body, _id: user._id, id: user.id });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    // Simulated: returns deleted user without modifying the database
    res.send({ message: "Deleted successfully!", user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
