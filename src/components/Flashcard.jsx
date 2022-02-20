import React, { useEffect, useRef, useState } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("");
  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;

    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      style={{ height: height }}
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front-side" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option, index) => {
            return (
              <div key={`${index}_${option}`} className="flashcard-option">
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back-side" ref={backEl}>
        {flip ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
}
