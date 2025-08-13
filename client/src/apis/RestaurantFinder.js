import axios from "axios";

// This file sets up an Axios instance for making API requests to server
// The base URL points to the backend server where the API is hosted
export default axios.create({
  baseURL: "http://localhost:3001/api/v1/restaurants",
});
