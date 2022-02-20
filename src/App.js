import { useEffect, useRef, useState } from "react";
import FlashcardList from "./components/FlashcardList";
import "./app.css";
import {
  getCategories,
  getQuestions,
  getSortedByCategoriesQuestions,
} from "./api/getQuestions";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    getQuestions().then((data) => setFlashcards(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getSortedByCategoriesQuestions(
      amountEl.current.value,
      categoryEl.current.value
    ).then((data) => {
      setFlashcards(data);
    });
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amout">Number of questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>

        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      <p className="note-description">
        *If you can see the correct answer, clisk on the card!
      </p>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
