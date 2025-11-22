import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [search, category, showFavorites]);

  const fetchRecipes = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (showFavorites) params.append('favorite', 'true');
      
      const { data } = await api.get(`/recipes?${params}`);
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();
    try {
      await api.patch(`/recipes/${id}/favorite`);
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        fetchRecipes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: '#333', fontWeight: 'bold' }}>🍽️ My Recipes</h2>
            <button className="btn btn-add-recipe" onClick={() => navigate('/add-recipe')}>
              + Add Recipe
            </button>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Breakfast">🍳 Breakfast</option>
                <option value="Lunch">🥗 Lunch</option>
                <option value="Dinner">🍽️ Dinner</option>
                <option value="Dessert">🍰 Dessert</option>
                <option value="Snack">🍿 Snack</option>
                <option value="Beverage">🥤 Beverage</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className={`btn w-100 ${showFavorites ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                {showFavorites ? '❤️ Favorites' : '🤍 All'}
              </button>
            </div>
          </div>
          <div className="row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card recipe-card h-100" onClick={() => navigate(`/recipe/${recipe.id}`)} style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    {recipe.image_url ? (
                      <img src={recipe.image_url} className="card-img-top" alt={recipe.title} />
                    ) : (
                      <div style={{ height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '60px' }}>
                        🍳
                      </div>
                    )}
                    <button 
                      className="btn btn-link" 
                      style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '24px', textDecoration: 'none', background: 'white', borderRadius: '50%', width: '40px', height: '40px', padding: '0' }}
                      onClick={(e) => toggleFavorite(recipe.id, e)}
                    >
                      {recipe.is_favorite ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title" style={{ color: '#667eea', fontWeight: 'bold' }}>{recipe.title}</h5>
                      {recipe.category && (
                        <span className="badge bg-primary">{recipe.category}</span>
                      )}
                    </div>
                    <p className="card-text text-muted">{recipe.description}</p>
                    {(recipe.prep_time || recipe.cook_time) && (
                      <div className="text-muted small mb-2">
                        {recipe.prep_time && `⏱️ ${recipe.prep_time}min`}
                        {recipe.prep_time && recipe.cook_time && ' • '}
                        {recipe.cook_time && `🔥 ${recipe.cook_time}min`}
                      </div>
                    )}
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); navigate(`/edit-recipe/${recipe.id}`); }}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {recipes.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🍳</div>
              <h3>No recipes yet!</h3>
              <p>Start by adding your first delicious recipe</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
