import axios from "axios";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./feature.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Featured({ type, genre, handleGenreChange }) {
    const arrayGenre = useMemo(
        () => [
            {
                id: 28,
                name: "Action",
            },
            {
                id: 12,
                name: "Adventure",
            },
            {
                id: 16,
                name: "Animation",
            },
            {
                id: 35,
                name: "Comedy",
            },
            {
                id: 80,
                name: "Crime",
            },
            {
                id: 99,
                name: "Documentary",
            },
            {
                id: 18,
                name: "Drama",
            },
            {
                id: 10751,
                name: "Family",
            },
            {
                id: 14,
                name: "Fantasy",
            },
            {
                id: 36,
                name: "History",
            },
            {
                id: 27,
                name: "Horror",
            },
            {
                id: 10402,
                name: "Music",
            },
            {
                id: 9648,
                name: "Mystery",
            },
            {
                id: 10749,
                name: "Romance",
            },
            {
                id: 878,
                name: "Science Fiction",
            },
            {
                id: 10770,
                name: "TV Movie",
            },
            {
                id: 53,
                name: "Thriller",
            },
            {
                id: 10752,
                name: "War",
            },
            {
                id: 37,
                name: "Western",
            },
        ],
        []
    );
    const { state } = useContext(UserContext);
    const [content, setContent] = useState({});
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(
                    `movies/random${type ? `?type=${type}` : ""}${
                        genre ? `&genre=${genre}` : ""
                    }`,
                    {
                        headers: {
                            token: state.token,
                        },
                    }
                );
                setContent(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
    }, [type, genre]);
    return (
        <div
            className={styles.featured}
            style={{
                backgroundImage: "url(" + content.img + ")",
            }}
        >
            {type && (
                <div className={styles.category}>
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select
                        name="genre"
                        id="genre"
                        onChange={e => handleGenreChange(e.target.value)}
                    >
                        <option value="none">Genre</option>
                        {arrayGenre.map(genre => (
                            <option value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className={styles.info}>
                <h1 className={styles.title}>{content.title}</h1>
                <span className={styles.description}>{content.desc}</span>
                <div className={styles.action}>
                    <Link
                        to={{
                            pathname: "/watch/" + content._id,
                            movie: content,
                        }}
                    >
                        <button className={styles.play}>
                            <PlayArrow />
                            <span>Watch now</span>
                        </button>
                    </Link>
                    <button className={styles.more}>
                        <InfoOutlined />
                        <span>More information</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
