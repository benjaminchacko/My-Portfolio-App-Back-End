const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: String,
    body: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", BlogSchema);
