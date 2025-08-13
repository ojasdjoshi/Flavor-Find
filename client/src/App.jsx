import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";   
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";
const App = () => {
    return (
        <RestaurantContextProvider>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants/:id/update" element={<UpdatePage />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                </Routes>
            </div>
        </RestaurantContextProvider>
    );
};



export default App;