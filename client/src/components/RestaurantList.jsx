import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = () => {
   const { restaurants, setRestaurants } = useContext(RestaurantContext); // Destructure the context to get restaurants and setRestaurants
   let navigate = useNavigate(); // useNavigate hook to navigate programmatically
   // This part fetches the list of restauramts from the backend whenever any changes are made
    useEffect(() => {
        const fetchData = async () => {
        try{
           const response = await RestaurantFinder.get('/');  // RestaurantFinder is an axios instance pointing to 'http://localhost:3001/api/v1/restaurants'
           console.log(response);
           setRestaurants(response.data.data.restaurants); // Set the restaurants state with the fetched data
        } catch(err){
            console.log(err);
        }
    };
    fetchData();
  }, []);

  const handleDelete = async (e,id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`); // Send a DELETE request to the backend
      setRestaurants(restaurants.filter((restaurant) => {
        return restaurant.id !== id; // Filter out the deleted restaurant from the state
      }));
    } catch (err) {
      console.error(err);
    }
  };

    const handleUpdate = (e,id) => {
      // Prevent the click event from propagating to the row click handler
      e.stopPropagation(); 
      navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">No Reviews Yet</span>; // If no reviews, show a message
    }

    return (
        <>
            <StarRating rating={restaurant.id} />
            <span className="text-warning ml-1">({restaurant.count})</span>
        </>
    );

  };

  return (
    <div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) => {
                    if (!restaurant) return null; // Skip undefined/null items 

                    return (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      
    </div>
  )
}

export default RestaurantList
