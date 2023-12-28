import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalArticleContext } from "../../hooks";
import './SingleTrade.css';

const SingleTrade = () => {
  const { storyId } = useParams();
  const { getStoryById, story, isLoading } = useGlobalArticleContext();

  useEffect(() => {
		getStoryById(storyId);
    console.log(story)
	}, [storyId]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className='full-story-container'>
      <Link to='/stories' className="full-story-back-link">Back To All Stories</Link>
      {story && (
        <div className="story-container">
          <h2 className="story-name">{story.prompt}</h2>
          <p className="story-text">{story.text}</p>
        </div>
      )}
    </section>
  );
};

export default SingleTrade;
