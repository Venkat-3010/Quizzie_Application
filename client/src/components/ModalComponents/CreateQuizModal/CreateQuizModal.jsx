import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./CreateQuizModal.module.css";
import QuizQuestionsModal from "../QuizQuestionsModal/QuizQuestionsModal";

const CreateQuizModal = ({
  onClose,
  quizTitle,
  setQuizTitle,
  quizType,
  setQuizType,
  quiz_id,
  setQuiz_id,
  shareQuizLink,
  setShareQuizLink,
}) => {
  const [quizData, setQuizData] = useState({
    title: "",
    quizType: "",
  });

  const [warning, setWarning] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const handleContinueBtn = () => {
    if (!quizData.title || !quizData.quizType) {
      toast.warn("please provide all the required information", {
        position: "bottom-right",
        theme: "dark",
      });
      setWarning(true);
    } else {
      setWarning(false);
      setQuizTitle(quizData.title);
      setQuizType(quizData.quizType);
      setShowCreateQuestion(true);
    }
  };

  return (
    <>
      {showCreateQuestion ? (
        <QuizQuestionsModal
          quizTitle={quizTitle}
          quizType={quizType}
          quiz_id={quiz_id}
          setQuiz_id={setQuiz_id}
          shareQuizLink={shareQuizLink}
          setShareQuizLink={setShareQuizLink}
          setQuizType={setQuizType}
          setQuestionPopup={setShowCreateQuestion}
          onClose={handleClose}
        />
      ) : (
        <div className={styles.modalContainer}>
          <input
            type="text"
            className={styles.questionInput}
            value={quizData.title}
            onChange={(e) =>
              setQuizData({ ...quizData, title: e.target.value })
            }
            placeholder={
              warning && !quizData.title ? "Quiz Name is required" : "Quiz Name"
            }
            style={{ border: warning && !quizData.title && "1.5px solid red" }}
          />
          <div className={styles.quizTypeContainer}>
            <label htmlFor="" className={styles.quizTypeLabel}>
              Quiz Type
            </label>
            <button
              className={`${styles.questionBtn} ${
                quizData.quizType === "Q&A" ? styles.selected : ""
              }`}
              onClick={() => setQuizData({ ...quizData, quizType: "Q&A" })}
              style={{
                border: warning && !quizData.quizType && "1.5px solid red",
              }}
            >
              Q & A
            </button>
            <button
              className={`${styles.pollBtn} ${
                quizData.quizType === "Poll" ? styles.selected : ""
              }`}
              onClick={() => setQuizData({ ...quizData, quizType: "Poll" })}
              style={{
                border: warning && !quizData.quizType && "1.5px solid red",
              }}
            >
              Poll Type
            </button>
            {warning && !quizData.quizType && (
              <span className={styles.warningText}>Quiz Type is required</span>
            )}
          </div>
          <div className={styles.validateBtns}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.continueBtn} onClick={handleContinueBtn}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuizModal;
