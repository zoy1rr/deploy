import styles from './slide.module.css';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function Slide() {
    return (
        <div>
            <Swiper navigation modules={[Navigation]} className={styles.mySwiper}>
                <SwiperSlide className={styles.mySwiperSlide}>
                    <img
                        src="https://static.tildacdn.com/tild3365-6464-4034-a161-653663656236/Uc99be547477c4b44885.jpg"
                        alt="slide"
                    />
                </SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 2</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 3</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 4</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 5</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 6</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 7</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 8</SwiperSlide>
                <SwiperSlide className={styles.mySwiperSlide}>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slide;
