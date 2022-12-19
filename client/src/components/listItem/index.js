import { PlayArrow } from "@material-ui/icons";
import styles from "./listItem.module.css";
import { Link } from "react-router-dom";

export default function ListItem({ item }) {
    return (
        <div className={styles.listItem}>
            <Link to={{ pathname: "/watch/" + item._id, movie: item }}>
                <img src={item.imgSm} alt={item.title} />
                <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{item.title}</h3>
                    <PlayArrow className={styles.icon} />
                    <div className={styles.movieInfoTop}>
                        <span className={styles.limit}>+{item.limit}</span>
                        <span>{item.year}</span>
                    </div>
                    <p className={styles.movieDesc}>{item.desc}</p>
                    <div className={styles.movieGenre}>
                        {item.genre.map(genre => (
                            <span className={styles.movieGenre}>{genre}</span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}
