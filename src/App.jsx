import React, { useState } from "react";
import { useFetchCategories } from "./hooks/useFetchCategories";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const { data: categories, isLoading, error } = useFetchCategories();

  // ✅ Correction : Ajouter la fonction handleCategorySelect
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
  };

  return (
    <div>
      {!showQuiz && !showLeaderboard && (
        <>
          <h1>Bienvenue au Trivia Quiz !</h1>
          <input 
            type="text" 
            placeholder="Entrez votre surnom" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)}
          />

          <h2>Choisissez un thème :</h2>
          {isLoading && <p>Chargement...</p>}
          {error && <p style={{ color: "red" }}>❌ Erreur : Les catégories ne sont pas disponibles.</p>}

          {categories && <Categories categories={categories} onSelectCategory={handleCategorySelect} />}
          
          <button onClick={() => setShowLeaderboard(true)}>📖 VOIR CLASSEMENT</button>
        </>
      )}

      {showQuiz && <Quiz name={playerName} category={selectedCategory} onFinish={() => setShowQuiz(false)} />}
      
      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
    </div>
  );
};

export default App;
