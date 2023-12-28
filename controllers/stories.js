const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const Story = require('../models/Story');
const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResult');

//@desc       Get all stories
//@route      GET /api/vi/stories
//@access     Public
exports.getStories = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});


//@desc       Get single story
//@route      GET /api/vi/stories/:id
//@access     Public
exports.getStory = asyncHandler(async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.id);

		if (!story) {
			return next(new ErrorResponse(`Story not found with id of ${req.params.id}`, 404));
		}

		res.status(200).json({ success: true, data: story });
	} catch (err) {
		// res.status(400).json({ success: false });
		next(err);
	}
});


// //@desc       Update story
// //@route      PUT /api/vi/bootcamps/:id
// //@access     Private
// exports.updateStory = asyncHandler(async (req, res, next) => {
// 	let story = await Story.findById(req.params.id);

// 	if (!story) {
// 		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
// 	}

// 	// Make sure user is bootcamp owner
// 	if (story.user.toString() !== req.user.id && req.user.role !== 'admin') {
// 		return next(
// 			new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
// 		);
// 	}
// 	story = await Story.findByIdAndUpdate(req.params.id, req.body, {
// 		new: true,
// 		runValidators: true,
// 	});

// 	res.status(200).json({ success: true, data: story });
// });

// @desc    Delete a story
// @route   DELETE /api/v1/stories/:id
// @access  Private
exports.deleteStory = asyncHandler(async (req, res, next) => {
	const story = await Story.findById(req.params.id);

	if (!story) {
		return next(
			new ErrorResponse(`Story that ends with '${req.params.id.slice(-6)}' was not found`, 404)
		);
	}
	// Make sure user is story owner
	if (story.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(`User ${req.params.id} is not authorized to delete this story`, 401)
		);
	}

	await story.deleteOne();

	res.status(200).json({
		success: true,
		data: {},
	});
});
