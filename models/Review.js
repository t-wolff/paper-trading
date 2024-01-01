const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxLength: 100,
  },
  text: {
    type: String,
    required: [true, "please add a some text"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  story: {
    type: mongoose.Schema.ObjectId,
    ref: "Story",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (storyId) {
  const obj = await this.aggregate([
    {
      $match: { story: storyId },
    },
    {
      $group: {
        _id: "$story",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Story").findByIdAndUpdate(storyId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post("save", async function () {
  await this.constructor.getAverageRating(this.story);
});

// Call getAverageCost after remove
ReviewSchema.post("remove", async function () {
  await this.constructor.getAverageRating(this.story);
});

// Prevent user from submitting more than one review per story
ReviewSchema.index({ story: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
