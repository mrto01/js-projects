import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <span>Questions? Contact us.</span>
                <ul className={styles.boxInfo}>
                    <li className={styles.itemInfo}>FQA</li>
                    <li className={styles.itemInfo}>Help center</li>
                    <li className={styles.itemInfo}>Account</li>
                    <li className={styles.itemInfo}>Media center</li>
                    <li className={styles.itemInfo}>Invester relations</li>
                    <li className={styles.itemInfo}>Jobs</li>
                    <li className={styles.itemInfo}>Ways to watch</li>
                    <li className={styles.itemInfo}>Terms of Use</li>
                    <li className={styles.itemInfo}>Pricacy</li>
                    <li className={styles.itemInfo}>Cookie preferences</li>
                    <li className={styles.itemInfo}>Corporate information</li>
                    <li className={styles.itemInfo}>Contact us</li>
                    <li className={styles.itemInfo}>Speed Test</li>
                    <li className={styles.itemInfo}>Legal Notice</li>
                </ul>
                <select className={styles.bottomInfo}>
                    <option>English</option>
                </select>
            </div>
        </div>
    );
}
