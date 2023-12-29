const ErrorResponse = require('../utils/errorResponse');
const Story = require('../models/Story');
const asyncHandler = require('../middleware/async');
const getOpenAiInstance = require('../config/openai');

//@desc       Create new story
//@route      POST /api/v1/stories
//@access     Private
exports.createStory = asyncHandler(async (req, res, next) => {
	const prompt = req.body.prompt;
	const openai = getOpenAiInstance();

	try {
		const completion = await openai.completions.create({
			model: 'gpt-3.5-turbo-instruct',
			prompt: prompt,
			max_tokens: 500,
			// temperature: 1,
			// presence_penalty: 2,
			// n: 2,
		});

		const text = completion.choices[0].text;

		// Create a new story in MongoDB
		const story = await Story.create({
			prompt: prompt,
			text: text,
			// Assuming that user is already added to req.body
			// user: req.body.user,
		});

		console.log(text);
		res.status(201).json({
			success: true,
			data: story,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error generating text');
	}
});
