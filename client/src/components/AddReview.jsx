import React from 'react'
import { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
    // Using useLocation to get the current path
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rating, setRating] = useState("Rating");
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await RestaurantFinder.post(`/${id}/addReview`, {
      name,
      rating,
      review: reviewText
    });
    // navigate("/");
    // navigate(location.pathname); // Navigate back to the current restaurant detail page
    window.location.reload(); // This will reload and fetch the latest reviews
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input 
              id="name" 
              placeholder="Name" 
              type="text" 
              className="form-control"
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4 d-flex flex-column">
            <label htmlFor="rating">Rating</label>
            <select value={rating} id="rating" className="custom-select" onChange={(e) => setRating(e.target.value)}>
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea value={reviewText} id="Review" className="form-control" rows="3" onChange={(e) => setReviewText(e.target.value)}></textarea>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default AddReview