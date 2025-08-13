// createContext is a React hook that creates a Context object, which allows you to share data between components
//  without having to pass props down through every level of the component tree
import React, { createContext, useState } from "react";

export const RestaurantContext = createContext();

// RestaurantContextProvider is a component that provides the RestaurantContext to its children
// Any component wrapped in this provider can access restaurants, setRestaurants, etc.
export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => [...prevRestaurants, restaurant]);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
