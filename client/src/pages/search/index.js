import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/Footer";
import List from "../../components/list";
import styles from "./search.module.css";
import axios from "axios";

export default function Search() {
    const { state } = useLocation();
    const [movies, setMovies] = useState(null);
    const [lists, setLists] = useState(null);
    useEffect(() => {
        const getmovie = async () => {
            try {
                const res = await axios.get(
                    "/movies/search?key=" + state.searchKey,
                    {
                        headers: {
                            token: JSON.parse(localStorage.getItem("token")),
                        },
                    }
                );
                if (res.data[0]) {
                    setMovies(res.data);
                } else {
                    setMovies(null);
                }
            } catch (err) {
                console.log(err);
            }
        };
        const getLists = async () => {
            try {
                const res = await axios.get(
                    "/lists/search?key=" + state.searchKey,
                    {
                        headers: {
                            token: JSON.parse(localStorage.getItem("token")),
                        },
                    }
                );
                if (res.data[0]) {
                    setLists(res.data);
                } else {
                    setLists(null);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getLists();
        getmovie();
    }, [state]);
    return (
        <div className="home">
            <Navbar />
            <div className={styles.search}>
                {movies && (
                    <List list={{ title: "Results", content: movies }} />
                )}
                {lists &&
                    lists.map(list => <List list={list} key={list._id} />)}
                {!movies && !lists && (
                    <div className={styles.notFound}>Movie not found</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
