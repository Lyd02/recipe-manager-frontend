import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      setRecipe(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      const { data } = await api.patch(`/recipes/${id}/favorite`);
      setRecipe(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) return <div>Loading...</div>;

  const ingredientsList = recipe.ingredients.split('\n').filter(i => i.trim());
  const stepsList = recipe.steps.split('\n').filter(s => s.trim());

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card recipe-card">
                {recipe.image_url ? (
                  <img src={recipe.image_url} className="card-img-top" alt={recipe.title} style={{ height: '400px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '400px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '100px' }}>
                    🍳
                  </div>
                )}
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h1 className="mb-2" style={{ color: '#667eea' }}>{recipe.title}</h1>
                      {recipe.category && (
                        <span className="badge bg-primary">{recipe.category}</span>
                      )}
                    </div>
                    <button 
                      className="btn btn-link" 
                      onClick={toggleFavorite}
                      style={{ fontSize: '30px', textDecoration: 'none' }}
                    >
                      {recipe.is_favorite ? '❤️' : '🤍'}
                    </button>
                  </div>

                  {recipe.description && (
                    <p className="text-muted mb-4">{recipe.description}</p>
                  )}

                  <div className="row mb-4">
                    {recipe.prep_time && (
                      <div className="col-md-3">
                        <strong>⏱️ Prep Time:</strong><br />
                        {recipe.prep_time} min
                      </div>
                    )}
                    {recipe.cook_time && (
                      <div className="col-md-3">
                        <strong>🔥 Cook Time:</strong><br />
                        {recipe.cook_time} min
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="col-md-3">
                        <strong>🍽️ Servings:</strong><br />
                        {recipe.servings}
                      </div>
                    )}
                    {recipe.rating > 0 && (
                      <div className="col-md-3">
                        <strong>⭐ Rating:</strong><br />
                        {'⭐'.repeat(recipe.rating)}
                      </div>
                    )}
                  </div>

                  <hr />

                  <h3 className="mt-4 mb-3">📝 Ingredients</h3>
                  <ul className="list-group list-group-flush mb-4">
                    {ingredientsList.map((ingredient, index) => (
                      <li key={index} className="list-group-item">{ingredient}</li>
                    ))}
                  </ul>

                  <h3 className="mb-3">👨‍🍳 Instructions</h3>
                  <ol className="mb-4">
                    {stepsList.map((step, index) => (
                      <li key={index} className="mb-2">{step}</li>
                    ))}
                  </ol>

                  {recipe.notes && (
                    <>
                      <h3 className="mb-3">📌 Notes</h3>
                      <p className="text-muted">{recipe.notes}</p>
                    </>
                  )}

                  <hr />

                  <div className="d-flex gap-2 mt-4">
                    <button className="btn btn-primary" onClick={() => navigate(`/edit-recipe/${id}`)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      🗑️ Delete
                    </button>
                    <button className="btn btn-secondary" onClick={handlePrint}>
                      🖨️ Print
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
