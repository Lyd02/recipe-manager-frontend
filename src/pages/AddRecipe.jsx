import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image_url: '',
    category: '',
    prep_time: '',
    cook_time: '',
    servings: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/recipes', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add recipe');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4">Add New Recipe</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ingredients</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="One ingredient per line"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Steps</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={formData.steps}
                  onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  placeholder="One step per line"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL (optional)</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="Breakfast">🍳 Breakfast</option>
                    <option value="Lunch">🥗 Lunch</option>
                    <option value="Dinner">🍽️ Dinner</option>
                    <option value="Dessert">🍰 Dessert</option>
                    <option value="Snack">🍿 Snack</option>
                    <option value="Beverage">🥤 Beverage</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Servings</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                    placeholder="e.g., 4"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Prep Time (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.prep_time}
                    onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                    placeholder="e.g., 15"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cook Time (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.cook_time}
                    onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                    placeholder="e.g., 30"
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Add Recipe</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
