import React, { useState, useContext, useRef } from "react";
import clsx from "clsx";
import { ArrowDropDown, Menu, Notifications, Search } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../icons/movie_logo.png";
import daidz from "../../icons/daidz.jpg";
import { logoutSuccess } from "../../context/actions";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(UserContext);
    const searchRef = useRef();
    const history = useHistory();
    const [menuActive, setMenuActive] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const handleSearch = () => {
        if (searchKey.trim() != "") {
            history.push("/search?key=" + searchKey, { searchKey: searchKey });
        } else {
            searchRef.current.focus();
        }
    };
    window.onscroll = function (e) {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    const handleLogout = () => {
        dispatch(logoutSuccess());
        history.push("/register");
    };
    const handleSearchInputChange = e => {
        setSearchKey(e.target.value);
        if (e.keyCode === 13) {
            handleSearch();
        }
    };
    return (
        <>
            <div
                className={clsx(styles.navbar, {
                    [styles.scrolled]: isScrolled,
                })}
            >
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.left)}>
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                        <Link to="/">
                            <span>Homepage</span>
                        </Link>
                        <Link to="/series">
                            <span>Series</span>
                        </Link>
                        <Link to="/movies">
                            <span>Movies</span>
                        </Link>
                    </div>
                    <div className={clsx(styles.right)}>
                        <div className={styles.searchBox}>
                            <Search
                                className={styles.icon}
                                onClick={handleSearch}
                            />
                            <input
                                type="text"
                                className={styles.searchInput}
                                ref={searchRef}
                                onKeyUp={handleSearchInputChange}
                                placeholder="Type something..."
                            />
                        </div>
                        <span>KID</span>
                        <Notifications className={styles.icon} />
                        <div className={clsx(styles.icon, styles.profile)}>
                            <img src={daidz} alt="" />
                            <ArrowDropDown className={styles.icon} />
                            <div className={styles.options}>
                                <span>Settings</span>
                                <span onClick={handleLogout}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.navbarMobile)}>
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
                <div className={clsx(styles.icon, styles.profile)}>
                    <img src={daidz} alt="" />
                    <ArrowDropDown className={styles.icon} />
                    <div className={styles.options}>
                        <span>Settings</span>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
                <Menu
                    className={styles.menuButton}
                    onClick={() => setMenuActive(!menuActive)}
                />
                <div
                    className={clsx(styles.navigation, {
                        [styles.active]: menuActive,
                    })}
                >
                    <Link to="/series">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies">
                        <span>Movies</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
