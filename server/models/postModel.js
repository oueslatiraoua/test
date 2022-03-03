const mongoose = require("mongoose");
//schema of the services prices
const pricingSchema = new mongoose.Schema({
  serviceTier: {
    type: String,
    required: true,
  },
  FeatureA: {
    type: String,
    required: true,
  },
  FeatureB: {
    type: String,
    required: true,
  },
  FeatureC: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },
  PackageOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});
//***********comments schema
const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  commentOwner: {
    type: mongoose.Types.ObjectId,
    ref: "Person",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});
//***********post schema schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },

  aboutTheService: {
    type: String,
    required: true,
  },
  aboutTheFreelancer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  likes: [mongoose.Types.ObjectId],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  packages: [pricingSchema],
});
module.exports = mongoose.model("Post", postSchema);
