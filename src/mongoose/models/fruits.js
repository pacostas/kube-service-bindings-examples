const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: String,
  stock: Number
});

const Fruit = mongoose.model("fruit", fruitSchema);

module.exports = {
  Fruit
};
