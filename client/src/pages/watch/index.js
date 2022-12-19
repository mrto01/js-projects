import { PlayArrow } from "@material-ui/icons";
import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./watch.module.css";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer/Footer";
import List from "../../components/list";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Watch() {
    const location = useLocation();
    const [movie, setMovie] = useState(location.movie);
    const { state } = useContext(UserContext);
    const [play, setPlay] = useState(false);
    const [list, setList] = useState();
    const videoRef = useRef();
    const handlePlay = () => {
        setPlay(true);
    };
    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        const getRelated = async () => {
            try {
                const res = await axios.get(
                    "/lists/related?genre=" + movie.genre[0],
                    {
                        headers: {
                            token: state.token,
                        },
                    }
                );
                setList(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRelated();
        setPlay(false);
        const prevMovie = JSON.parse(localStorage.getItem("movie"));
        setMovie(location.movie || prevMovie);
        localStorage.setItem("movie", JSON.stringify(movie || prevMovie));
    }, [location.pathname]);
    console.log(movie);
    return (
        <div className="home">
            <Navbar />
            {movie && (
                <>
                    <div className={styles.watch}>
                        {play && (
                            <video
                                ref={videoRef}
                                className={styles.content}
                                controls
                                autoPlay
                                src="https://firebasestorage.googleapis.com/v0/b/movieddz.appspot.com/o/items%2Fy2mate.com%20-%20Marvel%20Studios%20Doctor%20Strange%20in%20the%20Multiverse%20of%20Madness%20%20Official%20Trailer_1080p.mp4?alt=media&token=d530c9c0-5368-4c31-bbb7-af9449d9f91a"
                            />
                        )}
                        {!play && (
                            <>
                                <img
                                    className={styles.content}
                                    src={movie.img}
                                />
                                <div
                                    className={styles.buttonPlay}
                                    onClick={handlePlay}
                                >
                                    <PlayArrow />
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.movieInfo}>
                        <div className={styles.leftInfo}>
                            <img src={movie.imgSm} />
                        </div>
                        <div className={styles.rightInfo}>
                            <h1>{movie.title}</h1>
                            <div className={styles.genres}>
                                {movie.genre.map(g => (
                                    <span>{g}</span>
                                ))}
                            </div>
                            <p>{movie.desc}</p>
                            <span>{movie.year}</span>
                        </div>
                    </div>
                    <div className={styles.recomend}>
                        <h1>You may also like</h1>
                    </div>
                    {list && <List list={list} />}
                </>
            )}
            <Footer />
        </div>
    );
}
