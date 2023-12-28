import "./Story.css";

const Story = ({ handleStoryClick, ...story }) => {
  const trimText = (text) => {
    if (!text) {
      console.log(`text is undefined : ${text}`);
      return;
    }
    const trimmedText = text.substring(0, 100);
    return (
      trimmedText.substring(
        0,
        Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))
      ) + " ..."
    );
  };

  return (
    <section className="single-story-container">
      <main onClick={() => handleStoryClick(story)}>
        <div className="single-story-text">
          <h2>{story.prompt}</h2>
          <p>{trimText(story.text)}</p>
        </div>
      </main>
    </section>
  );
};

export default Story;
