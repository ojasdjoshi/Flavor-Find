import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState,useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
const UpdateRestaurant = () => {

    // The useParams() hook from React Router returns an object containing all URL parameters
  const { id } = useParams(); // Destructuring to get the 'id' parameter from the URL
  const {restaurant} = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  // Using this so that if we navigate directly to the update page still we can fetch the restaurant data
  // Setting name, location, and priceRange state variables with the fetched restaurant data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`); // Fetching the restaurant data from the backend
        // const data = await response.json();
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]); // The effect runs when the component mounts or when 'id' changes

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await RestaurantFinder.put(`/${id}`, {
          name,
          location,
          price_range: priceRange
        });
        console.log(response);
        navigate(`/`);
      } catch (err) {
        console.error(err);
      }
    
    };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant Name" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="Restaurant Location" />
        </div>

        <div className="form-group">
          <label htmlFor="price_range">Price range</label>
          <input id="price_range" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} type="number" className="form-control" placeholder="Restaurant Price Range" />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">Update</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
