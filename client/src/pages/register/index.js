import React, { useRef, useState } from "react";
import styles from "./register.module.css";
import logo from "../../icons/movie_logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [invalid, setInvalid] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const loginRef = useRef();
    const validateEmail = email => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    function handleStart(e) {
        e.preventDefault();
        console.log(emailRef.current.value)
        if (validateEmail(emailRef.current.value)) {
            setEmail(emailRef.current.value);
            setInvalid(false);
        } else {
            setInvalid(true);
        }
    }
    const handleFinish = async e => {
        e.preventDefault();
        console.log(passwordRef.current.value)
        if (passwordRef.current.value === "") {
            setInvalid(true);
        } else {
            try {
                const res = await axios.post("/auth/register", {
                    email: email,
                    password: passwordRef.current.value,
                })
                if(res.status == 201){
                    loginRef.current.click();
                    alert("Successful account registration");
                }
            } catch (err) {
                console.log(err);
                alert("Failured account registration");
            }
        }
    };
    return (
        <div className={styles.register}>
            <div className={styles.topInfo}>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                </div>
                <Link to="/login" ref={loginRef}>
                    <button className={styles.loginButton}>sign in</button>
                </Link>
            </div>
            <div className={styles.container}>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your
                    membership.
                </p>
                {!email ? (
                    <div className={styles.loginBox}>
                        <input
                            ref={emailRef}
                            placeholder="Enter your email..."
                        />
                        <button onClick={handleStart}>get started</button>
                        {invalid && (
                            <div className={styles.invalidMessage}>
                                Please enter a valid email address!
                            </div>
                        )}
                    </div>
                ) : (
                    <form className={styles.loginBox}>
                        <input
                            placeholder="password"
                            type="password"
                            ref={passwordRef}
                        />
                        <button onClick={handleFinish}>start</button>
                        {invalid && (
                            <div className={styles.invalidMessage}>
                                Required!
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
