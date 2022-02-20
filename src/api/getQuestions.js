import axios from "axios";

const decodeString = (str) => {
  const textArea = document.createElement("textArea");
  textArea.innerHTML = str;
  return textArea.value;
};

export const getQuestions = () => {
  return axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
    return res.data.results.map((question, index) => {
      const answer = decodeString(question.correct_answer);
      const options = [
        ...question.incorrect_answers.map((a) => decodeString(a)),
        answer,
      ];

      return {
        id: `${index}_${question.correct_answer}`,
        question: decodeString(question.question),
        options: options.sort(() => Math.random() - 0.5),
        answer: answer,
      };
    });
  });
};

export const getSortedByCategoriesQuestions = (currAmount, currCategory) => {
  return axios
    .get("https://opentdb.com/api.php", {
      params: {
        amount: currAmount,
        category: currCategory,
      },
    })
    .then((res) => {
      return res.data.results.map((question, index) => {
        const answer = decodeString(question.correct_answer);
        const options = [
          ...question.incorrect_answers.map((a) => decodeString(a)),
          answer,
        ];

        return {
          id: `${index}_${question.correct_answer}`,
          question: decodeString(question.question),
          options: options.sort(() => Math.random() - 0.5),
          answer: answer,
        };
      });
    });
};

export const getCategories = () => {
  return axios.get("https://opentdb.com/api_category.php");
};
