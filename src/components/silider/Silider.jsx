import React, { useEffect, useState } from "react";
import styles from "./silider.module.css"

function Silider() {
    const images = [
        "https://manmoda.ru/uploads/posts/2023-04/muzhskaya-odezhda-na-leto-1.webp",
        "https://2.bp.blogspot.com/-d_8mMIuzUQQ/US9kDMRBaHI/AAAAAAAABFk/bFZ49Kpjl7A/s1600/SuitSupply_AW13.png",
        "https://hips.hearstapps.com/hmg-prod/images/americana-y-pantalon-getty-images-1551695879.jpg"
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.siliderimg}>
            <div style={{ width: "100%", maxWidth: "800px", margin: "20px auto" }} className={styles.silider}>
                <img
                    src={images[current]}
                    alt="slider"
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        transition: "all 0.5s ease"
                    }}
                />
            </div>
        </div>
    );
}

export default Silider;
