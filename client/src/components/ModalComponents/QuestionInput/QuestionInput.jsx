import styles from "../QuizQuestionsModal/QuizQuestionsModal.module.css";

const QuestionInput = ({
  quizQuestions,
  questionIndex,
  setQuizQuestions,
  quizType,
  handleOptionTypeChange,
}) => {
  const handleInputChange = (event, type) => {
    const value = event.target.value;
    const updatedQuestions = quizQuestions.map((question) => {
      if (question.id === questionIndex) {
        if (type === "question") {
          return { ...question, question: value };
        } else if (type === "rightAnswer") {
          return { ...question, rightAnswer: value };
        }
      }
      return question;
    });
    setQuizQuestions(updatedQuestions);
  };

  const currentQuestion = quizQuestions.find(question => question.id === questionIndex) || {};

  if (!currentQuestion || !currentQuestion.options || !currentQuestion.optionsType) {
    return <div>Loading question data...</div>; 
  }

  return (
    <>
      <label style={{ position: "relative" }}>
        <input
          type="text"
          className={styles.question}
          placeholder={quizType === "Q&A" ? "Q&A Question" : "Poll Question"}
          value={
            currentQuestion.question || ""
          }
          onChange={(event) => handleInputChange(event, "question")}
        />
      </label>
      <div className={styles.optionTypesContainer}>
        Option Type
        <label htmlFor="text">
          <input
            type="radio"
            value="text"
            onChange={handleOptionTypeChange}
            checked={
              currentQuestion?.optionsType ===
              "text"
            }
            name="questionOptionType"
            id="text"
          />
          Text
        </label>
        <label htmlFor="imageURL">
          <input
            type="radio"
            value="imageURL"
            onChange={handleOptionTypeChange}
            checked={
              currentQuestion?.optionsType ===
              "imageURL"
            }
            name="questionOptionType"
            id="imageURL"
          />
          Image URL
        </label>
        <label htmlFor="textAndImageURL">
          <input
            type="radio"
            value="textAndImageURL"
            onChange={handleOptionTypeChange}
            checked={
              currentQuestion?.optionsType === "textAndImageURL"
            }
            name="questionOptionType"
            id="textAndImageURL"
          />
          Text & Image URL
        </label>
      </div>
    </>
  );
};

export default QuestionInput;
