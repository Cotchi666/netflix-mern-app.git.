import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Browse = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [filter, setFilter] = useState([]);
  const [nodata, setNoData] = useState([]);
  console.log("type", type);

  const childToParent = (data) => {
    if (data.length === 0 || data === []) {
      setNoData(data);
    } else {
      setFilter(data);
      console.log("dataco", data);
    }
  };
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar childToParent={childToParent} />
      <Featured type={type} setGenre={setGenre} />
      {filter
        ? filter.map((filter) => (
            <Link to={{ pathname: "/watch", movie: filter }}>
              <h1>{filter.title}</h1>
            </Link>
          ))
        : (filter = [])}

      {!lists ? (
        <div className="notice">
          No {type} for this genre <strong>{genre}</strong>
        </div>
      ) : (
        lists.map((list, index) => <List key={index} list={list} />)
      )}
    </div>
  );
};

export default Browse;
