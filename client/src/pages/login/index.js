import React, { useRef, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./login.module.css";
import logo from "../../icons/movie_logo.png";
import { loginSuccess } from "../../context/actions";
import { UserContext } from "../../context/UserContext";

// const base_url = "https://api.themoviedb.org/3";
// const img_url = "https://image.tmdb.org/t/p/w500";
// const token = "api_key=ac63c6f66631663ed7005dac68c3dfb4";
// const genres = [
//     {
//         id: 28,
//         name: "Action",
//     },
//     {
//         id: 12,
//         name: "Adventure",
//     },
//     {
//         id: 16,
//         name: "Animation",
//     },
//     {
//         id: 35,
//         name: "Comedy",
//     },
//     {
//         id: 80,
//         name: "Crime",
//     },
//     {
//         id: 99,
//         name: "Documentary",
//     },
//     {
//         id: 18,
//         name: "Drama",
//     },
//     {
//         id: 10751,
//         name: "Family",
//     },
//     {
//         id: 14,
//         name: "Fantasy",
//     },
//     {
//         id: 36,
//         name: "History",
//     },
//     {
//         id: 27,
//         name: "Horror",
//     },
//     {
//         id: 10402,
//         name: "Music",
//     },
//     {
//         id: 9648,
//         name: "Mystery",
//     },
//     {
//         id: 10749,
//         name: "Romance",
//     },
//     {
//         id: 878,
//         name: "Science Fiction",
//     },
//     {
//         id: 10770,
//         name: "TV Movie",
//     },
//     {
//         id: 53,
//         name: "Thriller",
//     },
//     {
//         id: 10752,
//         name: "War",
//     },
//     {
//         id: 37,
//         name: "Western",
//     },
// ];
export default function Login() {
    const { dispatch } = useContext(UserContext);
    // const getGenre = ids => {
    //     const filteredGenres = genres.reduce((result, genre) => {
    //         if (ids.includes(genre.id)) {
    //             return [...result, genre.name];
    //         }
    //         return result;
    //     }, []);
    //     return filteredGenres;
    // };
    // useEffect(() => {
    //     const url =
    //         base_url + "/discover/movie?with_genres=10752&page=4&" + token;
    //     let arrayMovies = [];
    //     let arrayCreatedMovies = [];
    //     const getMovies = async () => {
    //         try {
    //             const res = await axios.get(url);
    //             arrayMovies = res.data.results.map(movie => ({
    //                 title: movie.title,
    //                 desc: movie.overview,
    //                 img: img_url + movie.backdrop_path,
    //                 imgSm: img_url + movie.poster_path,
    //                 year: movie.release_date,
    //                 limit: 14,
    //                 genre: getGenre(movie.genre_ids),
    //                 isSeries: false,
    //             }));
    //             for (let i = 0; i < arrayMovies.length; i++) {
    //                 const res2 = await axios.post(
    //                     "http://localhost:5000/api/movies",
    //                     arrayMovies[i],
    //                     {
    //                         headers: {
    //                             token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzJkYzdkNWFhYWQ1NTNjYzVhZjhhZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzU5NTUwMn0.JGDy647fH77AzZoC2eEAFejZfPWgHsbpXpH9H0aPRXY",
    //                         },
    //                     }
    //                 );
    //                 arrayCreatedMovies.push(res2.data);
    //             }
    //             const list = {
    //                 title: "Best hit war movie",
    //                 type: "movie",
    //                 genre: "War",
    //                 content: arrayCreatedMovies,
    //             };
    //             const res3 = await axios.post(
    //                 "http://localhost:5000/api/lists",
    //                 list,
    //                 {
    //                     headers: {
    //                         token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzJkYzdkNWFhYWQ1NTNjYzVhZjhhZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzU5NTUwMn0.JGDy647fH77AzZoC2eEAFejZfPWgHsbpXpH9H0aPRXY",
    //                     },
    //                 }
    //             );
    //             console.log(res3.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     getMovies();
    // }, []);

    const emailRef = useRef();
    const passwordRef = useRef();

    function handleLogin(e) {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        const login = async () => {
            try {
                const res = await axios.post("/auth/login", user);
                if (typeof res.data === "string") {
                    alert(res.data);
                } else {
                    dispatch(loginSuccess(res.data.token));
                }
            } catch (err) {
                console.log(err);
            }
        };
        login();
    }
    return (
        <div className={styles.login}>
            <div className={styles.topInfo}>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                </div>
            </div>
            <div className={styles.container}>
                <form className={styles.signinBox}>
                    <h1>sign in</h1>
                    <input
                        type="text"
                        placeholder="Email or phone number"
                        ref={emailRef}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <button onClick={handleLogin}>sign in</button>
                    <span>
                        Don't have account yet? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot.
                        <a href=""> Learn more.</a>
                    </small>
                </form>
            </div>
        </div>
    );
}
