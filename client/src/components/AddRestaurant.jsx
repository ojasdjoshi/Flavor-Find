import React from 'react'
import { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantsContext';

 // Used Bootstrap for styling
const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const {addRestaurant} = useContext(RestaurantContext); // Destructure addRestaurant from context
  // This function handles the form submission to add a new restaurant
  // It sends a POST request to the backend with the restaurant details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      console.log(response);
      addRestaurant(response.data.data.restaurant); // Call addRestaurant to update the context with the new restaurant
      // Reset the form fields after submission
      setName("");
      setLocation("");
      setPriceRange("Price Range");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='mb-4'>
      <form action="">
        <div className="row justify-content-center">
          <div className="col-auto">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant Name" />
          </div>
          <div className="col-auto">
            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="Restaurant Location" />
          </div>
          <div className="col-auto">
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
              <option disabled> Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button onClick={handleSubmit} className="btn btn-primary btn-sm w-auto">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant