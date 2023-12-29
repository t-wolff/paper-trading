import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { useGlobalArticleContext} from "../../hooks";
import { Story } from "../../components";
import "./Stories.css";

const Stories = () => {
  const { stories } = useGlobalArticleContext();
  // const { currentUser } = useGlobalAuthContext();
  const navigate = useNavigate();

  const handleStoryClick = (story) => {
    navigate(`${story._id}`);
  };

  return (
		<div className="stories-container">
			<header className="stories-header">
				<h2>Stories</h2>
			</header>
			<div className="inner-stories-container">
				{stories[0] ?
					stories.map((story) => (
						<Story handleStoryClick={handleStoryClick} key={story.id} {...story} />
					)) :
					<div>loading...</div>}
			</div>
		</div>
	);
};

export default Stories;
