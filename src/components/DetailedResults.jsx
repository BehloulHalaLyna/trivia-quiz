import React from "react";

const DetailedResults = ({ questions, userAnswers, score, name, onRestart }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Bravo {name} ! Votre score : {score}/{questions.length}</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((question, index) => {
          const isCorrect = question.correct_answer === userAnswers[index];
          return (
            <li
              key={index}
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: isCorrect ? "#d4edda" : "#f8d7da",
                borderLeft: `5px solid ${isCorrect ? "#28a745" : "#dc3545"}`,
                borderRadius: "5px",
              }}
            >
              <p dangerouslySetInnerHTML={{ __html: question.question }} />
              <p>Votre réponse : {userAnswers[index]}</p>
              {!isCorrect && <p>Bonne réponse : {question.correct_answer}</p>}
            </li>
          );
        })}
      </ul>
      <button
        onClick={onRestart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Rejouer
      </button>
    </div>
  );
};

export default DetailedResults;
