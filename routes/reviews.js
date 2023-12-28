const express = require("express");

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const Review = require("../models/Review");

const router = express.Router({
  mergeParams: true,
});

const advancedResults = require("../middleware/advancedResult");
const { protect, 
  authorize 
} = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "story",
      select: "name description",
    }),
    getReviews
  )
  .post(protect,
    //  authorize("user"), 
    addReview);
router
  .route("/:id")
  .get(getReview)
  .delete(protect, 
    // authorize("user", "admin"),
     deleteReview);

module.exports = router;
