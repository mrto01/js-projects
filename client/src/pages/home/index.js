import "./home.css";
import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar";
import Featured from "../../components/featured";
import List from "../../components/list";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Index({ type }) {
    const { state } = useContext(UserContext);
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const handleGenreChange = value => {
        value === "none" ? setGenre(false) : setGenre(value);
    };
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `/lists${type ? `?type=${type}` : ""}${
                        genre ? `&genre=${genre}` : ""
                    }`,
                    {
                        headers: {
                            token: state.token,
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
            <Navbar />
            <Featured
                type={type}
                handleGenreChange={handleGenreChange}
                genre={genre}
            />
            {lists.map((list, i) => (
                <List key={i} list={list} />
            ))}
            <Footer />
        </div>
    );
}
