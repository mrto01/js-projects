import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import ListItem from "../listItem";
import styles from "./list.module.css";
SwiperCore.use(Navigation);

export default function List({ list }) {
    return (
        <div className={styles.list}>
            <span className={styles.title}>{list.title}</span>
            <div className={styles.wrapper}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    navigation
                    breakpoints={{
                        200: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1180: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {list.content.map((item, i) => (
                        <SwiperSlide>
                            <ListItem key={item.id} item={item} index={i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
