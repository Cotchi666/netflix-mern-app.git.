import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import SearchNav from "../../components/search/search";
import { searchMovie } from "../../actions/index";

const Navbar = ({ childToParent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const handleSearchChange = async (newSearch) => {
    await searchMovie(newSearch).then((res) => {
      console.log("res", res);
      childToParent(res.data);
    });
  };
  const showProfile = (e) => {
    // e.preventDefault();
    // console.log("show");
    // history.push("/profile");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/browse" className="link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>

          <Link to="/browse" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <Link to="/mylist" className="link">
          <span>My List</span>
          </Link>
         
        </div>
        <div className="right">
          <div className="search">
            {isOpen ? (
              // <input
              //   type="text"
              //   placeholder="Search"
              //   className="searchInput"
              //   value={keyword}
              //   onChange={handleInputChange}
              // />
              <SearchNav onSubmit={handleSearchChange} />
            ) : (
              ""
            )}
            <Search className="icon" onClick={() => setIsOpen(!isOpen)} />
          </div>
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            onClick={(e) => showProfile(e)}
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
