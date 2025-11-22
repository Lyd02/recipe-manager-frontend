import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image_url: '',
    category: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    rating: 0,
    notes: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      setFormData(data);
    } catch (err) {
      setError('Recipe not found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/recipes/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update recipe');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4">Edit Recipe</h2>
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
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cook Time (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.cook_time}
                    onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{ cursor: 'pointer', fontSize: '30px' }}
                    >
                      {star <= formData.rating ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Personal Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any personal notes or modifications..."
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Update Recipe</button>
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

export default EditRecipe;
