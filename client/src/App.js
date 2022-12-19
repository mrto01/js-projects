import "./app.css";
import React, { useContext } from "react";
import Home from "./pages/home";
import Watch from "./pages/watch";
import Register from "./pages/register";
import Login from "./pages/login";
import Search from "./pages/search/index";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const App = () => {
    const { state } = useContext(UserContext);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {state.user ? <Home /> : <Redirect to="/register" />}
                </Route>
                <Route path="/register">
                    {!state.user ? <Register /> : <Redirect to="/" />}
                </Route>
                <Route path="/login">
                    {!state.user ? <Login /> : <Redirect to="/" />}
                </Route>
                {state.user && (
                    <>
                        <Route path="/movies">
                            <Home type="movie" />
                        </Route>
                        <Route path="/series">
                            <Home type="serie" />
                        </Route>
                        <Route path="/watch/:movieId">
                            <Watch />
                        </Route>
                        <Route path="/search">
                            <Search />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default App;
