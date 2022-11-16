import "./app.scss";
import Browse from "./pages/browse/Browse";
import Home from "./components/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Movie from "./pages/movie/movie";
// import MyList from "./pages/myList/MyList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Payment from "./components/Payment";
import RegisterContinue from "./components/RegisterContinue";
import RegisterForm from "./components/RegisterForm";
import RegisterPlan from "./components/RegisterPlan";
// import { Login } from "../Pages/Login/Login";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/signup"
          exact
          render={(props) => <RegisterContinue {...props} />}
        />
        <Route
          path="/signup/regform"
          exact
          render={(props) => <RegisterForm {...props} />}
        />
        <Route
          path="/signup/planform"
          exact
          render={(props) => <RegisterPlan {...props} />}
        />
        <Route
          path="/signup/payment"
          exact
          render={(props) => <Payment {...props} />}
        />
        <Route path="/browse">{user ? <Browse /> : <Redirect to="/" />}</Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/browse" />}
        </Route>

        {user && (
          <>
            <Route path="/movies">
              <Browse type="movie" />
            </Route>
            <Route path="/series">
              <Browse type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/movie">
              <Movie />
            </Route>
            {/* <Route path="/mylist">
              <MyList />
            </Route> */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
