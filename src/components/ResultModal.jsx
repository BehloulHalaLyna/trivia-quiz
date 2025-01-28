// src/components/ResultModal.jsx
import React from "react";

const ResultModal = ({ score, totalQuestions, name, onRestart }) => {
  const getMessage = () => {
    if (score === totalQuestions) return "Bravo ! Vous êtes un champion 🎉";
    if (score >= totalQuestions / 2) return "Bien joué ! Vous pouvez encore progresser 💪";
    return "Pas de souci, la prochaine fois sera meilleure ! 🌟";
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>
          Félicitations, {name} !
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Vous avez obtenu un score de <strong>{score}/{totalQuestions}</strong>.
        </p>
        <p style={{ fontSize: "16px", fontStyle: "italic", marginBottom: "30px" }}>
          {getMessage()}
        </p>
        <button
          onClick={onRestart}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Rejouer
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
