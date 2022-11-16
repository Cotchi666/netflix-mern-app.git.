import axios from "axios";
//search movie
export const searchMovie = async (query) => {
  const request = await axios.get(`movies/search?q=${query}`, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return request;
};
