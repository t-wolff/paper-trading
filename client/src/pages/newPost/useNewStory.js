// import { useState } from 'react';
// // import { useNavigate } from 'react-router';
// // import { useGlobalArticleContext } from '../../hooks';

// const useNewStory = () => {
// 	// const navigate = useNavigate();
// 	// const { addNewStory, error } = useGlobalArticleContext();

// 	const [story, setStory] = useState({
// 		prompt: '',
		
// 	});
// 	const [errors, setErrors] = useState({
// 		prompt: null,
		
// 	});

// 	const handleChange = (e) => {
// 		setStory({
// 			...story,
// 			[e.target.id]: e.target.value,
// 		});
// 		setErrors((prevState) => ({
// 			...prevState,
// 			[e.target.id]: null,
// 		}));
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// let isValid = true;
// 		const newErrors = {};

// 		const validationRules = [
// 			{
// 				field: 'prompt',
// 				test: (val) => val.length >= 10,
// 				errorMessage: 'title must be at least 10 characters long',
// 			},
// 			// {
// 			// 	field: 'text',
// 			// 	test: (val) => val.length >= 10,
// 			// 	errorMessage: 'text must be at least 10 characters long',
// 			// },
			
// 		];

// 		validationRules.forEach(({ field, test, errorMessage }) => {
// 			if (!test(story[field])) {
// 				newErrors[field] = errorMessage;
// 				// isValid = false;
// 			}
// 		});

// 		setErrors(newErrors);

// 		// if (isValid) {
// 			// addNewStory(story);
// 			// if (error) {
// 			// 	return error;
// 			// }
// 			// 		}
// 	};

// 	return {handleChange, handleSubmit, story, errors };
// };

// export default useNewStory;
