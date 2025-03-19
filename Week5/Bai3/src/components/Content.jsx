import { React, useState, useEffect } from "react";
import "./Content.css";
export default function Content() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://67c83e650acf98d0708594ce.mockapi.io/v1/api/posts/posts")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }
  return (
    <main className="container">
      {/* Profile of Emma */}
      <div className="profile-container">
        <img
          height="100dp"
          width="100dp"
          src="/src/assets/img/Lab03/Avatar 42.png"
          alt="avt"
          className="avatar"
        />
        <div className="profile-info">
          <h2>Emma Gonzalez's Recipe Box</h2>
          <p>
            Emma Gonzalez is a deputy editor at Chefify, bringing her expertise
            as a former cooking editor at The Los Angeles Times. She is also an
            accomplished author, contributing to numerous cookbooks and food
            publications. Originally from East Los Angeles, Emma now resides in
            New York City, where she explores a wide range of culinary delights.
          </p>
          {/* Thông tin Subscribers + Nút Share */}
          <div className="profile-actions">
            <span className="subscribers">6.5k Subscribers</span>
            <button className="share-btn">Share</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className="active">Saved Recipes</button>
        <button>Folders</button>
        <button>Recipes by Genevieve</button>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.avatar} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p className="time-badge">{recipe.id} minutes</p>
          </div>
        ))}
      </div>
    </main>
  );
}
