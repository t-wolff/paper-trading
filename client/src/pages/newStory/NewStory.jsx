import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useNewStory from "./useNewStory";
import StyledButton from "../../components/styledButton/StyledButton";
import "./NewStory.css";

const NewStory = () => {
  const { story, errors, handleChange, handleSubmit } = useNewStory();

  const fields = [
    {
      id: "prompt",
      label: "Prompt",
      type: "text",
      placeholder: `I would like a story about...
                    A girl...
            Some ice-cream...`,
      value: story.prompt,
      error: errors.prompt,
    },
    // {
    //   id: "subtitle",
    //   label: "Subtitle",
    //   type: "text",
    //   placeholder: "Enter subtitle here...",
    //   value: story.subtitle,
    //   error: errors.subtitle,
    // },
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = handleSubmit(e);
    if (res) {
      console.log(res);
    }
  };

  return (
    <div className="new-story-container">
      <header className="new-story-header">
        <h2 className="header-story">New Story</h2>
        <Link to="/stories" className="back-link">
          Cancel
        </Link>
      </header>
      <div className="new-story-form">
        <div>
          {fields.map((input) => (
            <div className={"inputs-container"} key={input.id}>
              <div className={`new-story-input`}>
                <label htmlFor={input.id}>{input.label}</label>
                <textarea
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={(e) => handleChange(e)}
                  value={input.value}
                />
              </div>
              <span className="story-error">{input.error}</span>
            </div>
          ))}
        </div>
        <StyledButton type="submit" onClick={handleAdd}>
          Generate your new story!
        </StyledButton>
      </div>
    </div>
  );
};

export default NewStory;
