const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Story = require('../models/Story');

//@desc       Get Reviews
//@route      GET /api/vi/review
//@route      GET /api/vi/stories/:storyId/reviews
//@access     Public

exports.getReviews = asyncHandler(async (req, res, next) => {
	if (req.params.storyId) {
		const reviews = await Review.find({ story: req.params.storyId });
		return res.status(200).json({
			success: true,
			count: reviews.length,
			data: reviews,
		});
	} else {
		res.status(200).json(res.advancedResults);
	}
});

//@desc       Get Single Reviews
//@route      GET /api/vi/review/:id
//@access     Public

exports.getReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id).populate({
		path: 'story',
		select: 'name description',
	});
	if (!review) {
		return next(new ErrorResponse(`No review folund with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: review,
	});
});

//@desc       Add review
//@route      Post /api/vi/stories/:storyId/reviews
//@access     Private
exports.addReview = asyncHandler(async (req, res, next) => {
	req.body.story = req.params.storyId;
	req.body.user = req.user.id;

	const story = await Story.findById(req.params.storyId);

	if (!story) {
		return next(new ErrorResponse(`No story with the id of ${req.params.storyId}`));
	}

	const review = await Review.create(req.body);

	res.status(201).json({
		success: true,
		data: review,
	});
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
	let review = await Review.findById(req.params.id);

	if (!review) {
		return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
	}

	// Make sure review belongs to user or user is admin
	if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Not authorized to update review`, 401));
	}

	review = await Review.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	review.save();

	res.status(200).json({
		success: true,
		data: review,
	});
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id);

	if (!review) {
		return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
	}

	// Make sure review belongs to user or user is admin
	if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Not authorized to update review`, 401));
	}

	await review.deleteOne();

	res.status(200).json({
		success: true,
		data: {},
	});
});
