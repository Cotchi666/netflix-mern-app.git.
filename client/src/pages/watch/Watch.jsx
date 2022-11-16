import { ArrowBackOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;

  
  const [nowlocation, setLocation] = useState({});
  const [nowMovie, setMovie] = useState({});
  // const { dispatch } = useContext(AuthContext);

  console.log(nowlocation);
  console.log(location);
  useEffect(() => {
    if (!movie) {
      
      setMovie(JSON.parse(localStorage.getItem("movie")));
    
     
    } else {
      
      setMovie(movie);
      localStorage.setItem("movie", JSON.stringify(movie));
    }

  }, []);

  console.log(nowlocation);
  return (
    <div className="watch">

      <Link to="/browse">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={nowMovie.video}
      />
    </div>
  );
}
